import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import './progress.scss'

// 进度条拖动组件

class Progress extends Component {
  static propTypes = {
    percent: PropTypes.number.isRequired,
    percentProgress: PropTypes.number,
    dragStart: PropTypes.func, // 拖拽开始事件
    dragMove: PropTypes.func, // 拖拽中事件
    dragEnd: PropTypes.func // 拖拽结束事件
  }

  constructor(props) {
    super(props)
    this.state = {
      offsetWidth: 0,
      status: false, // 是否可拖动
      startX: 0, // 记录最开始点击的X坐标
      left: 0 // 记录当前已经移动的距离
    }
  }

  componentDidMount() {
    this.mmProgress = ReactDOM.findDOMNode(this.refs.mmProgress)
    this.mmProgressInner = ReactDOM.findDOMNode(this.refs.mmProgressInner)
    this.bindEvents()
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.status && nextProps.percent !== this.props.percent) {
      this.setState({
        offsetWidth: this.mmProgress.clientWidth * nextProps.percent
      })
    }
  }

  componentWillUnmount() {
    this.unbindEvents()
  }

  //添加绑定事件
  bindEvents() {
    document.addEventListener('mousemove', this.barMove)
    document.addEventListener('mouseup', this.barUp)

    document.addEventListener('touchmove', this.barMove)
    document.addEventListener('touchend', this.barUp)
  }

  //移除绑定事件
  unbindEvents() {
    document.removeEventListener('mousemove', this.barMove)
    document.removeEventListener('mouseup', this.barUp)

    document.removeEventListener('touchmove', this.barMove)
    document.removeEventListener('touchend', this.barUp)
  }

  // 点击事件
  barClick = e => {
    let rect = this.mmProgress.getBoundingClientRect()
    let offsetWidth = Math.min(rect.width, Math.max(0, e.clientX - rect.left))
    this.setState({ offsetWidth })
    if (this.props.dragEnd) {
      this.props.dragEnd(offsetWidth / this.mmProgress.clientWidth)
    }
  }

  // 鼠标/触摸开始事件
  barDown = e => {
    this.setState({
      status: true,
      startX: e.clientX || e.touches[0].pageX,
      left: this.mmProgressInner.clientWidth
    })
    // console.log(e.nativeEvent)
    // console.log(this)
  }
  //鼠标/触摸移动事件
  barMove = e => {
    if (this.state.status) {
      let endX = e.clientX || e.touches[0].pageX,
        dist = endX - this.state.startX
      let offsetWidth = Math.min(
        this.mmProgress.clientWidth,
        Math.max(0, this.state.left + dist)
      )
      this.setState({ offsetWidth })
      // console.log(offsetWidth)
    }
  }

  //鼠标/触摸释放事件
  barUp = () => {
    // 避免打开Playing组件时触发
    if (this.state.status) {
      this.setState({
        status: false
      })
      if (this.props.dragEnd) {
        this.props.dragEnd(this.state.offsetWidth / this.mmProgress.clientWidth)
      }
    }
  }

  render() {
    const { offsetWidth } = this.state
    return (
      <div className="mmProgress" ref="mmProgress" onClick={this.barClick}>
        <div className="mmProgress-bar" />
        <div className="mmProgress-outer" ref="mmPercentProgress" />
        <div
          className="mmProgress-inner"
          ref="mmProgressInner"
          style={{ width: `${offsetWidth}px` }}
        >
          <div
            className="mmProgress-dot"
            onMouseDown={this.barDown}
            onTouchStart={this.barDown}
          />
        </div>
      </div>
    )
  }
}

export default Progress
