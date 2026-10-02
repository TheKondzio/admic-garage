import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-light">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold text-paper-100 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-paper-300">{description}</p>
      )}
    </div>
  );
}
