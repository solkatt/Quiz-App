//Info om vem som vann och antal gissningar

function showWinner(score, player, guesses) /*score = list of scores, player = player score, guesses = number of guesses */ {
    if (player === Math.max(winnerlist)) {
        document.querySelector("resultText").innerHTML = ("Hooray! You won! After " + guesses)+  " guesses!";
        document.querySelector("score").innerHTML = (player + score);
    } else if (bot1 === Math.max(winnerlist)) {
        document.querySelector("resultText").innerHTML = (bot1 + " " + "Won! After " + guesses+  " guesses!");
        document.querySelector("loserText").innerHTML = (player + " " + "You lost :(\n Your total score was:\n" + score);
        document.querySelector("score").innerHTML = (player + score);
    }  else if (bot2 === Math.max(winnerlist)) {
        document.querySelector("resultText").innerHTML = (bot2 + " " + "Won! After " + guesses+  " guesses!");
        document.querySelector("loserText").innerHTML = (player + " " + "You lost :(\n Your total score was:\n" + score);
        document.querySelector("score").innerHTML = (player + score);
    }  else if (bot3 === Math.max(winnerlist)) {
        document.querySelector("resultText").innerHTML = (bot3 + " " + "Won! After " + guesses +  " guesses!");
        document.querySelector("loserText").innerHTML = (player + " " + "You lost :(\n Your total score was:\n" + score);
        document.querySelector("score").innerHTML = (player + score);
    }
}