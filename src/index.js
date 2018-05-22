import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/index.scss';
import App from 'pages/App';
// import registerServiceWorker from './registerServiceWorker';

// if(document.querySelector("#appQd")){
//   setTimeout(()=>{
//     document.body.removeChild(document.querySelector("#appQd"))
//   },2000);
// }

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
