import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

import './mm-nav.scss'

// 页面导航栏组件

const MmNav = (props) => {
  const {title = '歌单', history} = props;
  return (
    <nav className="mm-nav">
      <div className="mm-nav-left" onClick={history.goBack} />
      <div className="mm-nav-title">{title}</div>
      <div className="mm-nav-right"/>
    </nav>
  )
};

MmNav.propTypes = {
  title: PropTypes.string //标题
};

export default withRouter(MmNav)
