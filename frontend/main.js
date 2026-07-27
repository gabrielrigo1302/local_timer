const { app, BrowserWindow, ipcMain } = require('electron/main')
const fs = require('fs')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 900,
    height: 680,
    title: 'Timer Simples',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  const buildPath = path.join(__dirname, 'dist', 'index.html')
  const fallbackPath = path.join(__dirname, 'index.html')
  const entryPath = fs.existsSync(buildPath) ? buildPath : fallbackPath

  win.loadFile(entryPath)
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})