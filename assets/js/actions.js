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
		let leftMoveDivID = `#r${currentRow}c${currentColumn}`;
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
			munchCheck();
			eat();
		}
	}
}

const eat = function() {
	const leftLeg = document.querySelector('.left-leg');
	const rightLeg = document.querySelector('.right-leg');
	const hamburgerBottom = document.querySelector('.hamburger-bottom');
	leftLeg.setAttribute('y1', '21.5');
	rightLeg.setAttribute('y1', '21.5');
	hamburgerBottom.setAttribute('d', 'M1.5,12.5c2.3,5.2,7.6,8.9,13.7,8.9s11.4-3.7,13.7-8.9H1.5z');
	setTimeout(function(){
		leftLeg.setAttribute('y1', '31.3');
		rightLeg.setAttribute('y1', '31.3');
		hamburgerBottom.setAttribute('d', 'M1.5,22.5c2.3,5.2,7.6,8.9,13.7,8.9s11.4-3.7,13.7-8.9H1.5z');
	}, 100)
}

const munchCheck = function(){
	let currentLocation = `r${currentRow}c${currentColumn}`;
	let currentLocationId = document.getElementById(currentLocation);
	let currentLocationP = document.querySelector(`#${currentLocation} p`);
	let snacMan = document.getElementById('snacman');

	if (gameSongs[$('div#r' + currentRow + "c" + currentColumn).text()] && lives) {
		++numCorrect;
		score += 100;
		progressBarValue += progressBarPercentage;
		document.getElementById('gamePointTotal').innerHTML = score;
		document.getElementById('progressBar').style.width = `${progressBarValue}%`;
		currentLocationP.textContent = '';
		if (numCorrect === numToWin){
			setCookie("bob", 1, 1);
			celebrate();
		}
	}
	else if ( currentLocationP.textContent === ''  ) {
		currentLocationP.textContent = '';
	}
	else if (lives > 0){
		snacMan.classList.add("die-animation");
		currentLocationId.style.backgroundColor = 'rgba(196, 30, 58,1)';
		currentLocationP.textContent = '';
		lifeCheck(--lives);
		chewable = false;
		setTimeout(function(){
			chewable = true;
			snacMan.classList.remove("die-animation");
		}, 1000);
	}
	else{
		clearInterval(clock);
		gameOver();
	}
}

const lifeCheck = function(lives){
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

const celebrate = function(){
	setTimeout(function(){
		document.getElementById("gameOver").style.visibility = "visible";
		score += (seconds + 10*ten_seconds + 60*minutes + 3600*ten_minutes)*100 + 500*lives;
		let stars = 0
		if (score > 6000)
			stars = 3;
		else if (score > 4000)
			stars = 2;
		else if (score > 2000)
			stars = 1;
		let winner_text = `<h2>Game Over</h2><p>You Win!</p><p>Score: ${score}</p>`;
		for (let i=0; i<stars; i++)
			winner_text += "<span id=\"stars\"> &#9733 </span>"
		document.getElementById('gameOver').innerHTML = winner_text;
		clearInterval(clock);
		clearInterval(blink);
}, 200);
};
