function generateVerticalClue(unsolvableTile) {
	if (clues.vertical.length < clues.verticalMax) { // this is the maximum number of vertical clues possible.
		var clueRow = Object(),
				unsolvableTile = {
					row : unsolvableTile[0],
					column : unsolvableTile[1]
				};
    
		// randomly select row for unknown tile
		if (unsolvableTile.row == 1) {
			clueRow.top = unsolvableTile.row;
			clueRow.bottom = Math.floor(Math.random() * puzzle.height) + 1;
			while (clueRow.top >= clueRow.bottom) {
				clueRow.bottom = Math.floor(Math.random() * puzzle.height) + 1;
			};
		}
		else if (unsolvableTile.row == puzzle.height) {
			clueRow.top = Math.floor(Math.random() * puzzle.height) + 1;
			clueRow.bottom = unsolvableTile.row;
			while (clueRow.top >= clueRow.bottom) {
				clueRow.top = Math.floor(Math.random() * puzzle.height) + 1;
			};
		}
		else {
			var randomWing = Math.floor(Math.random() * 2);
			
			if (randomWing == 0) {
				clueRow.top = unsolvableTile.row;
				clueRow.bottom = Math.floor(Math.random() * puzzle.height) + 1;
				while (clueRow.top >= clueRow.bottom) {
					clueRow.bottom = Math.floor(Math.random() * puzzle.height) + 1;
				};
			}
			else {
				clueRow.top = Math.floor(Math.random() * puzzle.height) + 1;
				clueRow.bottom = unsolvableTile.row;
				while (clueRow.top >= clueRow.bottom) {
					clueRow.top = Math.floor(Math.random() * puzzle.height) + 1;
				};
			};
		};

		clueTop = puzzle.row[clueRow.top].column[unsolvableTile.column].answer;
		clueBottom = puzzle.row[clueRow.bottom].column[unsolvableTile.column].answer;

		// check for repeating vertical clues
		var tempArray = JSON.stringify([clueRow.top, clueTop, clueRow.bottom, clueBottom]), repeat = false;
		for (var x = 0, max = clues.vertical.length; x < max; x++) {
			if (tempArray == JSON.stringify(clues.vertical[x])){
				repeat = true;
			};
		};
	
		if (repeat == false) {
			clueNumber++;
			$(".verticalClueArea").append('<div class="verticalClue clue' + clueNumber + '"><div style="background-image:url(' + resources + 'row' + clueRow.top + '/' + clueTop + '.jpg);" class="tile"></div><div style="background-image:url(' + resources + 'row' + clueRow.bottom + '/' + clueBottom + '.jpg);" class="tile"></div></div>');
			$(".clue" + clueNumber).rightClick( function(e) {
				if (this.hasClass("flagged") == true) {
					$(this).removeClass("flagged");
				}
				else if (this.hasClass("flagged") == false) {
					$(this).addClass("flagged");
				};
			});
			clues.vertical.push([clueRow.top, clueTop, clueRow.bottom, clueBottom]);
			puzzle.row[clueRow.top].column[unsolvableTile.column].solvable.bool = true;
			puzzle.row[clueRow.bottom].column[unsolvableTile.column].solvable.bool = true;
		};
	}
	else {
		console.log("Maximum number of vertical clues.");
	};      
};