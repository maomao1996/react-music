import React from 'react'

import './songlist.scss'

// 歌曲基础列表组件

const BaseSongList = (props) => {
  const {list, listType = 0} = props;
  return (
    <div className="song-wrapper">
      {
        list.length > 0 && list.map((item, index) => (
          <div className="song-item" key={item.id}>
            {
              listType === 1 ? <div className="song-item-num">{index + 1}</div> : null
            }
            <div className="song-item-info">
              <h2>{item.name}</h2>
              <p><span>{item.singer}</span>&nbsp;-&nbsp;{item.album}</p>
            </div>
            <div className="song-item-btn"/>
          </div>
        ))
      }
    </div>
  )
};

export default BaseSongList
