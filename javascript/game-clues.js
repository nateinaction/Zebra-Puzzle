// define maximum number of possible rules based on puzzle size
function directionalMax() {
	var directionalMax = 0;
	for (var x = 1; x < 5; x++) {
		directionalMax += (x * 3) * 3;
	};
	return directionalMax;
};

function validateTile(rowNumber, columnNumber, tileNumber) {
	if (true == puzzle.row[rowNumber].column[columnNumber].tile[tileNumber].answer.bool) {
		return true;
	}
	else {
		return false;
	};
};

function randomClue() {
	switch(Math.floor(Math.random() * 4)) {
		case 0:
			new betweenClue();
			break;
		case 1:
			new nearClue();
			break;
		case 2:
			new directionalClue();
			break;
		case 3:
			new verticalClue();
			break;
	};
};

function betweenClue() {
	if (clues.between.length < clues.betweenMax) { // this is the maximum number of between clues possible.
		var clueRow = Object(),
				clueColumn = Object();
				
		// randomly select rows
		clueRow.left = Math.floor(Math.random() * puzzle.height);
		clueRow.center = Math.floor(Math.random() * puzzle.height);
		clueRow.right = Math.floor(Math.random() * puzzle.height);
				
		// randomly select column for center
		clueColumn.center = Math.floor(Math.random() * (puzzle.width - 3)) + 1;
		// randomly select guesses in columns adjacent to the center column
		if (Math.round(Math.random()) == 1) {
			clueColumn.left = clueColumn.center + 1;
			clueColumn.right = clueColumn.center - 1;
		}
		else {
			clueColumn.left = clueColumn.center - 1;
			clueColumn.right = clueColumn.center + 1;
		};
                
		var clueLeft = block[clueRow.left][clueColumn.left].answer,
				clueCenter = block[clueRow.center][clueColumn.center].answer,
				clueRight = block[clueRow.right][clueColumn.right].answer;
			
		// check for repeating between clues
		var tempArray = JSON.stringify([clueRow.left, clueLeft, clueRow.center, clueCenter, clueRow.right, clueRight]), tempArrayInverse = JSON.stringify([clueRow.right, clueRight, clueRow.center, clueCenter, clueRow.left, clueLeft]), repeat = false; // this is the maximum number of between clues possible without repeating.
		for (var x = 0; x < clues.between.length; x++) {
			if (tempArray == JSON.stringify(clues.between[x]) || tempArrayInverse == JSON.stringify(clues.between[x])){
				repeat = true;
			};
		};
	
		if ((block[clueRow.left][clueColumn.left].state == 'solvable' && block[clueRow.center][clueColumn.center].state == 'solvable' && block[clueRow.right][clueColumn.right].state == 'solvable') || repeat == true) {
			randomClue(); // if all three blocks are solvable, we don't need another clue.
		}
		else {
			clueNum++;
			$(".horizontalClueArea").append('<div class="horizontalClue clue' + clueNum + '"><div class="betweenClue" style="background-image:url(' + resources + 'clues/between.gif);"></div><div style="background-image:url(' + resources + 'row' + clueRow.left + '/' + clueLeft + '.jpg);" class="clue"></div><div style="background-image:url(' + resources + 'row' + clueRow.center + '/' + clueCenter + '.jpg);" class="clue"></div><div style="background-image:url(' + resources + 'row' + clueRow.right + '/' + clueRight + '.jpg);" class="clue"></div></div>');
			$(".clue" + clueNum).rightClick( function(e) {
				if (this.hasClass("impossible") == true) {
					$(this).removeClass("impossible");
				}
				else if (this.hasClass("impossible") == false) {
					$(this).addClass("impossible");
				};
			});
			clues.between.push([clueRow.left, clueLeft, clueRow.center, clueCenter, clueRow.right, clueRight]);
		};
	}
	else {
		console.log("Maximum number of between clues.");
	};
};
            
function directionalClue() {
	var directionalMax;
	for (var x = 1; x < 5; x++) {
		directionalMax += (x * 3) * 3;
	};
	if (clues.directional.length < clues.directionalMax) { // this is the maximum number of directional clues possible.
		var clueRow = Object(),
				clueColumn = Object();
			
		// randomly select rows
		clueRow.left = Math.floor(Math.random() * puzzle.height);
		clueRow.right = Math.floor(Math.random() * puzzle.height);
			
		// randomly select column for left
		clueColumn.left = Math.floor(Math.random() * (puzzle.width - 1));
		clueColumn.right = Math.floor(Math.random() * puzzle.width);
		while (clueColumn.left > clueColumn.right || clueColumn.left == clueColumn.right || clueColumn.right == 6) {
			clueColumn.right = Math.floor(Math.random() * puzzle.width);
		};
							
		var clueLeft = block[clueRow.left][clueColumn.left].answer,
				clueRight = block[clueRow.right][clueColumn.right].answer;

		// check for repeating directional clues
		var tempArray = JSON.stringify([clueRow.left, clueLeft, clueRow.right, clueRight]), repeat = false;
		for (var x = 0; x < clues.directional.length; x++) {
			if (tempArray == JSON.stringify(clues.directional[x])){
				repeat = true;
			};
		};
	
		if ((block[clueRow.left][clueColumn.left].state == 'solvable' && block[clueRow.right][clueColumn.right].state == 'solvable') || repeat == true) {
			randomClue();
		}
		else {
			clueNum++;
			$(".horizontalClueArea").append('<div class="horizontalClue clue' + clueNum + '"><div style="background-image:url(' + resources + 'row' + clueRow.left + '/' + clueLeft + '.jpg);" class="clue"></div><div style="background-image:url(' + resources + 'clues/direction.gif);" class="clue"></div><div style="background-image:url(' + resources + 'row' + clueRow.right + '/' + clueRight + '.jpg);" class="clue"></div></div>');
			$(".clue" + clueNum).rightClick( function(e) {
				if (this.hasClass("impossible") == true) {
					$(this).removeClass("impossible");
				}
				else if (this.hasClass("impossible") == false) {
					$(this).addClass("impossible");
				};
			});
			clues.directional.push([clueRow.left, clueLeft, clueRow.right, clueRight]);
		};
	}
	else {
		console.log("Maximum number of directional clues.");
	};
};
            
