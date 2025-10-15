"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const electron_2 = require("electron");
const hellosheetHandlers_1 = require("./ipc/hellosheetHandlers");
function createWindow() {
    const win = new electron_1.BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            preload: path_1.default.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    const startUrl = "http://localhost:3000";
    win.loadURL(startUrl);
    //win.webContents.openDevTools();
    return win;
}
electron_2.ipcMain.on("show-message", (event, msg) => {
    electron_1.dialog.showMessageBox({
        type: "info",
        title: "Warning!",
        message: msg,
    });
});
electron_1.app.whenReady().then(() => {
    const mainWindow = createWindow();
    //     dialog.showMessageBox(mainWindow, {
    //     type: 'info',
    //     title: 'Auticte',
    //     message: "Testing!!!",
    //     buttons: ['Close', 'Registr', 'Enter']
    //   });
    (0, hellosheetHandlers_1.registrMessageBoxHandlers)(mainWindow);
    mainWindow.webContents.once("did-finish-load", async () => {
        const result = await mainWindow.webContents.executeJavaScript("window.electronAPI.showInputBox && window.electronAPI.showInputBox()");
        console.log("User entered: ", result);
    });
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
