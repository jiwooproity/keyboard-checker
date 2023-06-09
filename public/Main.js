const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
    const win = new BrowserWindow({
        width: 1050,
        height: 625,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
        resizable: false,
        icon: path.join(__dirname, 'icons/256x256.png')
    });

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });

    win.loadURL(startUrl);
    win.removeMenu(true);
}

app.on('ready', createWindow);