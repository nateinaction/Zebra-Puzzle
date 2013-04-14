App = Ember.Application.create();

/*
The puzzle object creates and stores the puzzle state.

* Create a new puzzle with the new() method.
* Check answers through the verify(row, column, selection) method. returns bool
* Find a tile by name using the locate(name) method. returns {'name' : name, 'row' : row, 'column' : column}

// to access a tile object you need a row and column
puzzle.tile[row][column]

// each tile object contains
	answer : 'banana',
	solved : false,
	possible : ['apple', 'banana', 'pickle', 'avacado'], // array is shared between all tiles in a row
	incorrect : ['apple']
	hidden : ['avocado', 'pickle']

*/

var puzzle = {
	tile : new Array(),
	
	resources : new Array(
	{
		name : 'food',
		tile : ['apple', 'orange', 'watermelon', 'strawberry', 'eggplant', 'tomato']
	},
	{
		name : 'animal',
		tile : ['dog', 'cat', 'pig', 'frog', 'koala', 'bunny']
	},
	{
		name : 'heart',
		tile : ['yellow heart', 'blue heart', 'purple heart', 'pink heart', 'green heart', 'red heart']
	},
	{
		name : 'sport',
		tile : ['football', 'basketball', 'soccer ball', 'baseball', 'tennis ball', 'eight ball']
	},
	{
		name : 'transport',
		tile : ['rocket', 'sailboat', 'bicycle', 'airplane', 'car', 'bus']
	}),
	
	new : function() {
		var height = 5;
		var width = 6;
		
		for (var n = 0; n < height; n++) {
			this.tile[n] = new Array();
			for (var i = 0; i < width; i++) {
				this.tile[n].push({
						answer : this.resources[n].tile[i],
						possible : this.resources[n].tile,
						solved : false,
						incorrect : new Array(),
						hidden : new Array()
				});
			};
			// randomize the tiles
			this.tile[n].sort(function() {return 0.5 - Math.random()});
		};
		return this.tile;
	},
	
	verify : function(row, column, selection) {
		return this.tile[row][column].answer == selection ? true : false;
	},
	
	locate : function(name) {
		for (row = 0; row < puzzle.tile.length; row++){
			for (column = 0; column < puzzle.tile[row].length; column++){
				if (name == puzzle.tile[row][column].answer) {
					return {'name' : name, 'row' : row, 'column' : column};
				};
			};
		};
	}
	
};

/*
User input is managed by the orion object.

* When user selects an answer the select(row, column, selection) method is called.
* 

*/

var orion = {
	select : function(row, column, selection){
		if (puzzle.verify(row, column, selection)) {
			// remove selection from possible tiles in the row and mark the tile as solved
			var index = puzzle.tile[row][column].possible.indexOf(selection);
			puzzle.tile[row][column].possible.splice(index, 1);
			puzzle.tile[row][column].solved = true;
			for (n = 0; n < puzzle.tile[row].length; n++){
				// remove selection from incorrect array on unsolved tiles
				var solved = puzzle.tile[row][n].solved;
				var inArray = puzzle.tile[row][n].incorrect.indexOf(selection);
				if (solved == false && inArray != -1){
					puzzle.tile[row][column].incorrect.splice(inArray, 1);
				};
				// if there is only one possible option in an unsolved tile after a correct selection, select it.
				var possible = puzzle.tile[row][n].possible.length;
				if (possible == 1 && solved == false) {
					var selection = puzzle.tile[row][n].possible[0];
					this.select(row, n, selection);
				};
			};
		}
		else {
			puzzle.tile[row][column].incorrect.push(selection);
			// if there is only one possible option after an incorrect selection, select it.
			var possible = puzzle.tile[row][column].possible.length - puzzle.tile[row][column].incorrect.length;
			if (possible == 1) {
				for (n = 0; n < puzzle.tile[row][column].possible.length; n++){
					var selection = puzzle.tile[row][column].possible[n];
					var inArray = puzzle.tile[row][column].incorrect.indexOf(selection);
					if (inArray == -1) {
						this.select(row, column, selection);
					};
				};
			};
		};
	},
	
	hide : function(row, column, selection) {
		puzzle.tile[row][column].hidden.push(selection);
		return selection + " was hidden from row " + row + ", column " + column + "."
	},
	
	unhide : function(row, column, selection) {
		var index = puzzle.tile[row][column].hidden.indexOf(selection);
		puzzle.tile[row][column].hidden.splice(index, 1);
		return selection + " was unhidden from row " + row + ", column " + column + "."
	}
};

