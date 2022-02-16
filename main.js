const { app, BrowserWindow } = require('electron');
const path = require('path');
const moment = require('moment');
const { eventProvider } = require('./constants');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // 노드 통합 활성화여부 (웹 페이지에서 node를 사용할 수 있게됨)
      contextIsolation: false,
    },
    resizable: true,
  });

  win.loadFile(path.resolve(__dirname, 'src', 'index.html'));

  let timerInterval;
  let backgroundInterval;
  win.webContents.on('did-finish-load', () => {
    const { timer_init, background_init } = eventProvider;
    timerInterval = setInterval(() => {
        win.webContents.send(timer_init.channel);
    }, 1000);

    win.webContents.send(background_init.channel)
  });

  win.webContents.on('destroyed', () => clearInterval(timerInterval))
};


app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
