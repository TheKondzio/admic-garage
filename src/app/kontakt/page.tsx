import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Contact } from "@/components/sections/Contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt",
  description:
    "Skontaktuj się z ADMIC GARAGE — telefon, WhatsApp, e-mail lub formularz. Kraków i okolice, dojazd do klienta.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ label: "Strona główna", href: "/" }, { label: "Kontakt" }]} />
      <Contact headingAs="h1" />
    </PageShell>
  );
}
