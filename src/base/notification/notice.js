import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Notice extends Component {
  static propTypes = {
    duration: PropTypes.number, // 显示时间
    prefixCls: PropTypes.string, // 前缀class
    onClose: PropTypes.func // 回调函数
  }

  static defaultProps = {
    prefixCls: 'mm-toast',
    onClose() {},
    duration: 1500
  }

  componentDidMount() {
    this.startCloseTimer()
  }

  componentWillUnmount() {
    this.clearCloseTimer()
  }

  // 执行回调
  close = () => {
    this.clearCloseTimer()
    this.props.onClose()
  }

  // 设置定时器
  startCloseTimer = () => {
    if (this.props.duration) {
      this.closeTimer = setTimeout(() => {
        this.close()
      }, this.props.duration)
    }
  }

  // 清空定时器
  clearCloseTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer)
      this.closeTimer = null
    }
  }

  render() {
    const props = this.props
    return (
      <div className={`${props.prefixCls}-notice`}>
        <div className={`${props.prefixCls}-notice-content`}>
          {props.children}
        </div>
      </div>
    )
  }
}

export default Notice
