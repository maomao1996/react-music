import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './songlist.scss'

// 歌曲基础列表组件

const BaseSongList = props => {
  const { list, showRank, onItemClick, activeId } = props
  return (
    <div className="song-wrapper">
      {list.length > 0 &&
        list.map((item, index) => (
          <div
            className={classNames('song-item', {
              active: item.id === activeId
            })}
            onClick={() => onItemClick(item.id, index)}
            key={item.id}
          >
            {showRank && <div className="song-num">{index + 1}</div>}
            <div className="song-info">
              <h2>{item.name}</h2>
              <p>
                <span>{item.singer}</span>&nbsp;-&nbsp;{item.album}
              </p>
            </div>
            <div className="song-btn" />
          </div>
        ))}
    </div>
  )
}

BaseSongList.propTypes = {
  list: PropTypes.any.isRequired,
  showRank: PropTypes.bool,
  onItemClick: PropTypes.func.isRequired,
  activeId: PropTypes.number || PropTypes.string
}

export default BaseSongList
