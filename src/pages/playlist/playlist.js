import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import Loading from 'base/loading/loading'
import MmNav from 'components/mm-nav/mm-nav'
import BaseSongList from 'base/songlist/songlist'
import Scroll from 'base/scroll/scroll'

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
      data: [],
      loading: true,
      defaultName
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
  
  render() {
    const {defaultName, loading} = this.state;
    const {name, coverImgUrl, avatarUrl, nickname, playCount, tracks} = this.state.data;
    return (
      <div className="playlist mm-wrapper">
        <MmNav title={name ? name : defaultName} navType="fixed"/>
        {
          coverImgUrl && <div className="mm-blur mm-blur-min">
            <div className="mm-blur-bg" style={{backgroundImage: `url(${coverImgUrl}?param=100y100)`}}/>
          </div>
        }
        {
          loading ? <Loading/>
            : <Scroll className="mm-content">
              <header className="playlist-header">
                <div className="mm-blur">
                  <div className="mm-blur-bg" style={{backgroundImage: `url(${coverImgUrl}?param=100y100)`}}/>
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
                tracks && tracks.length > 0 && <BaseSongList listType={1} list={tracks}/>
              }
            </Scroll>
        }
      </div>
    )
  }
}

export default withRouter(PlayList)
