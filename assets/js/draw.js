
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var puzzle = getParameterByName("name");
var gameSongs = games[puzzle]["puzzle"];
$("#gameTitle").text(games[puzzle]["title"]);
var songs = Object.keys(gameSongs);

let rows = 4;
let cols = 5;

var left_offset = window.innerWidth/4;
var top_offset = window.innerHeight/9.5;
var dim = window.innerHeight/cols;
let spacePos = "00";
let badGuyPos1 = "33";
var lives = 3;
var numCorrect = 0;
let progressBarValue = 0;
let progressBarPercentage;


var findNumToWin = function(obj){
	var numToWin = 0;
	for (var key in obj){
		numToWin += (obj.hasOwnProperty(key) && obj[key]) ? 1 : 0;
	}
	return numToWin;
};

numToWin = findNumToWin(gameSongs);
progressBarPercentage = 100 / findNumToWin(gameSongs);

document.write(`<div id="celebrate"><h2>You Win!</h2></div>`);

var drawLives = function(lives){
	for (var i = 0; i < lives; i++){
        const lives_container = document.getElementById("gameLivesRemaining");
        const lives_remaining_html = `<img class="life-remaining" id="life${i}" width="50" height="50" src="assets/img/svg/logo.svg" alt="snacman extra life">`;
        lives_container.insertAdjacentHTML("beforeend", lives_remaining_html);
	}
};

//Draws the actual gameboard
var drawBoard = function(){
	//var left_offset = window.innerWidth/4;
	//var top_offset = window.innerHeight/8.5;
    document.write(` <main><div id="gameBoard" class="game-container"> `);
	for (var i = 0; i < rows; i++){
		//left_offset = window.innerWidth/4;
		for (var j = 0; j < cols; j++){
            document.write(` <div id="${i.toString() + "r" + j.toString()}" class="cell"><p>${songs.pop()}</p></div>`);
			left_offset += dim;
		}
		top_offset += dim;
	}
	document.write(`</div></main>`);
	document.write(`<img id="badGuy1" src="assets/img/tvbadguy.png" />`);
};


//Creates new function placeSpaceship() that adds the ufo to the game

function placeSnacman() {
    const snacmanStartingCell = document.getElementById("0r0");
    const drawSnacman = `<img id="snacman" src="assets/img/svg/snacman.svg" />`;
    snacmanStartingCell.insertAdjacentHTML("beforeend", drawSnacman);
}

/*
var placeSpaceship = function(ufo, id){
	if (id == "snacman")
		spacePos = ufo;

	var new_left_offset = left_offset/0.90 + dim*(Number(ufo[1]));
	var new_top_offset = top_offset/0.50 + dim*(Number(ufo[0]));
	document.getElementById(id).style.left = new_left_offset + "px";
	document.getElementById(id).style.top = new_top_offset + "px";
}; */

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
/*
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
*/
var moves = setInterval(function(){
    moveBadGuys("badGuy1");
}, 1500);



//var progressTotalHeight = window.innerHeight/1.8;
//var progress_left_offset = window.innerWidth/16;
//var progress_top_offset = window.innerHeight/1.26;
/*
var drawPrizeClicks = function(prizes){
	var prizes_offset_left = left_offset + cols*dim + dim/2;
	//var prizeArray = ["snacBadGuy.png", "snacRemove.png", "snacTime.png"];
	var prizes_offset_top = 30;
	for (var i = 0; i < prizes; i++){
		document.write("<img src=\"assets/img/circle.svg\" id=\"prizeClick" + (i + 1) + "\" style=\"top:" + prizes_offset_top + "px; left:" + (prizes_offset_left + i*100) + "px;\" />");
	}
}(3);
document.write("<div id=\"progress_label\" style=\"top:" + progress_top_offset/0.98 + "px; left:" + progress_left_offset + "px; height:" + dim/7.7 +
		"px; width:" + dim/1.9 + "px;\"><em>" + numToWin + " To Win</em></div>");
document.write("<div id=\"progress\" style=\"top:" + progress_top_offset + "px; left:" + progress_left_offset + "px; height:" + 0 +
		"px; width:" + dim/2 + "px;\"></div>");
document.write("<div id=\"empty_progress\" style=\"top:" + (progress_top_offset - progressTotalHeight) + "px; left:" + progress_left_offset + "px; height:" + progressTotalHeight +
		"px; width:" + dim/2 + "px;\"></div>");
*/
