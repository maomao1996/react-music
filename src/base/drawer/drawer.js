import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './drawer.scss'

// 抽屉组件

const Drawer = props => {
  const { className, isDrawer, sidebar, children } = props
  const onClose = function closeDrawer() {
    props.onOpen(false)
  }

  return (
    <div className={classNames('drawer', { 'drawer-open': isDrawer })}>
      <div className={`drawer-content ${className}`}>{children}</div>
      <div className="drawer-sidebar" onClick={onClose}>
        {sidebar}
      </div>
      <div className="drawer-overlay" onClick={onClose} />
    </div>
  )
}

Drawer.propTypes = {
  children: PropTypes.node.isRequired, //主体内容
  isDrawer: PropTypes.bool.isRequired, //开启状态
  className: PropTypes.string, //主体内容class名
  sidebar: PropTypes.node.isRequired //抽屉里的内容
}

export default Drawer
