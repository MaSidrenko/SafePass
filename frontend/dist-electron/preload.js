"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const renderer_1 = require("electron/renderer");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    showMessage: (msg) => renderer_1.ipcRenderer.send('show-message', msg),
    showInputBox: () => renderer_1.ipcRenderer.invoke('show-input-box'),
    submitInputBox: (value) => renderer_1.ipcRenderer.send('messagebox-submit', value),
});
