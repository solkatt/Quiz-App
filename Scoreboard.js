//Info om vem som vann och antal gissningar

function showWinner(scoreList, player, guesses) /*scoreList = list of scoreList, player = player scoreList, guesses = number of guesses */ {
    if (player === Math.max(scoreList)) {
        document.querySelector("resultText").innerHTML = ("Hooray! You won! After " + guesses)+  " guesses!";
        document.querySelector("scoreList").innerHTML = (player + scoreList);
    } else if (bot1 === Math.max(scoreList)) {
        document.querySelector("resultText").innerHTML = (bot1 + " " + "Won! After " + guesses+  " guesses!");
        document.querySelector("loserText").innerHTML = (player + " " + "You lost :(\n Your total scoreList was:\n" + scoreList);
        document.querySelector("scoreList").innerHTML = (player + scoreList);
    }  else if (bot2 === Math.max(scoreList)) {
        document.querySelector("resultText").innerHTML = (bot2 + " " + "Won! After " + guesses+  " guesses!");
        document.querySelector("loserText").innerHTML = (player + " " + "You lost :(\n Your total scoreList was:\n" + scoreList);
        document.querySelector("scoreList").innerHTML = (player + scoreList);
    }  else {
        document.querySelector("resultText").innerHTML = (bot3 + " " + "Won! After " + guesses +  " guesses!");
        document.querySelector("loserText").innerHTML = (player + " " + "You lost :(\n Your total scoreList was:\n" + scoreList);
        document.querySelector("scoreList").innerHTML = (player + scoreList);
    }
}