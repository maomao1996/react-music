import React from 'react'
import Notification from 'base/notification/notification'
import classNames from 'classnames'

import './toast.scss'

const ToastPrefixCls = 'mm-toast'
let newNotification

// 获得一个Notification
function getNewNotification(mask, callBack) {
  if (newNotification) {
    newNotification.destroy()
    newNotification = null
  }
  Notification.newInstance(
    {
      prefixCls: ToastPrefixCls,
      className: classNames({
        [`${ToastPrefixCls}-mask`]: mask,
        [`${ToastPrefixCls}-nomask`]: !mask
      })
    },
    notification => callBack && callBack(notification)
  )
}

// 配置Toast
function notice(content, duration, mask, onClose) {
  getNewNotification(mask, notification => {
    newNotification = notification
    notification.notice({
      duration, // 显示时长
      mask, // 遮罩
      content: (
        <div
          className={`${ToastPrefixCls}-info`}
          role="alert"
          aria-live="assertive"
        >
          <div>{content}</div>
        </div>
      ), // 内容
      onClose() {
        onClose && onClose() // 回调方法
        notification.destroy()
        notification = null
        newNotification = null
      } // 移除
    })
  })
}

export default {
  // 显示
  show(content, duration, mask, onClose) {
    return notice(content, duration, mask, onClose)
  }
}
