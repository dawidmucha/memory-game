import React from 'react'
import store from './store/store'
import Menu from './components/menu/Menu'
import Game from './components/game/Game'
import EndScreen from './components/endscreen/EndScreen'
import { connect } from 'react-redux'
import './App.css'

const mapStateToProps = (state) => {
  return {
    game: state.screen
  }
}

// eslint-disable-next-line
const unsubscribe = store.subscribe(() => console.log(store.getState()))

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: ''
    }
  }

  render() {
    let game = store.getState().screen

    if(game === 'game') {
      return <div className='appContainer'><Game /></div>
    } else if(game === 'menu') {
      return <div className='appContainer'><Menu /></div>
    } else if(game === 'endscreen') {
      return <div className='appContainer'><EndScreen /></div>
    }
  }
}

export default connect(mapStateToProps)(App)
