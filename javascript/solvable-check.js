function solvableBlockCheck(row, column) {
	var numberPossible = 6;
	var possibleAnswer;
	for (var guess = 0; guess < puzzle.width; guess++) { // for each guess in a block
		if ($("#" + row + column + guess).hasClass("flagged") == true) {
			--numberPossible;
		}
		else {
			possibleAnswer = guess;
		};
	};
	if (numberPossible == 1) {
		console.log(row + ", " + column + ", " + possibleAnswer);
		userInput(row, column, possibleAnswer);
	};
};

function solvablePuzzleCheck() {
	for (var row = 0; row < puzzle.height; row ++) {
		for (var column = 0; column < puzzle.width; column ++) {
			solvableBlockCheck(row, column);
		};
	};
// if not solvable, random clue	if ()
};
            
function isPossible(row, column, guess) {
	if ($("#" + row + column + guess).hasClass("guess") == true && $("#" + row + column + guess).hasClass("flagged") == false || $("#" + row + column + guess).hasClass("correct") == true) {
		return true;
	}
	else {
		return false;
	};
};

function setPossible(bool, row, column, guess) {
	if (bool == true) {
		$("#" + row + column + guess).removeClass("flagged");
	}
	else {
		$("#" + row + column + guess).addClass("flagged");
		solvableBlockCheck(row, column);
	};
};

/*	Using all available rules, the purpose of this function
		is to deduce the answer by ruling out possibilities.
		Whenever a possibility is ruled out this function recurses. */ 
