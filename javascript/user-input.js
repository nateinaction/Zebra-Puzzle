function userInput(rowNumber, columnNumber, tileNumber, scoreThis) {
	console.log('test');
	if (scoreThis == undefined) scoreThis = true;
	if (puzzle.row[rowNumber].column[columnNumber].solved.bool == false) { // if the tile has not been solved
		if (puzzle.row[rowNumber].column[columnNumber].tile[tileNumber].answer.bool == true) { // and the answer is correct
			console.log("correct");
			$("#" + rowNumber + columnNumber + tileNumber).removeClass("possible").removeClass("impossible").addClass("correct"); // mark the answer as correct
			if (scoreThis == true) {
				puzzle.score.points += 5; // add to the score
				//audio.correct.play();
			};
			puzzle.row[rowNumber].column[columnNumber].solved.string = 'solved'; // and mark the block as solvable in the array
			puzzle.row[rowNumber].column[columnNumber].solved.bool = true;
			for (var clean = 1; clean <= 6; clean++) { // then check all columns in the row
				if (columnNumber == clean) { // if the column we are checking contains the correct answer
					for (var cleanIncorrectGuesses = 1; cleanIncorrectGuesses <= 6; cleanIncorrectGuesses++) { // check all guesses in a column
						if (cleanIncorrectGuesses != tileNumber && $("#" + rowNumber + columnNumber + cleanIncorrectGuesses).hasClass("incorrect") == false) { // if the guess we are checking does not match the correct answer and also is not marked as incorrect
							$("#" + rowNumber + columnNumber + cleanIncorrectGuesses).removeClass("possible").addClass("incorrect"); // mark the guess as incorrect
							puzzle.row[rowNumber].column[clean].tile[tileNumber].possible.bool = false;
						};
					};
				}
				else { // if the tile we are checking is not the correct tile
					$("#" + rowNumber + clean + tileNumber).removeClass("possible").addClass("incorrect"); // mark the tile as incorrect
					puzzle.row[rowNumber].column[clean].tile[tileNumber].possible.bool = false;
			     /* if there is only one guess left in the column, mark it as correct */
					var guessAutoCorrect = new Array();
					for (var guessCount = 1; guessCount <= 6; guessCount++) { // check all guesses in a column
						if (puzzle.row[rowNumber].column[clean].tile[guessCount].possible.bool == true) { // if there is a possible tile in the column we are checking
							guessAutoCorrect.push(guessCount); // place the position of the guess in an array
						};
						if (guessCount == 6 && guessAutoCorrect.length == 1) { // if we've counted all the guesses and there is only one in the array
							userInput(rowNumber, clean, guessAutoCorrect[0]); // recurse the function to mark the guess as correct
						};
					};
				};
			};
		}
		else { // if answer is incorrect
			console.log("incorrect");
			$("#" + rowNumber + columnNumber + tileNumber).removeClass("possible").addClass("incorrect"); // mark the guess as incorrect
			puzzle.row[rowNumber].column[columnNumber].tile[tileNumber].possible.bool = false;
			if (scoreThis == false) {
				puzzle.score.points -= 1; // remove from the score
				//audio.incorrect.play();
			};
			/* if there is only one guess left in the column, mark it as correct */
			var guessAutoCorrect = new Array();
			for (var guessCount = 1; guessCount <= 6; guessCount++) { // check all guesses in a column
				if (puzzle.row[rowNumber].column[columnNumber].tile[guessCount].possible.bool == true) { // if there is a possible tile in the column we are checking
					guessAutoCorrect.push(guessCount); // place the position of the guess in an array
				};
				if (guessCount == 6 && guessAutoCorrect.length == 1) { // if we've counted all the guesses and there is only one in the array
					userInput(rowNumber, columnNumber, guessAutoCorrect[0]); // recurse the function to mark the guess as correct
				};
			};
		};
	};
};