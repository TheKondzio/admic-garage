import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Skontaktuj się z ADMIC GARAGE — telefon, WhatsApp, e-mail lub formularz. Kraków i okolice, dojazd do klienta.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ label: "Strona główna", href: "/" }, { label: "Kontakt" }]} />
      <Contact />
    </PageShell>
  );
}
