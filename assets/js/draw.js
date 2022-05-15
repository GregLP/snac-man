//create the url for the puzzle ?name=puzzleName
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var puzzle = getParameterByName("name"); // Declare a new variable puzzle.  Assign it the value returned by the getParameterByName function with "name" passed as argument
var gameSongs = games[puzzle]["puzzle"]; // Delcare new variable gameSongs. Assign it the value of the property puzzle from the object games
$("#munchers").text(games[puzzle]["title"]); // jQuery Target the html element with the id #munchers and replace the content with the value of the property title from the object games

var songs = Object.keys(gameSongs); // Declare a new variable songs. Assign it the value of the Object.keys() method with gameSongs passed as an argument

rows = 4; //Assign the variable rows the value of 4
cols = 5; //Assign the variable cols the value of 5
var progressTotalHeight = window.innerHeight/1.8; // Declare a new variable progressTotalHeight and assign it the value of the window height divided by 1.8
var progress_left_offset = window.innerWidth/16; // Declare a new variable progress_left_offset and assign it the value of the window width divided by 16
var progress_top_offset = window.innerHeight/1.26; // Declare a new variable progress_top_offset and assign it the value of the window height divided by 1.26
var left_offset = window.innerWidth/4; // Declare a new variable left_offset and assign it the value of the window width divided by 1.8
var top_offset = window.innerHeight/9.5; // Declare a new variable top_offset and assign it the value of the window height divided by 9.5
var dim = window.innerHeight/cols; // Declare a new variable dim and assign it the value of the window height divided by the variable cols
spacePos = "00"; //Assign a value of 00 to the variable spacePos
badGuyPos1 = "33"; //Assign a value of 33 to the variable badGuyPos1
//badGuyPos2 = "33"; Commented out position for badGuy2
var lives = 3; //Declare a new variable lives and assign it the value of 3
var numCorrect = 0; //Declare a new variable of numCorrect and assign it the value of 0

//Create a new function findNumToWin(). Checks reamining correct answers in puzzle. Looks at puzzle object and counts the number of 1's remaining. Adds it to a new local variable numToWin
var findNumToWin = function(obj){
	var numToWin = 0;
	for (var key in obj){
		numToWin += (obj.hasOwnProperty(key) && obj[key]) ? 1 : 0;
	}
	return numToWin;
};

numToWin = findNumToWin(gameSongs); //Assign a variable numToWin with the return value of the function findNumToWin()

document.write("<div id=\"celebrate\"><h2>You Win!</h2></div>"); //Writes a celebration message on the page in the celebrate div

//Create new function drawLives() that draws snacman on the right of the board. Calculates lives remaining.
var drawLives = function(lives){
	var lives_offset_left = left_offset + cols*dim + dim/2;
	//var lives_offset_top = top_offset + rows*dim/2;
	var lives_offset_top = 400;
	for (var i = 0; i < lives; i++){
		document.write("<img src=\"assets/img/logo.png\" id=\"life" + i + "\" style=\"top:" + lives_offset_top + "px; left:" + (lives_offset_left + i*100) + "px;\" />");
	}
}

//Create new function drawPrizeClicks() that draws circles on the top right of the board.
var drawPrizeClicks = function(prizes){
	var prizes_offset_left = left_offset + cols*dim + dim/2;
	//var prizeArray = ["snacBadGuy.png", "snacRemove.png", "snacTime.png"];
	var prizes_offset_top = 30;
	for (var i = 0; i < prizes; i++){
		document.write("<img src=\"assets/img/circle.svg\" id=\"prizeClick" + (i + 1) + "\" style=\"top:" + prizes_offset_top + "px; left:" + (prizes_offset_left + i*100) + "px;\" />");
	}
}(3);


// Writes the numbers to win below the progress bar
document.write("<div id=\"progress_label\" style=\"top:" + progress_top_offset/0.98 + "px; left:" + progress_left_offset + "px; height:" + dim/7.7 +
		"px; width:" + dim/1.9 + "px;\"><em>" + numToWin + " To Win</em></div>");

//writes the green progress bar that overwrites the empty progress bar
document.write("<div id=\"progress\" style=\"top:" + progress_top_offset + "px; left:" + progress_left_offset + "px; height:" + 0 +
		"px; width:" + dim/2 + "px;\"></div>");

//writes the full progress bar with red bg
document.write("<div id=\"empty_progress\" style=\"top:" + (progress_top_offset - progressTotalHeight) + "px; left:" + progress_left_offset + "px; height:" + progressTotalHeight +
		"px; width:" + dim/2 + "px;\"></div>");

//Draws the actual gameboard
var drawBoard = function(){
	var left_offset = window.innerWidth/4;
	var top_offset = window.innerHeight/8.5;
	document.write("<div id=\"board\" style=\" top:" + top_offset + "px; left:" + left_offset + "px; height:" + window.innerHeight/1.5 +
		"px; width:" + window.innerWidth/1.25 + "px;\">");
	for (var i = 0; i < rows; i++){
		left_offset = window.innerWidth/4;
		for (var j = 0; j < cols; j++){
			document.write("<div id=\"" + i.toString() + "r" + j.toString() + "\" class=\"cell\" style=\"top:" +
				top_offset +"px; left: " + left_offset + "px; height:" + dim +"px; width:" + dim + "px;\">" + "<p>" + songs.pop() +
				"</p>" + "</div>");
			left_offset += dim;
		}
		top_offset += dim;
	}
	document.write("</div>");
	document.write("<img id=\"test\" src=\"assets/img/eat/eat1.png\" />");
	document.write("<img id=\"badGuy1\" src=\"assets/img/tvbadguy.png\" />");
};


//Creates new function placeSpaceship() that adds the ufo to the game
var placeSpaceship = function(ufo, id){
	if (id == "test")
		spacePos = ufo;

	var new_left_offset = left_offset/0.90 + dim*(Number(ufo[1]));
	var new_top_offset = top_offset/0.50 + dim*(Number(ufo[0]));
	document.getElementById(id).style.left = new_left_offset + "px";
	document.getElementById(id).style.top = new_top_offset + "px";
};

//Creates new function placeBadGuy() that adds badguy to game
var placeBadGuy = function(ufo, id){
	if (id == "badGuy1")
		badGuyPos1 = ufo;
	else
		badGuyPos2 = ufo;

	var new_left_offset = left_offset/0.9 + dim*(Number(ufo[1]));
	var new_top_offset = top_offset/0.50 + dim*(Number(ufo[0]));
	document.getElementById(id).style.left = new_left_offset + "px";
	document.getElementById(id).style.top = new_top_offset + "px";
};

//Creates a new function placePrizes() that adds the prizes to the game 
var placePrizes = function(prizes){
	var pos = "";
	var id = "";
	for (var i = 0; i < prizes; i++){
		id = "prize" + (i + 1).toString();
		var col = Math.floor((Math.random()*cols).toString());
		pos = i.toString() + col;
		var new_left_offset = left_offset/0.9 + dim*(Number(pos[1]));
		var new_top_offset = top_offset/0.50 + dim*(Number(pos[0]));
		document.getElementById(id).style.left = new_left_offset + "px";
		document.getElementById(id).style.top = new_top_offset + "px";
	}
}(3);
