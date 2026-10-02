import type { ReactNode } from "react";

export function LegalH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-10 font-display text-xl font-semibold text-paper-100 first:mt-0">
      {children}
    </h2>
  );
}

export function LegalP({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-sm leading-relaxed text-paper-300">{children}</p>;
}

export function LegalUl({ children }: { children: ReactNode }) {
  return <ul className="mt-3 space-y-2">{children}</ul>;
}

export function LegalLi({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2.5 text-sm leading-relaxed text-paper-300">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      {children}
    </li>
  );
}

// Wyróżnia miejsca, które wymagają uzupełnienia danych administratora
// (bez zgadywania — patrz zasady w README dot. dokumentów prawnych).
export function ToDo({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-accent/40 bg-accent/10 px-1.5 py-0.5 text-xs font-medium text-accent-light">
      [DO UZUPEŁNIENIA: {children}]
    </span>
  );
}

export function LegalTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded border border-ink-800">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-ink-800 bg-ink-900">
            {headers.map((h) => (
              <th key={h} className="px-4 py-2.5 font-semibold text-paper-100">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-ink-800 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-paper-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
