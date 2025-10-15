import {contextBridge, ipcRenderer} from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
    submitInputBox: (value: string) => ipcRenderer.send('messagebox-submit', value)
})