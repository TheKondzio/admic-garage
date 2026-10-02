import Image from "next/image";
import { IconCamera } from "@/components/ui/icons";

function Slot({ src, alt, label }: { src?: string; alt: string; label: string }) {
  return (
    <div className="relative flex aspect-[4/3] flex-col items-center justify-center gap-2 overflow-hidden rounded border border-ink-800 bg-ink-900 text-paper-500">
      {src ? (
        <>
          <Image src={src} alt={alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
          <span className="absolute left-3 top-3 rounded-full border border-ink-600 bg-ink-950/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-paper-200">
            {label}
          </span>
        </>
      ) : (
        <>
          <IconCamera className="h-7 w-7" />
          <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
        </>
      )}
    </div>
  );
}

export function BeforeAfter({
  beforeImage,
  beforeAlt,
  afterImage,
  afterAlt,
}: {
  beforeImage?: string;
  beforeAlt: string;
  afterImage?: string;
  afterAlt: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Slot src={beforeImage} alt={beforeAlt} label="Przed" />
      <Slot src={afterImage} alt={afterAlt} label="Po" />
    </div>
  );
}
