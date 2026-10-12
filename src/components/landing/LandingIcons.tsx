import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

// Ikony w tym samym stylu co src/components/ui/icons.tsx (obrys 1.6, bez bibliotek).

export function IconCheck(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" focusable="false" {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
