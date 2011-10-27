$(function(){
	
	// when a mouse hovers over a tile...
	
	// if the answer is correct do the following
	$(".guess").click(function() {
		rowNumber = this.id.substring(0, 1);
		columnNumber = this.id.substring(1, 2);
		tileNumber = this.id.substring(2, 3);
		if (!isCorrect(rowNumber, columnNumber, tileNumber)) {
			$(this).addClass("incorrect");
		};
		userInput(rowNumber, columnNumber, tileNumber);
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