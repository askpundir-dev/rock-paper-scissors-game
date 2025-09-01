
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});


const container = document.getElementById("div1");
const resultContainer = container.querySelector(".js-result");
const scoreContainer = container.querySelector(".js-score");
const pickChoiceHeading=document.querySelector('.pick-choice') ;
// console.log([pickChoiceHeading]);
let Score = JSON.parse(localStorage.getItem("Score")) || {
  playerScore: 0,
  computerScore: 0,
  drawScore: 0,
};
updateScoreElement();
let playAgainTimeout;
let resetBtnTimeout;
container.addEventListener("click", (event) => {
  if (event.target.id === "btn1") {
    // console.log("Rock");
    playGame("rock");
      pickChoiceHeading.textContent='';
  } else if (event.target.id === "btn2") {
    // console.log("Paper");
    playGame("paper");
      pickChoiceHeading.textContent='';
  } else if (event.target.id === "btn3") {
    playGame("scissor");
      pickChoiceHeading.textContent='';
  } else if (event.target.id === "btn4") {
    resetScore();
  }

});
function computersMove() {
  const computerPicked = Math.floor(Math.random() * 3) + 1;
  // console.log(computerPicked);
  if (computerPicked === 1) {
    // console.log("Computer:rock");
    return "rock";
  } else if (computerPicked === 2) {
    // console.log("computer:paper");
    return "paper";
  } else if (computerPicked === 3) {
    // console.log("computer:scissor");
    return "scissor";
  }
}

function playGame(userPicked) {
  const computerPicked = computersMove();
  const outcomes = {
    rock: { rock: "draw", paper: "lose", scissor: "win" },
    paper: { rock: "win", paper: "draw", scissor: "lose" },
    scissor: { rock: "lose", paper: "win", scissor: "draw" },
  };

  const result = outcomes[userPicked][computerPicked];
  // console.log(result);

  // console.log(resultContainer);
  if (result === "draw") {
    Score.drawScore += 1;
    resultContainer.textContent = "⚔️Match Draw!⚔️";
    resultContainer.style.color = "yellow";
    showChoiceResult(userPicked, computerPicked); //new function
    // console.log(Score);
  } else if (result === "win") {
    Score.playerScore += 1;
    resultContainer.textContent = "🎉Congratulations! You Won🎉";
    resultContainer.style.color = "greenyellow";

    showChoiceResult(userPicked, computerPicked);

    // console.log(Score);
  } else if (result === "lose") {
    Score.computerScore += 1;
    resultContainer.textContent = "You Lose!😭";
    resultContainer.style.color = "red";
    showChoiceResult(userPicked, computerPicked);
    // console.log(Score);
  }
  clearTimeout(playAgainTimeout);

  playAgainTimeout = setTimeout(() => {
    resultContainer.textContent = "🔁Play Again";
  }, 4000);

  localStorage.setItem("Score", JSON.stringify(Score));
  updateScoreElement();
}
//new function
const choiceContainer = container.querySelector(".js-choices");
function showChoiceResult(userPicked, computerPicked) {
  const emojiMap = {
    rock: "✊",
    paper: "🤚",
    scissor: "✌️",
  };
  const compChoice = emojiMap[computerPicked] || "❓";
  const userChoice = emojiMap[userPicked] || "❓";
  choiceContainer.innerHTML = `Your choice: <big>${userChoice}</big><br> Computer's choice: <big>${compChoice}</big>`;
}

function updateScoreElement() {
  scoreContainer.innerHTML = `Wins:${Score.playerScore} Loses:${Score.computerScore} Draw:${Score.drawScore}`;
}
const ele =container.querySelector(".js-reset-message");
function resetScore() {
  const { playerScore, computerScore, drawScore } = Score;
  clearTimeout(playAgainTimeout);
  clearTimeout(resetBtnTimeout);
  if (playerScore || computerScore || drawScore) {
    // console.log("Resetting Score...");

    setTimeout(() => {
      Score.playerScore = 0;
      Score.computerScore = 0;
      Score.drawScore = 0;
      localStorage.removeItem("Score");
      updateScoreElement();
      resultContainer.textContent = "";
      choiceContainer.innerHTML = "";
      pickChoiceHeading.textContent='Pick Your Choice';
      // console.log(Score);
      // alert(`Wins:0 Loses:0 Draw:0`);
    }, 200);
  } else {
    ele.innerHTML = "No scores to reset!";
    document.querySelector("#btn4").after(ele);
    resetBtnTimeout = setTimeout(() => {
      ele.textContent='';
    }, 2000);
  }
}
