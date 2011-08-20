function changeCSS(row, column, answer) {
                if ($("#" + row + column + answer).hasClass("correct") == false) {
        	        var answerBool = validateAnswer(row, column, answer); // is answer correct or incorrect?
			        if (answerBool == true) { // if answer is correct
			            $("#" + row + column + answer).removeClass("guess").removeClass("invisible").addClass("correct"); // mark the answer as correct
			            $("#score").html(score += 5); // and add to the score
			            for (var clean = 0; clean <= 5; clean++) { // then check all columns in the row
			                if (column == clean) { // if the column we are checking contains the correct answer
			                    for (var cleanIncorrectGuesses = 0; cleanIncorrectGuesses <= 5; cleanIncorrectGuesses++) { // check all guesses in a column
			                        if (cleanIncorrectGuesses != answer && $("#" + row + column + cleanIncorrectGuesses).hasClass("incorrect") == false) { // if the guess we are checking does not match the correct answer and also is not marked as incorrect
			                            $("#" + row + column + cleanIncorrectGuesses).removeClass("guess").addClass("incorrect"); // mark the guess as incorrect
			                        };
			                    };
			                }
			                else { // if the column we are checking does not contain the correct answer
			                    $("#" + row + clean + answer).removeClass("guess").addClass("incorrect"); // mark the incorrect answer as incorrect
			                    /* if there is only one guess left in the column, mark it as correct */
			                    var guessAutoCorrect = new Array();
			                    for (var guessCount = 0; guessCount <= 5; guessCount++) { // check all guesses in a column
			                        if ($("#" + row + clean + guessCount).hasClass("guess") == true) { // if there is a guess in the column we are checking
			                            guessAutoCorrect.push(guessCount); // place the position of the guess in an array
			                        };
			                        if (guessCount == 5 && guessAutoCorrect.length == 1) { // if we've counted all the guesses and there is only one in the array
			                            changeCSS(row, clean, guessAutoCorrect[0]); // recurse the function to mark the guess as correct
			                        };
			                    };
			                };
			            };
			        }
			        else { // if answer is incorrect
			            $("#" + row + column + answer).removeClass("guess").addClass("incorrect"); // mark the guess as incorrect
			            $("#score").html(score -= 1); // remove from the score
			            /* if there is only one guess left in the column, mark it as correct */
			            var guessAutoCorrect = new Array();
			            for (var guessCount = 0; guessCount <= 5; guessCount++) { // check all guesses in a column
			                if ($("#" + row + column + guessCount).hasClass("guess") == true) { // if there is a guess in the column we are checking
			                    guessAutoCorrect.push(guessCount); // place the position of the guess in an array
			                };
			                if (guessCount == 5 && guessAutoCorrect.length == 1) { // if we've counted all the guesses and there is only one in the array
			                    changeCSS(row, column, guessAutoCorrect[0]); // recurse the function to mark the guess as correct
			                };
			            };
			        };
			    };
			};