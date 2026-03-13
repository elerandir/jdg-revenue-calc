# jdg-revenue-calc

Kalkulator rocznych przychodów i obciążeń dla jednoosobowej działalności gospodarczej.
Dane ZUS 2026. Tryb dzienny/nocny, responsywny układ, rozkład dni wolnych per miesiąc.

---

## Warianty

| Folder | Opis | Wymagania |
|---|---|---|
| [`html_only/`](./html_only/) | Pojedynczy plik HTML, otwierany w przeglądarce | brak |
| [`tauri/`](./tauri/) | Natywna apka desktopowa, instalator ~4 MB | Node.js + Rust |
| [`electron/`](./electron/) | Natywna apka desktopowa, instalator ~180 MB | Node.js |

---

## html_only

Zero zależności. Podwójne kliknięcie otwiera kalkulator w przeglądarce.

```
html_only/
└── index.html
```

---

## tauri

Natywna apka dla Windows / macOS / Linux. Używa systemowego WebView
(WebView2 / WebKit / WebKitGTK) — stąd mały rozmiar instalatora.

```bash
cd tauri
npm install
npm run build          # buduje dla bieżącego systemu
```

Szczegóły w [`tauri/README.md`](./tauri/README.md).

```
tauri/
├── src/index.html         ← UI kalkulatora
├── src-tauri/
│   ├── src/               ← Rust (main.rs, lib.rs)
│   ├── icons/             ← ikony (PNG, ICO, ICNS)
│   ├── tauri.conf.json
│   └── Cargo.toml
└── package.json
```

---

## electron

Natywna apka dla Windows (build.bat) / macOS / Linux.
Bundluje Chromium — większy instalator, ale zero zależności systemowych.

```bash
cd electron
npm install
npm run build:win      # Windows .exe
npm run build:mac      # macOS .dmg   (tylko na macOS)
npm run build:linux    # Linux .AppImage (tylko na Linux)
```

Na Windows możesz też użyć `build.bat` (podwójny klik).

Szczegóły w [`electron/README.md`](./electron/README.md).

```
electron/
├── src/index.html         ← UI kalkulatora
├── assets/                ← ikony (PNG, ICO)
├── main.js                ← Electron main process
└── package.json
```

---

## Szybkie porównanie Tauri vs Electron

| | Tauri | Electron |
|---|---|---|
| Rozmiar instalatora | ~4 MB | ~180 MB |
| Zużycie RAM | niskie | wysokie |
| Cross-compilation | ✗ (build na docelowym OS) | ✗ (j.w.) |
| WebEngine | systemowy WebView | bundlowany Chromium |
| Backend | Rust | Node.js |
| Dojrzałość | v2 (2024) | bardzo dojrzały |
