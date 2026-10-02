"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { addGalleryImage, removeGalleryImage, reorderGalleryImage } from "@/lib/actions/realizacje";
import type { RealizacjaImageRow } from "@/lib/supabase/dbTypes";

const MAX_FILE_SIZE_MB = 8;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function GalleryManager({ realizacjaId, initialImages }: { realizacjaId: string; initialImages: RealizacjaImageRow[] }) {
  const [images, setImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList) {
    setError(null);
    for (const file of Array.from(files)) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError(`${file.name}: dozwolone formaty to JPG, PNG, WebP.`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(`${file.name}: plik za duży (maks. ${MAX_FILE_SIZE_MB} MB).`);
        continue;
      }

      setUploading(true);
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `realizacje/${realizacjaId}/gallery-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;

      const { error: uploadError } = await supabase.storage.from("realizacje").upload(path, file);
      if (uploadError) {
        setError(`Nie udało się wysłać ${file.name}: ${uploadError.message}`);
        continue;
      }

      const { data } = supabase.storage.from("realizacje").getPublicUrl(path);
      const result = await addGalleryImage(realizacjaId, data.publicUrl, "");
      if (!result.ok) {
        setError(result.error);
      } else {
        setImages((prev) => [...prev, { id: crypto.randomUUID(), realizacja_id: realizacjaId, url: data.publicUrl, alt: "", position: prev.length }]);
      }
    }
    setUploading(false);
  }

  function handleRemove(image: RealizacjaImageRow) {
    startTransition(async () => {
      const result = await removeGalleryImage(image.id, realizacjaId, image.url);
      if (result.ok) {
        setImages((prev) => prev.filter((img) => img.id !== image.id));
      } else {
        setError(result.error);
      }
    });
  }

  function handleMove(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;

    const reordered = [...images];
    const a = reordered[index];
    const b = reordered[target];
    if (!a || !b) return;
    reordered[index] = b;
    reordered[target] = a;
    setImages(reordered);

    startTransition(async () => {
      await reorderGalleryImage(b.id, realizacjaId, index);
      await reorderGalleryImage(a.id, realizacjaId, target);
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="rounded border border-ink-700 px-4 py-2.5 text-xs font-semibold text-paper-300 hover:border-paper-300 hover:text-paper-100 disabled:opacity-60"
      >
        {uploading ? "Wysyłanie…" : "+ Dodaj zdjęcia do galerii"}
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

      {images.length > 0 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {images.map((image, index) => (
            <div key={image.id} className="relative overflow-hidden rounded border border-ink-800 bg-ink-900">
              <div className="relative aspect-square">
                <Image src={image.url} alt={image.alt || "Zdjęcie galerii"} fill sizes="200px" className="object-cover" />
              </div>
              <div className="flex items-center justify-between gap-1 p-2">
                <button type="button" disabled={pending || index === 0} onClick={() => handleMove(index, -1)} className="text-xs text-paper-400 hover:text-paper-100 disabled:opacity-30">
                  ↑
                </button>
                <button type="button" disabled={pending || index === images.length - 1} onClick={() => handleMove(index, 1)} className="text-xs text-paper-400 hover:text-paper-100 disabled:opacity-30">
                  ↓
                </button>
                <button type="button" disabled={pending} onClick={() => handleRemove(image)} className="text-xs text-paper-500 hover:text-red-400">
                  Usuń
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
