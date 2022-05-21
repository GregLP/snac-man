var puzzle = getParameterByName("name");
var gameSongs = games[puzzle]["puzzle"];
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

$("#gameTitle").text(games[puzzle]["title"]);


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

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

var drawBoard = function(){
    document.write(` <main><div id="gameBoard" class="game-container"> `);
	for (var i = 0; i < rows; i++){
		for (var j = 0; j < cols; j++){
            document.write(` <div id="${i.toString() + "r" + j.toString()}" class="cell"><p>${songs.pop()}</p></div>`);
			left_offset += dim;
		}
		top_offset += dim;
	}
	document.write(`</div></main>`);
	document.write(`<img id="badGuy1" src="assets/img/tvbadguy.png" />`);
};

function placeSnacman() {
    const snacmanStartingCell = document.getElementById("0r0");
    const drawSnacman = `<img id="snacman" src="assets/img/svg/snacman.svg" />`;
    snacmanStartingCell.insertAdjacentHTML("beforeend", drawSnacman);
}

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
