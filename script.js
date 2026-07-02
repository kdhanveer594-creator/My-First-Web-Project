let userScore = 0;
let compScore = 0;
let gameOver = false;
let gameStarted = false;

const winSound = new Audio("images/game win.mp3");
const drawSound = new Audio("images/game draw.mp3");
const loseSound = new Audio("images/lose game.mp3");
const gameOverSound = new Audio("images/game over.mp3");
const letsGoSound = new Audio("images/lets go.mp3");
const sound = new Audio("images/sound.mp3");

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector(".msg");
const resetBtn = document.querySelector("#reset");
const playBtn = document.querySelector(".play-btn");
const countdown = document.querySelector("#countdown");

const userChoicePara = document.querySelector("#user-choice");
const compChoicePara = document.querySelector("#comp-choice");
const history = document.querySelector("#history");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

// 1. computer ki randome choice ke liye function//
const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

// 2. game draw bala function//
const drawGame = () => {

    msg.innerText = "Game draw..!";
    drawSound.play();
    drawSound.currentTime = 0;
    msg.style.backgroundColor = "skyblue";
};
//match history function//
const addHistory = (userChoice, compChoice, result) => {
    const historyItems = document.createElement("p");
    historyItems.innerText = `You: ${userChoice} | Computer: ${compChoice} =>${result}`
    history.append(historyItems);
};
// 3. user or computer ki choice ke according user score and winner message//
const showWinner = (userWin) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        if (userScore === 5) {
            gameOver = true;
            msg.innerText = "🎉 You are Champion!";
            gameOverSound.play();
        } else {
            msg.innerText = "You win..!";
            winSound.play();
            winSound.currentTime = 0;
            msg.style.backgroundColor = "green";
        }
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        if (compScore === 5) {
            gameOver = true;
            msg.innerText = "💻 Computer is Champion!";
            gameOverSound.play();
        } else {
            msg.innerText = "You lose..!";
            loseSound.play();
            loseSound.currentTime = 0;
            msg.style.backgroundColor = "red";
        }
    }
};

// 4. user choice function//
const playGame = (userChoice) => {
    if (!gameStarted) {
        msg.innerText = "▶ Play again"
        return;
    }
    if (gameOver) {
        return;
    }


    // comp choice whithin function
    const comChoice = genCompChoice();
    userChoicePara.innerText = userChoice;
    compChoicePara.innerText = comChoice;
    // condition draw hone par//
    if (userChoice === comChoice) {
        drawGame();
        addHistory(userChoice, comChoice, "draw!");
    } else {
        // match ka conclusion par//
        let userWin = true;

        if (userChoice === "rock") {
            userWin = comChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {

            userWin = comChoice === "scissor" ? false : true;
        } else {

            userWin = comChoice === "rock" ? false : true;

        }
        showWinner(userWin);
        if (userWin) {
            addHistory(userChoice, comChoice, "win!");
        } else {
            addHistory(userChoice, comChoice, "lose!");
        }
    }
};

// button click hone ka sara loop
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);

    });
});

resetBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "▶ Play again..!";
    msg.style.backgroundColor = "#657807";

    userChoicePara.innerText = "You : -";

    compChoicePara.innerText = "Computer : -";
    history.innerHTML = "";
    gameOver = false;
    gameStarted = false;
    playBtn.disabled = false;
});
playBtn.addEventListener("click", () => {
    if(gameOver){
        msg.innerText = "🔄 Reset Game First!";
        return;
    }
    let count = 3;
    countdown.style.display = "block";
    countdown.innerText = count;
    sound.play();
    countdown.classList.remove("animate-count");

    setTimeout(() => {
        countdown.classList.add("animate-count");
    }, 10);
    const timer = setInterval(() => {
        count--;
        if (count > 0) {
            countdown.innerText = count;
            sound.play();
            countdown.classList.remove("animate-count");
            void countdown.offsetWidth;
            countdown.classList.add("animate-count");
        } else {
            countdown.innerText = "Go!";
            letsGoSound.play();
            countdown.classList.remove("animate-count");
            void countdown.offsetWidth;


            countdown.classList.add("animate-count");
            gameStarted = true;


            setTimeout(() => {
                countdown.style.display = "none";
            }, 1200);
            clearInterval(timer);
        }
    }, 1200);
});

// dark light mode
const theameToggle = document.querySelector("#theme-toggle");
theameToggle.addEventListener("click",() =>{
    document.body.classList.toggle("dark-mode");
})
