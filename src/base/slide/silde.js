import React, {Component} from 'react'
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import BScroll from "better-scroll"

import Dot from './dot/dot'

import './slide.scss';

// 轮播组件

class Slide extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    interval: PropTypes.number,
    loop: PropTypes.bool,
    threshold: PropTypes.number,
    speed: PropTypes.number
  };
  
  static defaultProps = {
    interval: 4000,// 轮播间隔
    loop: true,// 是否循环
    autoPlay: true,// 是否自动切换
    threshold: 0.1,// 滚动到下一个的阈值
    speed: 400,// 动画速度
  };
  
  constructor(props) {
    super(props);
    this.state = {
      currentPageIndex: 0
    }
  }
  
  componentDidMount() {
    if (!this.slider) {
      this._initWdith();
      this._initSlide();
      if (this.props.autoPlay) {
        this._play()
      }
    }
  }
  
  componentWillUnmount() {
    this.slide && this.slide.destroy() //销毁 better-scroll
  }
  
  //重新计算 better-scroll
  refresh() {
    if (this.slide === null) {
      return false
    }
    this.slide && this.slide.refresh()
  }
  
  //初始化 better-scroll
  _initSlide() {
    const slideEle = ReactDOM.findDOMNode(this.refs.sildeWrapper);
    this.slide = new BScroll(slideEle, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: this.props.loop,
        threshold: this.props.threshold,
        speed: this.props.speed
      },
      bounce: !this.props.loop,
      stopPropagation: true
    });
    
    this.slide.goToPage(this.state.currentPageIndex, 0, 0);
    
    // 绑定滚动结束事件
    this.slide.on('scrollEnd', this._onScrollEnd);
    
    slideEle.removeEventListener('touchend', this._touchEndEvent, false);
    this._touchEndEvent = () => {
      if (this.props.autoPlay) {
        this._play()
      }
    };
    slideEle.addEventListener('touchend', this._touchEndEvent, false);
    
    // 绑定滚动开始前事件
    this.slide.on('beforeScrollStart', () => {
      if (this.props.autoPlay) {
        clearTimeout(this.timer)
      }
    })
  }
  
  //计算宽度
  _initWdith() {
    let slideWidth = ReactDOM.findDOMNode(this.refs.sildeWrapper).clientWidth;
    let sildeList = ReactDOM.findDOMNode(this.refs.sildeList);
    let width = 0;
    if (sildeList.children.length) {
      for (let i = 0; i < sildeList.children.length; i++) {
        let child = sildeList.children[i];
        child.style.width = `${slideWidth}px`;
        width += slideWidth
      }
    }
    if (this.props.loop && sildeList.children.length > 1) {
      width += 2 * slideWidth
    }
    ReactDOM.findDOMNode(this.refs.sildeList).style.width = `${width}px`
  }
  
  // 自动切换
  _play = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.slide && this.slide.next()
    }, this.props.interval)
  };
  
  //滚动结束事件
  _onScrollEnd = () => {
    let pageIndex = this.slide.getCurrentPage().pageX;
    this.setState({
      currentPageIndex: pageIndex
    });
    if (this.props.autoPlay) {
      this._play()
    }
  };
  
  render() {
    const {data} = this.props;
    return (
      <div className="silde-wrapper" ref="sildeWrapper">
        <div className="slide-group" ref="sildeList">
          {
            data && data.length > 0 && data.map((item, index) => <div
              className="slide-item"
              key={item.targetId + index}>
              <img src={item.picUrl} alt=""/>
            </div>)
          }
        </div>
        <Dot data={data} currentIndex={this.state.currentPageIndex}/>
      </div>
    );
  }
}

export default Slide;
