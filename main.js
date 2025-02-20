const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  //mainWindow.loadURL('http://localhost:4200'); // URL du serveur Angular
  //mainWindow.loadFile('dist/electron-angular-app/browser/index.html');
  // Vérifier si nous sommes en mode développement
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    // En développement, charger depuis le serveur Angular
    mainWindow.loadURL('http://localhost:4200');
   //mainWindow.webContents.openDevTools();
  } else {
    // En production, charger le fichier buildé
    mainWindow.loadFile('dist/electron-angular-app-2/browser/index.html');
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
