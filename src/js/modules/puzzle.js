function randomPuzzle() {
    const totalPuzzles = Object.keys(games);
    const newPuzzleArrayNumber = Math.floor(Math.random() * (totalPuzzles.length - 1));
    const newPuzzleName = totalPuzzles[newPuzzleArrayNumber];
    return `?name=${newPuzzleName}`;
}

function createPuzzleUrl() {
    const newPuzzleSelected = randomPuzzle();
    const puzzleButton = document.getElementById('playButton');
    puzzleButton.setAttribute('href', `play.html?${newPuzzleSelected}`);
}
createPuzzleUrl()