function generateBetweenClue(tile) {
	if (puzzle.clues.between.length < puzzle.clues.betweenMax()) { // this is the maximum number of between clues possible.
		var clueRow = Object(),
				clueColumn = Object(),
				tile = {
					row : tile[0],
					column : tile[1]
				};
		
		if (Math.round(Math.random()) == 1 && tile.column != 1 && tile.column != puzzle.preferred.width) {
			clueRow.left = Math.floor(Math.random() * puzzle.preferred.height) + 1;
			clueRow.center = tile.row;
			clueColumn.center = tile.column;
			clueRow.right = Math.floor(Math.random() * puzzle.preferred.height) + 1;
			// select columns
			clueColumn.left = clueColumn.center - 1;
			clueColumn.right = clueColumn.center + 1;
		}
		else {
			if (Math.round(Math.random()) == 1) {
				clueRow.left = tile.row;
				clueColumn.left = tile.column;
				clueRow.center = Math.floor(Math.random() * puzzle.preferred.height) + 1;
				clueRow.right = Math.floor(Math.random() * puzzle.preferred.height) + 1;
				
				// select columns
				if (clueColumn.left <= puzzle.preferred.width - 2) {
					clueColumn.center = clueColumn.left + 1;
					clueColumn.right = clueColumn.left + 2;
				}
				else {
					clueColumn.center = clueColumn.left - 1;
					clueColumn.right = clueColumn.left - 2;
				};
			}
			else{
				clueRow.left = Math.floor(Math.random() * puzzle.preferred.height) + 1;
				clueRow.center = Math.floor(Math.random() * puzzle.preferred.height) + 1;
				clueRow.right = tile.row;
				clueColumn.right = tile.column;
				
				// select columns
				if (clueColumn.right >= 3) {
					clueColumn.center = clueColumn.right - 1;
					clueColumn.left = clueColumn.right - 2;
				}
				else {
					clueColumn.center = clueColumn.right + 1;
					clueColumn.left = clueColumn.right + 2;
				};
			};
		};
		
		if (Math.round(Math.random()) == 1) {
			var	clueLeft = puzzle.row[clueRow.left].column[clueColumn.left].answer,
					clueCenter = puzzle.row[clueRow.center].column[clueColumn.center].answer,
					clueRight = puzzle.row[clueRow.right].column[clueColumn.right].answer;
		}
		else {
			var	clueRight = puzzle.row[clueRow.left].column[clueColumn.left].answer,
					clueCenter = puzzle.row[clueRow.center].column[clueColumn.center].answer,
					clueLeft = puzzle.row[clueRow.right].column[clueColumn.right].answer;
			clueRow.temp = clueRow.left;
			clueRow.left = clueRow.right;
			clueRow.right = clueRow.temp;
			clueColumn.temp = clueColumn.left;
			clueColumn.left = clueColumn.right;
			clueColumn.right = clueColumn.temp;
		};
			
		// check for repeating between clues
		var tempArray = JSON.stringify([clueRow.left, clueLeft, clueRow.center, clueCenter, clueRow.right, clueRight]), tempArrayInverse = JSON.stringify([clueRow.right, clueRight, clueRow.center, clueCenter, clueRow.left, clueLeft]), repeat = false; // this is the maximum number of between clues possible without repeating.
		for (var x = 0, max = puzzle.clues.between.length; x < max; x++) {
			if (tempArray == JSON.stringify(puzzle.clues.between[x]) || tempArrayInverse == JSON.stringify(puzzle.clues.between[x])){
				repeat = true;
			};
		};
	
		if (repeat == false) {
			return {type : 'between', tile : [[clueRow.left, clueColumn.left], [clueRow.center, clueColumn.center], [clueRow.right, clueColumn.right]]};
		};
	}
	else {
		console.log("Maximum number of between clues.");
	};
};

function referenceBetweenClue(leftTile, centerTile, rightTile) {
	var leftRow = leftTile[0], centerRow = centerTile[0], rightRow = rightTile[0], leftColumn = leftTile[1], centerColumn = centerTile[1], rightColumn = rightTile[1];
	puzzle.row[leftRow].column[leftColumn].referenced = true;
	puzzle.row[centerRow].column[centerColumn].referenced = true;
	puzzle.row[rightRow].column[rightColumn].referenced = true;
}

function displayBetweenClue(leftTile, centerTile, rightTile) {
	var leftRow = leftTile[0], centerRow = centerTile[0], rightRow = rightTile[0], leftColumn = leftTile[1], centerColumn = centerTile[1], rightColumn = rightTile[1];
	puzzle.clues.count++;
	puzzle.clues.between.push([leftRow, tileAnswer(leftTile), centerRow, tileAnswer(centerTile), rightRow, tileAnswer(rightTile)]);
//	$(".horizontalClueArea").append('<div class="horizontalClue clue' + puzzle.clues.count + '"><div class="betweenClue" style="background-image:url(' + resources + 'clues/between.gif);"></div><div style="background-image:url(' + resources + 'row' + leftRow + '/' + tileAnswer(leftTile) + '.jpg);" class="tile"></div><div style="background-image:url(' + resources + 'row' + centerRow + '/' + tileAnswer(centerTile) + '.jpg);" class="tile"></div><div style="background-image:url(' + resources + 'row' + rightRow + '/' + tileAnswer(rightTile) + '.jpg);" class="tile"></div></div>');
	$(".clues ol").append('<li>The ' + tileKind(centerRow, tileAnswer(centerTile)) + ' is between and adjacent to both the ' + tileKind(leftRow, tileAnswer(leftTile)) + ' and the ' + tileKind(rightRow, tileAnswer(rightTile)) + '.</li>');
};