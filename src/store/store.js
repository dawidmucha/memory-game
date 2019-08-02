import { createStore } from 'redux'
import memoryGame from '../reducers/reducers'

const store = createStore(memoryGame, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store