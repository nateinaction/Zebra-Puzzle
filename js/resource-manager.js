/* The Resource Manager */
/*
		The resource manager provides an object which allows external calls to information about puzzle tiles.
*/

function tileKind(rowNumber, tileNumber) {
	rowKind = puzzle.preferred.rowKind[rowNumber];
	if (rowKind == "food-row") {
		switch(tileNumber) {
			case 1:
				return "apple";
				break;
			case 2:
				return "orange";
				break;
			case 3:
				return "watermelon";
				break;
			case 4:
				return "strawberry";
				break;
			case 5:
				return "eggplant";
				break;
			case 6:
				return "tomato";
				break;
		};
	}
	else if (rowKind == "animal-row") {
		switch(tileNumber) {
			case 1:
				return "dog";
				break;
			case 2:
				return "cat";
				break;
			case 3:
				return "pig";
				break;
			case 4:
				return "frog";
				break;
			case 5:
				return "koala";
				break;
			case 6:
				return "bunny";
				break;
		};
	}
	else if (rowKind == "heart-row") {
		switch(tileNumber) {
			case 1:
				return "yellow-heart";
				break;
			case 2:
				return "blue-heart";
				break;
			case 3:
				return "purple-heart";
				break;
			case 4:
				return "pink-heart";
				break;
			case 5:
				return "green-heart";
				break;
			case 6:
				return "red-heart";
				break;
		};
	}
	else if (rowKind == "sport-row") {
		switch(tileNumber) {
			case 1:
				return "football";
				break;
			case 2:
				return "basketball";
				break;
			case 3:
				return "soccer-ball";
				break;
			case 4:
				return "baseball";
				break;
			case 5:
				return "tennis-ball";
				break;
			case 6:
				return "eight-ball";
				break;
		};
	}
	else if (rowKind == "transport-row") {
		switch(tileNumber) {
			case 1:
				return "rocketship";
				break;
			case 2:
				return "sailboat";
				break;
			case 3:
				return "bicycle";
				break;
			case 4:
				return "airplane";
				break;
			case 5:
				return "car";
				break;
			case 6:
				return "bus";
				break;
		};
	};
};