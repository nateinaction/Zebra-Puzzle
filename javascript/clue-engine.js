/* The Clue Engine */
// find a random, unsolvable tile
function randomUnreferenced() {
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

var goal = puzzle.width * puzzle.height,
		whosReferenced = Array();

function addReferences(numberReferenced) {
	// if the number of referenced tiles is 0
	if (whosReferenced.length == 0) {
		// add the references from row 1 column 1 and recurse to find more references
		for (var x = 0, max = puzzle.row[1].column[1].referencedBy.length; x < max; x++) {
			whosReferenced.push(puzzle.row[1].column[1].referencedBy[x]);
		};
		addReferences(0);
	}
	// else if the number of references is greater than 0
	else {
		console.log(whosReferenced.length);
		// for all the added referenced tiles since last run
		for (var n = whosReferenced.length - numberReferenced - 1, max = whosReferenced.length; n < max; n++) {
			console.log(whosReferenced);
			var rowNumber = whosReferenced[n][0], columnNumber = whosReferenced[n][1];
			// for references of tile
			for (var y = 0, ymax = puzzle.row[rowNumber].column[columnNumber].referencedBy.length; y < ymax; y++) {
				console.log(puzzle.row[rowNumber].column[columnNumber].referencedBy.length + ' referencedBy length');
				// check to see if reference is a duplicate
				var tempArray = JSON.stringify(puzzle.row[rowNumber].column[columnNumber].referencedBy[y]), repeat = false;
				console.log(puzzle.row[rowNumber].column[columnNumber].referencedBy + ' referencedBy y');
				for (var x = 0; x < max; x++) {
					if (tempArray == JSON.stringify(whosReferenced[x])){
						repeat = true;
					};
				};
				if (repeat == false) {
					// add non-repeated reference
					whosReferenced.push(puzzle.row[whosReferenced[n][0]].column[whosReferenced[n][1]].referencedBy[y]);
					// if the number referenced equals the goal, the puzzle is solvable
					if (whosReferenced.length == goal) {
						// celebrate! the puzzle is now solvable
						puzzle.solvable = true;
					}
					// if the number referenced is greater than it was in this run, recurse to find more references
					else if (whosReferenced.length > numberReferenced) {
						console.log(whosReferenced.length + " whosReferenced vs numberReferenced " + numberReferenced);
//						addReferences(whosReferenced.length);
					}
					// if number referenced has not changed or something weird happened it would be appropriate to generate another clue
					else {
						// don't celebrate
					};
				};
			};
		};
	};
};

/*function generateClues(runTime) {
	if (typeof runTime == 'undefined' ) runTime = 1;
	var leastReferenced = Array();
	for (var rowNumber = 1; rowNumber <= puzzle.height; rowNumber++) {
		for (var columnNumber = 1; columnNumber <= puzzle.width; columnNumber++) {
			if (puzzle.row[rowNumber].column[columnNumber].referencedBy.length < runTime) {
				leastReferenced.push([rowNumber, columnNumber]);
				console.log("leastReferenced");
			};
		};
	};
	// if every tile has been referenced at least once, check to see if the puzzle is solvable
	if (runTime > 1 && puzzle.solvable != true) {
		console.log("addReferences");
		addReferences(0);
	};
	
	if (leastReferenced.length == 0 && puzzle.solvable != true) {
		console.log("runtime");
		generateClues(++runTime);
	}
	else if (puzzle.solvable != true) {
		console.log("clue");
		randomClue(leastReferenced[Math.floor(Math.random() * leastReferenced.length)]);
		generateClues(runTime);
	}
	else {
		console.log("Negative Ghostrider, the pattern is full.");
	};
}; */

// use random unsolvable tile in a random clue
function randomClue(referencedTile) {
	switch(Math.floor(Math.random() * 4)) {
		case 0:
			new generateDirectionalClue(referencedTile);
			break;
		case 1:
			new generateVerticalClue(referencedTile);
			break;
		case 2:
			new generateNearClue(referencedTile);
			break;
		case 3: 
			new generateBetweenClue(referencedTile);
			break;
	};
};

// generate clues until the number of unsolvabe tiles is 0
function generateClues() {
	// each tile answer is referenced by at least one clue
	while (puzzle.solvable == false) {
		var unsolvableTile = randomUnreferenced();
		if (unsolvableTile instanceof Array == true) {
			randomClue(unsolvableTile);
		};
		console.log(puzzle.unsolvableTiles);
	};
	// each clue maps to every tile on the board
	
	// as a temporary measure, five random clues are generated
	for (var x = 0; x <= 5; x++) {
		var unsolvableTile = randomSolvable();
		if (unsolvableTile instanceof Array == true) {
			randomClue(unsolvableTile);
		};
	};
	
	// and we give away answer(s)
	// BUG: on rare occassions we give away 1 too many answers.
	for (var x = 1; x <= puzzle.giveaway; x++) {
		var giveaway = [Math.floor(Math.random() * puzzle.height) + 1, Math.floor(Math.random() * puzzle.width) + 1];
		// prevent repeated giveaway answers
		while (puzzle.row[giveaway[0]].column[giveaway[1]].solved.bool == true) {
			giveaway = [Math.floor(Math.random() * puzzle.height) + 1, Math.floor(Math.random() * puzzle.width) + 1];
		};
		userInput(giveaway[0], giveaway[1], puzzle.row[giveaway[0]].column[giveaway[1]].answer, false);
	};
};


generateClues();