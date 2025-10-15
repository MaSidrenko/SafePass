document.addEventListener('DOMContentLoaded', ()=> {
    const input = document.getElementById('AdmPassID') as HTMLInputElement;
    const enter = document.getElementById('Enter') as HTMLButtonElement;

    enter.addEventListener('click', () => {
        const value = input.value.trim();
        // console.log("Working!!!" + value)
        window.electronAPI.submitInputBox(value);
    })
})