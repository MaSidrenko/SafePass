import { app, BrowserWindow, dialog } from "electron";
import path from "path";
import { ipcMain, ipcRenderer } from "electron";
import { register } from "module";
import { registrMessageBoxHandlers } from "./ipc/hellosheetHandlers";

function createWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const startUrl = "http://localhost:3000";
  win.loadURL(startUrl);

  //win.webContents.openDevTools();
  return win;
}

ipcMain.on("show-message", (event, msg: string) => {
  dialog.showMessageBox({
    type: "info",
    title: "Warning!",
    message: msg,
  });
});

app.whenReady().then(() => {
  const mainWindow = createWindow();

  //     dialog.showMessageBox(mainWindow, {
  //     type: 'info',
  //     title: 'Auticte',
  //     message: "Testing!!!",
  //     buttons: ['Close', 'Registr', 'Enter']
  //   });
  registrMessageBoxHandlers(mainWindow);
   mainWindow.webContents.once("did-finish-load", async () => {
    const result = await mainWindow.webContents.executeJavaScript(
        "window.electronAPI.showInputBox && window.electronAPI.showInputBox()"
    );
    console.log("User entered: ", result)
  })
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
