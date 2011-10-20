/* The Resource Manager */
/*
		The resource manager provides an object which allows external calls to information about puzzle tiles.
*/

resource = "./images"

tileKind.houses
var tileKind = {
			houses : {
				resource : resource + '/houses'
				column : [
					{number : "red"}
				]
			case 1 :
				number = "red";
				break;
			case 2 :
				number = "blue";
				break;
			case 3 :
				number = "green";
				break;
			case 4 :
				number = "purple";
				break;
			case 5 :
				color = "orange";
				break;
			case 6 :
				color = "black";
				break;
		}
		words = "the " + color + " house";
	}
	else if(description == "numbers") {
		resourceLocation += '/numbers';
		switch(number) {
			case 1 :
				number = "one";
				break;
			case 2 :
				number = "two";
				break;
			case 3 :
				number = "three";
				break;
			case 4 :
				number = "four";
				break;
			case 5 :
				number = "five";
				break;
			case 6 :
				color = "six";
				break;
		}
		words = "number " + number;	}
	else if (description == "letters") {
		location = '/letters';
	}
	else if (description == "shapes") {
		location = '/shapes';
	};
};
};