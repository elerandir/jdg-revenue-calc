# jdg-revenue-calc — Tauri

Natywna aplikacja desktopowa (Windows / macOS / Linux) zbudowana na Tauri v2.
Instalator: ~4 MB dzięki użyciu systemowego WebView zamiast bundlowanego Chromium.

---

## Wymagania (jednorazowe)

### 1. Node.js ≥ 18
https://nodejs.org → LTS

### 2. Rust

```bash
# macOS / Linux:
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Windows: pobierz instalator z https://rustup.rs
```

### 3. Zależności systemowe

**Windows** — brak (WebView2 wbudowany od Windows 10 21H2)

**macOS** — brak (WebKit wbudowany w system)

**Linux — Debian/Ubuntu:**
```bash
sudo apt update && sudo apt install -y \
  libwebkit2gtk-4.1-dev libgtk-3-dev \
  libayatana-appindicator3-dev librsvg2-dev patchelf
```

**Linux — Fedora/RHEL:**
```bash
sudo dnf install webkit2gtk4.1-devel gtk3-devel \
  libappindicator-gtk3-devel librsvg2-devel
```

**Linux — Arch:**
```bash
sudo pacman -S webkit2gtk-4.1 gtk3 libappindicator-gtk3 librsvg
```

---

## Budowanie

```bash
cd tauri
npm install       # tylko raz — pobiera @tauri-apps/cli
npm run build     # buduje dla bieżącego systemu
```

### Konkretna platforma:

```bash
npm run build:win        # Windows x64   → .exe (NSIS) + .msi
npm run build:mac        # macOS ARM64   → .dmg  (Apple Silicon)
npm run build:mac-intel  # macOS x64     → .dmg  (Intel)
npm run build:linux      # Linux x64     → .AppImage + .deb
```

> Tauri nie wspiera cross-kompilacji — build dla danej platformy
> musi odbywać się na tej platformie. W GitHub Actions można budować
> dla wszystkich trzech równolegle.

### Tryb deweloperski:

```bash
npm run dev    # otwiera okno z hot-reload
```

---

## Wyniki buildu

```
src-tauri/target/release/bundle/
├── windows/
│   ├── jdg-revenue-calc_1.0.0_x64-setup.exe   ← instalator NSIS
│   └── jdg-revenue-calc_1.0.0_x64.msi
├── macos/
│   └── jdg-revenue-calc.dmg
└── linux/
    ├── jdg-revenue-calc_1.0.0_amd64.AppImage
    └── jdg-revenue-calc_1.0.0_amd64.deb
```

---

## Struktura projektu

```
tauri/
├── src/
│   └── index.html          ← kalkulator (cały UI)
├── src-tauri/
│   ├── src/
│   │   ├── main.rs
│   │   └── lib.rs
│   ├── icons/              ← ikony (PNG, ICO, ICNS)
│   ├── tauri.conf.json
│   ├── Cargo.toml
│   └── build.rs
├── package.json
└── README.md
```

---

## Dane ZUS 2026

- Podstawa wymiaru: 5 652 zł/mies. (60% × 9 420 zł)
- ZUS społeczny bez chorobowej: 1 788,29 zł/mies.
- Minimalna składka zdrowotna: 432,54 zł/mies.
