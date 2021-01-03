const { app, dialog, webContents, ipcMain, BrowserWindow, Menu, remote } = require('electron'), fs = require('fs');
let SavePath
const createAppMenu = () => {
    const hasfocusedWindow = BrowserWindow.getAllWindows().length
    const focusedWindow = BrowserWindow.getFocusedWindow()
    const template = [
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'selectall' }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
            ]
        },
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open File', async click(item, focusedWindow) {
                        await dialog.showOpenDialog({ properties: ['openFile'] }).then(async (data) => {
                            let datafile = fs.readFileSync(data.filePaths[0], { encoding: 'utf8' });
                            focusedWindow.webContents.send("open-file", datafile)
                            console.log(datafile)
                            focusedWindow.webContents.session.clearStorageData()

                        })
                    },
                    accelerator: process.platform == 'darwin' ? 'cmd+O' : 'Ctrl+O'
                },
                {
                    label: 'Save File', async click(item, focusedWindow) {
                        SavePath = dialog.showSaveDialogSync()
                        focusedWindow.webContents.send("save-file")
                        ipcMain.on("synSave", (event, data) => {
                            console.log(data)
                            fs.writeFileSync(SavePath, data)
                        });
                        focusedWindow.webContents.session.clearStorageData()

                    },
                    accelerator: process.platform == 'darwin' ? 'cmd+S' : 'Ctrl+S'
                },
                {
                    label: 'Exit', async click() {
                        app.quit()
                    },
                    accelerator: process.platform == 'darwin' ? 'cmd+Q' : 'Ctrl+Q'
                }

            ]
        }
    ]
    return Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}
module.exports = createAppMenu
