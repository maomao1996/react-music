import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from 'pages/App';
import store from './store'

import 'assets/css/index.scss';
// import registerServiceWorker from './registerServiceWorker';

// if(document.querySelector("#appQd")){
//   setTimeout(()=>{
//     document.body.removeChild(document.querySelector("#appQd"))
//   },2000);
// }

// 版权信息
const pkg = require('../package.json');
window.mmPlayer = window.mmplayer = `欢迎使用 茂茂听音乐!
当前版本为：V${pkg.version}
作者：茂茂
Github：https://github.com/maomao1996/react-music
歌曲来源于网易云音乐 (http://music.163.com)`;
console.info(`%c${window.mmPlayer}`, `color:blue`);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();
