//main process
const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;
const createWindow = () => {
    //Browser Window + Rennder proccess
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: "white",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true,
            worldSafeExecuteJavaScript: true,
            preload : path.join(__dirname,"proload.js")

        },
    })

    win.loadFile("index.html");
    isDev && win.webContents.openDevTools();
}

if (isDev) {
    require("electron-reload")(__dirname, {
        electron: path.join(__dirname, "node_modules", ".bin", "electron")
    })
}

app.whenReady().then(createWindow)

ipcMain.on("notify", (_, message) => {
    new Notification({ title: "Notification", body: message }).show();
})

ipcMain.on("app-quit", () => {
    app.quit();

})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


