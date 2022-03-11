let { ipcRenderer } = require('electron');
const { Menu, MenuItem } = require('@electron/remote');
const { eventProvider } = require('../../constants');
console.log('menu render');
const { menu_init, menu_select, alarm_init } = eventProvider;
require('./alarm/alarm');

ipcRenderer.on(menu_init, (event) => {
  console.log('menu init');

  contextMenuInit();
});

function contextMenuInit() {
  let menu = new Menu();
  menu.append(new MenuItem({ label: '알림지정' , click: alarm}));
  menu.append(new MenuItem({ label: 'test 메뉴' }));
  
  window.addEventListener('contextmenu', (e) => {
    console.log('e: ', menu);
    menu.popup({ callback: onMenuClose });
  });
}

function onMenuClose() {
  console.log('menu close');
}

function alarm() {
  console.log('menu_select: alarm')
  ipcRenderer.send(menu_select, 'alarm')
}