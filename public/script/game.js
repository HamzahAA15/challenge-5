// Select RPS class
const rockPlayerClass = document.querySelector(".batu-p");
const paperPlayerClass = document.querySelector(".kertas-p");
const scissorPlayerClass = document.querySelector(".gunting-p");
const rockComputerClass = document.querySelector(".batu-c");
const paperComputerClass = document.querySelector(".kertas-c");
const scissorComputerClass = document.querySelector(".gunting-c");
const winLose = document.querySelector(".win-lose");

// choices
const choices = ["rock", "paper", "scissor"];

// Scores Player & Computer

let scorePlayer = 0;
let scoreComp = 0;

// score log
let logPlayer = [];
let logComputer = [];

// event listener when player choose the choices
rockPlayerClass.addEventListener("click", () => {
  userChoosen = choices[0];
  clickResult(userChoosen);
});

paperPlayerClass.addEventListener("click", () => {
  userChoosen = choices[1];
  clickResult(userChoosen);
});

scissorPlayerClass.addEventListener("click", () => {
  userChoosen = choices[2];
  clickResult(userChoosen);
});

// action when RPS button pressed
function clickResult(userChoosen) {
  let userAction = new PlayerChoice(userChoosen);
  let computerAction = new PlayerChoice();
  let choiceofUser = userAction.userChoice();
  let choiceofComputer = computerAction.computerChoiceLogic();
  let game = new GameLogic(choiceofUser, choiceofComputer);
  let choosenStyle = new ImgHover(choiceofUser, choiceofComputer);
  console.log(`player choose ${userChoosen}`);
  logPlayer.push(userChoosen);
  console.log(`player choose history ${logPlayer}`);
  choosenStyle.playerEffect();
  choosenStyle.comEffect();
  game.playGame();
}

// action class when player has choosen
class PlayerChoice {
  constructor(playerChoose) {
    this.playerChoose = playerChoose;
  }

  userChoice() {
    return this.playerChoose;
  }

  // computer random choice logic
  computerChoiceLogic() {
    let computerChoosen = choices[Math.floor(Math.random() * 3)];
    console.log(`computer choose ${computerChoosen}`);
    logComputer.push(computerChoosen);
    console.log(`computer choice history ${logComputer}`);
    return computerChoosen;
  }
}

// styling when player and computer has choosen
class ImgHover {
  constructor(user, computer) {
    this.user = user;
    this.computer = computer;
  }
  // padding effect when player has choosen
  playerEffect() {
    if (this.user === "rock") {
      rockPlayerClass.classList.add("game-img-clicked");
      paperPlayerClass.classList.remove("game-img-clicked");
      scissorPlayerClass.classList.remove("game-img-clicked");
    } else if (this.user === "paper") {
      paperPlayerClass.classList.add("game-img-clicked");
      scissorPlayerClass.classList.remove("game-img-clicked");
      rockPlayerClass.classList.remove("game-img-clicked");
    } else if (this.user === "scissor") {
      scissorPlayerClass.classList.add("game-img-clicked");
      rockPlayerClass.classList.remove("game-img-clicked");
      paperPlayerClass.classList.remove("game-img-clicked");
    }
  }
  // padding effect when computer has choosen
  comEffect() {
    if (this.computer === "rock") {
      rockComputerClass.classList.add("game-img-clicked");
      paperComputerClass.classList.remove("game-img-clicked");
      scissorComputerClass.classList.remove("game-img-clicked");
    } else if (this.computer === "paper") {
      paperComputerClass.classList.add("game-img-clicked");
      scissorComputerClass.classList.remove("game-img-clicked");
      rockComputerClass.classList.remove("game-img-clicked");
    } else if (this.computer === "scissor") {
      scissorComputerClass.classList.add("game-img-clicked");
      rockComputerClass.classList.remove("game-img-clicked");
      paperComputerClass.classList.remove("game-img-clicked");
    }
  }
}

// game logic to get winnner/looser/draw
class GameLogic {
  constructor(user, computer) {
    this.user = user;
    this.computer = computer;
  }

  playGame() {
    if (this.user === this.computer) {
      this.Draw();
      console.log(`Draw`);
    } else if (
      (this.user === "rock" && this.computer === "paper") ||
      (this.user === "paper" && this.computer === "scissor") ||
      (this.user === "scissor" && this.computer === "rock")
    ) {
      this.computerWin();
      scoreComp++;
      console.log(`${this.computer} over ${this.user} Computer Wins`);
    } else if (
      (this.user === "rock" && this.computer === "scissor") ||
      (this.user === "paper" && this.computer === "rock") ||
      (this.user === "scissor" && this.computer === "paper")
    ) {
      this.playerWin();
      console.log(`${this.user} over ${this.computer} Player Wins`);
      scorePlayer++;
    }

    console.log(`Player Scores: ${scorePlayer} Computer Scores: ${scoreComp}`);
  }

  Draw() {
    winLose.classList.remove("vs");
    winLose.classList.remove("win-or-lose");
    winLose.classList.add("draw");
    winLose.innerHTML = "DRAW";
  }

  computerWin() {
    winLose.classList.remove("vs");
    winLose.classList.remove("draw");
    winLose.classList.add("win-or-lose");
    winLose.innerHTML = "COM <br> WIN";
  }

  playerWin() {
    winLose.classList.remove("vs");
    winLose.classList.remove("draw");
    winLose.classList.add("win-or-lose");
    winLose.innerHTML = "PLAYER 1 <br> WIN";
  }
}

// refresh button
document
  .querySelector(".refresh")
  .addEventListener("click", () => location.reload());
