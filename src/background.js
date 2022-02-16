const { ipcRenderer } = require('electron');
const { eventProvider } = require('../constants');

const { background_init } = eventProvider;
ipcRenderer.on(background_init.channel, (event) => {
    $body.style.backgroundColor = window.getComputedStyle(div_background).backgroundColor;
    div_background.style.backgroundColor = generateRandomColor();
    div_background.classList.add('expand')
});

function generateRandomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}