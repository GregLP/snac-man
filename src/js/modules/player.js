let allGames = Object.values(JSON.parse(localStorage.getItem('playerGames')));
document.getElementById('totalScore').textContent = localStorage.getItem('totalUserScore');

for (let i = 0; i < allGames.length; i++) {
    let gameValue = allGames[i];
    if (gameValue.hasOwnProperty('played')) {
        let tableRow = document.createElement('tr');
        tableRow.setAttribute('class', `game-result`);
        tableRow.appendChild(createHeader(allGames[i]['title']));
        tableRow.appendChild(createWinLossPara(allGames[i]['result']));
        tableRow.appendChild(createScorePara(allGames[i]['score']));
        document.getElementById('gameResultsTableBody').appendChild(tableRow);
    }
}

function createHeader(title) {
    let heading = document.createElement('td');
    heading.setAttribute('scope', 'col');
    heading.innerHTML = title;
    return heading;
}

function createWinLossPara(result) {
    let resultPara = document.createElement('td');
    resultPara.setAttribute('scope', 'col');
    if (result === 'win') {
        resultPara.innerHTML = `<svg class="win-icon" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M9.55 19 2.825 12.275 5.25 9.85 9.55 14.175 18.775 4.95 21.2 7.35Z"/></svg>`;
    } else {
        resultPara.innerHTML = `<svg class="lose-icon" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6.35 20.025 4 17.65 9.625 12 4 6.35 6.35 3.95 12 9.6 17.65 3.95 20 6.35 14.375 12 20 17.65 17.65 20.025 12 14.375Z"/></svg>`;
    }
    return resultPara;
}

function createScorePara(score) {
    let scorePara = document.createElement('td');
    scorePara.setAttribute('scope', 'col');
    scorePara.innerHTML = score;
    return scorePara;
}

//sort the table to put top scores on top
function sortTable() {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("gameResultsTable");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[2];
            y = rows[i + 1].getElementsByTagName("TD")[2];
            if (Number(x.innerHTML) < Number(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}