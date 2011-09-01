/*
	The purpose of game-board.js is to randomize the answers, validate answers, and setup the HTML elements that make up the game board.
*/

function randomizeAnswers() {
	for (var row = 0; row <= (puzzle.height - 1); row++) {
		block.answer[row] = Array(); // setup an array to hold random answers for each column in each row
		block.solvable[row] = Array(); // setup an array to hold solvable blocks for each column in each row
		for (var column = 0; column <= (puzzle.width - 1); column++) {
			var number = Math.floor(Math.random() * puzzle.width);
			block.solvable[row][column] = false; // set all blocks as not solvable.
			if (block.answer[row].indexOf(number) == -1) {
				block.answer[row][column] = number; // fill the column with a random answer between 0 and the puzzle width
			}
			else {
				while (block.answer[row].indexOf(number) != -1) {
					number = Math.floor(Math.random() * puzzle.width); // if the answer has already been used in the row, repeat until an unused answer is generated.
				};
				block.answer[row][column] = number;
			};
		};
	};
};

function validateAnswer(row, column, answer) {
	if (answer == block.answer[row][column]) {
		return true;
	}
	else {
		return false;
	};
};
			
function displayGameBoard() {
	document.write('<div class="board">');
	document.write('<span id="score">0</span>');
	for (var row = 0; row <= (puzzle.height - 1); row++) {
		document.write('<div class="row">');
		for (var column = 0; column <= (puzzle.width - 1); column++) {
			document.write('<div class="column">');
			document.write('<div class="padding">');
			for (var guess = 0; guess <= (puzzle.width - 1); guess++) {
				document.write('<div id="' + row + column + guess + '" style="background-image:url(' + resources + 'row' + row + '/' + guess + '.jpg);" class="guess"></div>');
				$("#" + row + column + guess).click(function(x, y, z) {
					return function() {
						userInput(x, y, z);
					};
				}(row, column, guess));
				$("#" + row + column + guess).rightClick( function(e) {
					if (this.hasClass("flagged") == true && this.hasClass("correct") != true) {
						$(this).removeClass("flagged");
					}
					else if (this.hasClass("flagged") == false && this.hasClass("correct") != true) {
						$(this).addClass("flagged");
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