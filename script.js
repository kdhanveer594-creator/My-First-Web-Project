let userScore=0;
let compScore=0;

const choices = document.querySelectorAll(".choice");
 //show message lose or win
 const msg = document.querySelector(".msg");

 const userScorePara=document.querySelector("#user-score");
   const compScorePara=document.querySelector("#comp-score");

// 1. कंप्यूटर के लिए रैंडम चॉइस बनाने वाला फंक्शन (स्पेलिंग एकदम सही)
const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random()*3);
    return options[randIdx];
};

// 2. ड्रॉ होने पर चलने वाला फंक्शन
const drawGame = () => {
    console.log("Game was draw.");
    msg.innerText="Game was draw, play again.";
    msg.style.backgroundColor="black";
};

// 3. जीतने वाले को स्क्रीन/कंसोल पर दिखाने वाला फंक्शन (छोटे 'w' के साथ)
const showWinner = (userWin) => {
    if (userWin) {
        userScore++; 
        userScorePara.innerText=userScore;
        console.log("You Win!");
        msg.innerText= "You win!";
        msg.style.backgroundColor="green";
    } else {
        compScore++;
        compScorePara.innerText=compScore;
        console.log("You Lose!");
        msg.innerText="You lose!";
        msg.style.backgroundColor="red";
    }
};

// 4. गेम का मेन लॉजिक फंक्शन
const playGame = (userChoice) => {
    console.log("User Choice =", userChoice);
    
    // कंप्यूटर की चॉइस फंक्शन के अंदर ही रहेगी
    const comChoice = genCompChoice();
    console.log("Comp Choice =", comChoice);

    // कंडीशन 1: मैच ड्रॉ होने पर
    if (userChoice === comChoice) {
        drawGame();
    } else {
        // कंडीशन 2: मैच का फैसला होने पर
        let userWin = true;

        if (userChoice === "rock") {
            // कंप्यूटर के पास paper या scissor ही हो सकता है (क्योंकि ड्रॉ पहले ही चेक हो गया)
            userWin = comChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            // कंप्यूटर के पास rock या scissor हो सकता है
            userWin = comChoice === "scissor" ? false : true;
        } else {
            // यूजर के पास scissor है, तो कंप्यूटर के पास rock या paper हो सकता है
            userWin = comChoice === "rock" ? false : true;
        }

        // सही फंक्शन नेम (छोटे 'w' वाला showwinner) कॉल किया
        showWinner(userWin);
        
    }
};

// 5. बटन क्लिक इवेंट का लूप
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});
