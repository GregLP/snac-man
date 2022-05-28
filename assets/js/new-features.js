let badGuyPos1 = "33";
var badGuyPos2 = "99";
var isBlue = false;
var badGuyDead = false;
var prize1Chewable = false;
var chewablePrizes = [false, false, false];
var availablePrizes = [true, true, true];
var left_offset = window.innerWidth/4;
var top_offset = window.innerHeight/9.5;
var dim = window.innerHeight/cols;

placeSpaceship(badGuyPos1, "badGuy1");
stateChange();

var prize1Action = function(){

	var current_height = document.getElementById('progress').style.height;
	var current_top = document.getElementById('progress').style.top;
	var wrongAnswers = [];
	for (i in games[puzzle].puzzle){
		if(games[puzzle]["puzzle"][i] == 0){
			wrongAnswers.push(i);
		}
	}
	for (var k = 0; k < 3; k++){
		var removeWrong = Math.floor(Math.random()*wrongAnswers.length);
		while (!(removeWrong in wrongAnswers)){
			removeWrong = (removeWrong + 1)%wrongAnswers.length;
		}
		for (var i = 0; i < rows; i++){
			for (var j = 0; j < cols; j++){
				if ($('div#' + i + "r" + j).text() == wrongAnswers[removeWrong])
					$('div#' + i + "r" + j).text(" ");
			}
		}
		delete wrongAnswers[removeWrong];
	}
	return 1;
}
var prize2Action = function(){
	clearInterval(blink);
	blinking = false;
	$('#timer').css("visibility", "visible");
	$('#timer').css("color", "#5dfc0a");
	$('#timer').css("background-color", "black");
	setTimeout(function(){
		$('#timer').css("color", "black");
		$('#timer').css("background-color", "#5dfc0a");
	}, 1250);
	setTime(ten_minutes, (minutes += ((ten_seconds + 3) >= 6) ? 1 : 0), Math.floor((ten_seconds + 3)%6), seconds);
	return 2;
};
var prize3Action = function(){
	document.getElementById("badGuy1").src = "assets/img/ufo_blue.jpg";
	isBlue = true;
	setTimeout(function(){
		if (!badGuyDead){
			document.getElementById("badGuy1").src = "assets/img/ufo.jpg";
			isBlue = false;
		}
	}, 10000);
	return 3;
};
var prizeActions = [prize1Action, prize2Action, prize3Action];

var addPrizeClick = function(i){
	$('#prizeClick' + i).click(function(){
			$('div#prize' + i).css("visibility", "visible");
			chewablePrizes[i - 1] = true;
		});
}

for (var i = 1; i <= 3; i++){
	addPrizeClick(i);
}


var addClickHandler = function(i, j){
	 $('div#' + i.toString() + "r" + j.toString()).click(function(){
		if (spacePos == (i.toString() + j.toString())){
			if (chewable){
				chew();
				munchCheck();
			}
		}
		else{
			moveSpaceship(i.toString() + j.toString(), "snacman");
		}
	});
};


var placeSpaceship = function(ufo, id){
	if (id == "snacman")
		spacePos = ufo;

	var new_left_offset = left_offset/0.90 + dim*(Number(ufo[1]));
	var new_top_offset = top_offset/0.50 + dim*(Number(ufo[0]));
	document.getElementById(id).style.left = new_left_offset + "px";
	document.getElementById(id).style.top = new_top_offset + "px";
};

var addDoubleClickHandler = function(i, j){
	$('div#' + i.toString() + "r" + j.toString()).dblclick(function(){
		if (gameSongs[$('div#' + i.toString() + "r" + j.toString()).text()] && lives && i.toString() + j.toString() == spacePos){
			$('div#' + i.toString() + "r" + j.toString()).css("color", "#5dfc0a");
			$('div#' + i.toString() + "r" + j.toString()).text(" ");
			if (++numCorrect == numToWin){
				celebrate();
			}
		}
		else if (i.toString() + j.toString() == spacePos && lives){

			$('div#' + i.toString() + "r" + j.toString()).text("NOPE!");
			$('div#' + i.toString() + "r" + j.toString()).css("color", "red");
			lifeCheck(--lives);
		}});
};

