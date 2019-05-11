import React, { Component, lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { connect } from 'react-redux'

import Drawer from 'base/drawer/drawer'
import Loading from 'base/loading/loading'
import MmHeader from 'components/mm-header/mm-header'
import Player from 'components/player/player'
import Menu from 'components/menu/menu'

const Discover = lazy(() => import('pages/discover/discover'))
const Search = lazy(() => import('pages/search/search'))
const TopList = lazy(() => import('pages/toplist/toplist'))
const PlayList = lazy(() => import('pages/playlist/playlist'))
const SheetList = lazy(() => import('pages/sheetlist/sheetlist'))
const Skin = lazy(() => import('pages/skin/skin'))

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDrawer: false
    }
  }

  openDrawer = state => {
    this.setState({
      isDrawer: state
    })
  }

  render() {
    return (
      <Router>
        <Drawer
          className="App mm-wrapper"
          sidebar={Menu}
          isDrawer={this.state.isDrawer}
          onOpen={this.openDrawer}
        >
          <MmHeader onOpen={this.openDrawer} />
          <main className="mm-wrapper">
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route path="/discover" component={Discover} />
                <Route path="/search" component={Search} />
                <Route path="/toplist" component={TopList} />
                <Route path="/playlist/:id" component={PlayList} />
                <Route path="/sheetlist" component={SheetList} />
                <Route path="/skin" component={Skin} />
                <Redirect to="/discover" />
              </Switch>
            </Suspense>
          </main>
          {this.props.showPlayer && <Player />}
        </Drawer>
      </Router>
    )
  }
}

//映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
  showPlayer: state.showPlayer
})

export default connect(mapStateToProps)(App)
