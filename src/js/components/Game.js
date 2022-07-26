class Game {
    constructor(){
        this.score = 0;
        this.livesCount = 3;
        this.answeredCorrectlyCount = 0;
        this.progressBarPercent = 0;
        this.isChewable = true;
        this.hasWonGame = false;
    }
}

export default Game;