const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('path');

function createWindow() {
    // 创建浏览器窗口，设置最小尺寸确保内容完整显示
    const mainWindow = new BrowserWindow({
        width: 450, // 适合内容的最小宽度
        height: 800, // 适合内容的最小高度
        minWidth: 450, // 设置最小宽度限制
        minHeight: 700, // 设置最小高度限制
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        },
        icon: path.join(__dirname, 'icon.png'), // 可选：应用图标
        resizable: true,
        show: false // 先不显示窗口，等准备好再显示
    });

    // 加载应用的index.html
    mainWindow.loadFile('enter.html');

    // 窗口准备好后显示，避免闪烁
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();

        // 开发时打开开发者工具（可选）
        // mainWindow.webContents.openDevTools();
    });
}

// 当Electron完成初始化并准备创建浏览器窗口时调用此方法
app.whenReady().then(() => {
    ipcMain.handle('ping', () => {
        return 'pong'
    })
    createWindow()
});

// 当所有窗口都关闭时退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});