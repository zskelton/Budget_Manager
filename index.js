const { app, BrowserWindow } = require('electron');
const path = require('path')

// Hot Reload Setup
try {
  require('electron-reloader')(module)
} catch (_) {}

// Set Window Preferences
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html');
}

// Create Window on App Ready
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})
