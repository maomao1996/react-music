import React from 'react'
import PropTypes from 'prop-types'

import {formatPlayCount} from 'common/util'

import './playlist.scss'

// 歌单基础列表组件

const BasePlayList = (props) => {
  const {list, onItemClick} = props;
  return (
    <div className="playlist-wrapper">
      {
        list.length > 0 && list.map(item => (
          <div className="playlist-item" onClick={() => onItemClick(item.id)} key={item.id}>
            <div className="playlist-hd">
              <img src={`${item.coverImgUrl}?param=70y70`} alt=""/>
            </div>
            <div className="playlist-bd">
              <h2>{item.name}</h2>
              <p>{item.trackCount}首&nbsp;by {item.nickname}，&nbsp;播放{formatPlayCount(item.playCount)}次</p>
            </div>
          </div>
        ))
      }
    </div>
  )
};

BasePlayList.propTypes = {
  list: PropTypes.any.isRequired,
  onItemClick: PropTypes.func.isRequired
};

export default BasePlayList
