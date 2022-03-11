const moment = require('moment');
let { ipcRenderer } = require('electron');
const { eventProvider } = require('../../constants');
const { timer_init } = eventProvider;

ipcRenderer.on(timer_init, (event) => {
  timerInterval = setInterval(() => {
    setTimerTexts();
  }, 1000);
});

function setTimerTexts() {
  let currentTime = moment(Date.now());
  p_hour.innerHTML = currentTime.format('HH');
  p_minute.innerHTML = currentTime.format('mm');
  p_colon.innerHTML = ':';
}
