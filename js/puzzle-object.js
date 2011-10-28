/* The Puzzle Object */
/*
		The puzzle object creates, stores, and renders the puzzle state. Think of it as God.
*/
function setupPuzzle() {	
	// setup some variables and objects
	puzzle = {
				version : 1.0,
				status: "in-progress",
				row : Array(), // generate an array of rows
				giveaway : 0,
				solvable : false,
				score : 0,
				time: 0,
				clues : {
					count : 0,
					between : Array(),
					directional : Array(),
					near : Array(),
					vertical : Array(),
					array : Array(),
					// define maximum number of possible rules based on puzzle size
					betweenMax : function betweenMax() {return ((puzzle.preferred.height * puzzle.preferred.height) * puzzle.preferred.height) * (puzzle.preferred.width - 3);},
					directionalMax :
						function directionalMax() {
							var directionalMax = 0;
							for (var x = 1; x < (puzzle.preferred.width - 1); x++) {
								directionalMax += (x * puzzle.preferred.height) * puzzle.preferred.height;
							};
							return directionalMax;
						},
					nearMax : function nearMax() {return ((puzzle.preferred.width - 1) * puzzle.preferred.height) * puzzle.preferred.height;},
					verticalMax : function verticalMax() {return puzzle.preferred.width * puzzle.preferred.height;}
				},
				preferred : {
					rowKind : ["leave-blank", "food-row", "animal-row", "heart-row", "sport-row", "transport-row"],
					height : 5, // the height of the puzzle
					width : 6 // the width of the puzzle
				},
				answers : Array() // generate an array of answers
			};

		for (var rowNumber = 1; rowNumber <= puzzle.preferred.height; rowNumber++) { // for all rows
			puzzle.row[rowNumber] = {
				column : Array(), // generate an array of columns
				answers : Array() // generate an array of answers
			};
			for (var columnNumber = 1; columnNumber <= puzzle.preferred.width; columnNumber++) { // for all columns
				// create answers
				var randomAnswer = (Math.floor(Math.random() * puzzle.preferred.width)) + 1; // generate a random answer to be used for the column
				if (puzzle.row[rowNumber].answers.indexOf(randomAnswer) != -1) { // if the answer has already been used by another column in the row...
					while (puzzle.row[rowNumber].answers.indexOf(randomAnswer) != -1) { // continue generating random answers until an unused answer is generated
						randomAnswer = (Math.floor(Math.random() * puzzle.preferred.width)) + 1;
					};
				};
				puzzle.row[rowNumber].answers.push(randomAnswer);
				puzzle.answers.push(rowNumber.toString() + columnNumber.toString() + randomAnswer.toString());
				// then...
				puzzle.row[rowNumber].column[columnNumber] = {
					solved : { // set all columns as unsolved
						bool : false // set the boolean value of an unsolved column as false
					},
					answer : randomAnswer, // placeholder for the column answer
					tile : Array(), // then generate an array of tiles
					referenced : false,
					restricted : false
				};
				for (var tileNumber = 1; tileNumber <= puzzle.preferred.width; tileNumber++) { // for all tiles
					puzzle.row[rowNumber].column[columnNumber].tile[tileNumber] = {
						flag : { // set all tiles as unflagged
							bool : false // set the boolean value of an unflagged tile as false
						},
						possible : { // set all tiles as possible
							bool : true // set the boolean value of a possible tile as true
						},
						answer : { // set all tiles as incorrect
							bool : false // set the boolean value of an incorrect tile as false
						}
					};
					if (puzzle.row[rowNumber].column[columnNumber].answer == tileNumber) { // if this tile is the answer for the column
						puzzle.row[rowNumber].column[columnNumber].tile[tileNumber].answer.bool = true; // set the boolean value of a correct tile as true
					};
				};
			};
			// each row can have 1 restricted tile for which no clues will reference to increase difficulty
			// choose a random restricted tile
			puzzle.row[rowNumber].column[(Math.floor(Math.random() * puzzle.preferred.width)) + 1].restricted = true;
//			console.log(puzzle.row[rowNumber].answers);
		};

	// while the puzzle is not solvable
		// run function
	while (puzzle.solvable == false) {
		generateClues();
	};
};

function renderPuzzle(puzzle) {	
	if (puzzle.preferred.height >= 3 && puzzle.preferred.width >= 4) { // minimum puzzle size.
		document.write('<div class="puzzle">');
		for (var rowNumber = 1; rowNumber <= puzzle.preferred.height; rowNumber++) { // for all rows
			document.write('<div class="row">');
			for (var columnNumber = 1; columnNumber <= puzzle.preferred.width; columnNumber++) { // for all columns
				document.write('<div class="tile ' + puzzle.preferred.rowKind[rowNumber] + '">');
				document.write('<div class="guesses">');
				for (var tileNumber = 1; tileNumber <= puzzle.preferred.width; tileNumber++) { // for all tiles
					document.write('<a class="guess position-' + tileNumber + ' ' + puzzle.preferred.rowKind[rowNumber] + ' ' + tileKind(rowNumber, tileNumber) + '" title="' + tileKind(rowNumber, tileNumber) + '" id="' + rowNumber + columnNumber + tileNumber + '"></a>');
				};
				document.write('</div>');
				document.write('</div>');
			};
			document.write('</div>');
		};
		document.write('<div class="hide-button off"><strong>HIDE</strong></div>');
		document.write('</div>');
		document.write('<div class="clues"><ol></ol></div>');
	}
	else {
		console.log("Puzzle size too small, please choose 3x4 or higher.");
	};

	// FUNCTION TO DISPLAY CLUES
	for (var x = 0, max = puzzle.clues.array.length; x < max; x++){
		displayClue(puzzle.clues.array[x]);
	};	
};
