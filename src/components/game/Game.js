import moment from 'moment';
import React from 'react'
import store from '../../store/store'
import Card from './card/Card'
import { clickCard, toggleGame } from '../../actions/actions'
import './Game.css'

class Game extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			sizeWidth: store.getState().sizeWidth || 3,
			sizeHeight: store.getState().sizeHeight || 4,
			outcome: [],
			cards: []
		}
	}

	componentDidMount() {
		const noEls = this.state.sizeWidth * this.state.sizeHeight // number of elements
		const noPics = noEls / 2 // number of pictures
		let a = this.state.outcome.slice(); // creates clone of state
		
		for(let i = 0.5; i <= noPics; i += 0.5) {
			let rand = Math.ceil(Math.random() * a.length)
			a.splice(rand, 0, Math.ceil(i))
		}

		this.setState({outcome: a})

		let formula
	
		for(let w = 0; w < this.state.sizeWidth; w++) {
			for(let h = 1; h <= this.state.sizeHeight; h++) { // eslint-disable-next-line
				this.setState(state => {
					formula = state.sizeHeight * w + h
					return {
						cards: [...state.cards, <Card ref={React.createRef()} key={`${formula}`} id={`${formula}`} pic={state.outcome[formula-1]} checkPair={this.checkPair.bind(this)} clearClicked={this.clearClicked.bind(this)} pair={false} />]
					}
				})
			}
		}
	}

	componentDidUpdate() {
		const fieldSize = store.getState().sizeWidth * store.getState().sizeHeight
		const count = this.state.cards.filter(card => {
			return card.props.pair === true
		})

		if(count.length === fieldSize) { // if game is finished
			const init = store.getState().timer
			const now = moment()
			console.log('finished in ', now.diff(init, 'seconds', true), 's!')
			store.dispatch(toggleGame())
		}
	}

	clearClicked = () => {
		this.state.cards.map(card => {
			return card.ref.current.clearClicked()
		})
		// store.getState().clearClied = false
	}

	checkPair = () => {
		const tile1 = store.getState().tile1
		const tile2 = store.getState().tile2
		if(this.state.cards[tile1-1].props.pic === this.state.cards[tile2-1].props.pic) { // if there's a pair
			setTimeout(() => {
				this.setState(state => {
					return state.cards[tile1-1] = <Card ref={React.createRef()} key={state.cards[tile1-1].props.id} id={state.cards[tile1-1].props.id} pic={state.cards[tile1-1].props.pic} checkPair={this.checkPair.bind(this)} clearClicked={this.clearClicked.bind(this)} pair={true} />
				})
				this.setState(state => {
					return state.cards[tile2-1] = <Card ref={React.createRef()} key={state.cards[tile2-1].props.id} id={state.cards[tile2-1].props.id} pic={state.cards[tile2-1].props.pic} checkPair={this.checkPair.bind(this)} clearClicked={this.clearClicked.bind(this)} pair={true} />
				})
				store.dispatch(clickCard())
			}, 250)	
		} else { // if there's no pair
			store.dispatch(clickCard())
			setTimeout(() => {
				this.clearClicked()
				// store.dispatch(clearClicked())
			}, 250)
		}
	}

	render() {
		let cardRender = []
		for(let w = 0; w < this.state.sizeWidth; w++) {
			for(let h = 1; h <= this.state.sizeHeight; h++) {
				cardRender.push(this.state.cards[(this.state.sizeHeight * w + h) - 1])
			}
			cardRender.push(<br key={`br${w}`} />)
		}
		
		return (
			<div id='cards'>
				{cardRender}
			</div>
		)
	}
}

export default Game