/*
new clue engine - 'cleo'

* randomly select two unreferenced tiles
* Are they vertically paired? Are they adjacent?
* if tiles are vertically paired they MUST be used in a vertical clue.
* if tiles are not vertical and not adjacent they MUST be used in a horizontal clue.
* if tiles are not vertical and adjacent they can either be used in a between clue or an adjacent clue.
* adjacent clues and between clues have directional ambiguity, which means their creation must be paired with a vertical or directional clue which references one of the tiles involved. for directional clues one of the two wings must be referenced.
* if there is only one unreferenced tile left, any clue type can be used.

// the clue object looks like
{
	type : "direction",
	text : "The apple is to the left of the orange.",
	tile : ['apple', 'orange'],
	hidden : false
}

*/

var cleo = {
	clues : new Array(),
	adjacentCount : 0,
	betweenCount : 0,
	verticalCount : 0,
	horizontalCount : 0,
	
	
	adjacent : function(tile_one, tile_two) {
		var clue = new Object();
		clue.type = "proximity";
		clue.hidden = false;
		clue.text = "The " + tile_one.name + " is adjacent to the " + tile_two.name + ".";
		clue.tile = new Array(tile_one.name, tile_two.name);
		this.clues.push(clue);
	},
	
	between : function(tile_one, tile_two) {
		var clue = new Object();
		clue.type = "proximity";
		clue.hidden = false;
		
		var wing = new Array(tile_one.name, tile_two.name);
		var row = Math.floor(Math.random() * puzzle.tile.length);
		var center = null;
		for (column = 0; column < puzzle.tile[row].length; column++){
			if (tile_one.row == column || tile_two.row == column) {
				center = puzzle.tile[row][column + 1].answer;
				break;
			};
		};
		
		clue.text = "The " + center + " is in between the " + wing[0] + " and the " + wing[1] + ".";
		clue.tile = new Array(tile_one.name, tile_two.name);
		this.clues.push(clue);
		// only the wings of a between clue should be considered for a direction clue
	},
	
	vertical : function(tile_one, tile_two) {
		var tile_above = tile_one.row < tile_two.row ? tile_one.name : tile_two.name;
		var tile_below = tile_one.row < tile_two.row ? tile_two.name : tile_one.name;
		var clue = new Object();
		clue.type = "direction";
		clue.hidden = false;
					
		if (Math.round(Math.random()) == 1) {
			clue.text = "The " + tile_above + " is above the " + tile_below + ".";
		}
		else {
			clue.text = "The " + tile_below + " is below the " + tile_above + ".";
		};
		
		clue.tile = new Array(tile_one.name, tile_two.name);
		this.clues.push(clue);
	},
	
	horizontal : function(tile_one, tile_two) {
		var tile_left = tile_one.column < tile_two.column ? tile_one.name : tile_two.name;
		var tile_right = tile_one.column < tile_two.column ? tile_two.name : tile_one.name;
		var clue = new Object();
		clue.type = "direction";
		clue.hidden = false;
		
		if (Math.round(Math.random()) == 1) {
			clue.text = "The " + tile_left + " is to the left of the " + tile_right + ".";
		}
		else {
			clue.text = "The " + tile_right + " is to the right of the " + tile_left + ".";
		};
	
		clue.tile = new Array(tile_one.name, tile_two.name);
		this.clues.push(clue);
	},
	
	pick : function(tile_one, tile_two) {
		if (tile_one.column == tile_two.column) {
			// if tiles are in the same column they MUST be used in a vertical clue.
			this.vertical(tile_one, tile_two);
			this.verticalCount++
		}
		else if (Math.pow((tile_one.column - tile_two.column),2) == 1) {
			// if tiles are not vertical and adjacent they can either be used in a between clue or an adjacent clue.
			this.adjacent(tile_one, tile_two);	
			this.adjacentCount++	
		}
		else if (Math.pow((tile_one.column - tile_two.column),2) == 4) {
			// if tiles are a distance of 2 tiles from each other they can be between clues.
			this.between(tile_one, tile_two);
			this.betweenCount++
		}
		else {
			// if tiles are not in the same column AND not in adjacent columns they MUST be used in a horizontal clue.
			this.horizontal(tile_one, tile_two);
			this.horizontalCount++
		};
	},
	
	glue : function() {
		var unbound = new Array();
		
		for (n = 0; n < this.clues.length; n++) {
			unbound.push(this.clues[n].tile);
		};
		
		while (unbound.length > 1) {
			var array_one = unbound[Math.floor(Math.random() * unbound.length)];
			var array_two = unbound[Math.floor(Math.random() * unbound.length)];
			var unique = array_one != array_two ? true : false;
		
			if (unique){
				var tile_one = puzzle.locate(array_one[Math.floor(Math.random() * array_one.length)]);
				var tile_two = puzzle.locate(array_two[Math.floor(Math.random() * array_two.length)]);
				
				var index_one = unbound.indexOf(array_one);
				unbound.splice(index_one, 1);
						
				var index_two = unbound.indexOf(array_two);
				unbound.splice(index_two, 1);
			
				this.pick(tile_one, tile_two);
			};	
		};
		
		// select one of the tiles remaining
		var tile = puzzle.locate(unbound[0][Math.floor(Math.random() * unbound[0].length)]);
		orion.select(tile.row, tile.column, tile.name);
		console.log(tile.row, tile.column, tile.name);
	},
	
	new : function() {
		var unreferenced = new Array();
		for (var n = 0; n < puzzle.tile.length; n++) {
			for (var i = 0; i < puzzle.tile[n].length; i++) {
				unreferenced.push(puzzle.tile[n][i].answer);
			};
		};
		
		while (unreferenced.length > 0) {
			var tile_one = puzzle.locate(unreferenced[Math.floor(Math.random() * unreferenced.length)]);
			var tile_two = puzzle.locate(unreferenced[Math.floor(Math.random() * unreferenced.length)]);
			var unique = tile_one.name != tile_two.name ? true : false;
			
			if (unique){
				var index_one = unreferenced.indexOf(tile_one.name);
				unreferenced.splice(index_one, 1);
				
				var index_two = unreferenced.indexOf(tile_two.name);
				unreferenced.splice(index_two, 1);
				
				this.pick(tile_one, tile_two);
			};
		};
		
		this.glue();
		console.log("adjacent:", this.adjacentCount, "between", this.betweenCount, "vertical", this.verticalCount, "horizontal", this.horizontalCount);
		var text = new Array();
		for (n = 0; n < this.clues.length; n++) {
			text.push(this.clues[n].text);
		};
		return text;
	}
	
};

App.Router.map(function() {
  // put your routes here
	this.resource('puzzle', function(){
		this.resource('clues');
	});
});

App.IndexRoute = Ember.Route.extend({
	model : function(){
		return ["hello"];
	}
});

App.PuzzleRoute = Ember.Route.extend({
	model : function() {
		return puzzle.new();
	}
});

App.CluesRoute = Ember.Route.extend({
  model: function() {
    return cleo.new();
  }
});