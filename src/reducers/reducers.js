import moment from 'moment'

const initialState = {
	screen: 'menu',
	sizeWidth: undefined,
	sizeHeight: undefined,
	gameState: 0,
	timer: 0,
	tile1: undefined,
	tile2: undefined,
	clearClicked: false
}

const memoryGame = (state = initialState, action) => {
	switch(action.type) {
		case 'CHANGE_SIZE':
			return Object.assign({}, state, {
				sizeWidth: action.sizeWidth,
				sizeHeight: action.sizeHeight
			})

		case 'TOGGLE_GAME':
			if (state.screen === 'menu')  {
				return Object.assign({}, state, {
					screen: 'game',
					gameState: 1,
					timer: moment()
				})
			} else if(state.screen === 'game') {
				return Object.assign({}, state, {
					screen: 'endscreen',
					gameState: 0
				})
			} else if(state.screen === 'endscreen') {
				return Object.assign({}, state, {
					screen: 'menu',
					gameState: 0,
					timer: 0
				})
			}
			break

		case 'CLICK_CARD':
			if(state.gameState === 1) {
				return Object.assign({}, state, {
					gameState: state.gameState + 1,
					tile1: action.key
				})
			}	else if(state.gameState === 2) {
				return Object.assign({}, state, {
					gameState: state.gameState + 1,
					tile2: action.key
				})
			} else {
				return Object.assign({}, state, {
					gameState: 1
				})
			}

		case 'CLEAR_CLICKED':
			return Object.assign({}, state, {
				clearClicked: !state.clearclicked,
				tile1: undefined,
				tile2: undefined
			}) 

		case 'DECLICK_CARD':
			return Object.assign({}, state, {
				gameState: state.gameState - 2,
				tile1: undefined,
				tile2: undefined
			})
			
		default:
			return state
	}
}

export default memoryGame