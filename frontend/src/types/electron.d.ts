export {}

declare global {
    interface Window {
        electronAPI: {
            showMessage: (msg: string) => void;
        }
    }
}