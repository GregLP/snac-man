let currentRow = 0;
let currentColumn = 0;
onkeydown = function(e){
	if (e.keyCode == '39'){
		currentColumn++;
		if (currentColumn >= cols ) {
			currentColumn = 0;
		}
		let rightMoveDivID = `#r${currentRow}c${currentColumn}`;
		$("#snacman").appendTo(rightMoveDivID);
	}
	else if (e.keyCode == '37') {
		currentColumn--;
		if (currentColumn < 0 ) {
			currentColumn = (cols - 1);
		}
		leftMoveDivID = `#r${currentRow}c${currentColumn}`;
		$("#snacman").appendTo(leftMoveDivID);
	}
	else if (e.keyCode == '38'){
		currentRow--
		if (currentRow < 0 ) {
			currentRow = (rows - 1);
		}
		let upMoveDivID = `#r${currentRow}c${currentColumn}`;
		$("#snacman").appendTo(upMoveDivID);
	}
	else if (e.keyCode == '40'){
		currentRow++;
		if (currentRow >= rows ) {
			currentRow = 0;
		}
		let downMoveDivID = `#r${currentRow}c${currentColumn}`;
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
	var snacmanId = document.getElementById('snacman');
	var snacTop = snacman.style.top;
	console.log(snacTop);
	var top = parseInt($('#snacman').css('top'));
	setTimeout(
		function() {
			document.getElementById('snacman').src = 'assets/img/eat/eat2.png';
			$('#snacman').css('top', (top - 45) + "px");
		});

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
	let currentLocation = `r${currentRow}c${currentColumn}`;
	let currentLocationId = document.getElementById(currentLocation);
	let currentLocationP = document.querySelector(`#${currentLocation} p`);

	if (gameSongs[$('div#r' + currentRow + "c" + currentColumn).text()] && lives) {
		++numCorrect;
		score += 100;
		progressBarValue += progressBarPercentage;
		document.getElementById('gamePointTotal').innerHTML = score;
		document.getElementById('progressBar').style.width = `${progressBarValue}%`;
		currentLocationP.textContent = '';
		if (numCorrect == numToWin){
			setCookie("bob", 1, 1);
			celebrate();
		}
	}
	else if ( currentLocationP.textContent === ''  ) {
		currentLocationP.textContent = '';
	}
	else if (lives > 0){
		currentLocationId.style.backgroundColor = 'rgba(196, 30, 58,1)';
		currentLocationP.textContent = '';
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

var lifeCheck = function(lives){
	if (lives === 0){
		gameOver();
	} else {
		let extraLifeId = `life${lives -1}`;
		document.getElementById(extraLifeId).style.visibility = "hidden";
	}
};

function gameOver() {
	document.getElementById("gameOver").style.visibility = "visible";
	score = 0;
	let loser_text = `<h2>Game Over</h2><p>A fatal exception has occurred</p><p>You lose</p><p>Score: ${score}</p>`;
	document.getElementById('gameOver').innerHTML = loser_text;
	clearInterval(clock);
	clearInterval(blink);
}

var celebrate = function(){
	setTimeout(function(){
		document.getElementById("gameOver").style.visibility = "visible";
		score += (seconds + 10*ten_seconds + 60*minutes + 3600*ten_minutes)*100 + 500*lives;
		var stars = 0
		if (score > 6000)
			stars = 3;
		else if (score > 4000)
			stars = 2;
		else if (score > 2000)
			stars = 1;
		let winner_text = `<h2>Game Over</h2><p>You Win!</p><p>Score: ${score}</p>`;
		for (var i = 0; i < stars; i++)
			winner_text += "<span id=\"stars\"> &#9733 </span>"
		document.getElementById('gameOver').innerHTML = winner_text;
		clearInterval(clock);
		clearInterval(blink);
}, 200);
};
