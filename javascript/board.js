var puzzle = {
        			height : 2,
			    	width : 5
					},
			    gameBoard = Array(),
                tile = Array(),
                solvableTile = Array(),
                solvable = false,
                solved = false,
                clues = Array(),
                clueNum = 0,
			    score = 0,
			    resources = "http://www.sheilacallaham.com/nate/einstein/images/";

function randomizeAnswers() {
    		    for (var row = 0; row <= puzzle.height; row++) {
			        gameBoard[row] = Array();
                    solvableTile[row] = Array();
                    tile[row] = Array();
			        for (var column = 0; column <= puzzle.width; column++) {
                        solvableTile[row][column] = false;
                        tile[row][column] = Array();
                        for (var guess = 0; guess <= puzzle.width; guess++) {
                            tile[row][column][guess] = true;
                        };
			            var number = Math.floor(Math.random() * 6);
			            if (gameBoard[row].indexOf(number) == -1) {
			                gameBoard[row][column] = number;
			            }
			            else {
			                while (gameBoard[row].indexOf(number) != -1) {
			                    number = Math.floor(Math.random() * 6);
			                };
			                gameBoard[row][column] = number;
			            };
			        };
			    };
			};
			
			function displayGameBoard() {
			    document.write('<div class="board">');
			    document.write('<span id="score">0</span>');
			    for (var row = 0; row <= puzzle.height; row++) {
			        document.write('<div class="row">');
			        for (var column = 0; column <= puzzle.width; column++) {
			            document.write('<div class="column">');
			            document.write('<div class="padding">');
			            for (var guess = 0; guess <= puzzle.width; guess++) {
			                document.write('<div id="' + row + column + guess + '" style="background-image:url(' + resources + 'row' + row + '/' + guess + '.jpg);" class="guess"></div>');
			                $("#" + row + column + guess).click(function(x, y, z) {
			                    return function() {
			                          changeCSS(x, y, z);
			                    };
			                }(row, column, guess));
                            $("#" + row + column + guess).rightClick( function(e) {
                                if (this.hasClass("invisible") == true && this.hasClass("correct") != true) {
                                    $(this).removeClass("invisible");
                                }
                                else if (this.hasClass("invisible") == false && this.hasClass("correct") != true) {
                                    $(this).addClass("invisible");
                                };
                            });
			            };
			            document.write('</div>');
			            document.write('</div>');
			        };
			        document.write('</div>');
			    };
			    document.write('</div>');
                document.write('<div class="horizontalClueArea"></div>');
                document.write('<div class="verticalClueArea"></div>');
            };
            
            function bigRedButton() {
                document.write('<div class="bigRedButton" style="width:50px;height:50px;background-color:red;position:relative;float:left;" onclick="randomClue();"></div>');
            };