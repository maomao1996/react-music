import React from 'react'
import classNames from 'classnames'
import './cd.scss'

// CD组件

const Cd = (props) => {
  const {isPlay} = props;
  return (
    <div className={classNames('player-cd', {'pause': !isPlay})}>
      <div className="needle"/>
      <div className="disc-box">
        <div className="disc"/>
        <img src="http://p1.music.126.net/LQ2iUKlZwqGMysGkeCR4ww==/27487790697969.jpg" alt="" width="100%" height="100%"/>
      </div>
    </div>
  )
};

export default Cd
