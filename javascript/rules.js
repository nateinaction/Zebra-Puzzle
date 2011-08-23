function betweenClue() {
	var clueRow = Object(),
			clueColumn = Object();
				
	// randomly select rows
	clueRow.left = Math.floor(Math.random() * (puzzle.height + 1));
	clueRow.center = Math.floor(Math.random() * (puzzle.height + 1));
	clueRow.right = Math.floor(Math.random() * (puzzle.height + 1));
				
	// randomly select column for center
	clueColumn.center = Math.floor(Math.random() * (puzzle.width - 2)) + 1;
	// randomly select guesses in columns adjacent to the center column
	if (Math.round(Math.random()) == 1) {
		clueColumn.left = clueColumn.center + 1;
		clueColumn.right = clueColumn.center - 1;
	}
	else {
		clueColumn.left = clueColumn.center - 1;
		clueColumn.right = clueColumn.center + 1;
	};
                
	var clueLeft = gameBoard[clueRow.left][clueColumn.left],
			clueCenter = gameBoard[clueRow.center][clueColumn.center],
			clueRight = gameBoard[clueRow.right][clueColumn.right];
	if (solvableTile[clueRow.left][clueColumn.left] == true && solvableTile[clueRow.center][clueColumn.center] == true && solvableTile[clueRow.right][clueColumn.right] == true) {
		checkPossibilities();
	}
	else {
		$(".horizontalClueArea").append('<div class="horizontalClue"><div class="betweenClue" style="background-image:url(' + resources + 'clues/between.gif);"></div><div style="background-image:url(' + resources + 'row' + clueRow.left + '/' + clueLeft + '.jpg);" class="clue"></div><div style="background-image:url(' + resources + 'row' + clueRow.center + '/' + clueCenter + '.jpg);" class="clue"></div><div style="background-image:url(' + resources + 'row' + clueRow.right + '/' + clueRight + '.jpg);" class="clue"></div></div>');
		clues.push(['between', clueRow.left, clueLeft, clueRow.center, clueCenter, clueRow.right, clueRight]);
		clueNum++;
		checkPossibilities();
	};
};
            
function directionClue() {
	var clueRow = Object(),
			clueColumn = Object();
			
	// randomly select rows
	clueRow.left = Math.floor(Math.random() * (puzzle.height + 1));
	clueRow.right = Math.floor(Math.random() * (puzzle.height + 1));
			
	// randomly select column for left
	clueColumn.left = Math.floor(Math.random() * (puzzle.width));
	clueColumn.right = Math.floor(Math.random() * (puzzle.width + 1));
	while (clueColumn.left > clueColumn.right || clueColumn.left == clueColumn.right || clueColumn.right == 6) {
		clueColumn.right = Math.floor(Math.random() * (puzzle.width + 1));
	};
							
	var clueLeft = gameBoard[clueRow.left][clueColumn.left],
			clueRight = gameBoard[clueRow.right][clueColumn.right];
	if (solvableTile[clueRow.left][clueColumn.left] == true && solvableTile[clueRow.right][clueColumn.right] == true) {
		checkPossibilities();
	}
else {
		$(".horizontalClueArea").append('<div class="horizontalClue"><div style="background-image:url(' + resources + 'row' + clueRow.left + '/' + clueLeft + '.jpg);" class="clue"></div><div style="background-image:url(' + resources + 'clues/direction.gif);" class="clue"></div><div style="background-image:url(' + resources + 'row' + clueRow.right + '/' + clueRight + '.jpg);" class="clue"></div></div>');
		clues.push(['direction', clueRow.left, clueLeft, clueRow.right, clueRight]);
		clueNum++;
		checkPossibilities();
	};
};
            
function nearClue() {
	var clueRow = Object(),
			clueColumn = Object();

	// randomly select rows
	clueRow.left = Math.floor(Math.random() * (puzzle.height + 1));
	clueRow.right = Math.floor(Math.random() * (puzzle.height + 1));

	// randomly select column for left
	clueColumn.left = Math.floor(Math.random() * (puzzle.width + 1));
	if (clueColumn.left == puzzle.width) {
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

	var clueLeft = gameBoard[clueRow.left][clueColumn.left],
			clueRight = gameBoard[clueRow.right][clueColumn.right];
	if (solvableTile[clueRow.left][clueColumn.left] == true && solvableTile[clueRow.right][clueColumn.right] == true) {
		checkPossibilities();
	}
	else {
		$(".horizontalClueArea").append('<div class="horizontalClue"><div style="background-image:url(' + resources + 'row' + clueRow.left + '/' + clueLeft + '.jpg);" class="clue"></div><div style="background-image:url(' + resources + 'clues/near.gif);" class="clue"></div><div style="background-image:url(' + resources + 'row' + clueRow.right + '/' + clueRight + '.jpg);" class="clue"></div></div>');
		clues.push(['near', clueRow.left, clueLeft, clueRow.right, clueRight]);
		clueNum++;
		checkPossibilities();
	};
};
            
function verticalClue() {
	var clueRow = Object(),
			clueColumn;
    
	// randomly select rows
	clueRow.top = Math.floor(Math.random() * (puzzle.height + 1));
	clueRow.bottom = Math.floor(Math.random() * (puzzle.height + 1));
	while (clueRow.top == clueRow.bottom || clueRow.top > clueRow.bottom) {
		clueRow.top = Math.floor(Math.random() * (puzzle.height + 1));
		clueRow.bottom = Math.floor(Math.random() * (puzzle.height + 1));
	};

	// randomly select column
	clueColumn = Math.floor(Math.random() * (puzzle.width + 1));

	clueTop = gameBoard[clueRow.top][clueColumn];
	clueBottom = gameBoard[clueRow.bottom][clueColumn];
						
	if (solvableTile[clueRow.top][clueColumn] == true && solvableTile[clueRow.bottom][clueColumn] == true) {
		checkPossibilities();
	}
	else {
		$(".verticalClueArea").append('<div class="verticalClue"><div style="background-image:url(' + resources + 'row' + clueRow.top + '/' + clueTop + '.jpg);" class="clue"></div><div style="background-image:url(' + resources + 'row' + clueRow.bottom + '/' + clueBottom + '.jpg);" class="clue"></div></div>')
		clues.push(['vertical', clueRow.top, clueTop, clueRow.bottom, clueBottom]);
		clueNum++;
		checkPossibilities();
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
			new directionClue();
			break;
		case 3:
			new verticalClue();
			break;
	};
};