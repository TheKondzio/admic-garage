import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingPhoneButton } from "@/components/layout/FloatingPhoneButton";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {/* Bez pb-16 na mobile — dawny pełnoszerokościowy pasek (StickyMobileCta)
          już nie istnieje, więc treść nie musi rezerwować dla niego miejsca.
          Nowy FloatingPhoneButton to mały krążek w rogu, nakłada się na
          treść tak jak każdy standardowy floating-action-button. */}
      <main>{children}</main>
      <Footer />
      <FloatingPhoneButton />
    </>
  );
}
