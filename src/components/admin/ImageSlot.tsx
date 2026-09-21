"use client";

import { useRef, useState, type DragEvent } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

const MAX_FILE_SIZE_MB = 8;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Osobny "slot" na jedno zdjęcie (główne / przed / po). Upload idzie
// BEZPOŚREDNIO z przeglądarki do Supabase Storage (nie przez nasz serwer —
// szybciej i bez limitów rozmiaru requestu Vercela). Realny plik trafia do
// trwałego storage, nie do pamięci aplikacji ani lokalnego dysku.
export function ImageSlot({
  label,
  pathPrefix,
  value,
  alt,
  onChange,
}: {
  label: string;
  pathPrefix: string; // np. "realizacje/<id>/cover"
  value: string;
  alt: string;
  onChange: (url: string, alt: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Dozwolone formaty: JPG, PNG, WebP.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`Plik jest za duży (maks. ${MAX_FILE_SIZE_MB} MB).`);
      return;
    }

    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `${pathPrefix}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("realizacje").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

    setUploading(false);

    if (uploadError) {
      setError(`Nie udało się wysłać pliku: ${uploadError.message}`);
      return;
    }

    const { data } = supabase.storage.from("realizacje").getPublicUrl(path);
    onChange(data.publicUrl, alt);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper-500">{label}</span>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex aspect-video cursor-pointer flex-col items-center justify-center overflow-hidden rounded border-2 border-dashed transition-colors ${
          dragActive ? "border-accent bg-accent/5" : "border-ink-700 bg-ink-950 hover:border-ink-600"
        }`}
      >
        {value ? (
          <Image src={value} alt={alt || label} fill sizes="400px" className="object-cover" />
        ) : (
          <p className="px-4 text-center text-xs text-paper-500">
            {uploading ? "Wysyłanie…" : "Przeciągnij zdjęcie tutaj albo kliknij, żeby wybrać z komputera"}
          </p>
        )}
        {uploading && value && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink-950/70 text-xs text-paper-200">
            Wysyłanie…
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}

      <input
        type="text"
        value={alt}
        onChange={(e) => onChange(value, e.target.value)}
        placeholder="Opisowy alt tekst — co widać na zdjęciu"
        className="mt-2 w-full rounded border border-ink-700 bg-ink-950 px-3 py-2 text-xs text-paper-100 placeholder:text-paper-500 focus:border-accent focus:outline-none"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("", "")}
          className="mt-1.5 text-xs text-paper-500 hover:text-red-400"
        >
          Usuń zdjęcie
        </button>
      )}
    </div>
  );
}
