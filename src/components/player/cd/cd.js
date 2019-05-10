import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './cd.scss'

// CD组件

const Cd = props => {
  const { isPlay, image } = props
  return (
    <div className={classNames('player-cd', { pause: !isPlay })}>
      <div className="needle" />
      <div className="disc-box">
        <div className="disc" />
        <img src={`${image}?param=200y200`} alt="" width="100%" height="100%" />
      </div>
    </div>
  )
}

Cd.propTypes = {
  isPlay: PropTypes.bool.isRequired, // 播放状态
  image: PropTypes.string.isRequired // 当前音乐图片
}

export default Cd