var stateChange = function(){
	for (var i = 0; i < rows; i++){
		for (var j = 0; j < cols; j++){
			addClickHandler(i, j);
			addDoubleClickHandler(i, j);
		}
	}
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


var moves = setInterval(function(){
    moveBadGuys("badGuy1");
}, 1500);



var progressTotalHeight = window.innerHeight/1.8;
var progress_left_offset = window.innerWidth/16;
var progress_top_offset = window.innerHeight/1.26;

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



var moveBadGuys = function(id){
	badGuy = (id[6] == 1) ? badGuyPos1 : badGuyPos2;
	moves = [-1, 1];
	badCurRow = Number(badGuy[0]);
	badCurCol = Number(badGuy[1]);
	rowOrCol = Math.floor(Math.random()*2) == 0 ? true : false;
	nextBadRow = rowOrCol ? ((rows + badCurRow + moves[Math.floor(Math.random()*2)])%rows).toString() : badCurRow.toString();
	nextBadCol = !rowOrCol ? ((cols + badCurCol + moves[Math.floor(Math.random()*2)])%cols).toString() : badCurCol.toString();
	placeBadGuy(nextBadRow + nextBadCol, id);
};

var moveSpaceship = function(ufo, id){
	curRow = Number(spacePos[0]);
	curCol = Number(spacePos[1]);
	nextRow = Number(ufo[0]);
	nextCol = Number(ufo[1]);

	var move = setInterval(function(){
		if (curCol < nextCol)
			placeSpaceship(curRow.toString() + (++curCol).toString(), id);
		else if (curCol > nextCol)
			placeSpaceship(curRow.toString() + (--curCol).toString(), id);
		else if (curRow < nextRow)
			placeSpaceship((++curRow).toString() + curCol.toString(), id);
		else if (curRow > nextRow)
			placeSpaceship((--curRow).toString() + curCol.toString(), id);
		else
			clearInterval(move);
		}, 150);
};

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



var spaceCheck = setInterval(function(){
	for (var i = 1; i <= 3; i++){
			if ((parseInt($('#snacman').css("left")) == parseInt($('#prize' + i).css("left"))) && (parseInt($('#snacman').css("top"))) == parseInt($('#prize' + i).css("top"))){
				if (chewablePrizes[i - 1] && availablePrizes[i - 1]){
					availablePrizes[i - 1] = false;
					chew();
					score += 150;
					$('#prize' + i).css("visibility", "hidden");
					prizeActions[i - 1]();
				}
			}
		}

	if (spacePos == badGuyPos1){
		if (!isBlue){
			die();
			lifeCheck(--lives, true);
		}
		else{
			if (!badGuyDead){
				badGuyDead = true;
				chew();
				$('#badGuy1').css("visibility", "hidden");
			}
		}
	}
}, 250);

document.write(`<div id="celebrate"><h2>You Win!</h2></div>`);


var drawBoard = function(){
    document.write(` <main><div id="gameBoard" class="game-container"> `);
	for (var i = 0; i < rows; i++){
		for (var j = 0; j < cols; j++){
            document.write(` <div id="${i.toString() + "r" + j.toString()}" class="cell"><p>${songs.pop()}</p></div>`);
		}
	}
	document.write(`</div></main>`);
	document.write(`<img id="badGuy1" src="assets/img/tvbadguy.png" />`);
};




Object.keys = Object.keys || (function () {
	const hasOwnProperty = Object.prototype.hasOwnProperty,
		hasDontEnumBug = !{toString:null}.propertyIsEnumerable("toString"),
		DontEnums = [
			'toString',
			'toLocaleString',
			'valueOf',
			'hasOwnProperty',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'constructor'
		],
		DontEnumsLength = DontEnums.length;

	return function (o) {
		if (typeof o != "object" && typeof o != "function" || o === null)
			throw new TypeError("Object.keys called on a non-object");

		let result = [];
		for (let name in o) {
			if (hasOwnProperty.call(o, name))
				result.push(name);
		}

		if (hasDontEnumBug) {
			for (let i = 0; i < DontEnumsLength; i++) {
				if (hasOwnProperty.call(o, DontEnums[i]))
					result.push(DontEnums[i]);
			}
		}
		return result;
	};
})();
