let currentRow = 0;
let currentColumn = 0;
onkeydown = function(e){
	if (e.keyCode == '39'){
		currentColumn++;
		if (currentColumn >= cols ) {
			currentColumn = 0;
		}
		let rightMoveDivID = `#${currentRow}r${currentColumn}`;
		$("#snacman").appendTo(rightMoveDivID);
	}
	else if (e.keyCode == '37') {
		currentColumn--;
		if (currentColumn < 0 ) {
			currentColumn = (cols - 1);
		}
		leftMoveDivID = `#${currentRow}r${currentColumn}`;
		$("#snacman").appendTo(leftMoveDivID);
	}
	else if (e.keyCode == '38'){
		currentRow--
		if (currentRow < 0 ) {
			currentRow = (rows - 1);
		}
		let upMoveDivID = `#${currentRow}r${currentColumn}`;
		$("#snacman").appendTo(upMoveDivID);
	}
	else if (e.keyCode == '40'){
		currentRow++;
		if (currentRow >= rows ) {
			currentRow = 0;
		}
		let downMoveDivID = `#${currentRow}r${currentColumn}`;
		$("#snacman").appendTo(downMoveDivID);
	}
	else if (e.keyCode == '13' || e.keyCode == '32'){
			if (chewable){
			chew();
			munchCheck();
		}
	}
}

var chew = function(){
	var top = parseInt($('#snacman').css('top'));
	setTimeout(function(){ document.getElementById('snacman').src = 'assets/img/eat/eat2.png';
		$('#snacman').css('top', (top - 45) + "px");});
	setTimeout(function(){ document.getElementById('snacman').src = 'assets/img/eat/eat3.png'}, 20);
	setTimeout(function(){ document.getElementById('snacman').src = 'assets/img/eat/eat4.png'}, 40);
	setTimeout(function(){ document.getElementById('snacman').src = 'assets/img/eat/eat5.png'}, 60);
	setTimeout(function(){ document.getElementById('snacman').src = 'assets/img/eat/eat6.png'}, 80);
	setTimeout(function(){ document.getElementById('snacman').src = 'assets/img/eat/eat5.png'}, 100);
	setTimeout(function(){ document.getElementById('snacman').src = 'assets/img/eat/eat4.png'}, 120);
	setTimeout(function(){ document.getElementById('snacman').src = 'assets/img/eat/eat3.png'}, 140);
	setTimeout(function(){ document.getElementById('snacman').src = 'assets/img/eat/eat2.png'}, 160);
	setTimeout(function(){ document.getElementById('snacman').src = 'assets/img/svg/snacman.svg';
		$('#snacman').css('top', "auto");}, 180);
};

var munchCheck = function(){
	if (gameSongs[$('div#' + currentRow + "r" + currentColumn).text()] && lives) {
		++numCorrect;
		score += 100;
		$('#gamePointTotal').text(score);
		progressBarValue += progressBarPercentage;
		$('#progressBar').css("width", progressBarValue + '%');
		$('div#' + currentRow + "r" + currentColumn).css("color", "#5dfc0a");
		setTimeout(function(){$('div#' + currentRow + "r" + currentColumn + " p").remove();}, 30);
		var numText = (numToWin == numCorrect) ? "You Win!" : (numToWin - numCorrect + " To Win");
		if (numCorrect == numToWin){
			setCookie("bob", 1, 1);
			celebrate();
		}
	}
	else if ( ( $('div#' + currentRow + "r" + currentColumn + " p").text() == 'Wrong!' ) || ( $('div#' + currentRow + "r" + currentColumn + " p").text() == 'no snacs!' ) ||  ( $('div#' + currentRow + "r" + currentColumn + " p").html() === " " ) ) {
		$('div#' + currentRow + "r" + currentColumn + " p").text("no snacs!");
	}
	else if (lives > 0){
		$('div#' + currentRow + "r" + currentColumn + " p").text("Wrong!");
		$('div#' + currentRow + "r" + currentColumn + " p").css("color", "red");
		lifeCheck(--lives);
		die();
	}
	else{
		clearInterval(clock);
		gameOver();
	}
}

var die = function(){
	chewable = false;
	setTimeout(function(){
		chewable = true;
	}, 1000);

	for (var i = 0; i < 20; i++){
		deathFrameTimeout(i);
	}

	setTimeout(function(){ document.getElementById('snacman').src = 'assets/img/svg/snacman.svg';
		$('#snacman').css('top', "auto");
	}, 1000);
};

var deathFrameTimeout = function(i){
	setTimeout(function(){
		document.getElementById('snacman').src = 'assets/img/die/die' + (i + 1) + '.png';
		$('#snacman').css('top', "auto");
	}, i*50);
};

var lifeCheck = function(lives, hit){
	if (lives === 0){
		gameOver();
	}
	$("#life" + (lives - 1)).css("visibility", "hidden");
};

function gameOver() {
	$('#game_over').css("visibility", "visible");
	let loser_text = "Game Over<br /><br />A fatal exception has occurred:<br /><br />You Lose!<br /><br />Score:0";
	$('#game_over').html(loser_text);
}

var celebrate = function(){
	setTimeout(function(){
		//evalSound('win');
		$('#game_over').css("visibility", "visible");
		score += (seconds + 10*ten_seconds + 60*minutes + 3600*ten_minutes)*100 + 500*lives;
		var stars = 0
		if (score > 6000)
			stars = 3;
		else if (score > 4000)
			stars = 2;
		else if (score > 2000)
			stars = 1;
		var winner_text = "<span>Game Over</span><br /><span>You Win!</span><br /><br /><span>Time: " + $('#timer').text() + "</span><br /><span>Score: " + score +
			"</span><br />";

		for (var i = 0; i < stars; i++)
			winner_text += "<span id=\"stars\"> &#9733 </span>"

		$('#game_over').html(winner_text);
		clearInterval(clock);
		clearInterval(blink);
}, 200);
};
