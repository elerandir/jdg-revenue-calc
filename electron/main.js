const { app, BrowserWindow, Menu, shell, nativeTheme } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 900,
    minWidth: 420,
    minHeight: 600,
    title: 'Kalkulator przychodów JDG',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#1a1a1a' : '#f0ede8',
    show: false,
  });

  win.loadFile(path.join(__dirname, 'src', 'index.html'));

  win.once('ready-to-show', () => win.show());

  // Open external links in default browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Simple menu
  const template = [
    {
      label: 'Plik',
      submenu: [
        {
          label: 'Odśwież',
          accelerator: 'CmdOrCtrl+R',
          click: () => win.reload(),
        },
        { type: 'separator' },
        {
          label: 'Zamknij',
          accelerator: 'Alt+F4',
          click: () => win.close(),
        },
      ],
    },
    {
      label: 'Widok',
      submenu: [
        { role: 'zoomIn',  label: 'Powiększ',   accelerator: 'CmdOrCtrl+=' },
        { role: 'zoomOut', label: 'Pomniejsz',  accelerator: 'CmdOrCtrl+-' },
        { role: 'resetZoom', label: 'Domyślny zoom', accelerator: 'CmdOrCtrl+0' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Pełny ekran' },
      ],
    },
    {
      label: 'Pomoc',
      submenu: [
        {
          label: 'O aplikacji',
          click: () => {
            const { dialog } = require('electron');
            dialog.showMessageBox(win, {
              type: 'info',
              title: 'O aplikacji',
              message: 'Kalkulator przychodów JDG',
              detail: 'Wersja 1.0.0\n\nSzacunek rocznych przychodów i obciążeń\ndla jednoosobowej działalności gospodarczej.\n\nDane ZUS 2026.',
              buttons: ['OK'],
            });
          },
        },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
