/* The Clue Engine */
// find a random, unsolvable tile
function randomUnsolvable() {
	var randomUnsolvable = Array();
	for (var rowNumber = 1; rowNumber <= puzzle.height; rowNumber++) {
		for (var columnNumber = 1; columnNumber <= puzzle.width; columnNumber++) {
			if (puzzle.row[rowNumber].column[columnNumber].solvable.bool == false) {
				randomUnsolvable.push([rowNumber, columnNumber]);
			};
		};
	};
	return randomUnsolvable[Math.floor(Math.random() * randomUnsolved.length)];
};

// use random unsolved tile in a random clue
function randomClue() {
	switch(Math.floor(Math.random() * 4)) {
		case 0:
			new betweenClue();
			break;
		case 1:
			new nearClue();
			break;
		case 2:
			new directionalClue();
			break;
		case 3:
			new verticalClue();
			break;
	};
};