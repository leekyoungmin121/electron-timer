const { app, BrowserWindow, Menu, MenuItem } = require('electron');
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

  // 개발자도구 활성화
  win.webContents.openDevTools();

  win.loadFile(path.resolve(__dirname, 'src', 'index.html'));
  
  let timerInterval;
  win.webContents.on('did-finish-load', () => {
    const { timer_init, background_init } = eventProvider;
    timerInterval = setInterval(() => {
      win.webContents.send(timer_init.channel);
    }, 1000);

    win.webContents.send(background_init.channel);
    
  });
  app.on('ready' , () => {
    // menu
    const template = [];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  
    const ctxMenu = new Menu();
    ctxMenu.append(
      new MenuItem({
        label: 'hello',
      })
    );
  
    win.webContents.on('context-menu', (e, params) => {
      alert('asdf')
      ctxMenu.popup(win, params.x, params.y);
    });

  })

  win.webContents.on('destroyed', () => clearInterval(timerInterval));
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