function nearClue() {
	if (clues.near.length < clues.nearMax) { // this is the maximum number of near clues possible.
		var clueRow = Object(),
				clueColumn = Object();

		// randomly select rows
		clueRow.left = Math.floor(Math.random() * puzzle.height);
		clueRow.right = Math.floor(Math.random() * puzzle.height);

		// randomly select column for left
		clueColumn.left = Math.floor(Math.random() * puzzle.width);
		if (clueColumn.left == (puzzle.width - 1)) {
			clueColumn.right = clueColumn.left - 1;
		}
		else if (clueColumn.left == 0) {
			clueColumn.right = clueColumn.left + 1;
		}
		else {
			if (Math.round(Math.random()) == 1) {
				clueColumn.right = clueColumn.left + 1;
			}
			else {
				clueColumn.right = clueColumn.left - 1;
			};
		};

		var clueLeft = block[clueRow.left][clueColumn.left].answer,
				clueRight = block[clueRow.right][clueColumn.right].answer;
			
		// check for repeating near clues
		var tempArray = JSON.stringify([clueRow.left, clueLeft, clueRow.right, clueRight]), tempArrayInverse = JSON.stringify([clueRow.right, clueRight, clueRow.left, clueLeft]), repeat = false;
		for (var x = 0; x < clues.near.length; x++) {
			if (tempArray == JSON.stringify(clues.near[x]) || tempArrayInverse == JSON.stringify(clues.near[x])){
				repeat = true;
			};
		};
	
		if ((block[clueRow.left][clueColumn.left].state == 'solvable' && block[clueRow.right][clueColumn.right].state == 'solvable') || repeat == true) {
		randomClue();
		}
		else {
			clueNum++;
			$(".horizontalClueArea").append('<div class="horizontalClue clue' + clueNum + '"><div style="background-image:url(' + resources + 'row' + clueRow.left + '/' + clueLeft + '.jpg);" class="clue"></div><div style="background-image:url(' + resources + 'clues/near.gif);" class="clue"></div><div style="background-image:url(' + resources + 'row' + clueRow.right + '/' + clueRight + '.jpg);" class="clue"></div></div>');
			$(".clue" + clueNum).rightClick( function(e) {
				if (this.hasClass("impossible") == true) {
					$(this).removeClass("impossible");
				}
				else if (this.hasClass("impossible") == false) {
					$(this).addClass("impossible");
				};
			});
			clues.near.push([clueRow.left, clueLeft, clueRow.right, clueRight]);
		};
	}
	else {
		console.log("Maximum number of near clues.");
	};
};
            
function verticalClue() {
	if (clues.vertical.length < clues.verticalMax) { // this is the maximum number of vertical clues possible.
		var clueRow = Object(),
				clueColumn;
    
		// randomly select rows
		clueRow.top = Math.floor(Math.random() * puzzle.height);
		clueRow.bottom = Math.floor(Math.random() * puzzle.height);
		while (clueRow.top == clueRow.bottom || clueRow.top > clueRow.bottom) {
			clueRow.top = Math.floor(Math.random() * puzzle.height);
			clueRow.bottom = Math.floor(Math.random() * puzzle.height);
		};

		// randomly select column
		clueColumn = Math.floor(Math.random() * puzzle.width);

		clueTop = block[clueRow.top][clueColumn].answer;
		clueBottom = block[clueRow.bottom][clueColumn].answer;

		// check for repeating vertical clues
		var tempArray = JSON.stringify([clueRow.top, clueTop, clueRow.bottom, clueBottom]), repeat = false;
		for (var x = 0; x < clues.vertical.length; x++) {
			if (tempArray == JSON.stringify(clues.vertical[x])){
				repeat = true;
			};
		};
	
		if ((block[clueRow.top][clueColumn].state == 'solvable' && block[clueRow.bottom][clueColumn].state == 'solvable') || repeat == true) {
			randomClue();
		}
		else {
			clueNum++;
			$(".verticalClueArea").append('<div class="verticalClue clue' + clueNum + '"><div style="background-image:url(' + resources + 'row' + clueRow.top + '/' + clueTop + '.jpg);" class="clue"></div><div style="background-image:url(' + resources + 'row' + clueRow.bottom + '/' + clueBottom + '.jpg);" class="clue"></div></div>');
			$(".clue" + clueNum).rightClick( function(e) {
				if (this.hasClass("impossible") == true) {
					$(this).removeClass("impossible");
				}
				else if (this.hasClass("impossible") == false) {
					$(this).addClass("impossible");
				};
			});
			clues.vertical.push([clueRow.top, clueTop, clueRow.bottom, clueBottom]);
		};
	}
	else {
		console.log("Maximum number of vertical clues.");
	};      
};