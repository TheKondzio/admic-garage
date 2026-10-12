import type { ReactNode } from "react";

// Znacznik „do uzupełnienia” widoczny WYŁĄCZNIE w trybie deweloperskim
// (`npm run dev`). W buildzie produkcyjnym NODE_ENV === "production", więc
// komponent nic nie renderuje — klient nigdy nie zobaczy żółtych oznaczeń.
export function Todo({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <span className="my-1 inline-block rounded border border-amber-400/50 bg-amber-400/10 px-2 py-0.5 text-xs text-amber-300">
      [DO UZUPEŁNIENIA: {children}]
    </span>
  );
}
