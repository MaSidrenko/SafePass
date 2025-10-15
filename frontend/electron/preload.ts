import { contextBridge } from "electron";
import { ipcRenderer } from "electron/renderer";

contextBridge.exposeInMainWorld('electronAPI', {
    showMessage: (msg: string) => ipcRenderer.send('show-message', msg),
    showInputBox: () => ipcRenderer.invoke('show-input-box'),
    submitInputBox: (value: string) => ipcRenderer.send('messagebox-submit', value),
});
