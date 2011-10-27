function generateNearClue(unsolvableTile) {
	if (puzzle.clues.near.length < puzzle.clues.nearMax()) { // this is the maximum number of near clues possible.
		var clueRow = Object(),
				clueColumn = Object(),
				unsolvableTile = {
					row : unsolvableTile[0],
					column : unsolvableTile[1]
				};

		if (unsolvableTile.column == 1) {
			clueRow.left = unsolvableTile.row;
			clueColumn.left = unsolvableTile.column;
			clueRow.right = Math.floor(Math.random() * puzzle.preferred.height) + 1;
			clueColumn.right = clueColumn.left + 1;
		}
		else if (unsolvableTile.column == puzzle.preferred.width) {
			clueRow.right = unsolvableTile.row;
			clueColumn.right = unsolvableTile.column;
			clueRow.left = Math.floor(Math.random() * puzzle.preferred.height) + 1;
			clueColumn.left = clueColumn.right - 1;
		}
		else {
			if (Math.round(Math.random()) == 1) {
				clueRow.left = unsolvableTile.row;
				clueColumn.left = unsolvableTile.column;
				clueRow.right = Math.floor(Math.random() * puzzle.preferred.height) + 1;
				clueColumn.right = clueColumn.left + 1;
			}
			else {
				clueRow.right = unsolvableTile.row;
				clueColumn.right = unsolvableTile.column;
				clueRow.left = Math.floor(Math.random() * puzzle.preferred.height) + 1;
				clueColumn.left = clueColumn.right - 1;
			};
		}
		
		if (Math.round(Math.random()) == 1) {
			var clueLeft = puzzle.row[clueRow.left].column[clueColumn.left].answer,
					clueRight = puzzle.row[clueRow.right].column[clueColumn.right].answer;
		}
		else {
			var clueLeft = puzzle.row[clueRow.right].column[clueColumn.right].answer,
					clueRight = puzzle.row[clueRow.left].column[clueColumn.left].answer;
			clueRow.temp = clueRow.left;
			clueRow.left = clueRow.right;
			clueRow.right = clueRow.temp;
			clueColumn.temp = clueColumn.left;
			clueColumn.left = clueColumn.right;
			clueColumn.right = clueColumn.temp;
		};
			
		// check for repeating near clues
		var tempArray = JSON.stringify([clueRow.left, clueLeft, clueRow.right, clueRight]), tempArrayInverse = JSON.stringify([clueRow.right, clueRight, clueRow.left, clueLeft]), repeat = false;
		for (var x = 0, max = puzzle.clues.near.length; x < max; x++) {
			if (tempArray == JSON.stringify(puzzle.clues.near[x]) || tempArrayInverse == JSON.stringify(puzzle.clues.near[x])){
				repeat = true;
			};
		};
	
		if (repeat == false) {
			return {type : 'near', tile : [[clueRow.left, clueColumn.left], [clueRow.right, clueColumn.right]]};
		};
	}
	else {
		console.log("Maximum number of near clues.");
	};
};

function referenceNearClue(leftTile, rightTile) {
	var leftRow = leftTile[0], rightRow = rightTile[0], leftColumn = leftTile[1], rightColumn = rightTile[1];
	puzzle.row[leftRow].column[leftColumn].referenced = true;
	puzzle.row[rightRow].column[rightColumn].referenced = true;
};

function displayNearClue(leftTile, rightTile) {
	var leftRow = leftTile[0], rightRow = rightTile[0], leftColumn = leftTile[1], rightColumn = rightTile[1];
	puzzle.clues.count++;
	puzzle.clues.near.push([leftRow, tileAnswer(leftTile), rightRow, tileAnswer(rightTile)]);
//	$(".horizontalClueArea").append('<div class="horizontalClue clue' + puzzle.clues.count + '"><div style="background-image:url(' + resources + 'row' + leftRow + '/' + tileAnswer(leftTile) + '.jpg);" class="tile"></div><div style="background-image:url(' + resources + 'clues/near.gif);" class="tile"></div><div style="background-image:url(' + resources + 'row' + rightRow + '/' + tileAnswer(rightTile) + '.jpg);" class="tile"></div></div>');
	$(".clues ol").append('<li>The ' + tileKind(leftRow, tileAnswer(leftTile)) + ' is adjacent to the ' + tileKind(rightRow, tileAnswer(rightTile)) + '.</li>');
};