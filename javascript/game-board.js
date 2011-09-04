/*
	The purpose of game-board.js is to randomize the tiles, validate tiles, and setup the HTML elements that make up the game board.
*/

function randomizeTiles() {
	for (var row = 0; row < puzzle.height; row++) { // for each row
		var randomRow = Array(); // setup a temporary array to hold a randomized set of answers for the row.
		block[row] = Array(); // setup an array to hold blocks.
		for (var column = 0; column < puzzle.width; column++) { // for each column
			block[row][column] = {
				answer : undefined,
				state : 'unsolvable', // set the block as unsolvable. state can also be set as solved and solvable.
				tile : Array() // setup an array to hold tiles which can be set as true, false, flagged-possible, or flagged-impossible.
			};
			for (var tile = 0; tile < puzzle.width; tile++) { // for each tile in a block
				block[row][column].tile[tile] = {
					bool : false, // set the tile as false. bool can also be set as true meaning the tile is the correct answer in a block.
					flag : 'possible' // set the tile as possible. flagged can also be set as impossible.
				};
			};
			var randomNumber = Math.floor(Math.random() * puzzle.width); // generate a random tile to be used as the answer for the block.
			if (randomRow.indexOf(randomNumber) != -1) { // if the tile has already been used as the answer in another block in the row...
				while (randomRow.indexOf(randomNumber) != -1) { // continue generating random tiles until an unused tile is generated.
					randomNumber = Math.floor(Math.random() * puzzle.width);
				};
			};
			randomRow[column] = randomNumber; // once a random tile has been generated, add the tile as an answer to the row.
			block[row][column].answer = randomNumber; // add the tile as the answer to the block.
			block[row][column].tile[randomNumber].bool = true; // and mark the tile as the answer in the block by setting it as true.
		};
	};
};

function validateTile(row, column, tile) {
	if (true == block[row][column].tile[tile].bool) {
		return true;
	}
	else {
		return false;
	};
};
			
function displayGameBoard() {
	document.write('<div class="board">');
	document.write('<span id="score">0</span>');
	for (var row = 0; row < puzzle.height; row++) {
		document.write('<div class="row">');
		for (var column = 0; column < puzzle.width; column++) {
			document.write('<div class="column">');
			document.write('<div class="padding">');
			for (var tile = 0; tile < puzzle.width; tile++) {
				document.write('<div id="' + row + column + tile + '" style="background-image:url(' + resources + 'row' + row + '/' + tile + '.jpg);" class="' + block[row][column].tile[tile].flagged + '"></div>');
				$("#" + row + column + tile).click(function(x, y, z) {
					return function() {
						userInput(x, y, z);
					};
				}(row, column, tile));
				$("#" + row + column + tile).rightClick( function(e) {
					if (this.hasClass("impossible") == true && this.hasClass("correct") != true) {
						$(this).removeClass("impossible");
						block[row][column].tile[tile].flag = 'impossible';
					}
					else if (this.hasClass("impossible") == false && this.hasClass("correct") != true) {
						$(this).addClass("impossible");
						block[row][column].tile[tile].flag = 'impossible';
					};
				});
			};
			document.write('</div>');
			document.write('</div>');
		};
		document.write('</div>');
	};
	document.write('</div>');
	document.write('<div class="horizontalClueArea"></div>');
	document.write('<div class="verticalClueArea"></div>');
};