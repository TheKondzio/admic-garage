import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

// Zestaw lekkich ikon SVG bez zewnętrznych zależności (bez paczek typu lucide),
// żeby nie dokładać niepotrzebnych bibliotek do projektu.

export function IconCode(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" focusable="false" {...props}>
      <path d="M9 8L4 12l5 4M15 8l5 4-5 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCarplay(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" focusable="false" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M8 15l2.5-5L13 15M8.8 13.2h3.4M15 15v-5l3 5v-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconRetrofit(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" focusable="false" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path
        d="M19.4 13.5a1.7 1.7 0 000-3l-.9-.3a7 7 0 00-.6-1.5l.5-.9a1.7 1.7 0 00-2.6-2.1l-.9.5a7 7 0 00-1.5-.6l-.3-.9a1.7 1.7 0 00-3.2 0l-.3.9a7 7 0 00-1.5.6l-.9-.5a1.7 1.7 0 00-2.6 2.1l.5.9a7 7 0 00-.6 1.5l-.9.3a1.7 1.7 0 000 3l.9.3c.15.53.35 1.03.6 1.5l-.5.9a1.7 1.7 0 002.6 2.1l.9-.5c.47.25.97.45 1.5.6l.3.9a1.7 1.7 0 003.2 0l.3-.9c.53-.15 1.03-.35 1.5-.6l.9.5a1.7 1.7 0 002.6-2.1l-.5-.9c.25-.47.45-.97.6-1.5l.9-.3z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconDetailing(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" focusable="false" {...props}>
      <path d="M5 17h14M6 17l1.5-6a2 2 0 011.9-1.4h5.2A2 2 0 0116.5 11L18 17M8 10.5l1.5-3h5l1.5 3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="17.5" r="1.3" />
      <circle cx="16" cy="17.5" r="1.3" />
    </svg>
  );
}

export const serviceIcons: Record<string, (props: IconProps) => JSX.Element> = {
  code: IconCode,
  carplay: IconCarplay,
  retrofit: IconRetrofit,
  detailing: IconDetailing,
};

export function IconPhone(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" focusable="false" {...props}>
      <path
        d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2a1 1 0 011-.2c1.1.4 2.3.6 3.5.6a1 1 0 011 1V19a1 1 0 01-1 1C10.5 20 4 13.5 4 5.4a1 1 0 011-1H8a1 1 0 011 1c0 1.2.2 2.4.6 3.5a1 1 0 01-.3 1.1l-2.7 1.8z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconWhatsapp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.42 1.26 4.86L2 22l5.32-1.28a9.9 9.9 0 004.72 1.2h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm0 18.1a8.1 8.1 0 01-4.13-1.13l-.3-.18-3.08.79.8-3.02-.2-.31a8.13 8.13 0 1112.98-6.29 8.14 8.14 0 01-6.07 10.14z" />
      <path d="M9.2 7.4c-.2-.45-.4-.46-.6-.47h-.5c-.18 0-.46.07-.7.33-.24.26-.92.9-.92 2.2s.94 2.55 1.07 2.73c.13.18 1.83 2.8 4.44 3.9 2.16.9 2.6.72 3.07.68.47-.05 1.5-.6 1.72-1.2.21-.58.21-1.08.15-1.19-.06-.1-.24-.17-.5-.3-.26-.13-1.5-.74-1.73-.83-.23-.08-.4-.13-.57.13-.17.26-.65.83-.8 1-.14.17-.29.19-.55.06-.26-.13-1.09-.4-2.07-1.28-.77-.68-1.28-1.53-1.44-1.79-.15-.26-.02-.4.11-.53.12-.12.26-.3.4-.45.13-.16.17-.27.26-.45.09-.17.04-.33-.02-.46-.06-.13-.55-1.4-.79-1.9z" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" focusable="false" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" focusable="false" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" focusable="false" {...props}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" focusable="false" {...props}>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" focusable="false" {...props}>
      <path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function IconCamera(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" focusable="false" {...props}>
      <path d="M4 8.5A1.5 1.5 0 015.5 7h2.1l.9-1.5h6.9L16.3 7h2.2A1.5 1.5 0 0120 8.5v9A1.5 1.5 0 0118.5 19h-13A1.5 1.5 0 014 17.5v-9z" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3.3" />
    </svg>
  );
}
