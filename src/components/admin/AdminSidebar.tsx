"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/realizacje", label: "Realizacje" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-ink-800 px-2 py-2 lg:flex-col lg:gap-1 lg:border-b-0 lg:border-r lg:px-3 lg:py-6">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "shrink-0 rounded px-3 py-2 text-sm font-medium transition-colors",
              active ? "bg-ink-800 text-paper-100" : "text-paper-400 hover:bg-ink-900 hover:text-paper-100"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
