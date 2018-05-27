import React, {Component} from 'react'

import Loading from 'base/loading/loading'
import MmNav from 'components/mm-nav/mm-nav'
import Scroll from 'base/scroll/scroll'
import BaseSheetList from 'base/sheetlist/sheetlist'

import {getTopPlaylist} from 'api'
import {HTTP_OK} from 'common/config'
import formatPlayList from 'model/playlist'

import './sheetlist.scss'

class SheetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      options: {
        pullUpLoad: true,
        probeType: 2
      },
      page: 0,
      data: []
    }
  }
  
  componentDidMount() {
    this.setState({
      loading: true,
    });
    this._getTopPlaylist()
  }
  
  // 获取歌单
  _getTopPlaylist() {
    getTopPlaylist(this.state.page)
    .then(res => {
      if (res.data.code === HTTP_OK) {
        // console.log(res.data);
        const data = this.state.data, page = this.state.page + 1;
        this.setState({
          data: data.concat(formatPlayList(res.data.playlists)),
          loading: false,
          page
        })
      }
    })
  }
  
  // 上拉加载
  pullUpLoad = () => {
    // console.log('上拉');
    this.setState({
      loading: true,
    });
    this._getTopPlaylist()
  };
  
  render() {
    const {loading, options, data} = this.state;
    return (
      <div className="sheetlist mm-wrapper">
        <MmNav/>
        <Scroll className="mm-content" options={options} pullUpLoad={this.pullUpLoad}>
          <BaseSheetList list={data} onItemClick={id => this.props.history.push(`/playlist/${id}`)}/>
          <Loading show={loading}/>
        </Scroll>
      </div>
    )
  }
}

export default SheetList

