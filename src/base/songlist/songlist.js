import React from 'react'
import PropTypes from 'prop-types'

import './songlist.scss'

// 歌曲基础列表组件

const BaseSongList = (props) => {
  const {list, showRank, onItemClick} = props;
  return (
    <div className="song-wrapper">
      {
        list.length > 0 && list.map((item, index) => (
          <div className="song-item" onClick={() => onItemClick(item.id)} key={item.id}>
            {
              showRank && <div className="song-num">{index + 1}</div>
            }
            <div className="song-info">
              <h2>{item.name}</h2>
              <p><span>{item.singer}</span>&nbsp;-&nbsp;{item.album}</p>
            </div>
            <div className="song-btn"/>
          </div>
        ))
      }
    </div>
  )
};

BaseSongList.propTypes = {
  list: PropTypes.any.isRequired,
  showRank: PropTypes.bool,
  onItemClick: PropTypes.func.isRequired
};

export default BaseSongList
