function generateDirectionalClue(unsolvableTile) {
	if (puzzle.clues.directional.length < puzzle.clues.directionalMax()) { // this is the maximum number of directional clues possible.
		var clueRow = Object(),
				clueColumn = Object(),
				unsolvableTile = {
					row : unsolvableTile[0],
					column : unsolvableTile[1]
				};
						
		// extract random unsolvable tile and use it as either the left or right clue
		if (unsolvableTile.column == puzzle.preferred.width) {
			clueRow.right = unsolvableTile.row;
			clueColumn.right = unsolvableTile.column;
			
			// randomly select left row and column
			clueRow.left = Math.floor(Math.random() * puzzle.preferred.height) + 1;
			clueColumn.left = Math.floor(Math.random() * puzzle.preferred.width) + 1;
			while (clueColumn.right <= clueColumn.left) {
				clueColumn.left = Math.floor(Math.random() * puzzle.preferred.width) + 1;
			};
		}
		else if (unsolvableTile.column == 1) {
			clueRow.left = unsolvableTile.row;
			clueColumn.left = unsolvableTile.column;
			
			// randomly select right row and column
			clueRow.right = Math.floor(Math.random() * puzzle.preferred.height) + 1;
			clueColumn.right = Math.floor(Math.random() * puzzle.preferred.width) + 1;
			while (clueColumn.left >= clueColumn.right) {
				clueColumn.right = Math.floor(Math.random() * puzzle.preferred.width) + 1;
			};
		}
		else {
			var randomWing = Math.floor(Math.random() * 2);
			
			if (randomWing == 0) {
				clueRow.right = unsolvableTile.row;
				clueColumn.right = unsolvableTile.column;

				// randomly select left row and column
				clueRow.left = Math.floor(Math.random() * puzzle.preferred.height) + 1;
				clueColumn.left = Math.floor(Math.random() * puzzle.preferred.width) + 1;
				while (clueColumn.right <= clueColumn.left) {
					clueColumn.left = Math.floor(Math.random() * puzzle.preferred.width) + 1;
				};
			}
			else {
				clueRow.left = unsolvableTile.row;
				clueColumn.left = unsolvableTile.column;

				// randomly select right row and column
				clueRow.right = Math.floor(Math.random() * puzzle.preferred.height) + 1;
				clueColumn.right = Math.floor(Math.random() * puzzle.preferred.width) + 1;
				while (clueColumn.left >= clueColumn.right) {
					clueColumn.right = Math.floor(Math.random() * puzzle.preferred.width) + 1;
				};
			};
		};
							
		var clueLeft = puzzle.row[clueRow.left].column[clueColumn.left].answer,
				clueRight = puzzle.row[clueRow.right].column[clueColumn.right].answer;

		// check for repeating directional clues
		var tempArray = JSON.stringify([clueRow.left, clueLeft, clueRow.right, clueRight]), repeat = false;
		for (var x = 0, max = puzzle.clues.directional.length; x < max; x++) {
			if (tempArray == JSON.stringify(puzzle.clues.directional[x])){
				repeat = true;
			};
		};
	
		if (repeat == false) {
			return {type : 'directional', tile : [[clueRow.left, clueColumn.left], [clueRow.right, clueColumn.right]]};
		};
	}
	else {
		console.log("Maximum number of directional clues.");
	};
};

function referenceDirectionalClue(leftTile, rightTile) {
	var leftRow = leftTile[0], rightRow = rightTile[0], leftColumn = leftTile[1], rightColumn = rightTile[1];
	puzzle.row[leftRow].column[leftColumn].referenced = true;
	puzzle.row[rightRow].column[rightColumn].referenced = true;
}

function displayDirectionalClue(leftTile, rightTile) {
	var leftRow = leftTile[0], rightRow = rightTile[0], leftColumn = leftTile[1], rightColumn = rightTile[1];
	puzzle.clues.count++;
	puzzle.clues.directional.push([leftRow, tileAnswer(leftTile), rightRow, tileAnswer(rightTile)]);
//	$(".horizontalClueArea").append('<div class="horizontalClue clue' + puzzle.clues.count + '"><div style="background-image:url(' + resources + 'row' + leftRow + '/' + tileAnswer(leftTile) + '.jpg);" class="tile"></div><div style="background-image:url(' + resources + 'clues/direction.gif);" class="tile"></div><div style="background-image:url(' + resources + 'row' + rightRow + '/' + tileAnswer(rightTile) + '.jpg);" class="tile"></div></div>');
	if (Math.round(Math.random()) == 1) {
		$(".clues ol").append('<li>The ' + tileKind(leftRow, tileAnswer(leftTile)) + ' is to the left of the ' + tileKind(rightRow, tileAnswer(rightTile)) + '.</li>');
	}
	else {
		$(".clues ol").append('<li>The ' + tileKind(rightRow, tileAnswer(rightTile)) + ' is to the right of the ' + tileKind(leftRow, tileAnswer(leftTile)) + '.</li>');
	};
};