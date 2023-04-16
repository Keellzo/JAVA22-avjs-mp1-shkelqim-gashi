import { user } from "./user.js";
import { updateObject, getHighscore, displayHighscore } from "./firebase.js";

let player;
let playerScore = 0;
let playerName;
let gameActive = true;

function computerPlay() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "draw";
  }

  if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "scissors" && computerSelection === "paper") ||
    (playerSelection === "paper" && computerSelection === "rock")
  ) {
    return "win";
  }

  return "lose";
}

function updateScore() {
  document.getElementById("score").textContent = `Score: ${playerScore}`;
}

function displayResult(result, playerSelection, computerSelection) {
  let message;
  if (result === "win") {
    message = `You win! Your ${playerSelection} beats computers ${computerSelection}!`;
  } else if (result === "lose") {
    message = `You lose! Computer picked ${computerSelection} and beats your ${playerSelection}!`;
  } else {
    message = `It's a draw! You both picked ${playerSelection}.`;
  }
  document.getElementById("result").textContent = message;
}

async function game(playerSelection) {
  if (!gameActive) {
    return;
  }

  if (!playerName) {
    document.getElementById("result").textContent = "Please enter your name";
    return;
  }

  const computerSelection = computerPlay();
  const result = playRound(playerSelection, computerSelection);

  if (result === "win") {
    playerScore++;
  } else if (result === "lose") {
    gameActive = false;
    player.setScore(playerScore);

    if (playerScore > 0) {
      await updateObject(player.getUsername(), player.getScore());
      getHighscore().then((data) => displayHighscore(data));
    }

    hideBtns();
    setTimeout(resetGame, 4000);
  }

  updateScore();
  displayResult(result, playerSelection, computerSelection);
}

document.getElementById("addInfo").addEventListener("submit", (event) => {
  event.preventDefault();
  playerName = document.getElementById("playerName").value.trim();
  if (!playerName) {
    document.getElementById("result").textContent = "Please enter your name";
    return;
  }
  player = new user(playerName, 0);
  document.getElementById(
    "welcome"
  ).textContent = `Welcome, ${player.getUsername()}!`;
  gameActive = true;
});

document
  .getElementById("rockBtn")
  .addEventListener("click", () => game("rock"));
document
  .getElementById("paperBtn")
  .addEventListener("click", () => game("paper"));
document
  .getElementById("scissorsBtn")
  .addEventListener("click", () => game("scissors"));

updateScore();

function resetGame() {
  playerScore = 0;
  playerName.value = "";
  welcome.innerHTML = "";
  result.innerHTML = "";
  score.innerHTML = "";
}

function hideBtns() {
  addInfo.style.visibility = "hidden";
  rockBtn.style.visibility = "hidden";
  paperBtn.style.visibility = "hidden";
  scissorsBtn.style.visibility = "hidden";
  setTimeout(() => {
    addInfo.style.visibility = "visible";
    rockBtn.style.visibility = "visible";
    paperBtn.style.visibility = "visible";
    scissorsBtn.style.visibility = "visible";
  }, 4000);
}
