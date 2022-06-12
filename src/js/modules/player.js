let allGames = Object.values(JSON.parse(localStorage.getItem('playerGames')));

for (let i = 0; i < allGames.length; i++) {
    let gameValue = allGames[i];
    if (gameValue.hasOwnProperty('played')) {
        let tableRow = document.createElement('tr');
        tableRow.setAttribute('id', `results${i}`);
        tableRow.appendChild(createHeader(allGames[i]['title']));
        tableRow.appendChild(createWinLossPara(allGames[i]['result']));
        tableRow.appendChild(createScorePara(allGames[i]['score']));
        document.getElementById('gameResultsTableBody').appendChild(tableRow);
    }
}

function createHeader(title) {
    let heading = document.createElement('th');
    heading.innerHTML = title;
    return heading;
}

function createWinLossPara(result) {
    let resultPara = document.createElement('th');
    if (result === 'win') {
        resultPara.innerHTML = `You Won!`;
    } else {
        resultPara.innerHTML = `You Lost!`;
    }
    return resultPara;
}

function createScorePara(score) {
    let scorePara = document.createElement('th');
    scorePara.innerHTML = score;
    return scorePara;
}