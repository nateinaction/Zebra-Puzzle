/* The Puzzle Object */

function newPuzzle() {	
	// setup some variables and objects
	puzzle = {
				height : 3, // the height of the puzzle
				width : 6, // the width of the puzzle
				row : Array(), // generate an array of rows
				solvable : false, // set the puzzle as not solvable
				giveaway : 0,
				score : {
					points : 0
				},
				clues : {
					count : 0,
					between : Array(),
					directional : Array(),
					near : Array(),
					vertical : Array(),
					// define maximum number of possible rules based on puzzle size
					betweenMax : function betweenMax() {return ((puzzle.height * puzzle.height) * puzzle.height) * (puzzle.width - 3);},
					directionalMax :
						function directionalMax() {
							var directionalMax = 0;
							for (var x = 1; x < (puzzle.width - 1); x++) {
								directionalMax += (x * puzzle.height) * puzzle.height;
							};
							return directionalMax;
						},
					nearMax : function nearMax() {return ((puzzle.width - 1) * puzzle.height) * puzzle.height;},
					verticalMax : function verticalMax() {return puzzle.width * puzzle.height;}
				}
			};

	if (puzzle.height >= 3 && puzzle.width >= 4) { // minimum puzzle size.
		document.write('<div class="board">');
		for (var rowNumber = 1; rowNumber <= puzzle.height; rowNumber++) { // for all rows
			puzzle.row[rowNumber] = {
				column : Array(), // generate an array of columns
				answers : Array() // generate an array of answers
			};
			document.write('<div class="row">');
			for (var columnNumber = 1; columnNumber <= puzzle.width; columnNumber++) { // for all columns
				// create answers
				var randomAnswer = (Math.floor(Math.random() * puzzle.width)) + 1; // generate a random answer to be used for the column
				if (puzzle.row[rowNumber].answers.indexOf(randomAnswer) != -1) { // if the answer has already been used by another column in the row...
					while (puzzle.row[rowNumber].answers.indexOf(randomAnswer) != -1) { // continue generating random answers until an unused answer is generated
						randomAnswer = (Math.floor(Math.random() * puzzle.width)) + 1;
					};
				};
				puzzle.row[rowNumber].answers.push(randomAnswer);
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
				document.write('<div class="column">');
				document.write('<div class="padding">');
				for (var tileNumber = 1; tileNumber <= puzzle.width; tileNumber++) { // for all tiles
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
					function flagStatus() {
						if (puzzle.row[rowNumber].column[columnNumber].tile[tileNumber].flag.bool == true) {
							return "flagged";
						}
						else {
							return "unflagged";
						};
					};
					function flagChange(rowNumber, columnNumber, tileNumber) {
						puzzle.row[rowNumber].column[columnNumber].tile[tileNumber].flag.bool = true;
						console.log(puzzle.row[rowNumber].column[columnNumber].tile[tileNumber].flag.bool);
					};
					document.write('<div id="' + rowNumber + columnNumber + tileNumber + '" style="background-image:url(' + resources + 'row' + rowNumber + '/' + tileNumber + '.jpg);" class="' + flagStatus() + '"></div>');
					$("#" + rowNumber + columnNumber + tileNumber).click(function(rowNumber, columnNumber, tileNumber) {
						console.log(rowNumber);
						return function() {
							console.log("test");
							userInput(rowNumber, columnNumber, tileNumber);
						};
					}(rowNumber, columnNumber, tileNumber));
					function rightClick(rowNumber, columnNumber, tileNumber) {
						console.log(event);
					}
					$("#" + rowNumber + columnNumber + tileNumber).rightClick( function(puzzle) {
						if (this.hasClass("flagged") == true) {
							$(this).removeClass("flagged");
//							window.puzzle.row[rowNumber].column[columnNumber].tile[tileNumber].flag.bool = false;
//							console.log(window.puzzle.row[rowNumber].column[columnNumber].tile[tileNumber].flag.string);
						}
						else if (this.hasClass("unflagged") == true && this.hasClass("correct") == false) {
							$(this).addClass("flagged");
//							window.puzzle.row[rowNumber].column[columnNumber].tile[tileNumber].flag.bool = true;
//							console.log(window.puzzle.row[rowNumber].column[columnNumber].tile[tileNumber].flag.string);
						};
					});
				};
				document.write('</div>');
				document.write('</div>');
			};
			// each row can have 1 restricted tile for which no clues will reference to increase difficulty
			// choose a random restricted tile
			puzzle.row[rowNumber].column[(Math.floor(Math.random() * puzzle.width)) + 1].restricted = true;
//			console.log(puzzle.row[rowNumber].answers);
			document.write('</div>');
		};
		document.write('</div>');
		document.write('<div class="horizontalClueArea"></div>');
		document.write('<div class="verticalClueArea"></div>');
	}
	else {
		console.log("Puzzle size too small, please choose 3x4 or higher.");
	};
	/*		
			var audio = {
						correct : document.createElement('audio'),
						incorrect : document.createElement('audio')
					};
			audio.correct.setAttribute('src', './audio/correct.mp3');
			audio.incorrect.setAttribute('src', './audio/incorrect.mp3');
	*/

	// while the puzzle is not solvable
		// run function
	while (puzzle.solvable == false) {
		generateClues();
	};
};