import React from 'react'

import './loading.scss'

// Loading组件

const Loading = (props) => {
  const {text} = props;
  return (
    <div className="loading-box">
      <div className="loading">
        <div>
          <span className="one"/>
          <span className="tow"/>
          <span className="one"/>
          <span className="tow"/>
        </div>
        <p>{text}</p>
      </div>
    </div>
  )
};

Loading.defaultProps = {
  text: '努力加载中...'
};

export default Loading
