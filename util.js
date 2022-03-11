const {app} = require('electron')
const fs = require('fs');
const path = require('path');
// const configFilePath = path.join(`${__dirname}/electron-timer-config`);
const configFilePath = path.join(app.getPath('appData'), 'electron-timer', 'config');
const configFile = path.join('/','config.json');
// 설정 파일 생성
function makeConfigFile() {
  console.log('### make config file ###');

  try {
    let json = JSON.stringify({});
    fs.writeFileSync(configFilePath + configFile, json, { encoding: 'utf-8' });
  } catch (error) {
    console.log(error);

    // 폴더가 없을 경우 폴더부터 만들어준다.
    if (error.code && error.code === 'ENOENT') {
      console.log('### create config folder ###');
      fs.mkdirSync(configFilePath);
      makeConfigFile();
    }
  }
}

module.exports = {
  // 설정 파일 적용
  initSettings() {
    console.log('### read config file ###');

    try {
      let JSON = fs.readFileSync(configFilePath + configFile, { encoding: 'utf-8' });
      console.log(JSON);
    } catch (error) {
      // 파일이 없는경우 새로 만들어준다
      if (error.code && error.code === 'ENOENT') {
        makeConfigFile();
      }
    }
  },
};
