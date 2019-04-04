var Game = {
	letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
	selectedTiles: [],
	tile_ids: [],
	tilesFlipped: 0,
}

function newBoard() {
	var tileDiv = '';
	var numberOfTiles = prompt('Please enter an even number of tiles between 6 and 20. Otherwise the game will load 6 tiles');
	numberOfTiles = numberOfTiles >= 6 && numberOfTiles <= 20 && numberOfTiles % 2 == 0 ? numberOfTiles : 6;
	Game.tilesFlipped = 0;
	Game.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');		//[ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", … "Z" ]
    Game.letters.shuffle();										//[ "I", "N", "W", "Y", "M", "E", "X", "V", "S", "L", … "?" ]
    Game.letters = Game.letters.slice(0, numberOfTiles / 2);	//[ "I", "N", "W", "Y", "M", "E" ]
    Game.letters = Game.letters.concat(Game.letters);			//[ "I", "N", "W", "Y", "M", "E", "I", "N", "W", "Y", "M", "E" ]
    Game.letters.shuffle();										//[ "E", "N", "I", "W", "I", "W", "Y", "Y", "N", "M", "M", "E" ]

	for (var i = 0; i < numberOfTiles; i++) {
		tileDiv += '<div id="tile_'+i+'" onclick="flipTile(this,\''+Game.letters[i]+'\')"></div>';
		document.getElementById('memory_board').innerHTML = tileDiv;
	}
	//console.log("Cheat view "  + Game.letters); //Remove comment and open the console to cheat :) (for fast testing)
}

Array.prototype.shuffle = function() {
    var i = this.length, j, temp;

    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function flipTile(tile, letter) {
	if (tile.innerHTML == "" && Game.selectedTiles.length < 2) {
		tile.style.background = '#FFF';
		tile.innerHTML = letter;

		if (!Game.selectedTiles[0] || !Game.selectedTiles[1]) {
			Game.selectedTiles.push(letter);
			Game.tile_ids.push(tile.id);
		}

		if (Game.selectedTiles[0] && Game.selectedTiles[1])
			Game.selectedTiles[0] == Game.selectedTiles[1] ? (Game.tilesFlipped += 2, [Game.selectedTiles, Game.tile_ids] = [[],[]]) : setTimeout(unflipTiles, 700);

		if (Game.tilesFlipped == Game.letters.length) {
			alert("Board cleared... generating new board");
			document.getElementById('memory_board').innerHTML = "";
			newBoard();
		}
	}
}

function unflipTiles() {
    var tile_1 = document.getElementById(Game.tile_ids[0]);
    var tile_2 = document.getElementById(Game.tile_ids[1]);
    tile_1.style.background = tile_2.style.background = 'url(tile_bg.jpg) no-repeat';
    tile_1.innerHTML = tile_2.innerHTML = "";
    [Game.selectedTiles, Game.tile_ids] = [[],[]];
}