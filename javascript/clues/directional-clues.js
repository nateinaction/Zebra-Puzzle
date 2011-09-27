function generateDirectionalClue(unsolvableTile) {
	if (clues.directional.length < clues.directionalMax()) { // this is the maximum number of directional clues possible.
		var clueRow = Object(),
				clueColumn = Object(),
				unsolvableTile = {
					row : unsolvableTile[0],
					column : unsolvableTile[1]
				};
						
		// extract random unsolvable tile and use it as either the left or right clue
		if (unsolvableTile.column == puzzle.width) {
			clueRow.right = unsolvableTile.row;
			clueColumn.right = unsolvableTile.column;
			
			// randomly select left row and column
			clueRow.left = Math.floor(Math.random() * puzzle.height) + 1;
			clueColumn.left = Math.floor(Math.random() * puzzle.width) + 1;
			while (clueColumn.right <= clueColumn.left) {
				clueColumn.left = Math.floor(Math.random() * puzzle.width) + 1;
			};
		}
		else if (unsolvableTile.column == 1) {
			clueRow.left = unsolvableTile.row;
			clueColumn.left = unsolvableTile.column;
			
			// randomly select right row and column
			clueRow.right = Math.floor(Math.random() * puzzle.height) + 1;
			clueColumn.right = Math.floor(Math.random() * puzzle.width) + 1;
			while (clueColumn.left >= clueColumn.right) {
				clueColumn.right = Math.floor(Math.random() * puzzle.width) + 1;
			};
		}
		else {
			var randomWing = Math.floor(Math.random() * 2);
			
			if (randomWing == 0) {
				clueRow.right = unsolvableTile.row;
				clueColumn.right = unsolvableTile.column;

				// randomly select left row and column
				clueRow.left = Math.floor(Math.random() * puzzle.height) + 1;
				clueColumn.left = Math.floor(Math.random() * puzzle.width) + 1;
				while (clueColumn.right <= clueColumn.left) {
					clueColumn.left = Math.floor(Math.random() * puzzle.width) + 1;
				};
			}
			else {
				clueRow.left = unsolvableTile.row;
				clueColumn.left = unsolvableTile.column;

				// randomly select right row and column
				clueRow.right = Math.floor(Math.random() * puzzle.height) + 1;
				clueColumn.right = Math.floor(Math.random() * puzzle.width) + 1;
				while (clueColumn.left >= clueColumn.right) {
					clueColumn.right = Math.floor(Math.random() * puzzle.width) + 1;
				};
			};
		};
							
		var clueLeft = puzzle.row[clueRow.left].column[clueColumn.left].answer,
				clueRight = puzzle.row[clueRow.right].column[clueColumn.right].answer;

		// check for repeating directional clues
		var tempArray = JSON.stringify([clueRow.left, clueLeft, clueRow.right, clueRight]), repeat = false;
		for (var x = 0, max = clues.directional.length; x < max; x++) {
			if (tempArray == JSON.stringify(clues.directional[x])){
				repeat = true;
			};
		};
	
		if (repeat == false) {
			clueNumber++;
			puzzle.row[clueRow.right].column[1].tile[clueRight].possible.string = "impossible";
			puzzle.row[clueRow.right].column[1].tile[clueRight].possible.bool = false;
			puzzle.row[clueRow.left].column[puzzle.width].tile[clueLeft].possible.string = "impossible";
			puzzle.row[clueRow.left].column[puzzle.width].tile[clueLeft].possible.bool = false;
			$(".horizontalClueArea").append('<div class="horizontalClue clue' + clueNumber + '"><div style="background-image:url(' + resources + 'row' + clueRow.left + '/' + clueLeft + '.jpg);" class="tile"></div><div style="background-image:url(' + resources + 'clues/direction.gif);" class="tile"></div><div style="background-image:url(' + resources + 'row' + clueRow.right + '/' + clueRight + '.jpg);" class="tile"></div></div>');
			$(".clue" + clueNumber).rightClick( function(e) {
				if (this.hasClass("flagged") == true) {
					$(this).removeClass("flagged");
				}
				else if (this.hasClass("flagged") == false) {
					$(this).addClass("flagged");
				};
			});
			clues.directional.push([clueRow.left, clueLeft, clueRow.right, clueRight]);
			puzzle.row[clueRow.left].column[clueColumn.left].solvable.bool = true;
			puzzle.row[clueRow.right].column[clueColumn.right].solvable.bool = true;
		};
	}
	else {
		console.log("Maximum number of directional clues.");
	};
};