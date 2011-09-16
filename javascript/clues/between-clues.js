function generateBetweenClue(unsolvableTile) {
	if (clues.between.length < clues.betweenMax) { // this is the maximum number of between clues possible.
		var clueRow = Object(),
				clueColumn = Object(),
				unsolvableTile = {
					row : unsolvableTile[0],
					column : unsolvableTile[1]
				};
		
		if (Math.round(Math.random()) == 1 && unsolvableTile.column != 1 && unsolvableTile.column != puzzle.width) {
			clueRow.left = Math.floor(Math.random() * puzzle.height) + 1;
			clueRow.center = unsolvableTile.row;
			clueColumn.center = unsolvableTile.column;
			clueRow.right = Math.floor(Math.random() * puzzle.height) + 1;
			// select columns
			clueColumn.left = clueColumn.center - 1;
			clueColumn.right = clueColumn.center + 1;
		}
		else {
			if (Math.round(Math.random()) == 1) {
				clueRow.left = unsolvableTile.row;
				clueColumn.left = unsolvableTile.column;
				clueRow.center = Math.floor(Math.random() * puzzle.height) + 1;
				clueRow.right = Math.floor(Math.random() * puzzle.height) + 1;
				
				// select columns
				if (clueColumn.left <= puzzle.width - 2) {
					clueColumn.center = clueColumn.left + 1;
					clueColumn.right = clueColumn.left + 2;
				}
				else {
					clueColumn.center = clueColumn.left - 1;
					clueColumn.right = clueColumn.left - 2;
				};
			}
			else{
				clueRow.left = Math.floor(Math.random() * puzzle.height) + 1;
				clueRow.center = Math.floor(Math.random() * puzzle.height) + 1;
				clueRow.right = unsolvableTile.row;
				clueColumn.right = unsolvableTile.column;
				
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
		};
			
		// check for repeating between clues
		var tempArray = JSON.stringify([clueRow.left, clueLeft, clueRow.center, clueCenter, clueRow.right, clueRight]), tempArrayInverse = JSON.stringify([clueRow.right, clueRight, clueRow.center, clueCenter, clueRow.left, clueLeft]), repeat = false; // this is the maximum number of between clues possible without repeating.
		for (var x = 0; x < clues.between.length; x++) {
			if (tempArray == JSON.stringify(clues.between[x]) || tempArrayInverse == JSON.stringify(clues.between[x])){
				repeat = true;
			};
		};
	
		if (repeat == false) {
			console.log("between");
			clueNumber++;
			$(".horizontalClueArea").append('<div class="horizontalClue clue' + clueNumber + '"><div class="betweenClue" style="background-image:url(' + resources + 'clues/between.gif);"></div><div style="background-image:url(' + resources + 'row' + clueRow.left + '/' + clueLeft + '.jpg);" class="tile"></div><div style="background-image:url(' + resources + 'row' + clueRow.center + '/' + clueCenter + '.jpg);" class="tile"></div><div style="background-image:url(' + resources + 'row' + clueRow.right + '/' + clueRight + '.jpg);" class="tile"></div></div>');
			$(".clue" + clueNumber).rightClick( function(e) {
				if (this.hasClass("flagged") == true) {
					$(this).removeClass("flagged");
				}
				else if (this.hasClass("flagged") == false) {
					$(this).addClass("flagged");
				};
			});
			clues.between.push([clueRow.left, clueLeft, clueRow.center, clueCenter, clueRow.right, clueRight]);		};
	}
	else {
		console.log("Maximum number of between clues.");
	};
};