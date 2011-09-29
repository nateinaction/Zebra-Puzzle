/*
		Generate a random clue, then generate other random clues using at least
		one unreferenced tile and at least one referenced tile until there are
		no more unreferenced tiles
*/

// function
	// Check for unreferenced tiles
	// count all unreferenced tiles

	// if there are unreferenced tiles
		// if there are (puzzle.width * puzzle.height) unreferenced tiles
			// generate a random clue
		// else if there are less than (puzzle.width * puzzle.height) unreferenced tiles
			// generate a random clue using at least one referenced and one unreferenced tile
		// recurse function

	// if there are NOT unreferenced tiles
		// mark the puzzle as solvable
			
function generateClues() {
	var unreferencedTiles = 0;
	for (var rowNumber = 1; rowNumber <= puzzle.height; rowNumber++) {
		for (var columnNumber = 1; columnNumber <= puzzle.width; columnNumber++) {
			if (puzzle.row[rowNumber].column[columnNumber].referenced == false) {
				unreferencedTiles++;
			};
		};
	};
	
	if (unreferencedTiles > 0) {
		if (unreferencedTiles == puzzle.width * puzzle.height) {
			// generate a random clue
			displayClue(randomClue(randomUnreferencedTile()));
		}
		else {
			var cluePass = false;
			// if the puzzle has 50% or more of it's tiles referenced then generate a random starting point from an unreferenced tile
			if (unreferencedTiles <= (puzzle.width * puzzle.height) / 2) {
				// generate a clue until it includes at least one referenced tile
				var clue;
				while (cluePass == false) {
					clue = randomClue(randomUnreferencedTile());
					// BUG WORKAROUND - Occasionally, the randomClue function returns undefined
					while (clue == undefined) {
						clue = randomClue(randomReferencedTile());
					}
					for(var check = 0, max = clue.tile.length; check < max; check++) {
						if (puzzle.row[clue.tile[check][0]].column[clue.tile[check][1]].referenced == true) {
							cluePass = true;
						};
					};
				};
				// display the clue
				displayClue(clue);
			}
			else {
				// generate a clue until it includes at least one unreferenced tile
				var clue;
				while (cluePass == false) {
					clue = randomClue(randomReferencedTile());
					// BUG WORKAROUND - Occasionally, the randomClue function returns undefined
					while (clue == undefined) {
						clue = randomClue(randomReferencedTile());
					}
					for(var check = 0, max = clue.tile.length; check < max; check++) {
						if (puzzle.row[clue.tile[check][0]].column[clue.tile[check][1]].referenced == false) {
							cluePass = true;
						};
					};
				};
				// display the clue
				displayClue(clue);
			};
		};
		// recurse
		generateClues();
	}
	else {
		puzzle.solvable = true;
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
};

function randomReferencedTile() {
	var referencedTiles = Array();
	for (var rowNumber = 1; rowNumber <= puzzle.height; rowNumber++) {
		for (var columnNumber = 1; columnNumber <= puzzle.width; columnNumber++) {
			if (puzzle.row[rowNumber].column[columnNumber].referenced == true) {
				referencedTiles.push([rowNumber, columnNumber]);
			};
		};
	};
	return referencedTiles[Math.floor(Math.random() * referencedTiles.length)];
};

function randomUnreferencedTile() {
	var unreferencedTiles = Array();
	for (var rowNumber = 1; rowNumber <= puzzle.height; rowNumber++) {
		for (var columnNumber = 1; columnNumber <= puzzle.width; columnNumber++) {
			if (puzzle.row[rowNumber].column[columnNumber].referenced == false) {
				unreferencedTiles.push([rowNumber, columnNumber]);
			};
		};
	};
	return unreferencedTiles[Math.floor(Math.random() * unreferencedTiles.length)];
};

function tileAnswer(tile) {
	return puzzle.row[tile[0]].column[tile[1]].answer;
};

// use tile in a random clue
function randomClue(tile) {
	switch(Math.floor(Math.random() * 4)) {
		case 0:
			return generateDirectionalClue(tile);
			break;
		case 1:
			return generateVerticalClue(tile);
			break;
		case 2:
			return generateNearClue(tile);
			break;
		case 3: 
			return generateBetweenClue(tile);
			break;
	};
};

function displayClue(clue) {
	switch (clue.type) {
		case 'directional':
			displayDirectionalClue(clue.tile[0], clue.tile[1]);
			break;
		case 'vertical':
			displayVerticalClue(clue.tile[0], clue.tile[1]);
			break;
		case 'near':
			displayNearClue(clue.tile[0], clue.tile[1]);
			break;
		case 'between':
			displayBetweenClue(clue.tile[0], clue.tile[1], clue.tile[2]);
			break;	
	};
};

// while the puzzle is not solvable
	// run function
while (puzzle.solvable == false) {
	generateClues();
};
