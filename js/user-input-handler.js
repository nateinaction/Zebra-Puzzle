/* The User Input Handler */
/*
		The user input handler manages what happens when a user clicks on, hovers over, or touches an object.
*/
$(function(){
	
	// what does the hide button do.
	$(".hide-button").click(function() {
		if ($(this).hasClass("on")) {
			$(this).removeClass("on");
			$(this).addClass("off");
			hideButton = false;
		}
		else {
			$(this).removeClass("off");
			$(this).addClass("on");
			hideButton = true;
		}
	});
	
	// when a mouse hovers over a tile...
	
	// if the answer is correct do the following
	$(".guess").click(function() {
		if (hideButton == true) {
			if ($(this).hasClass("hidden")) {
				$(this).removeClass("hidden");
			}
			else {
				$(this).addClass("hidden");
			};
		}
		else {
			rowNumber = this.id.substring(0, 1);
			columnNumber = this.id.substring(1, 2);
			tileNumber = this.id.substring(2, 3);
			if (!isCorrect(rowNumber, columnNumber, tileNumber)) {
				$(this).addClass("incorrect");
			};
			userInput(rowNumber, columnNumber, tileNumber);
		};
	});
	
	// clues will become translucent if tapped
	$(".clues li").click(function() {
		if ($(this).hasClass("translucent")) {
			$(this).removeClass("translucent");
		}
		else {
			$(this).addClass("translucent");
		}
	});
});

function userInput(rowNumber, columnNumber, tileNumber) {	
	if (isCorrect(rowNumber, columnNumber, tileNumber)) { // if the answer is correct
		console.log("correct");

		var id = rowNumber.toString() + columnNumber.toString() + tileNumber.toString();
		// Run through this jQuery to display the correct answer
		// hide the guesses area of the tile
		$('#' + id).parent().hide();
		$('#' + id).parent().parent().addClass("correct");
		// then change the tile background to the appropiate sprite
		if ($('#' + id).parent().parent().hasClass("food-row")) {
			$('#' + id).parent().parent().css("background-image", "url(./images/food-row/sprite.png)");
		}
		else if ($('#' + id).parent().parent().hasClass("animal-row")) {
			$('#' + id).parent().parent().css("background-image", "url(./images/animal-row/sprite.png)");
		}
		else if ($('#' + id).parent().parent().hasClass("heart-row")) {
			$('#' + id).parent().parent().css("background-image", "url(./images/heart-row/sprite.png)");
		}
		else if ($('#' + id).parent().parent().hasClass("sport-row")) {
			$('#' + id).parent().parent().css("background-image", "url(./images/sport-row/sprite.png)");
		}
		else if ($('#' + id).parent().parent().hasClass("transport-row")) {
			$('#' + id).parent().parent().css("background-image", "url(./images/transport-row/sprite.png)");
		};
		// then tell the tile which position is the appropriate picture of the sprite
		if ($('#' + id).hasClass("position-1")) {
			$('#' + id).parent().parent().css("background-position", "0px -30px");
		}
		else if ($('#' + id).hasClass("position-2")) {
			$('#' + id).parent().parent().css("background-position", "-100px -30px");
		}
		else if ($('#' + id).hasClass("position-3")) {
			$('#' + id).parent().parent().css("background-position", "-200px -30px");
		}
		else if ($('#' + id).hasClass("position-4")) {
			$('#' + id).parent().parent().css("background-position", "-300px -30px");
		}
		else if ($('#' + id).hasClass("position-5")) {
			$('#' + id).parent().parent().css("background-position", "-400px -30px");
		}
		else if ($('#' + id).hasClass("position-6")) {
			$('#' + id).parent().parent().css("background-position", "-500px -30px");
		};

		puzzle.score.points += 5; // add points to the score

		for (var clean = 1; clean <= puzzle.preferred.width; clean++) { // then check all columns in the row
			if (!$('#' + rowNumber.toString() + clean.toString() + tileNumber.toString()).parent().parent().hasClass("correct")) { // if the column has not already been answered
				$("#" + rowNumber + clean + tileNumber).addClass("incorrect"); // mark the tile as incorrect
				puzzle.row[rowNumber].column[clean].tile[tileNumber].possible.bool = false;
		     /* if there is only one guess left in the column, mark it as correct */
				var guessAutoCorrect = new Array();
				for (var guessCount = 1; guessCount <= puzzle.preferred.width; guessCount++) { // check all guesses in a column
					if (puzzle.row[rowNumber].column[clean].tile[guessCount].possible.bool == true) { // if there is a possible tile in the column we are checking
						guessAutoCorrect.push(guessCount); // place the position of the guess in an array
					};
					if (guessCount == puzzle.preferred.width && guessAutoCorrect.length == 1) { // if we've counted all the guesses and there is only one in the array
						userInput(rowNumber, clean, guessAutoCorrect[0]); // recurse the function to mark the guess as correct
					};
				};
			};
		};
	}
	else { // if answer is incorrect
		console.log("incorrect");
		$("#" + rowNumber + columnNumber + tileNumber).addClass("incorrect"); // mark the guess as incorrect
		puzzle.row[rowNumber].column[columnNumber].tile[tileNumber].possible.bool = false;
		puzzle.score.points -= 1; // remove from the score
		
		// check all the columns to see if there is only one type of that tile left in the puzzle
		var numberPossible = puzzle.preferred.width;
		var tempColumnNumber;
		for (var clean = 1; clean <= puzzle.preferred.width; clean++) { // check all columns in the row
			if (!$('#' + rowNumber.toString() + clean.toString() + tileNumber.toString()).parent().parent().hasClass("correct")) { // if the column has not already been answered
				if ($("#" + rowNumber + clean + tileNumber).hasClass("incorrect")) { // if the tile is not marked as incorrect
					--numberPossible; // remove 1 from the number of possible tiles
				}
				else {
					tempColumnNumber = clean;
				};
			}
			else { // if the column has been answered
				--numberPossible; // remove 1 from the number of possible tiles
			};
		};
		// if the number of possible tiles is 1 then mark that tile as correct
		if (numberPossible == 1) {
			userInput(rowNumber, tempColumnNumber, tileNumber); // recurse the function to mark the guess as correct
		};
		
		/* if there is only one guess left in the column, mark it as correct */
		var guessAutoCorrect = new Array();
		for (var guessCount = 1; guessCount <= puzzle.preferred.width; guessCount++) { // check all guesses in a column
			if (puzzle.row[rowNumber].column[columnNumber].tile[guessCount].possible.bool == true) { // if there is a possible tile in the column we are checking
				guessAutoCorrect.push(guessCount); // place the position of the guess in an array
			};
			if (guessCount == puzzle.preferred.width && guessAutoCorrect.length == 1) { // if we've counted all the guesses and there is only one in the array
				userInput(rowNumber, columnNumber, guessAutoCorrect[0]); // recurse the function to mark the guess as correct
			};
		};
	};
};