import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCta } from "@/components/sections/StickyMobileCta";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pb-16 lg:pb-0">{children}</main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
