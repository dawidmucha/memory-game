# code's a hot mess, but so am i

store:
	screen: menu/game
	sizeWidth: int
	sizeHeight: int
	gameState: 0/1/2/3/4 (0 - menu, 1 - game running, 2 - one tile up, 3 - two tiles up, 4 - game ended)
	timer: new Time()
	tile1: pic
	tile2: pic
	clearClicked: bool(temp true)

app
	menu/game

menu: it's just a form

game:
	field
		(12-64)x tile

how it check if it's a pair:
in tile component, onClick pushes to the store pic id of clicked component
and if gameState is in 2-tiles-up mode, it checks if tile1 === tile2
if yes, it passes function prop up to field component that re-renders tiles with correct shit i don't know it has to work