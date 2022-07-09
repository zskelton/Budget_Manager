const {app, BrowserWindow} = require('electron')
// const path = require('path')

// Keep a global reference of the window object
let mainWindow
function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL('http://localhost:3000/')
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// This method will be called when finished loading
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})