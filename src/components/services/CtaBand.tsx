import { Button } from "@/components/ui/Button";

export function CtaBand({
  title,
  primaryLabel = "Zapytaj o wycenę",
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="flex flex-col items-start gap-4 rounded border border-ink-800 bg-ink-900 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <p className="font-display text-lg font-semibold text-paper-100">{title}</p>
      <div className="flex shrink-0 flex-wrap gap-3">
        {secondaryLabel && secondaryHref && (
          <Button href={secondaryHref} variant="secondary">
            {secondaryLabel}
          </Button>
        )}
        <Button href="/kontakt" variant="primary">
          {primaryLabel}
        </Button>
      </div>
    </div>
  );
}
