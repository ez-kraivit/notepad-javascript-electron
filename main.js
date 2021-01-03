const { app, BrowserWindow, Menu } = require('electron'), createAppMenu = require('./lib/menu'), url = require('url'), path = require('path')


app.on('ready', async () => {
    const win = new BrowserWindow({ width: 800, height: 600, backgroundColor: '#fff', webPreferences: { contextIsolation: false, nodeIntegration: true, enableRemoteModule: true } })
    createAppMenu()
    win.loadURL(url.format({
        pathname: path.join(__dirname, './view/index.html'),
        protocol: 'file:',
        slashes: true
    }))
    // win.webContents.openDevTools(); /* ช่วยในการแสดง console.log web */
    return this
})

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
      app.quit ();
    }
    return this
 });
 
