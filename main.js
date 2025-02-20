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

  // Récupérer les arguments en ligne de commande
  const args = process.argv.slice(2);
  //console.log("Arguments passés :", args);

  // Passer les arguments à Angular via l'URL
  const params = new URLSearchParams();
  args.forEach(arg => {
      const [key, value] = arg.split('=');
      params.append(key, value);
  });

  console.log("Arguments passés :", params);

  // Vérifier si nous sommes en mode développement
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    // En développement, charger depuis le serveur Angular
    mainWindow.loadURL(`http://localhost:4200?${params.toString()}`);
    mainWindow.webContents.openDevTools();
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
