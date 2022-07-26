class Puzzle {
    correctAnswersCount;
    constructor(puzzleId) {
        this.puzzleId = puzzleId;
        this.puzzleName = allPuzzles[puzzleId]["title"];
        this.questions = allPuzzles[puzzleId]["puzzle"];
        this.questionNames = Object.keys(this.questions);
        this.correctAnswersCount = this.correctQuestionsCalc();
    }

    correctQuestionsCalc(){
        let numToWin = 0;
        for (let key in this.questions){
            numToWin += (this.questions.hasOwnProperty(key) && this.questions[key]) ? 1 : 0;
        }
        return numToWin;
    }
}

export default Puzzle;