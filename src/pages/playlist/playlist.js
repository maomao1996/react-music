import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import Loading from 'base/loading/loading'
import MmNav from 'components/mm-nav/mm-nav'
import BaseSongList from 'base/songlist/songlist'
import Scroll from 'base/scroll/scroll'

import {setAllPlay} from "store/actions"
import {getPlaylistDetail} from 'api'
import {HTTP_OK} from 'common/config'
import {formatPlayCount} from 'common/util'
import {createPlayListDetail} from 'model/playlist'

import './playlist.scss'

const defaultName = '歌单';

class PlayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},//歌单数据
      loading: true,//加载动画
      defaultName, //默认歌单名称
    }
  }
  
  componentDidMount() {
    // 获取歌单详情
    getPlaylistDetail(this.props.match.params.id)
    .then(res => {
      if (res.data.code === HTTP_OK) {
        // console.log(createPlayListDetail(res.data.result))
        this.setState({
          data: createPlayListDetail(res.data.result),
          loading: false
        });
      }
    })
  }
  
  onItemClick = (id, index) => {
    // console.log(id, index);
    // console.log(this.state.data.tracks[index]);
    this.props.setAllPlay({
      playList: this.state.data.tracks,
      currentIndex: index
    });
    // this.props.setShowPlayer(true);
    // this.props.setPlayList(this.state.data.tracks);
    // this.props.setCurrentIndex(index);
    // this.props.setCurrentMusic(this.state.data.tracks[index]);
  }
  
  render() {
    const {currentMusic} = this.props;
    const {defaultName, loading} = this.state;
    const {name, coverImgUrl, avatarUrl, nickname, playCount, tracks} = this.state.data;
    return (
      <div className="playlist mm-wrapper">
        <MmNav title={name ? name : defaultName} navType="fixed"/>
        {
          coverImgUrl && <div className="mm-blur mm-blur-min">
            <div
              className="mm-blur-bg"
              style={{backgroundImage: `url(${coverImgUrl}?param=100y100)`}}
            />
          </div>
        }
        {
          loading ? <Loading/>
            : <Scroll className="mm-content">
              <header className="playlist-header">
                <div className="mm-blur">
                  <div
                    className="mm-blur-bg"
                    style={{backgroundImage: `url(${coverImgUrl}?param=100y100)`}}
                  />
                </div>
                <div className="playlist-header-wrapper">
                  <div className="playlist-header-hd" data-play={formatPlayCount(playCount)}>
                    <img src={`${coverImgUrl}?param=100y100`} alt=""/>
                  </div>
                  <div className="playlist-header-bd">
                    <h1>{name}</h1>
                    <div className="playlist-header-user">
                      <img src={`${avatarUrl}?param=50y50`} alt=""/>
                      <span>{nickname}</span>
                    </div>
                  </div>
                </div>
              </header>
              {
                tracks && tracks.length > 0 &&
                <BaseSongList
                  showRank
                  list={tracks}
                  onItemClick={this.onItemClick}
                  activeId={currentMusic.id}
                />
              }
            </Scroll>
        }
      </div>
    )
  }
}

//映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
  showPlayer: state.showPlayer,
  currentMusic: state.currentMusic
});

//映射dispatch到props上
const mapDispatchToProps = dispatch => ({
  setAllPlay: status => {
    dispatch(setAllPlay(status))
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlayList))
