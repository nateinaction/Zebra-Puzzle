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
                
	var clueLeft = block.answer[clueRow.left][clueColumn.left],
			clueCenter = block.answer[clueRow.center][clueColumn.center],
			clueRight = block.answer[clueRow.right][clueColumn.right];
			
	// check for repeating between clues
	var tempArray = [clueRow.left, clueLeft, clueRow.center, clueCenter, clueRow.right, clueRight], tempArrayInverse = [clueRow.right, clueRight, clueRow.center, clueCenter, clueRow.left, clueLeft], repeat = false;
	for (var x = 0; x < clues.between.length; x++) {
		if (tempArray == clues.between[x] || tempArrayInverse == clues.between[x]){
			repeat = true;
		};
	};
	
	if ((block.solvable[clueRow.left][clueColumn.left] == true && block.solvable[clueRow.center][clueColumn.center] == true && block.solvable[clueRow.right][clueColumn.right] == true) || repeat == true) {
		randomClue(); // if all three blocks are solvable, we don't need another clue.
	}
	else {
		clueNum++;
		$(".horizontalClueArea").append('<div class="horizontalClue clue' + clueNum + '"><div class="betweenClue" style="background-image:url(' + resources + 'clues/between.gif);"></div><div style="background-image:url(' + resources + 'row' + clueRow.left + '/' + clueLeft + '.jpg);" class="clue"></div><div style="background-image:url(' + resources + 'row' + clueRow.center + '/' + clueCenter + '.jpg);" class="clue"></div><div style="background-image:url(' + resources + 'row' + clueRow.right + '/' + clueRight + '.jpg);" class="clue"></div></div>');
		$(".clue" + clueNum).rightClick( function(e) {
			if (this.hasClass("flagged") == true) {
				$(this).removeClass("flagged");
			}
			else if (this.hasClass("flagged") == false) {
				$(this).addClass("flagged");
			};
		});
		clues.between.push([clueRow.left, clueLeft, clueRow.center, clueCenter, clueRow.right, clueRight]);
	};
};
            
function directionalClue() {
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
							
	var clueLeft = block.answer[clueRow.left][clueColumn.left],
			clueRight = block.answer[clueRow.right][clueColumn.right];

	// check for repeating directional clues
	var tempArray = [clueRow.left, clueLeft, clueRow.right, clueRight], repeat = false;
	for (var x = 0; x < clues.directional.length; x++) {
		if (tempArray == clues.directional[x]){
			repeat = true;
		};
	};
	
	if ((block.solvable[clueRow.left][clueColumn.left] == true && block.solvable[clueRow.right][clueColumn.right] == true) || repeat == true) {
		randomClue();
	}
else {
		clueNum++;
		$(".horizontalClueArea").append('<div class="horizontalClue clue' + clueNum + '"><div style="background-image:url(' + resources + 'row' + clueRow.left + '/' + clueLeft + '.jpg);" class="clue"></div><div style="background-image:url(' + resources + 'clues/direction.gif);" class="clue"></div><div style="background-image:url(' + resources + 'row' + clueRow.right + '/' + clueRight + '.jpg);" class="clue"></div></div>');
		$(".clue" + clueNum).rightClick( function(e) {
			if (this.hasClass("flagged") == true) {
				$(this).removeClass("flagged");
			}
			else if (this.hasClass("flagged") == false) {
				$(this).addClass("flagged");
			};
		});
		clues.directional.push([clueRow.left, clueLeft, clueRow.right, clueRight]);
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

	var clueLeft = block.answer[clueRow.left][clueColumn.left],
			clueRight = block.answer[clueRow.right][clueColumn.right];
			
	// check for repeating near clues
	var tempArray = [clueRow.left, clueLeft, clueRow.right, clueRight], tempArrayInverse = [clueRow.right, clueRight, clueRow.left, clueLeft], repeat = false;
	for (var x = 0; x < clues.near.length; x++) {
		if (tempArray == clues.near[x] || tempArrayInverse == clues.near[x]){
			repeat = true;
		};
	};
	
	if ((block.solvable[clueRow.left][clueColumn.left] == true && block.solvable[clueRow.right][clueColumn.right] == true) || repeat == true) {
		randomClue();
	}
	else {
		clueNum++;
		$(".horizontalClueArea").append('<div class="horizontalClue clue' + clueNum + '"><div style="background-image:url(' + resources + 'row' + clueRow.left + '/' + clueLeft + '.jpg);" class="clue"></div><div style="background-image:url(' + resources + 'clues/near.gif);" class="clue"></div><div style="background-image:url(' + resources + 'row' + clueRow.right + '/' + clueRight + '.jpg);" class="clue"></div></div>');
		$(".clue" + clueNum).rightClick( function(e) {
			if (this.hasClass("flagged") == true) {
				$(this).removeClass("flagged");
			}
			else if (this.hasClass("flagged") == false) {
				$(this).addClass("flagged");
			};
		});
		clues.near.push([clueRow.left, clueLeft, clueRow.right, clueRight]);
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

	clueTop = block.answer[clueRow.top][clueColumn];
	clueBottom = block.answer[clueRow.bottom][clueColumn];

	// check for repeating vertical clues
	var tempArray = [clueRow.top, clueTop, clueRow.bottom, clueBottom], repeat = false;
	for (var x = 0; x < clues.vertical.length; x++) {
		if (tempArray == clues.vertical[x]){
			console.log("Vertical clue " + clueNum + 1 + " has repeated.")
			repeat = true;
		};
	};
	
	if ((block.solvable[clueRow.top][clueColumn] == true && block.solvable[clueRow.bottom][clueColumn] == true) || repeat == true) {
		randomClue();
	}
	else {
		clueNum++;
		$(".verticalClueArea").append('<div class="verticalClue clue' + clueNum + '"><div style="background-image:url(' + resources + 'row' + clueRow.top + '/' + clueTop + '.jpg);" class="clue"></div><div style="background-image:url(' + resources + 'row' + clueRow.bottom + '/' + clueBottom + '.jpg);" class="clue"></div></div>')
		$(".clue" + clueNum).rightClick( function(e) {
			if (this.hasClass("flagged") == true) {
				$(this).removeClass("flagged");
			}
			else if (this.hasClass("flagged") == false) {
				$(this).addClass("flagged");
			};
		});
		clues.vertical.push([clueRow.top, clueTop, clueRow.bottom, clueBottom]);
	};          
};