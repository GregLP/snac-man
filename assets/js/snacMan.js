const puzzle = getParameterByName("name");
const gameSongs = games[puzzle]["puzzle"];
const gameTitle = games[puzzle]["title"];
const songs = Object.keys(gameSongs);
const rows = 4;
const cols = 5;
let lives = 3;
let numCorrect = 0;
let progressBarValue = 0;
let score = 0;
let chewable = true;
let progressBarPercentage;
let numToWin;
let ten_minutes = 0;
let minutes = 1;
let ten_seconds = 0;
let seconds = 0;
let blinking = false;
let blink;
const clock = setInterval(function(){setTime(ten_minutes, minutes, ten_seconds, --seconds)}, 1000);
const timer = document.getElementById('timer');


function addPuzzleTitle() {
    document.querySelector('h1').textContent = gameTitle;
}

function getParameterByName(name) {
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const findNumToWin = function(obj){
    numToWin = 0;
    for (let key in obj){
        numToWin += (obj.hasOwnProperty(key) && obj[key]) ? 1 : 0;
    }
    return numToWin;
};

numToWin = findNumToWin(gameSongs);
progressBarPercentage = 100 / findNumToWin(gameSongs);

const drawLives = function(lives){
    for (let i = 0; i < lives; i++){
        const lives_container = document.getElementById("gameLivesRemaining");
        const lives_remaining_html = `<img class="life-remaining" id="life${i}" width="50" height="50" src="assets/img/svg/snacman.svg" alt="snacman extra life">`;
        lives_container.insertAdjacentHTML("beforeend", lives_remaining_html);
    }
};

const drawBoard = function(){
    let gameboard = '';
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            gameboard += ` <div id="r${i.toString() + "c" + j.toString()}" class="cell"><p>${songs.pop()}</p></div>`;
        }
    }
    document.getElementById('gameBoard').innerHTML = gameboard;
};

function placeSnacman() {
    const snacmanStartingCell = document.getElementById("r0c0");
    const drawSnacman = `<svg id="snacman" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 30.3 37.1" style="enable-background:new 0 0 30.3 37.1;" xml:space="preserve"><line class="line line-1 leg left-leg" x1="13.7" y1="31.3" x2="13.7" y2="37.1"/><line class="line line-2 foot left-foot" x1="8.6" y1="36.9" x2="13.9" y2="36.9"/><line class="line line-3 leg right-leg" x1="18" y1="31.4" x2="18" y2="37.1"/><line class="line line-4 foot right-foot" x1="17.8" y1="36.9" x2="23.1" y2="36.9"/><path class="st1 path path-1 hamburger hamburger-top" d="M29.7,11.3C28.6,5.2,22.5,0.5,15.2,0.5S1.8,5.2,0.6,11.3H29.7z"/><path class="st1 path path-2 hamburger hamburger-bottom" d="M1.5,22.5c2.3,5.2,7.6,8.9,13.7,8.9s11.4-3.7,13.7-8.9H1.5z"/><path class="st2 path path-3 eye eye-left eye-whites" d="M14.2,3.8c0,1.1-0.9,2-1.9,2s-1.9-0.9-1.9-2s0.9-2,1.9-2S14.2,2.6,14.2,3.8z"/><path class="st2 path path-4 eye eye-right eye-whites" d="M20.7,3.6c0,1.1-0.9,2-1.9,2s-1.9-0.9-1.9-2s0.9-2,1.9-2S20.7,2.5,20.7,3.6z"/><path class="st3 path path-5 eye eye-right eye-pupil" d="M20.3,4.4c0,0.6-0.5,1.2-1.1,1.2s-1.1-0.5-1.1-1.2s0.5-1.2,1.1-1.2S20.3,3.8,20.3,4.4z"/><path class="st3 path path-6 eye eye-left eye-pupil" d="M12.9,3.1c0,0.6-0.5,1.1-1.1,1.1s-1.1-0.5-1.1-1.2S11.2,2,11.8,2S12.9,2.5,12.9,3.1z"/></svg>`;
    snacmanStartingCell.insertAdjacentHTML("beforeend", drawSnacman);
}

