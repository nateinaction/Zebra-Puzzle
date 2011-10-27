function generateVerticalClue(unsolvableTile) {
	if (puzzle.clues.vertical.length < puzzle.clues.verticalMax()) { // this is the maximum number of vertical clues possible.
		var clueRow = Object(),
				unsolvableTile = {
					row : unsolvableTile[0],
					column : unsolvableTile[1]
				};
    
		// randomly select row for unknown tile
		if (unsolvableTile.row == 1) {
			clueRow.top = unsolvableTile.row;
			clueRow.bottom = Math.floor(Math.random() * puzzle.preferred.height) + 1;
			while (clueRow.top >= clueRow.bottom) {
				clueRow.bottom = Math.floor(Math.random() * puzzle.preferred.height) + 1;
			};
		}
		else if (unsolvableTile.row == puzzle.preferred.height) {
			clueRow.top = Math.floor(Math.random() * puzzle.preferred.height) + 1;
			clueRow.bottom = unsolvableTile.row;
			while (clueRow.top >= clueRow.bottom) {
				clueRow.top = Math.floor(Math.random() * puzzle.preferred.height) + 1;
			};
		}
		else {
			var randomWing = Math.floor(Math.random() * 2);
			
			if (randomWing == 0) {
				clueRow.top = unsolvableTile.row;
				clueRow.bottom = Math.floor(Math.random() * puzzle.preferred.height) + 1;
				while (clueRow.top >= clueRow.bottom) {
					clueRow.bottom = Math.floor(Math.random() * puzzle.preferred.height) + 1;
				};
			}
			else {
				clueRow.top = Math.floor(Math.random() * puzzle.preferred.height) + 1;
				clueRow.bottom = unsolvableTile.row;
				while (clueRow.top >= clueRow.bottom) {
					clueRow.top = Math.floor(Math.random() * puzzle.preferred.height) + 1;
				};
			};
		};

		clueTop = puzzle.row[clueRow.top].column[unsolvableTile.column].answer;
		clueBottom = puzzle.row[clueRow.bottom].column[unsolvableTile.column].answer;

		// check for repeating vertical clues
		var tempArray = JSON.stringify([clueRow.top, clueTop, clueRow.bottom, clueBottom]), repeat = false;
		for (var x = 0, max = puzzle.clues.vertical.length; x < max; x++) {
			if (tempArray == JSON.stringify(puzzle.clues.vertical[x])){
				repeat = true;
			};
		};
	
		if (repeat == false) {
			return {type : 'vertical', tile : [[clueRow.top, unsolvableTile.column], [clueRow.bottom, unsolvableTile.column]]};
		};
	}
	else {
		console.log("Maximum number of vertical clues.");
	};      
};

function referenceVerticalClue(topTile, bottomTile) {
	var topRow = topTile[0], bottomRow = bottomTile[0], topColumn = topTile[1], bottomColumn = bottomTile[1];
	puzzle.row[topRow].column[topColumn].referenced = true;
	puzzle.row[bottomRow].column[bottomColumn].referenced = true;
};

function displayVerticalClue(topTile, bottomTile) {
	var topRow = topTile[0], bottomRow = bottomTile[0], topColumn = topTile[1], bottomColumn = bottomTile[1];
	puzzle.clues.count++;
	puzzle.clues.vertical.push([topRow, tileAnswer(topTile), bottomRow, tileAnswer(bottomTile)]);
//	$(".verticalClueArea").append('<div class="verticalClue clue' + puzzle.clues.count + '"><div style="background-image:url(' + resources + 'row' + topRow + '/' + tileAnswer(topTile) + '.jpg);" class="tile"></div><div style="background-image:url(' + resources + 'row' + bottomRow + '/' + tileAnswer(bottomTile) + '.jpg);" class="tile"></div></div>');
	if (Math.round(Math.random()) == 1) {
		$(".clues ol").append('<li>The ' + tileKind(topRow, tileAnswer(topTile)) + ' is above the ' + tileKind(bottomRow, tileAnswer(bottomTile)) + '.</li>');
	}
	else {
		$(".clues ol").append('<li>The ' + tileKind(bottomRow, tileAnswer(bottomTile)) + ' is below the ' + tileKind(topRow, tileAnswer(topTile)) + '.</li>');
	};
};