import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Portfolio } from "@/components/sections/Portfolio";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

// Strona główna pozostaje statyczna (szybka), ale co godzinę Next.js
// odświeży ją w tle, żeby podgląd realizacji (teraz z Supabase) nie
// wymagał pełnego redeployu po dodaniu nowej pozycji w panelu.
export const revalidate = 3600;

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <Services />
      <WhyUs />
      <HowItWorks />
      <Portfolio />
      <ServiceArea />
      <Faq />
      <Contact />
    </PageShell>
  );
}