const setTime = function(new_ten_minutes, new_minutes, new_ten_seconds, new_seconds){
    ten_minutes = new_ten_minutes;
    minutes = new_minutes;
    ten_seconds = new_ten_seconds;
    seconds = new_seconds;

    if ((!blinking && ten_minutes === 0 && minutes === 0 && ten_seconds === 0 ) || (!blinking && minutes === 0 && ten_seconds <= 1 && seconds === 0)){
        blinking = true;
        timer.style.color = 'red';
        blink = setInterval(function(){
            if (timer.style.visibility === 'visible') {
                timer.style.visibility = 'hidden';
            } else {
                timer.style.visibility = 'visible';
            }
        }, 500);
    }

    if (seconds === -1){
        if (ten_seconds){
            ten_seconds--;
            seconds = 9;
        }
        else if (minutes){
            ten_seconds = 5;
            seconds = 9;
            minutes--;
        }
        else {
            seconds = 0;
            timer.style.visibility = 'visible';
            gameOver();
            clearInterval(clock);
            clearInterval(blink);

        }
    }
    timer.textContent = `${ten_minutes.toString()}${minutes.toString()}:${ten_seconds.toString()}${seconds.toString()}`;
};

drawLives(2);
drawBoard();
placeSnacman();
addPuzzleTitle()

let currentRow = 0;
let currentColumn = 0;
let currentLocation = `r${currentRow}c${currentColumn}`;
let currentLocationId = document.getElementById(currentLocation);
let snacman = document.getElementById('snacman');

function moveSnacman() {
    currentLocation = `r${currentRow}c${currentColumn}`;
    currentLocationId = document.getElementById(currentLocation);
    currentLocationId.appendChild(snacman);
}

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }
    switch (event.key) {
        case "Down":
        case "ArrowDown":
        case "s":
            currentRow++;
            if (currentRow >= rows ) {
                currentRow = 0;
            }
            moveSnacman();
            break;
        case "Up":
        case "ArrowUp":
        case "w":
            currentRow--
            if (currentRow < 0 ) {
                currentRow = (rows - 1);
            }
            moveSnacman();
            break;
        case "Left":
        case "ArrowLeft":
        case "a":
            currentColumn--;
            if (currentColumn < 0 ) {
                currentColumn = (cols - 1);
            }
            moveSnacman();
            break;
        case "Right":
        case "ArrowRight":
        case "d":
            currentColumn++;
            if (currentColumn >= cols ) {
                currentColumn = 0;
            }
            moveSnacman()
            break;
        case "Enter":
        case " ":
            if (chewable){
                munchCheck();
                eat();
            }
            break;
        default:
            return;
    }
    event.preventDefault();
}, true);


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
    let currentLocationP = document.querySelector(`#${currentLocation} p`);
    if (gameSongs[currentLocationP.textContent] && lives) {
        ++numCorrect;
        score += 100;
        progressBarValue += progressBarPercentage;
        document.getElementById('gamePointTotal').innerHTML = score;
        document.getElementById('progressBar').style.width = `${progressBarValue}%`;
        currentLocationP.textContent = '';
        if (numCorrect === numToWin){
            celebrate();
        }
    }
    else if ( currentLocationP.textContent === ''  ) {
        currentLocationP.textContent = '';
    }
    else if (lives > 0){
        snacman.classList.add("die-animation");
        currentLocationId.style.backgroundColor = 'rgba(196, 30, 58,1)';
        currentLocationP.textContent = '';
        lifeCheck(--lives);
        chewable = false;
        setTimeout(function(){
            chewable = true;
            snacman.classList.remove("die-animation");
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
    let loser_text = `<h2>Game Over</h2><p>A fatal exception has occurred</p><p>You lose</p><p>Score: ${score}</p><div>Next Puzzle: <a class="btn btn-default" href="${randomPuzzle()}"></a></div>`;
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


function randomPuzzle() {
    const totalPuzzles = Object.keys(games);
    const newPuzzleArrayNumber = Math.floor(Math.random() * (totalPuzzles.length - 1));
    const newPuzzleName = totalPuzzles[newPuzzleArrayNumber];
    return `?name=${newPuzzleName}`;
}