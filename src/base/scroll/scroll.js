import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import './scroll.css'

const DEFAULT_OPTIONS = {
  observeDOM: true,
  click: true,
  probeType: 1,
  scrollbar: false,
  pullDownRefresh: false,
  pullUpLoad: false
};

class Scroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPullingDown: false,// 是否锁定下拉事件
      isPullUpLoad: false,// 是否锁定上拉事件
    }
  }
  
  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.object,
    refreshDelay: PropTypes.number,
    pullUpLoad: PropTypes.func
  };
  
  static defaultProps = {
    options: {},
    refreshDelay: 20
  };
  
  componentDidMount() {
    this.initScroll()
  }
  
  componentDidUpdate() {
    this.scroll && this.refresh()
  }
  
  componentWillUnmount() {
    this.scroll.destroy();
    if (this.props.options.pullDownRefresh) {
      this.scroll.off('pullingDown', this.onPullingDown)
    }
    if (this.props.options.pullUpLoad) {
      this.scroll.off('pullingUp', this.onPullingUp)
    }
  }
  
  // 初始化
  initScroll() {
    this.scrollWrapper = ReactDOM.findDOMNode(this.refs.scrollWrapper);
    if (!this.scroll) {
      let options = Object.assign({}, DEFAULT_OPTIONS, this.props.options);
      this.scroll = new BScroll(this.scrollWrapper, options)
    }
    if (this.props.options.pullDownRefresh) {
      this.scroll.on('pullingDown', this.onPullingDown)
    }
    if (this.props.options.pullUpLoad) {
      this.scroll.on('pullingUp', this.onPullingUp)
    }
  }
  
  // 重新计算
  refresh() {
    setTimeout(() => {
      this.forceUpdate(true)
    }, this.props.refreshDelay)
  }
  
  // 下拉刷新
  onPullingDown = () => {
    // this.setState({
    //   isPullingDown: true
    // });
    // this.props.pullDownRefresh()
  };
  
  // 上拉加载
  onPullingUp = () => {
    this.setState({
      isPullUpLoad: true
    });
    this.props.pullUpLoad();
  };
  
  // 数据更新
  forceUpdate(dirty = false) {
    if (this.props.options.pullDownRefresh && this.state.isPullingDown) {
      this.setState({
        isPullingDown: false
      })
    } else if (this.props.options.pullUpLoad && this.state.isPullUpLoad) {
      this.setState({
        isPullUpLoad: false
      });
      this.scroll.finishPullUp();
      dirty && this.scroll.refresh()
    } else {
      dirty && this.scroll.refresh()
    }
  }
  
  render() {
    const {className = ''} = this.props;
    return (
      <div className={`scroll-wrapper ${className}`} ref="scrollWrapper">
        {/*获取子组件*/}
        <div>{this.props.children}</div>
      </div>
    )
  }
}

export default Scroll
