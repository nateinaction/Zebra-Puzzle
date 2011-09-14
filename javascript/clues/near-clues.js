function nearClue(unsolvableTile) {
	if (clues.near.length < clues.nearMax) { // this is the maximum number of near clues possible.
		var clueRow = Object(),
				clueColumn = Object(),
				unsolvableTile = {
					row : unsolvableTile[0],
					column : unsolvableTile[1]
				};

		if (unsolvableTile.column == 1) {
			clueRow.left = unsolvableTile.row;
			clueColumn.left = unsolvableTile.column;
			clueRow.right = Math.floor(Math.random() * puzzle.height) + 1;
			clueColumn.right = clueColumn.left + 1;
		}
		else if (unsolvableTile.column == puzzle.width) {
			clueRow.right = unsolvableTile.row;
			clueColumn.right = unsolvableTile.column;
			clueRow.left = Math.floor(Math.random() * puzzle.height) + 1;
			clueColumn.left = clueColumn.right - 1;
		}
		else {
			if (Math.round(Math.random()) == 1) {
				clueRow.left = unsolvableTile.row;
				clueColumn.left = unsolvableTile.column;
				clueRow.right = Math.floor(Math.random() * puzzle.height) + 1;
				clueColumn.right = clueColumn.left + 1;
			}
			else {
				clueRow.right = unsolvableTile.row;
				clueColumn.right = unsolvableTile.column;
				clueRow.left = Math.floor(Math.random() * puzzle.height) + 1;
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
		};
			
		// check for repeating near clues
		var tempArray = JSON.stringify([clueRow.left, clueLeft, clueRow.right, clueRight]), tempArrayInverse = JSON.stringify([clueRow.right, clueRight, clueRow.left, clueLeft]), repeat = false;
		for (var x = 0; x < clues.near.length; x++) {
			if (tempArray == JSON.stringify(clues.near[x]) || tempArrayInverse == JSON.stringify(clues.near[x])){
				repeat = true;
			};
		};
	
		if (repeat == false) {
			clueNumber++;
			$(".horizontalClueArea").append('<div class="horizontalClue clue' + clueNumber + '"><div style="background-image:url(' + resources + 'row' + clueRow.left + '/' + clueLeft + '.jpg);" class="tile"></div><div style="background-image:url(' + resources + 'clues/near.gif);" class="tile"></div><div style="background-image:url(' + resources + 'row' + clueRow.right + '/' + clueRight + '.jpg);" class="tile"></div></div>');
			$(".clue" + clueNumber).rightClick( function(e) {
				if (this.hasClass("flagged") == true) {
					$(this).removeClass("flagged");
				}
				else if (this.hasClass("flagged") == false) {
					$(this).addClass("flagged");
				};
			});
			clues.near.push([clueRow.left, clueLeft, clueRow.right, clueRight]);
		};
	}
	else {
		console.log("Maximum number of near clues.");
	};
};