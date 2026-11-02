# Szymon Stanisławski - portfolio Software & AI

Portfolio skupione na dwóch równorzędnych obszarach: programowaniu oraz trenowaniu i ewaluacji AI, w tym rate & review i rubrykach oceny. RNAQuANet i TravelTactician mają osobną sekcję projektów. React 19, TypeScript, Vite, React Compiler, MUI, Emotion i i18next. Przygotowane pod GitHub Pages.

## Uruchomienie

Node.js 22.12+ lub 24+:

```sh
npm ci
npm run dev
```

Build produkcyjny i podgląd:

```sh
npm run build
npm run preview
```

## Wygląd i struktura

Motyw **Field Notes** łączy papier w kratkę, kobalt, cynobrowe stemple, żółte notatki, analogowy kolaż i trzy kroje pisma: Manrope, IBM Plex Mono i Instrument Serif. Kompozycja w hero ma pięć wariantów; przycisk mieszania losuje inny układ ozdobników i kątów kartek, zachowując położenie treści oraz nawigacji. Animacje respektują `prefers-reduced-motion`. Nie ma automatycznej karuzeli ani migających elementów.

Motyw strony zapewnia `ThemeProvider`; sekcja doświadczenia ma osobny, lokalny motyw edytora inspirowany [One Dark Pro Darker](https://github.com/Binaryify/OneDark-Pro/blob/master/themes/OneDark-Pro-darker.json). Układ, responsywność i dekoracje są w `sx`. Globalne minimum (reset, focus, przewijanie i ograniczenie animacji) zapewnia `MuiCssBaseline`. Nie ma własnego arkusza CSS. Fonty są hostowane lokalnie przez Fontsource.

- `src/theme.ts` - paleta, typografia i wspólne ustawienia komponentów MUI.
- `src/App.tsx` - dwie główne dziedziny, doświadczenie zawodowe, projekty, szczegóły wpisów, `/lab` i 404.
- `src/components/CollageBoard.tsx` - interaktywny kolaż z pięcioma kompozycjami.
- `src/components/ExperienceEditor.tsx` - eksplorator doświadczenia: foldery, pliki Markdown, karty i domyślny README.
- `src/editorTheme.ts` - lokalny motyw One Dark Pro Darker dla edytora.
- `src/components/SiteChrome.tsx` - nagłówek, kontakt, przełącznik języka i współdzielone elementy.
- `src/content.ts` - dane kontaktowe, publiczne linki i lista wpisów.
- `src/locales/pl/translation.json` oraz `src/locales/en/translation.json` - treść i etykiety interfejsu.
- `src/i18n.ts` - konfiguracja języków i metadanych dokumentu.
- `docs/CONTENT_TODO.md` - konkretne informacje do uzupełnienia przez autora.

Projekty zawodowe mają opisy funkcjonalne, bez wewnętrznych nazw, zrzutów i kodu firmowego. RNAQuANet jest opisany jako projekt zespołowy wraz z nagrodą główną PTBI w 2024 r. - jedną z dwóch równorzędnych nagród za pracę licencjacką/inżynierską. Źródło: [oficjalna lista laureatów PTBI](https://www.ptbi.org.pl/website/contests/winners/). Nie dodano niepotwierdzonych metryk. Brakujący e-mail nie generuje pustego linku - główny kontakt prowadzi na LinkedIn.

## Języki i i18n Ally

Programowanie i AI są plikami w folderach eksploratora w sekcji doświadczenia. Domyślnie otwiera się krótki `README.md` z wprowadzeniem do obu dziedzin. Kliknięcie pliku otwiera jego opis po prawej, a otwarte pliki można przełączać i zamykać w kartach. Foldery mają natywne rozwijanie obsługiwane klawiaturą. Na telefonie eksplorator jest domyślnie zwinięty; można go pokazać przyciskiem, a wybranie pliku przywraca widok treści.

AI obejmuje przygotowanie zadań, rubryki, ewaluację, raporty oraz rate & review. Mały przykład rubryki pozostaje tylko w osobnym modalu otwieranym z pliku `evaluation-rubrics.md`. Całość korzysta z języka strony. Projekty RNAQuANet i TravelTactician pozostają w osobnej sekcji.

Przy pierwszej wizycie i18next wykrywa język z `navigator.languages`. Obsługiwane są polski i angielski, również warianty takie jak `pl-PL` i `en-GB`. Dla nieobsługiwanych języków fallback to angielski. Wykryty język i późniejszy wybór PL/EN są zapisywane w `localStorage` pod kluczem `portfolio.language`. Zapisany wybór ma pierwszeństwo przed ustawieniem przeglądarki. Przy zablokowanym storage strona nadal działa, a wybór obowiązuje w bieżącej sesji aplikacji.

Przełączenie języka aktualizuje także `html[lang]`, tytuł i opis strony. Oba słowniki są częścią bundla, bez dodatkowych żądań o tłumaczenia. Nazwy technologii i projektów publicznych pozostają nazwami własnymi.

VS Code proponuje rozszerzenie **i18n Ally** przez `.vscode/extensions.json`. W `.vscode/settings.json` są ścieżki do domyślnego słownika `translation.json`, zagnieżdżone klucze i polski język źródłowy. Namespace w rozszerzeniu jest wyłączony, aby klucze odpowiadały wywołaniom `t()` bez prefiksu. Po instalacji rozszerzenia można przeglądać i edytować obie wersje obok kodu. Klucze zbudowane dynamicznie z identyfikatorów obszarów można edytować w panelu słowników.

## Sprawdzenie

```sh
npm run build
npm run test:e2e
```

Testy Playwright budują wersję produkcyjną i sprawdzają wykrywanie i zapisywanie języka, fallback, niedostępne localStorage, zgodność słowników, panel kompetencji, eksplorator i karty edytora, dialogi, nawigację między trasami oraz szerokości 320–1440 px w obu językach. Na Windows konfiguracja korzysta z zainstalowanego Chrome. Na pozostałych platformach przed pierwszym testem zainstaluj przeglądarkę:

```sh
npx playwright install chromium
```

## GitHub Pages

Istniejący `.github/workflows/deploy.yml` buduje i publikuje stronę po pushu do `main`. W ustawieniach repozytorium wybierz Pages → GitHub Actions. `base: '/'` jest właściwe dla `Hi-Im-Simon.github.io` i domeny własnej.

Build kopiuje `index.html` do `404.html`, dzięki czemu bezpośrednie wejścia na `/lab` i inne trasy uruchamiają aplikację. GitHub Pages zwraca przy takich wejściach status HTTP 404; dla indeksowanych podstron warto w przyszłości zastosować generowanie statyczne. Strona główna nie ma tego ograniczenia.
