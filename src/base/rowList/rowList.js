import React from 'react'
import PropTypes from 'prop-types'

import { formatPlayCount } from 'common/util'

import './rowList.scss'

// 歌单基础列表组件——行

const RowList = props => {
  const { list, onItemClick } = props
  return (
    <div className="row-wrapper">
      {list.length > 0 &&
        list.map((item, index) => (
          <div
            className="row-item"
            onClick={() => onItemClick(item.id, index)}
            key={item.id}
          >
            <div className="row-hd">
              <img src={`${item.coverImgUrl}?param=70y70`} alt="" />
            </div>
            <div className="row-bd">
              <h2>{item.name}</h2>
              <p>
                {item.trackCount}首&nbsp;by {item.nickname}，&nbsp;播放
                {formatPlayCount(item.playCount)}次
              </p>
            </div>
          </div>
        ))}
    </div>
  )
}

RowList.propTypes = {
  list: PropTypes.any.isRequired,
  onItemClick: PropTypes.func.isRequired
}

export default RowList
