import React from 'react'
import { connect } from 'react-redux'
import { changeSize, toggleGame } from '../../actions/actions'
import store from '../../store/store';
import './Menu.css'

const mapDispatchToProps = (dispatch) => {
	return {
		changeSize: size => dispatch(changeSize(size))
	}
} 

class Menu extends React.Component {
	constructor() {
		super()

		this.state = {
			sizeWidth: 4,
			sizeHeight: 3
		}

		this.widthChange = this.widthChange.bind(this)
		this.heightChange = this.heightChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	widthChange(e) {
		this.setState({ sizeWidth: parseInt(e.target.value) })
	}

	heightChange(e) {
		this.setState({ sizeHeight: parseInt(e.target.value) })
	}

	handleSubmit(e) {
		e.preventDefault();
		const { sizeWidth, sizeHeight } = this.state
		store.dispatch(changeSize(sizeWidth, sizeHeight))
		store.dispatch(toggleGame())
	}

	render() {
		return (
			<div id='menuContainer'>
				<h1>Memory Game</h1>
				<form onSubmit={this.handleSubmit}>
					<div>
						Height: {this.state.sizeWidth} <input type='range' min='4' max='8' onChange={this.widthChange} step='2' defaultValue='4' /><br /><br />
						Width: {this.state.sizeHeight} <input type='range' min='3' max='8' onChange={this.heightChange} defaultValue='3' /><br />
					</div>
					<button type='submit'>START</button>
				</form>
			</div>
		)
	}
}

export default connect(null, mapDispatchToProps)(Menu)