const changeSize = (sizeWidth, sizeHeight) => ({
	type: 'CHANGE_SIZE',
	sizeWidth,
	sizeHeight
})

const toggleGame = () => ({
	type: 'TOGGLE_GAME'
})

const clickCard = (key) => ({
	type: 'CLICK_CARD',
	key
})

const clearClicked = () => ({
	type: 'CLEAR_CLICKED'
})

const declickCard = () => ({
	type: 'DECLICK_CARD'
})

export { changeSize, toggleGame, clickCard, clearClicked, declickCard } 