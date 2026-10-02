# Filmy

Wrzuć plik `.mp4` tutaj i ustaw jego ścieżkę w `src/data/site.ts` → `heroVideo`,
np. `heroVideo: "/videos/hero.mp4"`.

Film w hero jest odtwarzany automatycznie, bez dźwięku, w pętli (autoplay,
muted, loop) — zalecane: krótkie ujęcie (10–20 s), format `.mp4` (H.264),
rozdzielczość ok. 720–1080 px szerokości (panel jest wąski, nie potrzeba 4K),
plik możliwie lekki (poniżej ~5–8 MB), żeby nie spowalniać ładowania strony.
