import React, {Component} from 'react'
import {Link} from "react-router-dom"

import Slide from 'base/slide/silde'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import BaseSheetList from 'base/sheetlist/sheetlist'

import {getBanner, getPersonalized} from 'api'
import {HTTP_OK} from 'common/config'
import {formatPlayListMin} from 'model/playlist'


import './discover.scss'

// 推荐页面

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: [],// banner数组
      // getDate: new Date().getDate(),// 当前日期
      personalized: [],// 推荐歌单
    }
  }
  
  componentDidMount() {
    // alert(window.navigator.userAgent)
    getBanner()
    .then(res => {
      if (res.data.code === HTTP_OK) {
        this.setState({
          banners: res.data.banners
        });
      }
    });
    getPersonalized()
    .then(res => {
      if (res.data.code === HTTP_OK) {
        this.setState({
          personalized: formatPlayListMin(res.data.result)
        })
      }
    });
  }
  
  render() {
    const {banners, personalized} = this.state;
    return (
      <div className="discover mm-music">
        {
          personalized.length > 0 && banners.length > 0 ?
            <Scroll className="Recommend" options={{bounce: false}}>
              {this.state.banners && <div className="banner"><Slide ref="slide" data={this.state.banners}/></div>}
              <div className="menu">
                {/*<div className="menu-item">*/}
                {/*<div className="menu-icon fm"/>*/}
                {/*<p>私人FM</p>*/}
                {/*</div>*/}
                {/*<div className="menu-item">*/}
                {/*<div className="menu-icon daily" data-date={getDate}/>*/}
                {/*<p>每日推荐</p>*/}
                {/*</div>*/}
                <Link className="menu-item" to="/sheetlist">
                  <div className="menu-icon playlist"/>
                  <p>歌单</p>
                </Link>
                <Link className="menu-item" to="/toplist">
                  <div className="menu-icon rank"/>
                  <p>排行榜</p>
                </Link>
              </div>
              <div className="lcrlist">
                <h3 className="lcrlist-hd" onClick={() => {
                  this.props.history.push('/sheetlist')
                }}><span>推荐歌单</span></h3>
                <BaseSheetList list={personalized} onItemClick={id => this.props.history.push(`/playlist/${id}`)}/>
              </div>
            </Scroll>
            : <Loading/>
        }
      </div>
    );
  }
}

export default Discover
