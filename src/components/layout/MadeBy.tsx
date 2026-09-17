// Wymagane dosłownie: class "made-by" i id "madeby", tekst i link bez zmian.
// Stylowane klasami Tailwind (spójnie z resztą serwisu), nie inline CSS.
export function MadeBy() {
  return (
    <section
      className="made-by border-t border-ink-800 bg-ink-950 py-3.5 text-center font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-paper-500 sm:text-xs"
      id="madeby"
    >
      <p className="m-0">
        Strona stworzona przez{" "}
        <a
          href="https://www.reworkagency.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-accent-light no-underline transition-colors hover:text-accent"
        >
          Rework Agency
        </a>
      </p>
    </section>
  );
}
