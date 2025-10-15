export {}

declare global {
    interface Window {
        electronAPI: {
            submitInputBox: (msg: string) => void;
        }
    }
}