"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrMessageBoxHandlers = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
function registrMessageBoxHandlers(parent) {
    electron_1.ipcMain.handle('show-input-box', async () => {
        const modal = new electron_1.BrowserWindow({
            parent,
            modal: true,
            width: 400,
            height: 200,
            frame: false,
            webPreferences: {
                preload: path_1.default.join(__dirname, '../ModalPreload.js'),
                contextIsolation: true,
                nodeIntegration: false
            },
        });
        await modal.loadFile(path_1.default.join(process.cwd(), './electron/HelloSheet/hellosheet.html'));
        return new Promise((resolve) => {
            electron_1.ipcMain.once('messagebox-submit', (event, value) => {
                resolve(value);
                modal.close();
            });
            modal.on('closed', () => resolve(''));
        });
    });
}
exports.registrMessageBoxHandlers = registrMessageBoxHandlers;
