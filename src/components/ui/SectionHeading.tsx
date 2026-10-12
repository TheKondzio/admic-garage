import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2"; // na podstronach bez własnego H1 nagłówek sekcji głównej jest H1
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-light">
          {eyebrow}
        </p>
      )}
      <Tag className="font-display text-3xl font-semibold text-paper-100 sm:text-4xl">
        {title}
      </Tag>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-paper-300">{description}</p>
      )}
    </div>
  );
}
