import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import {searchHot} from 'api'
import {HTTP_OK} from 'common/config'

import './search.scss'

// 搜索页面

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      hots: []
    };
    searchHot().then(res => {
      if (res.data.code === HTTP_OK) {
        this.setState({
          hots: res.data.result.hots
        })
      }
    });
  }
  
  searchChange = (e) => {
    this.setState({
      value: e.target.value
    })
  };
  
  render() {
    const {value, hots} = this.state;
    const {history} = this.props;
    return (
      <div className='mm-wrapper search'>
        <nav className="search-head">
          <div className="search-head-left" onClick={history.goBack}/>
          <div className="search-head-box">
            <input className='search-head-input' type="text" placeholder='搜索你喜欢的' value={value} onChange={this.searchChange}/>
          </div>
        </nav>
        <div>
          <div className='search-hots'>
            <h1>热门搜索</h1>
            <ul>
              {
                hots.length > 0 && hots.map((itme, index) => {
                  return (
                    <li className='search-hots-item' key={index}>{itme.first}</li>
                  )
                })
              }
            
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Search)
