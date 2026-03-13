# Kalkulator przychodów JDG — Tauri

Aplikacja desktopowa (Windows / macOS / Linux) zbudowana na Tauri v2.
Instalator: ~4 MB (zamiast ~180 MB w Electron).

---

## Wymagania (jednorazowe)

### 1. Node.js ≥ 18
https://nodejs.org → LTS

### 2. Rust
```bash
# Windows / macOS / Linux:
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
Na Windows: https://rustup.rs (instalator .exe)

### 3. Zależności systemowe

**Windows** — nic dodatkowego (WebView2 wbudowany od Windows 10 21H2)

**macOS** — nic dodatkowego (WebKit wbudowany w system)

**Linux (Debian/Ubuntu):**
```bash
sudo apt update && sudo apt install -y \
  libwebkit2gtk-4.1-dev libgtk-3-dev \
  libayatana-appindicator3-dev librsvg2-dev \
  patchelf
```

**Linux (Fedora/RHEL):**
```bash
sudo dnf install webkit2gtk4.1-devel gtk3-devel \
  libappindicator-gtk3-devel librsvg2-devel
```

**Linux (Arch):**
```bash
sudo pacman -S webkit2gtk-4.1 gtk3 libappindicator-gtk3 librsvg
```

---

## Budowanie

```bash
# Zainstaluj zależności npm (tylko raz)
npm install

# Zbuduj dla bieżącego systemu (1 komenda)
npm run build
```

### Opcjonalnie — build dla konkretnej platformy:

```bash
npm run build:win        # Windows x64  → .exe + NSIS installer
npm run build:mac        # macOS ARM    → .dmg (Apple Silicon)
npm run build:mac-intel  # macOS x64    → .dmg (Intel)
npm run build:linux      # Linux x64    → .AppImage + .deb
```

> **Cross-compilation:** Tauri nie wspiera cross-kompilacji.
> Żeby zbudować `.exe` musisz być na Windows, `.dmg` — na macOS, itd.
> W CI/CD (GitHub Actions) można budować dla wszystkich 3 platform równolegle.

---

## Wyniki buildu

```
src-tauri/target/release/bundle/
├── windows/
│   ├── Kalkulator JDG_1.0.0_x64-setup.exe   ← instalator NSIS
│   └── Kalkulator JDG_1.0.0_x64.msi         ← instalator MSI
├── macos/
│   └── Kalkulator JDG.dmg
└── linux/
    ├── kalkulator-jdg_1.0.0_amd64.AppImage
    └── kalkulator-jdg_1.0.0_amd64.deb
```

---

## Tryb deweloperski

```bash
npm run dev    # otwiera okno z hot-reload
```

---

## Struktura projektu

```
jdg-tauri/
├── src/
│   └── index.html          ← kalkulator (cały UI)
├── src-tauri/
│   ├── src/
│   │   ├── main.rs
│   │   └── lib.rs
│   ├── icons/              ← ikony dla wszystkich platform
│   ├── tauri.conf.json     ← konfiguracja okna i bundlera
│   ├── Cargo.toml
│   └── build.rs
├── package.json
└── README.md
```

---

## Dane ZUS 2026

- Podstawa wymiaru: 5 652 zł/mies.
- ZUS społeczny (bez chorobowej): 1 788,29 zł/mies.
- Minimalna składka zdrowotna: 432,54 zł/mies.
