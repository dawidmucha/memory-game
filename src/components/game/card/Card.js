import React from 'react'
import './Card.css'
import { clickCard, declickCard } from '../../../actions/actions'
import store from '../../../store/store';

class Card extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			active: false,
			pair: false,
			noCardClassHandler: ''
		}

		this.handleCardClick = this.handleCardClick.bind(this)
	}

	componentDidUpdate() {
		if(this.props.pair === true && this.state.pair === false) { // if pair was found
			this.setState({ 
				noCardClassHandler: 'noCard',
				pair: true
			})
		} else if(store.getState().clearClicked === true) { // if pair was not found
			this.props.clearClicked();
			store.getState().clearClicked = false;
		}
	}

	clearClicked() {
		if(this.state.noCardClassHandler === '') this.setState({active: false})
	}

	handleCardClick = () => {
		if(store.getState().gameState !== 3 && this.props.pair === false) {
			this.setState({ active: !this.state.active })
			console.log('about to dispatch this mofo')
			store.dispatch(clickCard(parseInt(this.props.id)))

			if(store.getState().gameState === 3 && !!store.getState().tile1 && !!store.getState().tile2) {
				if(store.getState().tile1 === store.getState().tile2) {
					console.log('you clicked the same card you dumbo') // you created new reducer for declicking a card. now you have to CLICK_CARD when different cards are clicked and DECLICK_CARD when the same one is cliced
					store.dispatch(declickCard(parseInt(this.props.id)))
				} else this.props.checkPair()
			}
		}
	}

	render() {
		return (
			<div className={this.state.active ? `Card face${[this.props.pic]} ${this.state.noCardClassHandler}` : `Card ${this.state.noCardClassHandler}` } onClick={this.handleCardClick}>
			</div>
		)
	}
}

export default Card