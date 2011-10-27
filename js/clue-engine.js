/*
		Generate a random clue, then generate other random clues using at least
		one unreferenced tile and at least one referenced tile until there are
		no more unreferenced tiles
*/
			
function generateClues() {
	// count all unreferenced tiles
	var unreferencedTiles = 0;
	for (var rowNumber = 1; rowNumber <= puzzle.preferred.height; rowNumber++) {
		for (var columnNumber = 1; columnNumber <= puzzle.preferred.width; columnNumber++) {
			if (puzzle.row[rowNumber].column[columnNumber].referenced == false) {
				unreferencedTiles++;
			};
		};
	};
	
	if (unreferencedTiles > 0) {
		if (unreferencedTiles == puzzle.preferred.width * puzzle.preferred.height) {
			// generate a random clue
			puzzle.clues.array.push(randomClue(randomUnreferencedTile()));
			referenceClue(randomClue(randomUnreferencedTile()));
		}
		else {
			var cluePass = false;
			// if the puzzle has 50% or more of it's tiles referenced then generate a random starting point from an unreferenced tile
			if (unreferencedTiles <= (puzzle.preferred.width * puzzle.preferred.height) / 2) {
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
				// instead of displaying the clue, stick into an array in the puzzle object
				puzzle.clues.array.push(clue);
				referenceClue(clue);
				// display the clue
				//displayClue(clue);
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
				// instead of displaying the clue, stick into an array in the puzzle object
				puzzle.clues.array.push(clue);
				referenceClue(clue);
				// display the clue
				//displayClue(clue);
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
			var giveaway = [Math.floor(Math.random() * puzzle.preferred.height) + 1, Math.floor(Math.random() * puzzle.preferred.width) + 1];
			// prevent repeated giveaway answers
			while (puzzle.row[giveaway[0]].column[giveaway[1]].solved.bool == true) {
				giveaway = [Math.floor(Math.random() * puzzle.preferred.height) + 1, Math.floor(Math.random() * puzzle.preferred.width) + 1];
			};
			userInput(giveaway[0], giveaway[1], puzzle.row[giveaway[0]].column[giveaway[1]].answer, false);
		};
	};
};

// this function returns a non-restricted random referenced tile
function randomReferencedTile() {
	var referencedTiles = Array(), referencedTile = Array();
	for (var rowNumber = 1; rowNumber <= puzzle.preferred.height; rowNumber++) {
		for (var columnNumber = 1; columnNumber <= puzzle.preferred.width; columnNumber++) {
			if (puzzle.row[rowNumber].column[columnNumber].referenced == true) {
				referencedTiles.push([rowNumber, columnNumber]);
			};
		};
	};
	referencedTile = referencedTiles[Math.floor(Math.random() * referencedTiles.length)];
/*	while (puzzle.row[referencedTile[0]].column[referencedTile[1]].restricted == true){
		referencedTile = referencedTiles[Math.floor(Math.random() * referencedTiles.length)];
	};
*/	return referencedTile;
};

// this function returns a non-restricted random unreferenced tile
function randomUnreferencedTile() {
	var unreferencedTiles = Array(), unreferencedTile = Array();
	for (var rowNumber = 1; rowNumber <= puzzle.preferred.height; rowNumber++) {
		for (var columnNumber = 1; columnNumber <= puzzle.preferred.width; columnNumber++) {
			if (puzzle.row[rowNumber].column[columnNumber].referenced == false) {
				unreferencedTiles.push([rowNumber, columnNumber]);
			};
		};
	};
	unreferencedTile = unreferencedTiles[Math.floor(Math.random() * unreferencedTiles.length)];
/*	while (puzzle.row[unreferencedTile[0]].column[unreferencedTile[1]].restricted == true){
		unreferencedTile = unreferencedTiles[Math.floor(Math.random() * unreferencedTiles.length)];
	};
*/	return unreferencedTile;
};

function tileAnswer(tile) {
	return puzzle.row[tile[0]].column[tile[1]].answer;
};

// this function return a random clue
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

// this function sets the clue as referenced
function referenceClue(clue) {
	switch (clue.type) {
		case 'directional':
			referenceDirectionalClue(clue.tile[0], clue.tile[1]);
			break;
		case 'vertical':
			referenceVerticalClue(clue.tile[0], clue.tile[1]);
			break;
		case 'near':
			referenceNearClue(clue.tile[0], clue.tile[1]);
			break;
		case 'between':
			referenceBetweenClue(clue.tile[0], clue.tile[1], clue.tile[2]);
			break;	
	};
};

// this function writes the clue to the page
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

function isCorrect(rowNumber, columnNumber, tileNumber) {
	return puzzle.row[rowNumber].column[columnNumber].tile[tileNumber].answer.bool;
}