/* The Clue Engine */
// find a random, unsolvable tile
function randomUnsolvable() {
	var randomUnsolvable = Array();
	puzzle.unsolvableTiles = 0;
	for (var rowNumber = 1; rowNumber <= puzzle.height; rowNumber++) {
		for (var columnNumber = 1; columnNumber <= puzzle.width; columnNumber++) {
			if (puzzle.row[rowNumber].column[columnNumber].solvable.bool == false) {
				puzzle.unsolvableTiles += 1;
				randomUnsolvable.push([rowNumber, columnNumber]);
			};
		};
	};
	if (randomUnsolvable.length == 0) {
		puzzle.unsolvableTiles = 0;
		puzzle.solvable = true;
		return "Negative Ghostrider, the pattern is full.";
	}
	else {
		return randomUnsolvable[Math.floor(Math.random() * randomUnsolvable.length)];
	};
};

function randomSolvable() {
	var randomUnsolvable = Array();
	puzzle.unsolvableTiles = 0;
	for (var rowNumber = 1; rowNumber <= puzzle.height; rowNumber++) {
		for (var columnNumber = 1; columnNumber <= puzzle.width; columnNumber++) {
			if (puzzle.row[rowNumber].column[columnNumber].solvable.bool == true) {
				puzzle.unsolvableTiles += 1;
				randomUnsolvable.push([rowNumber, columnNumber]);
			};
		};
	};
	if (randomUnsolvable.length == 0) {
		puzzle.unsolvableTiles = 0;
		puzzle.solvable = true;
		return "Negative Ghostrider, the pattern is full.";
	}
	else {
		return randomUnsolvable[Math.floor(Math.random() * randomUnsolvable.length)];
	};
};

// use random unsolvable tile in a random clue
function randomClue(unsolvableTile) {
	switch(Math.floor(Math.random() * 4)) {
		case 0:
			new generateDirectionalClue(unsolvableTile);
			break;
		case 1:
			new generateVerticalClue(unsolvableTile);
			break;
		case 2:
			new generateNearClue(unsolvableTile);
			break;
		case 3: 
			new generateBetweenClue(unsolvableTile);
			break;
	};
};

// generate clues until the number of unsolvabe tiles is 0
function generateClues() {
	while (puzzle.solvable == false) {
		var unsolvableTile = randomUnsolvable();
		if (unsolvableTile instanceof Array == true) {
			randomClue(unsolvableTile);
		};
		console.log(puzzle.unsolvableTiles);
	};
	for (var x = 0; x <= 5; x++) {
		var unsolvableTile = randomSolvable();
		if (unsolvableTile instanceof Array == true) {
			randomClue(unsolvableTile);
		};
	};
	
};

generateClues();