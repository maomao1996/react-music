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
  static propTypes = {
    options: PropTypes.object
  };
  
  static defaultProps = {
    options: {}
  };
  
  componentDidMount(){
    this.scrollWrapper = ReactDOM.findDOMNode(this.refs.scrollWrapper);
    if(!this.scroll){
      let options = Object.assign({},DEFAULT_OPTIONS,this.props.options);
      this.scroll = new BScroll(this.scrollWrapper,options)
    }
  }
  render() {
    return (
      <div className="scroll-wrapper" ref="scrollWrapper">
        {/*获取子组件*/}
        <div>{this.props.children}</div>
      </div>
    )
  }
}

export default Scroll
