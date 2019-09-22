/**
 * GAME RULES:
 * - The game has two players, playing in rounds
 * - In each turn, a player roll a dice as many time as he whishes.
 *   Each result get added to his ROUND score.
 * - But if the player rolls a 1, all his ROUND score gets lost.
 *   After that, It's the next player's turn.
 * - The player can choose to "Hold", which means that his ROUND score
 *   added to his GLOBAL score. After that, it's the next players turn
 * - The first player to reach 100 points on GLOBAL score wins the game.
 */

var scores, roundScore, activePlayer, gamePlaying;

newGame();

function newGame() {
  if (activePlayer != undefined) {
    document.querySelector(`player-${activePlayer}-panel`).classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
  }

  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  restoreCurrentScore();

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";

  document.getElementById(`name-0`).textContent = "Player 1";
  document.getElementById(`name-1`).textContent = "Player 2";

  hideDice();

}

function nextPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  roundScore = 0;

  restoreCurrentScore();

  document.querySelector('.player-0-panel').classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  hideDice();
}

function restoreCurrentScore() {
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
}

function hideDice() {
  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", newGame);

document.querySelector(".btn-roll").addEventListener("click", () => {

  if (!gamePlaying) return;

  var dice = Math.floor(Math.random() * 6) + 1;
  var diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = `dice-${dice}.png`;

  if (dice !== 1) {
    roundScore += dice;
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
  } else {
    nextPlayer();
  }
})

document.querySelector(".btn-hold").addEventListener("click", () => {
  if (!gamePlaying) {
    return;
  };

  scores[activePlayer] += roundScore;

  document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

  if (scores[activePlayer] >= 10) {
    gamePlaying = false;
    document.getElementById(`name-${activePlayer}`).textContent = "WINNER";
    document.querySelector(`.player-${activePlayer}-panel`).classList.add("winner");
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove("active");
    hideDice();
  } else {
    nextPlayer();
  }
});