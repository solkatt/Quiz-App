function showWinner(scoreList, playerScore, totalGuesses) /*scoreList = list of scoreList, playerScore = playerScore scoreList, totalGuesses = number of totalGuesses */ {
    bot1 === scoreList[1];
    bot2 === scoreList[2];
    bot3 === scoreList[3];
    
    if (playerScore === Math.min(scoreList)) {
        document.querySelector(".resultText").innerHTML = ("Hooray! You won! After " + totalGuesses)+  " totalGuesses!";
        document.querySelector(".scoreList").innerHTML = (playerScore + scoreList);
    } else if (bot1 === Math.min(scoreList)) {
        document.querySelector(".resultText").innerHTML = ("bot1" + " " + "Won! After " + totalGuesses+  " totalGuesses!");
        document.querySelector(".loserText").innerHTML = (playerScore + " " + "You lost :(\n Your total scoreList was:\n" + scoreList);
        document.querySelector(".scoreList").innerHTML = (playerScore + scoreList);
    }  else if (bot2 === Math.min(scoreList)) {
        document.querySelector(".resultText").innerHTML = ("bot2" + " " + "Won! After " + totalGuesses+  " totalGuesses!");
        document.querySelector(".loserText").innerHTML = (playerScore + " " + "You lost :(\n Your total scoreList was:\n" + scoreList);
        document.querySelector(".scoreList").innerHTML = (playerScore + scoreList);
    }  else {
        document.querySelector(".resultText").innerHTML = ("bot3" + " " + "Won! After " + totalGuesses +  " totalGuesses!");
        document.querySelector(".loserText").innerHTML = (playerScore + " " + "You lost :(\n Your total scoreList was:\n" + scoreList);
        document.querySelector(".scoreList").innerHTML = (playerScore + scoreList);
    }
}