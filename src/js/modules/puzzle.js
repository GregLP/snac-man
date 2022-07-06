function randomPuzzle() {
    const totalPuzzles = Object.keys(allPuzzles);
    const newPuzzleArrayNumber = Math.floor(Math.random() * (totalPuzzles.length - 1));
    const newPuzzleName = totalPuzzles[newPuzzleArrayNumber];
    return `?name=${newPuzzleName}`;
}

function createPuzzleUrl() {
    const newPuzzleSelected = randomPuzzle();
    const puzzleButton = document.getElementById('playButton');
    puzzleButton.setAttribute('href', `play.html${newPuzzleSelected}`);
}

function setUserScore() {
    document.getElementById('score').textContent = localStorage.getItem('totalUserScore');
}

let settings = {
    "sound": true,
    "autoplay": true
};

function checkLocalStorage(key, value){
    let storageItem = localStorage.getItem(key);
    if (storageItem === null) {
        localStorage.setItem(key, value);
    }
}

createPuzzleUrl();
setUserScore();

checkLocalStorage('settings', JSON.stringify(settings));
checkLocalStorage('totalUserScore', '0');