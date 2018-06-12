import React, {Component} from 'react'
import ReactDOM from 'react-dom'
// import {CSSTransition} from 'react-transition-group'
import classNames from 'classnames'
import {connect} from 'react-redux'

import Cd from './cd/cd'
import MusicList from './music-list/music-list'
import Progress from 'base/progress/progress'

import {setShowPlayer, setCurrentMusic, setCurrentIndex, setPlayList} from "store/actions"
import {formatTime} from 'common/util'

import './player.scss'

// Play组件

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFull: false, // 是否全屏显示Player
      isPlay: false, // 是否播放
      showMusicList: false, // 是否显示播放列表
      currentTime: 0, // 当前播放时间
      currentMusic: {
        id: 368727,
        name: "明天，你好",
        singer: "牛奶咖啡",
        album: "Lost & Found 去寻找",
        image: "http://p1.music.126.net/LQ2iUKlZwqGMysGkeCR4ww==/27487790697969.jpg",
        duration: 271,
        url: "https://music.163.com/song/media/outer/url?id=368727.mp3"
      }
    }
  }
  
  componentDidMount() {
    this.mmPlayer = ReactDOM.findDOMNode(this.refs.mmPlayer);
    this.audioEle = ReactDOM.findDOMNode(this.refs.audioEle);
    this.audioEle.load();
    this.bindEvents()
  }
  
  componentWillUnmount() {
    this.unbindEvents()
  }
  
  //添加绑定事件
  bindEvents() {
    this.audioEle.addEventListener('canplay', this.readyPlay);
    this.audioEle.addEventListener('ended', this.next);
    this.audioEle.addEventListener('timeupdate', this.timeUpdate)
  }
  
  //移除绑定事件
  unbindEvents() {
    this.audioEle.removeEventListener('canplay', this.readyPlay);
    this.audioEle.removeEventListener('ended', this.next);
    this.audioEle.removeEventListener('timeupdate', this.timeUpdate)
  }
  
  // 开始播放事件
  readyPlay = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.audioEle.play();
      this.setState({
        isPlay: true
      })
    }, 0)
  };
  
  // 播放时间改变
  timeUpdate = () => {
    this.setState({
      currentTime: this.audioEle.currentTime
    });
  };
  
  // 上一曲
  prev = () => {
    let index = this.props.currentIndex - 1;
    if (index < 0) {
      index = this.props.playList.length - 1
    }
    this.props.setCurrentMusic(this.props.playList[index]);
    this.props.setCurrentIndex(index)
  };
  
  // 播放暂停
  play = e => {
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
    e.stopPropagation()
  };
  
  // 下一曲
  next = () => {
    let index = this.props.currentIndex + 1;
    if (index === this.props.playList.length) {
      index = 0
    }
    this.props.setCurrentMusic(this.props.playList[index]);
    this.props.setCurrentIndex(index)
  };
  
  // 进度条改变
  progressEnd = value => {
    this.audioEle.currentTime = value * this.props.currentMusic.duration;
  };
  
  // 切换播放列表显示
  toggleShow = (e, showMusicList = true) => {
    this.setState({showMusicList});
    e.stopPropagation();
  };
  
  // 选中播放事件
  selectPlay = (id, index) => {
    if (id !== this.props.currentMusic.id) {
      this.props.setCurrentMusic(this.props.playList[index]);
      this.props.setCurrentIndex(index)
    }
  };
  
  // 删除事件
  deleteClick = (id, index) => {
    let list = [...this.props.playList], currentIndex = this.props.currentIndex;
    list.splice(index, 1);
    // 当播放列表没有歌曲时
    if (list.length === 0) {
      this.props.setShowPlayer(false)
    }
    // 当删除索引小于播放索引时
    if (index < this.props.currentIndex || list.length === this.props.currentIndex) {
      currentIndex--;
      this.props.setCurrentIndex(currentIndex);
    }
    this.props.setCurrentMusic(list[currentIndex] || {});
    this.props.setPlayList(list);
  };
  
  render() {
    const {isFull, isPlay, showMusicList, currentTime} = this.state;
    const {currentMusic, playList} = this.props;
    return (
      <div className="player">
        {/*<CSSTransition in={isFull} timeout={150} classNames="player-full"*/}
        {/*onEnter={() => {*/}
        {/*this.mmPlayer.style.display = 'block';*/}
        {/*}}*/}
        {/*onExited={() => {*/}
        {/*this.mmPlayer.style.display = 'none';*/}
        {/*}}>*/}
        <div ref="mmPlayer" className="player-full" style={{display: isFull ? 'block' : 'none'}}>
          <div className="player-bg"
               style={{backgroundImage: `url(${currentMusic.image}?param=200y200)`}}/>
          <div className="header">
              <span className="header-back" onClick={() => {
                this.setState({isFull: false})
              }}/>
            <h1>{currentMusic.name}</h1>
            <h2>{currentMusic.singer}</h2>
          </div>
          <div className="middle">
            <Cd isPlay={isPlay} image={currentMusic.image}/>
          </div>
          <div className="footer">
            <div className="progress-wrapper">
              <span className="progress-time progress-time-l">{formatTime(currentTime)}</span>
              <Progress percent={currentTime / currentMusic.duration} dragEnd={this.progressEnd}/>
              <span className="progress-time progress-time-r">{formatTime(currentMusic.duration)}</span>
            </div>
            <div className="btn-wrapper">
              {/*<div className="btn btn-mode mode-list"/>*/}
              <div className="btn btn-prev" onClick={this.prev}/>
              <div className={classNames('btn btn-play', {'btn-pause': !isPlay})} onClick={this.play}/>
              <div className="btn btn-next" onClick={this.next}/>
              <div className="btn btn-list" onClick={this.toggleShow}/>
            </div>
          </div>
        </div>
        {/*</CSSTransition>*/}
        <div className="player-min" onClick={() => this.setState({isFull: true})}>
          <div className="player-min-img">
            <img src={`${currentMusic.image}?param=100y100`} alt="" width="100%" height="100%"/>
          </div>
          <div className="player-min-info">
            <h2>{currentMusic.name}</h2>
            <p>{currentMusic.singer}</p>
          </div>
          <div className={classNames('player-min-play', {'pause': !isPlay})} onClick={this.play}/>
          <div className="player-min-list" onClick={this.toggleShow}/>
        </div>
        <audio ref="audioEle" src={`https://music.163.com/song/media/outer/url?id=${currentMusic.id}.mp3`}/>
        <MusicList
          show={showMusicList}
          onMaskClick={this.toggleShow}
          list={playList}
          music={currentMusic}
          onItemClick={this.selectPlay}
          deleteClick={this.deleteClick}
        />
      </div>
    )
  }
}

//映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
  currentMusic: state.currentMusic,
  currentIndex: state.currentIndex,
  playList: state.playList
});
//映射dispatch到props上
const mapDispatchToProps = dispatch => ({
  setShowPlayer: status => {
    dispatch(setShowPlayer(status));
  },
  setCurrentMusic: status => {
    dispatch(setCurrentMusic(status));
  },
  setCurrentIndex: status => {
    dispatch(setCurrentIndex(status));
  },
  setPlayList: status => {
    dispatch(setPlayList(status));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Player)
