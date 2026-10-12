"use client";

import { useEffect } from "react";
import { trackConversion, trackEvent } from "@/lib/tracking";

// Jeden mały komponent kliencki zamiast osobnego onClick na każdym przycisku:
// nasłuchuje kliknięć na całej stronie (delegacja zdarzeń) i
//  - rozpoznaje linki tel:, wa.me i mailto: (kliknięcie telefonu / WhatsApp / e-maila),
//  - zlicza kliknięcia CTA oznaczone atrybutem data-track="...",
// oraz chowa przyklejony pasek mobilny, gdy formularz jest widoczny na ekranie.
export function LandingTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const ctaId = link.dataset.track;

      if (href.startsWith("tel:")) {
        trackEvent("click_to_call", { cta_id: ctaId });
        trackConversion("phone");
      } else if (href.includes("wa.me")) {
        trackEvent("click_whatsapp", { cta_id: ctaId });
        trackConversion("whatsapp");
      } else if (href.startsWith("mailto:")) {
        trackEvent("click_email", { cta_id: ctaId });
      } else if (ctaId) {
        trackEvent("cta_click", { cta_id: ctaId });
      }
    }

    document.addEventListener("click", onClick);

    const bar = document.getElementById("sticky-bar");
    const form = document.getElementById("formularz");
    let observer: IntersectionObserver | undefined;
    if (bar && form && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) bar.setAttribute("data-hidden", String(entry.isIntersecting));
        },
        { threshold: 0.3 }
      );
      observer.observe(form);
    }

    return () => {
      document.removeEventListener("click", onClick);
      observer?.disconnect();
    };
  }, []);

  return null;
}
