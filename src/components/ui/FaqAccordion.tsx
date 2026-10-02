"use client";

import { useState } from "react";
import { IconChevronDown } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { FaqItem } from "@/types";

export function FaqAccordion({ items, defaultOpenIndex = 0 }: { items: FaqItem[]; defaultOpenIndex?: number | null }) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="divide-y divide-ink-800 border-y border-ink-800">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-base font-medium text-paper-100">
                {item.question}
              </span>
              <IconChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-paper-500 transition-transform",
                  isOpen && "rotate-180 text-accent-light"
                )}
              />
            </button>
            {isOpen && (
              <p className="pb-5 text-sm leading-relaxed text-paper-300">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
