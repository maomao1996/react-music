import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import classNames from 'classnames'

import BaseSongList from 'base/songlist/songlist'
import BasePlayList from 'base/playlist/playlist'
import Loading from 'base/loading/loading'

import {search} from 'api'
import {HTTP_OK} from 'common/config'
import formatSongs from 'model/song'
import formatPlayList from 'model/playlist'

import './search-list.scss'

// 搜索列表组件

class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabData: [
        {
          title: '单曲',
          type: 1
        }, {
          title: '歌单',
          type: 1000
        }
      ], //Tab数据
      type: 1, //选中的type
      songs: [], //搜索的歌曲
      playlists: [], //搜索的歌单
      loading: true,
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.props.query) {
      this.setState({songs: [], playlists: [], loading: true});
      this.search(nextProps.query, this.state.type)
    }
  }
  
  shouldComponentUpdate(newProps, newState) {
    if (newProps.query && newState.type !== this.state.type) {
      this.search(newProps.query, newState.type)
    }
    return true
  }
  
  openPlayList(id) {
    this.props.history.push({pathname: `/playlist/${id}`})
  }
  
  //切换Tab
  toggleTab = (type) => {
    if (this.state.songs.length === 0 || this.state.playlists.length === 0) {
      this.setState({loading: true, type})
    } else {
      this.setState({type})
    }
  };
  
  // 搜索事件
  search = (query, type) => {
    search(query, type)
    .then(res => {
      if (res.data.code === HTTP_OK) {
        // console.log(res.data.result);
        setTimeout(() => {
          switch (type) {
            case 1:
              this.setState({
                loading: false,
                songs: formatSongs(res.data.result.songs)
              });
              return;
            case 1000:
              this.setState({
                loading: false,
                playlists: formatPlayList(res.data.result.playlists)
              });
              return;
            default:
          }
        }, 300)
      }
    })
  };
  
  render() {
    const {tabData, type, songs, playlists, loading} = this.state;
    const {query} = this.props;
    return (
      <div className={classNames('search-list', {'mm-none': !query})}>
        <ul className="search-list-tab">
          {
            tabData.map(item => (
              <li className={classNames('search-tab-item', {active: type === item.type})} onClick={() => {
                this.toggleTab(item.type)
              }} key={item.type}>
                <span>{item.title}</span>
              </li>
            ))
          }
        </ul>
        <div className="search-list-content">
          <div className={classNames('search-content-item', {active: type === 1})}>
            {
              loading ? <Loading/>
                : songs.length > 0 &&
                <BaseSongList list={songs} onItemClick={id => {}}/>
            }
          </div>
          <div className={classNames('search-content-item', {active: type === 1000})}>
            {
              loading ? <Loading/>
                : playlists.length > 0 &&
                <BasePlayList list={playlists} onItemClick={id => this.openPlayList(id)}/>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SearchList)