function solvableCheck() {
	var recheck = false;
	for (var column = 0; column < puzzle.width; column++) { // for every column
		// vertical clues get checked
		for (var possibilities = 0; possibilities < clues.vertical.length; possibilities++) { // for every vertical clue
			var clueRow = Object(),
					clueAnswer = Object();
                                
			clueRow.top = clues.vertical[possibilities][0],
			clueAnswer.top = clues.vertical[possibilities][1],
			clueRow.bottom = clues.vertical[possibilities][2],
			clueAnswer.bottom = clues.vertical[possibilities][3];

			if (isPossible(clueRow.top, column, clueAnswer.top) == false && isPossible(clueRow.bottom, column, clueAnswer.bottom) == true) {
				setPossible(false, clueRow.bottom, column, clueAnswer.bottom);
				recheck = true;
			};
			if (isPossible(clueRow.bottom, column, clueAnswer.bottom) == false && isPossible(clueRow.top, column, clueAnswer.top) == true) {
				setPossible(false, clueRow.top, column, clueAnswer.top);
				recheck = true;
			};
		};
		// near clues get checked
		for (var possibilities = 0; possibilities < clues.near.length; possibilities++) { // for every near clue
			var clueRow = Object(),
					clueAnswer = Object();
                                
			clueRow.left = clues.near[possibilities][0],
			clueAnswer.left = clues.near[possibilities][1],
			clueRow.right = clues.near[possibilities][2],
			clueAnswer.right = clues.near[possibilities][3];

			for (var wing = 0; wing <= 1; wing++) {
				if (wing == 0) {
					var wingRow = Object(),
							wingAnswer = Object();
					wingRow.one = clueRow.left,
					wingAnswer.one = clueAnswer.left,
					wingRow.two = clueRow.right,
					wingAnswer.two = clueAnswer.right;
				}
				else {
					var wingRow = Object(),
							wingAnswer = Object();
					wingRow.one = clueRow.right,
					wingAnswer.one = clueAnswer.right,
					wingRow.two = clueRow.left,
					wingAnswer.two = clueAnswer.left;
				};
				if (column == 0) {
					if (isPossible(wingRow.two, column + 1, wingAnswer.two) == false && isPossible(wingRow.one, column, wingAnswer.one) == true) {
						setPossible(false, wingRow.one, column, wingAnswer.one);
						recheck = true;
					};
				}
				else if (column == (puzzle.width - 1)) {
					if (isPossible(wingRow.two, column - 1, wingAnswer.two) == false && isPossible(wingRow.one, column, wingAnswer.one) == true) {
						setPossible(false, wingRow.one, column, wingAnswer.one);
						recheck = true;
					};
				}
				else {
					if ((isPossible(wingRow.two, column + 1, wingAnswer.two) == false) && (isPossible(wingRow.two, column - 1, wingAnswer.two) == false) && isPossible(wingRow.one, column, wingAnswer.one) == true) {
						setPossible(false, wingRow.one, column, wingAnswer.one);
						recheck = true;
					};
				};
			};
		};
		// directional clues get checked
		for (var possibilities = 0; possibilities < clues.directional.length; possibilities++) { // for every directional clue
			var clueRow = Object(),
					clueAnswer = Object();

			clueRow.left = clues.directional[possibilities][0],
			clueAnswer.left = clues.directional[possibilities][1],
			clueRow.right = clues.directional[possibilities][2],
			clueAnswer.right = clues.directional[possibilities][3];
                            
			// LEFT:    if right tile is possible on column AND not possible (or undefined) on column + 1
			//          then left tile/s from column to puzzle.width are not possible. break.
l:		if (isPossible(clueRow.right, column, clueAnswer.right) == true && (column + 1 > (puzzle.width - 1) || isPossible(clueRow.right, column + 1, clueAnswer.right == false))) {
				for (var x = column; x <= (puzzle.width - 1); x++) {
					if (isPossible(clueRow.left, x, clueAnswer.left) == true) {
						setPossible(false, clueRow.left, x, clueAnswer.left);
						recheck = true;
					};
				};
				break l;
			};
			// RIGHT:   if left tile is possible on column AND not possible (or undefined) on column - 1
			//          then right tile/s from 0 to column are not possible. break.
r:		if (isPossible(clueRow.left, column, clueAnswer.left) == true && (column - 1 < 0 || isPossible(clueRow.left, column - 1, clueAnswer.left == false))) {
				for (var x = 0; x <= column; x++) {
					if (isPossible(clueRow.right, x, clueAnswer.right) == true) {
						setPossible(false, clueRow.right, x, clueAnswer.right);
						recheck = true;
					};
				};
				break r;
			};
		};
		// between clues get checked
		for (var possibilities = 0; possibilities < clues.between.length; possibilities++) { // for every between clue
			var clueRow = Object(),
					clueAnswer = Object();

			clueRow.left = clues.between[possibilities][0],
			clueAnswer.left = clues.between[possibilities][1],
			clueRow.center = clues.between[possibilities][2],
			clueAnswer.center = clues.between[possibilities][3],
			clueRow.right = clues.between[possibilities][4],
			clueAnswer.right = clues.between[possibilities][5];
                            
			// rules for center tile
			// center tile can not be on the edge of the board
			// left and right wings must be possible in columns directly adjacent to center column
			// if both wing one and wing two in the column directly adjacent to the center are not possible then the center is also not possible
			if (isPossible(clueRow.center, column, clueAnswer.center) == true && (column == 0 || column == (puzzle.width - 1) || (isPossible(clueRow.left, column + 1, clueAnswer.left) == false && isPossible(clueRow.left, column - 1, clueAnswer.left) == false) || (isPossible(clueRow.right, column + 1, clueAnswer.right) == false && isPossible(clueRow.right, column - 1, clueAnswer.right) == false) || (isPossible(clueRow.right, column - 1, clueAnswer.right) == false && isPossible(clueRow.left, column - 1, clueAnswer.left) == false) || (isPossible(clueRow.right, column + 1, clueAnswer.right) == false && isPossible(clueRow.left, column + 1, clueAnswer.left) == false))) {
				setPossible(false, clueRow.center, column, clueAnswer.center);
				recheck = true;
			};
                            
			// rules for wings
			// wing tile must be touching center tile column
			// second wing tile must be 2 columns away
			for (var wing = 0; wing <= 1; wing++) {
				if (wing == 0) {
					var wingRow = Object(),
							wingAnswer = Object();
					wingRow.one = clueRow.left,
					wingAnswer.one = clueAnswer.left,
					wingRow.two = clueRow.right,
					wingAnswer.two = clueAnswer.right;
				}
				else {
					var wingRow = Object(),
							wingAnswer = Object();
					wingRow.one = clueRow.right,
					wingAnswer.one = clueAnswer.right,
					wingRow.two = clueRow.left,
					wingAnswer.two = clueAnswer.left;
				};
				if (column <= 1) {
					if ((isPossible(clueRow.center, column + 1, clueAnswer.center) == false || isPossible(wingRow.two, column + 2, wingAnswer.two) == false) && isPossible(wingRow.one, column, wingAnswer.one) == true) {
						setPossible(false, wingRow.one, column, wingAnswer.one);
						recheck = true;
					};
				}
				else if (column >= (puzzle.width - 2)) {
					if ((isPossible(clueRow.center, column - 1, clueAnswer.center) == false || isPossible(wingRow.two, column - 2, wingAnswer.two) == false) && isPossible(wingRow.one, column, wingAnswer.one) == true) {
						setPossible(false, wingRow.one, column, wingAnswer.one);
						recheck = true;
					};
				}
				else {
					if (((isPossible(clueRow.center, column + 1, clueAnswer.center) == false || isPossible(wingRow.two, column + 2, wingAnswer.two) == false) && (isPossible(clueRow.center, column - 1, clueAnswer.center) == false || isPossible(wingRow.two, column - 2, wingAnswer.two) == false)) && isPossible(wingRow.one, column, wingAnswer.one) == true) {
						setPossible(false, wingRow.one, column, wingAnswer.one);
						recheck = true;
					};
				};
			};
		};
	};
                
	// if puzzle is solvable, stop. else, generate new clue.
	if (recheck == true) {
		//checkSolvable();
		solvableCheck();
	}
	else {
		randomClue();
	};
};