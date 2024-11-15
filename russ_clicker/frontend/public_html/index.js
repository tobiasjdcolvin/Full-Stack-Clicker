const russButton = document.getElementById("russButton");
const playerScoreEl = document.getElementById("playerScore");

let playerScore = 0; // TEMPORARY - will move to backend and then database

function updateScore() {
    playerScore += 1; // this will be a request to backend

    playerScoreEl.textContent = `Score: ${playerScore}`;

}