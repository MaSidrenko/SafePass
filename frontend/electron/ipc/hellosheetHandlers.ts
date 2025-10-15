import { BrowserWindow, ipcMain } from "electron";
import path from "path";

export function registrMessageBoxHandlers(parent: BrowserWindow) {
    ipcMain.handle('show-input-box', async () => {
        const modal = new BrowserWindow({
            parent,
            modal: true,
            width: 400,
            height: 200,
            frame: false,
            webPreferences: {
                preload: path.join(__dirname, '../ModalPreload.js'),
                contextIsolation: true,
                nodeIntegration: false
            },
        });
        await modal.loadFile(path.join(__dirname, '../HelloSheet/hellosheet.html'));

        return new Promise<string>((resolve) => {
            ipcMain.once('messagebox-submit', (event, value) =>{
                resolve(value);
                modal.close();
            });


            modal.on('closed', ()=> resolve(''));
        });
    });

}