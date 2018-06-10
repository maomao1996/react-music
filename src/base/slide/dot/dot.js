import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './dot.scss'

// 分页器组件

const Dot = ({data, currentIndex}) => {
  return (
    <div className="dots">
      {
        data.length > 0 && data.map((item, index) => <span
          className={classNames('dot', {on: index === currentIndex})}
          key={index}/>)
      }
    </div>
  )
};

Dot.propTypes = {
  data: PropTypes.array.isRequired,
  currentIndex: PropTypes.number
};

export default Dot
