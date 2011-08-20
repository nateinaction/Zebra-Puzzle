function validateAnswer(row, column, answer) {
        	    if (answer == gameBoard[row][column]) {
			        return true;
			    }
			    else {
			        return false;
			    };
			};
            
            function isSolvable(row, column) {
                var possibilities = 0;
                if (solvableTile[row][column] == true) {
                    return true;
                }
                else {
                    for (var guess = 0; guess <= puzzle.height; guess++) {
                        if (tile[row][column][guess] == true) {
                            possibilities++;
                        };
                    };
                    if (possibilities == 1) {
                        return true;
                        solvableTile[row][column] = true;
                        changeCSS(row, column, gameBoard[row][column]);
                    }
                    else {
                        return false;
                    };
                };
            };
            
            function checkSolvable() {
                for (var row = 0; row <= puzzle.height; row++) { // for each row
                    for (var column = 0; column <= puzzle.width; column++) { // for every column
                        isSolvable(row, column);
                    };
                };
            };
            
            function isPossible(row, column, guess) {
                if (tile[row][column][guess] == true) {
                    return true;
                }
                else {
                    return false;
                };
            };
            
            function setPossible(bool, row, column, guess) {
                if (bool == true) {
                    tile[row][column][guess] = true;
                    $("#" + row + column + guess).removeClass("invisible");
                }
                else {
                    tile[row][column][guess] = false;
                    $("#" + row + column + guess).addClass("invisible");
                };
            };
            
            /*  Using all available rules, the purpose of this function
                is to deduce the answer by ruling out possibilities.
                Whenever a possibility is ruled out this function recurses. */ 
            function checkPossibilities() {
                var recheck = false;
                for (var possibilities = 0; possibilities < clueNum; possibilities++) { // for each clue
                    for (var column = 0; column <= puzzle.width; column++) { // for every column
                        console.log("possibility " + possibilities + ", column " + column);
                        // vertical clues get checked
                        if (clues[possibilities][0] == 'vertical') {
                            var clueRow = Object(),
                                clueAnswer = Object();
                                
                            clueRow.top = clues[possibilities][1],
                            clueAnswer.top = clues[possibilities][2],
                            clueRow.bottom = clues[possibilities][3],
                            clueAnswer.bottom = clues[possibilities][4];

                            if (isPossible(clueRow.top, column, clueAnswer.top) == false && isPossible(clueRow.bottom, column, clueAnswer.bottom) == true) {
                                setPossible(false, clueRow.bottom, column, clueAnswer.bottom);
                                recheck = true;
                            };
                            if (isPossible(clueRow.bottom, column, clueAnswer.bottom) == false && isPossible(clueRow.top, column, clueAnswer.top) == true) {
                                setPossible(false, clueRow.top, column, clueAnswer.top);
                                recheck = true;
                            };
                        }
                        // near clues get checked
                        else if (clues[possibilities][0] == 'near') {
                            var clueRow = Object(),
                                clueAnswer = Object();
                                
                            clueRow.left = clues[possibilities][1],
                            clueAnswer.left = clues[possibilities][2],
                            clueRow.right = clues[possibilities][3],
                            clueAnswer.right = clues[possibilities][4];

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
                                else if (column == puzzle.width) {
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
                        }
                        // direction clues get checked
                        else if (clues[possibilities][0] == 'direction') {
                            var clueRow = Object(),
                                clueAnswer = Object();
                            
                            clueRow.left = clues[possibilities][1],
                            clueAnswer.left = clues[possibilities][2],
                            clueRow.right = clues[possibilities][3],
                            clueAnswer.right = clues[possibilities][4];
                            
                            // LEFT:    if right tile is possible on column AND not possible (or undefined) on column + 1
                            //          then left tile/s from column to puzzle.width are not possible. break.
                    left:   if (isPossible(clueRow.right, column, clueAnswer.right) == true && (column + 1 > puzzle.width || isPossible(clueRow.right, column + 1, clueAnswer.right == false))) {
                                for (var x = column; x <= puzzle.width; x++) {
                                    if (isPossible(clueRow.left, x, clueAnswer.left) == true) {
                                        setPossible(false, clueRow.left, x, clueAnswer.left);
                                        recheck = true;
                                    };
                                };
                                break left;
                            };
                            // RIGHT:   if left tile is possible on column AND not possible (or undefined) on column - 1
                            //          then right tile/s from 0 to column are not possible. break.
                    right:  if (isPossible(clueRow.left, column, clueAnswer.left) == true && (column - 1 < 0 || isPossible(clueRow.left, column - 1, clueAnswer.left == false))) {
                                for (var x = 0; x <= column; x++) {
                                    if (isPossible(clueRow.right, x, clueAnswer.right) == true) {
                                        setPossible(false, clueRow.right, x, clueAnswer.right);
                                        recheck = true;
                                    };
                                };
                                break right;
                            };
                        }
                        // between clues get checked
                        else if (clues[possibilities][0] == 'between') {
                            var clueRow = Object(),
                                clueAnswer = Object();
                                
                            clueRow.left = clues[possibilities][1],
                            clueAnswer.left = clues[possibilities][2],
                            clueRow.center = clues[possibilities][3],
                            clueAnswer.center = clues[possibilities][4],
                            clueRow.right = clues[possibilities][5],
                            clueAnswer.right = clues[possibilities][6];
                            
                            // rules for center tile
                            // center tile can not be on the edge of the board
                            // left and right wings must be possible in columns directly adjacent to center column
                            // if both wing one and wing two in the column directly adjacent to the center are not possible then the center is also not possible
                            if (isPossible(clueRow.center, column, clueAnswer.center) == true && (column == 0 || column == puzzle.width || (isPossible(clueRow.left, column + 1, clueAnswer.left) == false && isPossible(clueRow.left, column - 1, clueAnswer.left) == false) || (isPossible(clueRow.right, column + 1, clueAnswer.right) == false && isPossible(clueRow.right, column - 1, clueAnswer.right) == false) || (isPossible(clueRow.right, column - 1, clueAnswer.right) == false && isPossible(clueRow.left, column - 1, clueAnswer.left) == false) || (isPossible(clueRow.right, column + 1, clueAnswer.right) == false && isPossible(clueRow.left, column + 1, clueAnswer.left) == false))) {
                                setPossible(false, clueRow.center, column, clueAnswer.center);
                                console.log(clueRow.center + ", " + column + ", " + clueAnswer.center + ", " + tile[clueRow.center][column][clueAnswer.center]);
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
                                else if (column >= puzzle.width - 1) {
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
    		    };
                
                // if puzzle is solvable, stop. else, generate new clue.
/*                for (var row = 0; row <= puzzle.height; row++) {
                    for (var column = 0; column <= puzzle.height; column++) {
                        for (var guess = 0; guess <= puzzle.height; guess++) {
                            if (tile[row][column][guess] == true) {
                                possibilities++
                            };
                        };
                    };
                };
                if (possibilities == puzzle.height * puzzle.width) {
                    solvable = true;
                }
*/                if (recheck == true) {
                    checkSolvable();
                    checkPossibilities();
                };
/*                else {
                    console.log(possibilities - puzzle.height * puzzle.width + " possibilities remain unsolvable");
                    betweenClue();
                };
*/            };