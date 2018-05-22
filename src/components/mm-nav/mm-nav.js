import React from 'react'
import {withRouter} from 'react-router-dom'

import './mm-nav.scss'

// 页面导航栏组件

const MmNav = (props) => {
  const {title,history} = props;
  return (
    <nav className="mm-nav">
      <div className="mm-nav-left" onClick={history.goBack} />
      <div className="mm-nav-title">{title}</div>
      <div className="mm-nav-right"/>
    </nav>
  )
};

export default withRouter(MmNav)
