import React from 'react'
import PropTypes from 'prop-types'

import {formatPlayCount} from 'common/util'

import './sheetlist.scss'

// 歌曲基础列表组件

const BaseSheetList = (props) => {
  const {list, onItemClick} = props;
  return (
    <div className="sheetlist-wrapper">
      {
        list.length > 0 && list.map(item => {
          return (
            <div className="sheetlist-item" onClick={() => onItemClick(item.id)} key={item.id}>
              <div className="sheetlist-img" data-play={formatPlayCount(item.playCount)}>
                <img width="100%" height="100%" src={`${item.coverImgUrl}?param=200y200`} alt=""/>
              </div>
              <p className="sheetlist-title">{item.name.replace(/\s/g, ' ')}</p>
            </div>
          )
        })
      }
    </div>
  )
};

BaseSheetList.propTypes = {
  list: PropTypes.any.isRequired,
  onItemClick: PropTypes.func.isRequired
};

export default BaseSheetList
