# jdg-revenue-calc — Electron

Natywna aplikacja desktopowa (Windows / macOS / Linux) zbudowana na Electron.
Bundluje Chromium — instalator ~180 MB, ale zero zależności systemowych na maszynie docelowej.

---

## Wymagania (jednorazowe)

- **Node.js ≥ 18** — https://nodejs.org → LTS

---

## Budowanie

```bash
cd electron
npm install        # tylko raz — pobiera Electron (~90 MB)
npm run build:win  # Windows
```

### Wszystkie platformy:

```bash
npm run build:win    # Windows x64 → .exe (NSIS) + portable .exe
npm run build:mac    # macOS       → .dmg          (tylko na macOS)
npm run build:linux  # Linux x64   → .AppImage      (tylko na Linux)
```

> Electron nie wspiera cross-kompilacji — build dla Windows musi
> odbywać się na Windows, dla macOS — na macOS, itd.

### Skrót dla Windows — podwójny klik na `build.bat`

Skrypt sprawdza Node.js, instaluje zależności jeśli brakuje
`node_modules/`, buduje instalator i otwiera folder `dist\`.

### Tryb deweloperski:

```bash
npm start
```

---

## Wyniki buildu

```
dist/
├── jdg-revenue-calc Setup 1.0.0.exe   ← instalator NSIS (Windows)
├── jdg-revenue-calc-portable.exe      ← wersja przenośna (Windows)
├── jdg-revenue-calc-1.0.0.dmg        ← obraz dysku (macOS)
└── jdg-revenue-calc-1.0.0.AppImage   ← przenośny plik (Linux)
```

---

## Struktura projektu

```
electron/
├── src/
│   └── index.html   ← kalkulator (cały UI)
├── assets/
│   ├── icon.png     ← ikona (PNG, 256×256)
│   └── icon.ico     ← ikona (Windows ICO, multi-size)
├── main.js          ← Electron main process
├── package.json     ← konfiguracja app i electron-builder
├── build.bat        ← pomocniczy skrypt dla Windows
└── README.md
```

---

## Dane ZUS 2026

- Podstawa wymiaru: 5 652 zł/mies. (60% × 9 420 zł)
- ZUS społeczny bez chorobowej: 1 788,29 zł/mies.
- Minimalna składka zdrowotna: 432,54 zł/mies.
