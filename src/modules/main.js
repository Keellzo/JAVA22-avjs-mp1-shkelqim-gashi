let playerScore = 0;
let computerScore = 0;

const welcome = document.getElementById("welcome");
document.getElementById("startBtn").addEventListener("click", () => {
  event.preventDefault();
  document.getElementById("welcome").innerHTML =
    "Welcome, " + playerName + "! <br> Now, choose and let the game begin!";
});

const rockBtn = document.getElementById("rockBtn");
rockBtn.addEventListener("click", () => {
  event.preventDefault();
  playGame("rock");
});

const paperBtn = document.getElementById("paperBtn");
paperBtn.addEventListener("click", () => {
  event.preventDefault();
  playGame("paper");
});

const scissorsBtn = document.getElementById("scissorsBtn");
scissorsBtn.addEventListener("click", () => {
  event.preventDefault();
  playGame("scissors");
});

function getRandomNumber() {
  return Math.round(Math.random() * 2);
}

const result = document.getElementById("result");
function playGame(playerChoice) {
  let computerChoice = getRandomNumber();
  if (computerChoice == 0) {
    computerChoice = "rock";
  } else if (computerChoice == 1) {
    computerChoice = "paper";
  } else {
    computerChoice = "scissors";
  }

  if (computerChoice == "rock") {
    if (playerChoice == "rock") {
      // result.innerHTML = "You chose " + playerChoice + " and computer chose " + computerChoice + ". <br> It's a tie!";
    } else if (playerChoice == "paper") {
      // result.innerHTML = "You chose " + playerChoice + " and computer chose " + computerChoice + ". <br> You win!";
      playerScore++;
    } else {
      // result.innerHTML = "You chose " + playerChoice + " and computer chose " + computerChoice + ". <br> You lose!";
      computerScore++;
    }
  } else if (computerChoice == "paper") {
    if (playerChoice == "rock") {
      // result.innerHTML = "You chose " + playerChoice + " and computer chose " + computerChoice + ". <br> You lose!";
      computerScore++;
    } else if (playerChoice == "paper") {
      // result.innerHTML = "You chose " + playerChoice + " and computer chose " + computerChoice + ". <br> It's a tie!";
    } else {
      // result.innerHTML = "You chose " + playerChoice + " and computer chose " + computerChoice + ". <br> You win!";
      playerScore++;
    }
  } else {
    if (playerChoice == "rock") {
      // result.innerHTML = "You chose " + playerChoice + " and computer chose " + computerChoice + ". <br> You win!";
      playerScore++;
    } else if (playerChoice == "paper") {
      // result.innerHTML = "You chose " + playerChoice +  " and computer chose " + computerChoice + ". <br> You lose!";
      computerScore++;
    } else {
      // result.innerHTML = "You chose " + playerChoice + " and computer chose " + computerChoice + ". <br> It's a tie!";
    }
  }
  result.innerHTML =
    "You chose " + playerChoice + " and computer chose " + computerChoice + + ". <br>" + winner;

  const score = document.getElementById("score");
  score.innerHTML =
    playerName.value + " " + playerScore + " -  " + computerScore + " Computer";

  if (playerScore == 3) {
    const audioWin = new Audio("audio/winsound.mp4");
    audioWin.play();
    result.innerHTML =
      "You chose " +
      playerChoice +
      " and computer chose " +
      computerChoice +
      ". <br> You win the game!";
    hideBtns();
    setTimeout(resetGame, 5000);
  } else if (computerScore == 3) {
    const audioLose = new Audio("audio/sadsound.mp4");
    audioLose.play();
    result.innerHTML =
      "You chose " +
      playerChoice +
      " and computer chose " +
      computerChoice +
      ". <br> Computer wins the game!";
    hideBtns();
    setTimeout(resetGame, 5000);
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerName.value = "";
  welcome.innerHTML = "";
  result.innerHTML = "";
  score.innerHTML = "";
}

function hideBtns() {
  rockBtn.style.visibility = "hidden";
  paperBtn.style.visibility = "hidden";
  scissorsBtn.style.visibility = "hidden";
  setTimeout(() => {
    rockBtn.style.visibility = "visible";
    paperBtn.style.visibility = "visible";
    scissorsBtn.style.visibility = "visible";
  }, 5000);
}
