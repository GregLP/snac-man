var puzzle = getParameterByName("name");
var gameSongs = games[puzzle]["puzzle"];
let gameTitle = games[puzzle]["title"];
var songs = Object.keys(gameSongs);
let rows = 4;
let cols = 5;
var lives = 3;
var numCorrect = 0;
let progressBarValue = 0;
var score = 0;
var chewable = true;
let progressBarPercentage;

document.querySelector('h1').textContent = gameTitle;

function getParameterByName(name) {
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    let results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var findNumToWin = function(obj){
	var numToWin = 0;
	for (var key in obj){
		numToWin += (obj.hasOwnProperty(key) && obj[key]) ? 1 : 0;
	}
	return numToWin;
};

let numToWin = findNumToWin(gameSongs);
progressBarPercentage = 100 / findNumToWin(gameSongs);

var drawLives = function(lives){
	for (var i = 0; i < lives; i++){
        const lives_container = document.getElementById("gameLivesRemaining");
        const lives_remaining_html = `<img class="life-remaining" id="life${i}" width="50" height="50" src="assets/img/svg/snacman.svg" alt="snacman extra life">`;
        lives_container.insertAdjacentHTML("beforeend", lives_remaining_html);
	}
};

var drawBoard = function(){
    document.write(` <main><div id="gameBoard" class="game-container"> `);
	for (var i = 0; i < rows; i++){
		for (var j = 0; j < cols; j++){
            document.write(` <div id="${i.toString() + "r" + j.toString()}" class="cell"><p>${songs.pop()}</p></div>`);
		}
	}
	document.write(`</div></main>`);
};

function placeSnacman() {
    const snacmanStartingCell = document.getElementById("0r0");
    const drawSnacman = `<img id="snacman" src="assets/img/svg/snacman.svg" />`;
    snacmanStartingCell.insertAdjacentHTML("beforeend", drawSnacman);
}
