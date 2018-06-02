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

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();
