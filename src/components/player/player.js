import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {CSSTransition} from 'react-transition-group'
import classNames from 'classnames'

import Cd from './cd/cd'

import './player.scss'

// Play组件

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFull: false,
      isPlay: false
    }
  }
  
  componentDidMount() {
    this.mmPlayer = ReactDOM.findDOMNode(this.refs.mmPlayer);
    this.audioEle = ReactDOM.findDOMNode(this.refs.audioEle);
  }
  
  // 播放暂停
  play = () => {
    if (this.state.isPlay) {
      // 暂停
      this.audioEle.pause();
      this.setState({
        isPlay: false
      })
    } else {
      // 播放
      this.audioEle.play();
      this.setState({
        isPlay: true
      })
    }
  };
  
  render() {
    const {isFull, isPlay} = this.state;
    return (
      <div className="player">
        <CSSTransition in={isFull} timeout={150} classNames="player-full"
                       onEnter={() => {
                         this.mmPlayer.style.display = 'block';
                       }}
                       onExited={() => {
                         this.mmPlayer.style.display = 'none';
                       }}>
          <div ref="mmPlayer" className="player-full">
            <div className="player-bg" style={{backgroundImage: `url(http://p1.music.126.net/LQ2iUKlZwqGMysGkeCR4ww==/27487790697969.jpg?param=200y200)`}}/>
            <div className="header">
              <span className="header-back" onClick={() => {
                this.setState({isFull: false})
              }}/>
              <h1>明天你好</h1>
              <h2>牛奶咖啡</h2>
            </div>
            <div className="middle">
              <Cd isPlay={isPlay}/>
            </div>
            <div className="footer">
              <div className="progress-wrapper"></div>
              <div className="btn-wrapper">
                {/*<div className="btn btn-mode mode-list"/>*/}
                <div className="btn btn-prev"/>
                <div className={classNames('btn btn-play', {'btn-pause': !isPlay})} onClick={this.play}/>
                <div className="btn btn-next"/>
                {/*<div className="btn btn-list"/>*/}
              </div>
            </div>
          </div>
        </CSSTransition>
        <div className="player-min" onClick={() => {
          this.setState({isFull: true})
        }}>
          我是播放器组件（等待制作中）
        </div>
        <audio ref="audioEle" src="https://music.163.com/song/media/outer/url?id=33756016.mp3" preload="auto" loop/>
      </div>
    )
  }
}

export default Player
