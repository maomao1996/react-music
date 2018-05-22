import React, {Component} from 'react'
import {withRouter} from "react-router-dom"

import Slide from 'base/slide/silde'
import Loading from 'base/loading/loading'

import {HTTP_OK} from 'common/config'
import {formatPlayCount} from 'common/util'

import {getBanner, getPersonalized} from 'api'

import './discover.scss'

// 推荐页面

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: [],// banner数组
      getDate: new Date().getDate(),// 当前日期
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
          personalized: res.data.result
        })
      }
    });
  }
  
  render() {
    const {banners, personalized, getDate} = this.state;
    return (
      <div className="discover mm-music">
        {
          personalized.length > 0 && banners.length > 0 ?
            <div className="Recommend">
              {this.state.banners && <div className="banner"><Slide ref="slide" data={this.state.banners}/></div>}
              <div className="menu">
                <div className="menu-item">
                  <div className="menu-icon fm"/>
                  <p>私人FM</p>
                </div>
                <div className="menu-item">
                  <div className="menu-icon daily" data-date={getDate}/>
                  <p>每日推荐</p>
                </div>
                <div className="menu-item">
                  <div className="menu-icon playlist"/>
                  <p>歌单</p>
                </div>
                <div className="menu-item">
                  <div className="menu-icon rank"/>
                  <p>排行榜</p>
                </div>
              </div>
              <div className="lcrlist">
                <h3 className="lcrlist-hd"><span>推荐歌单</span></h3>
                <ul className="lcrlist-bd">
                  {
                    personalized.length > 0 && personalized.map(item => {
                      return (
                        <li className="lcrlist-item" key={item.id}>
                          <div className="item-img">
                            <img width="100%" height="100%" src={`${item.picUrl}?param=200y200`} alt=""/>
                          </div>
                          <p className="item-title">{item.name.replace(/\s/g, ' ')}</p>
                          <span className="item-play">{formatPlayCount(item.playCount)}</span>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            : <Loading/>
        }
      </div>
    );
  }
}

export default withRouter(Discover)
