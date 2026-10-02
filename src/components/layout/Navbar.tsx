"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconMenu, IconClose, IconPhone, IconChevronDown } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { navLinks } from "@/data/nav";
import { site } from "@/data/site";
import { Logo } from "@/components/layout/Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-800/80 bg-ink-950/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              // Dropdown desktop: panel jest ZAWSZE w DOM (crawlable, działa bez JS),
              // widoczność przełącza czysty CSS (:hover na .group), bez stanu React.
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 py-2 text-sm font-medium text-paper-300 transition-colors hover:text-paper-100"
                >
                  {link.label}
                  <IconChevronDown className="h-3.5 w-3.5" />
                </Link>
                <div className="invisible absolute left-0 top-full w-72 rounded border border-ink-800 bg-ink-900 py-2 opacity-0 shadow-card transition-opacity duration-150 group-hover:visible group-hover:opacity-100">
                  {link.children.map((child) => (
                    <div key={child.href}>
                      {child.groupLabel && (
                        <p className="mt-1 border-t border-ink-800 px-4 pb-1.5 pt-3 text-[11px] font-semibold uppercase tracking-wider text-paper-500 first:mt-0 first:border-t-0 first:pt-2">
                          {child.groupLabel}
                        </p>
                      )}
                      <Link
                        href={child.href}
                        className="flex items-center justify-between px-4 py-2.5 text-sm text-paper-300 hover:bg-ink-800 hover:text-paper-100"
                      >
                        {child.label}
                        {child.badge && (
                          <span className="rounded-full border border-ink-600 px-2 py-0.5 text-[10px] uppercase tracking-wide text-paper-500">
                            {child.badge}
                          </span>
                        )}
                      </Link>
                      {child.children && (
                        <div className="ml-4 border-l border-ink-800 pl-3">
                          {child.children.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="block px-3 py-2 text-xs text-paper-400 hover:text-paper-100"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-paper-300 transition-colors hover:text-paper-100"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-sm font-medium text-paper-300 hover:text-paper-100"
          >
            <IconPhone className="h-4 w-4" />
            {site.phone}
          </a>
          <Button href="/kontakt" variant="primary" className="text-xs">
            Zapytaj o wycenę
          </Button>
        </div>

        <button
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-paper-100 lg:hidden"
        >
          {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Panel mobile — zawsze w DOM (ukryty przez CSS `hidden`, nie odmontowany),
          żeby wszystkie linki (w tym dropdown "Usługi") były obecne w statycznym HTML. */}
      <div className={cn("border-t border-ink-800 bg-ink-950 lg:hidden", open ? "block" : "hidden")}>
        <Container className="flex flex-col gap-1 py-4">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.href}>
                <button
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  aria-expanded={mobileServicesOpen}
                  className="flex w-full items-center justify-between rounded px-2 py-3 text-base font-medium text-paper-200 hover:bg-ink-900 hover:text-paper-100"
                >
                  {link.label}
                  <IconChevronDown className={cn("h-4 w-4 transition-transform", mobileServicesOpen && "rotate-180")} />
                </button>
                <div className={cn("ml-2 flex-col gap-1 border-l border-ink-800 pl-3", mobileServicesOpen ? "flex" : "hidden")}>
                  {link.children.map((child) => (
                    <div key={child.href}>
                      {child.groupLabel && (
                        <p className="mt-2 px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-paper-500 first:mt-0">
                          {child.groupLabel}
                        </p>
                      )}
                      <Link
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded px-2 py-2.5 text-sm text-paper-300 hover:bg-ink-900 hover:text-paper-100"
                      >
                        {child.label}
                        {child.badge && (
                          <span className="rounded-full border border-ink-600 px-2 py-0.5 text-[10px] uppercase tracking-wide text-paper-500">
                            {child.badge}
                          </span>
                        )}
                      </Link>
                      {child.children && (
                        <div className="ml-3 flex flex-col gap-1 border-l border-ink-800 pl-3">
                          {child.children.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setOpen(false)}
                              className="rounded px-2 py-2 text-xs text-paper-400 hover:bg-ink-900 hover:text-paper-100"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-3 text-base font-medium text-paper-200 hover:bg-ink-900 hover:text-paper-100"
              >
                {link.label}
              </Link>
            )
          )}
          <div className="mt-2 flex flex-col gap-3 border-t border-ink-800 pt-4">
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 px-2 text-base font-medium text-paper-200"
            >
              <IconPhone className="h-4 w-4" />
              {site.phone}
            </a>
            <Button href="/kontakt" variant="primary" className="w-full">
              Zapytaj o wycenę
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
