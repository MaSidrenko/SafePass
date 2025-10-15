"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('AdmPassID');
    const enter = document.getElementById('Enter');
    enter.addEventListener('click', () => {
        const value = input.value.trim();
        // console.log("Working!!!" + value)
        window.electronAPI.submitInputBox(value);
    });
});
