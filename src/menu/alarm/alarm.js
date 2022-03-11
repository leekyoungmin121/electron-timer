// 알람컴포넌트.
// 사용자가 원하는 시간에 도달하면 알람발생.
// User Preferences 구현: https://www.youtube.com/watch?v=mWHBqBNxYSw
console.log('alarm render');
const { screen, ipcRenderer } = require('electron');
const { BrowserWindow } = require('@electron/remote');
const { eventProvider } = require('../../../constants');
const { alarm_init } = eventProvider;

let win;

// if (BrowserWindow.getAllWindows().length === 0) createWindow();
ipcRenderer.on(alarm_init, () => {
  console.log('alarm init!');
  let windowCount = BrowserWindow.getAllWindows().length;
  if (windowCount > 1) {
    return win.focus();
  }

  win = new BrowserWindow({
    width: 400,
    height: 200,
    autoHideMenuBar: true,
  });
});
