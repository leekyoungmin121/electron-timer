const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');
const moment = require('moment');
const { eventProvider } = require('./constants');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const { initialize, enable } = require('@electron/remote/main');
initialize(); // remote 모듈 초기화
const { timer_init, background_init, menu_init, menu_select, alarm_init } = eventProvider;
const util = require('./util');

// config setting
util.initSettings();

const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: true, // 노드 통합 활성화여부 (웹 페이지에서 node를 사용할 수 있게됨)
      contextIsolation: false,
    },
    resizable: true,
  });
  // remote 모듈 활성화
  enable(win.webContents);

  // 개발자도구 활성화
  win.webContents.openDevTools();

  win.loadFile(path.resolve(__dirname, 'src', 'index.html'));

  let timerInterval;
  win.webContents.on('did-finish-load', () => {
    win.webContents.send(timer_init);
    win.webContents.send(background_init);
    win.webContents.send(menu_init);
  });

  win.webContents.on('destroyed', () => clearInterval(timerInterval));
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// 메뉴선택
ipcMain.on(menu_select, (event, arg) => {
  switch (arg) {
    case 'alarm':
      event.sender.send(alarm_init);
      break;

    default:
      break;
  }
});
