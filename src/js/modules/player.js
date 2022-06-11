let allGames = Object.values(JSON.parse(localStorage.getItem('playerGames')));

for (let i = 0; i < allGames.length; i++) {
    let gameValue = allGames[i];
    if (gameValue.hasOwnProperty('played')) {
        createHeader(allGames[i]['title']);
        createWinLossPara(allGames[i]['result']);
        createScorePara(allGames[i]['score']);
    }
}

function createHeader(title) {
    let heading = document.createElement('h2');
    heading.innerHTML = title;
    document.getElementById('gameResults').appendChild(heading);
}

function createWinLossPara(result) {
    let resultPara = document.createElement('p');
    if (result === 'win') {
        resultPara.innerHTML = `You Won!`;
    } else {
        resultPara.innerHTML = `You Lost!`;
    }
    document.getElementById('gameResults').appendChild(resultPara);
}

function createScorePara(score) {
    let scorePara = document.createElement('p');
    scorePara.innerHTML = score;
    document.getElementById('gameResults').appendChild(scorePara);
}