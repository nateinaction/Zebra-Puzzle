function userInput(row, column, answer) {
	if ($("#" + row + column + answer).hasClass("correct") == false) {
		var answerBool = validateTile(row, column, answer); // is answer correct or incorrect?
		if (answerBool == true) { // if answer is correct
			$("#" + row + column + answer).removeClass("possible").removeClass("impossible").addClass("correct"); // mark the answer as correct
			$("#score").html(score += 5); // add to the score
			block[row][column].state = 'solved'; // and mark the block as solvable in the array
			for (var clean = 0; clean <= 5; clean++) { // then check all columns in the row
				if (column == clean) { // if the column we are checking contains the correct answer
					for (var cleanIncorrectGuesses = 0; cleanIncorrectGuesses <= 5; cleanIncorrectGuesses++) { // check all guesses in a column
						if (cleanIncorrectGuesses != answer && $("#" + row + column + cleanIncorrectGuesses).hasClass("incorrect") == false) { // if the guess we are checking does not match the correct answer and also is not marked as incorrect
							$("#" + row + column + cleanIncorrectGuesses).removeClass("possible").addClass("incorrect"); // mark the guess as incorrect
						};
					};
				}
				else { // if the tile we are checking is not the correct tile
					$("#" + row + clean + answer).removeClass("possible").addClass("incorrect"); // mark the tile as incorrect
			     /* if there is only one guess left in the column, mark it as correct */
					var guessAutoCorrect = new Array();
					for (var guessCount = 0; guessCount <= 5; guessCount++) { // check all guesses in a column
						if ($("#" + row + clean + guessCount).hasClass("possible") == true) { // if there is a possible tile in the column we are checking
							guessAutoCorrect.push(guessCount); // place the position of the guess in an array
						};
						if (guessCount == 5 && guessAutoCorrect.length == 1) { // if we've counted all the guesses and there is only one in the array
						userInput(row, clean, guessAutoCorrect[0]); // recurse the function to mark the guess as correct
					};
				};
			};
		};
	}
	else { // if answer is incorrect
		$("#" + row + column + answer).removeClass("possible").addClass("incorrect"); // mark the guess as incorrect
		$("#score").html(score -= 1); // remove from the score
		/* if there is only one guess left in the column, mark it as correct */
		var guessAutoCorrect = new Array();
		for (var guessCount = 0; guessCount <= 5; guessCount++) { // check all guesses in a column
			if (
				$("#" + row + column + guessCount).hasClass("possible") == true) { // if there is a guess in the column we are checking
					guessAutoCorrect.push(guessCount); // place the position of the guess in an array
				};
				if (guessCount == 5 && guessAutoCorrect.length == 1) { // if we've counted all the guesses and there is only one in the array
					userInput(row, column, guessAutoCorrect[0]); // recurse the function to mark the guess as correct
				};
			};
		};
	};
};