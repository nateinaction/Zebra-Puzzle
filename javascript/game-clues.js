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
	if (block.solvable[clueRow.left][clueColumn.left] == true && block.solvable[clueRow.center][clueColumn.center] == true && block.solvable[clueRow.right][clueColumn.right] == true) {
		randomClue();
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
	if (block.solvable[clueRow.left][clueColumn.left] == true && block.solvable[clueRow.right][clueColumn.right] == true) {
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
	if (block.solvable[clueRow.left][clueColumn.left] == true && block.solvable[clueRow.right][clueColumn.right] == true) {
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
						
	if (block.solvable[clueRow.top][clueColumn] == true && block.solvable[clueRow.bottom][clueColumn] == true) {
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