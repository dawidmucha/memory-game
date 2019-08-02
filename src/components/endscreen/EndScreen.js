import moment from 'moment'
import React from 'react'
import store from '../../store/store'
import { toggleGame } from '../../actions/actions'
import './EndScreen.css'

class EndScreen extends React.Component {
	render() {
		const init = store.getState().timer
		const now = moment()
		console.log(init, now)

		return (
			<div id='endscreen'>
				<h1>Congratulations</h1>
				<p>you finished in {now.diff(init, 'seconds', true)} seconds!</p>
				<button onClick={() => store.dispatch(toggleGame())}>NEW GAME</button>
			</div>
		)
	}
}

export default EndScreen