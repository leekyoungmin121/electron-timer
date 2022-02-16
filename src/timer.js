const moment = require('moment');
const { ipcRenderer } = require('electron');
const { eventProvider } = require('../constants');
const { timer_init } = eventProvider;
require('./background.js');
ipcRenderer.on(timer_init.channel, (event) => {
  setTimerTexts();
});

function setTimerTexts() {
  let currentTime = moment(Date.now());
  p_hour.innerHTML = currentTime.format('hh');
  p_minute.innerHTML = currentTime.format('mm');
//   p_second.innerHTML = currentTime.format('ss');
  p_colon.innerHTML = ':';
}
