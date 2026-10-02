"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

// WAŻNE — kolejność ma znaczenie dla wydajności i dostępności:
// 1) Serwer renderuje ten div jako zwykły, w pełni widoczny element (brak
//    klasy chowającej treść w HTML) — użytkownik bez JS / z wolnym JS
//    zawsze widzi normalną, gotową treść, nigdy "znikniętą" sekcję.
// 2) Dopiero w przeglądarce, PO zamontowaniu, JS aktywnie DODAJE klasę
//    chowającą (przez ref, nie przez re-render Reacta) — więc nie ma ryzyka
//    niezgodności SSR/hydracja i nie ma migotania.
// 3) Animacja korzysta wyłącznie z opacity/transform (kompozytor GPU) —
//    zero wpływu na layout, więc zero ryzyka dla CLS.
// 4) Respektuje prefers-reduced-motion — dla tych użytkowników JS w ogóle
//    nie zakłada obserwatora, a CSS i tak nie chowa treści (patrz globals.css).
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") return;

    el.classList.add("reveal-pending");
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          el.classList.remove("reveal-pending");
          el.classList.add("reveal-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
