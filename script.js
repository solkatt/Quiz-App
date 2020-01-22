let secretNumber;
let minNumber;
let maxNumber;

let scoreList; 
let playerScore;
let totalGuesses;
let previousGuess;

window.addEventListener("load", init);

function init(){
    let scoreList = [0, 0, 0, 0];
    let playerScore = 0;
    let totalGuesses = 0;
    minNumber = 0;
    maxNumber = 20;
    let previousGuess = maxNumber;
    secretNumber = getRandom(minNumber, maxNumber);
}

//randomly assigns a number
function getRandom(minNumber, maxNumber){
    return Math.floor(Math.random()*(maxNumber - minNumber) + minNumber);
}

document.querySelector(".checkUserGuess").addEventListener("click", checkUserGuess);


function checkUserGuess(){
    let guess = document.getElementById("user-guess")["0"].value;
    let player = "Du";
    let youWin = false;

    calculateScore(secretNumber, guess, player);
    console.log(playerScore)

    //Your Player
    if(guess == secretNumber){
        //showWinner(scoreList, playerScore, totalGuesses)
        displayOutput(player, guess, "win");
        youWin = true;
    } else {
        let previousGuess = guess;
        checkResult(player, guess);
    }

    //stops the bots from guessing if the player wins
    if(youWin == false){
        // takes a guess for each bot
        for (i = 0; i <= 2; i++){
            if (i == 0) { // SnittBert
                //Same on all bots, somhow the maxNumber/ minNumber converts into strings, hence parseInt
                guessScore ++;
                guess = Math.floor((parseInt(maxNumber) - parseInt(minNumber))/2 + parseInt(minNumber));
                player = "SnittBert";
                calculateScore(secretNumber, guess, player);
                if (secretNumber == guess) {
                    displayOutput(player, guess, "win");
                    break;
                    } else {
                    let previousGuess = guess;
                    checkResult(player, guess);
                }
            } else if (i == 1) { // DumBert
                guessScore ++;
                player = "DumBert";
                calculateScore(secretNumber, guess, player);
                if (secretNumber == 0){
                    guess = 0;
                } else {
                    guess = parseInt(minNumber)+1;
                }
                if (secretNumber == guess) {
                    displayOutput(player, guess, "win");
                    break;
                    } else {
                    let previousGuess = guess;
                    checkResult(player, guess);
                }
            } else if (i == 2) { // SlumpBert
                guessScore ++;
                // Fixes so that random guesses can't be the same
                if (secretNumber == minNumber){
                    guess = Math.floor(Math.random()*((parseInt(maxNumber)-1) - parseInt(minNumber)) + (parseInt(minNumber)));
                } else if (secretNumber == maxNumber) {
                    guess = Math.floor(Math.random()*(parseInt(maxNumber) - (parseInt(minNumber)+1))+(parseInt(minNumber)+1));
                } else {
                    guess = Math.floor(Math.random()*((parseInt(maxNumber)-1) - (parseInt(minNumber)+1))+(parseInt(minNumber)+1));
                }
                player = "SlumpBert";
                calculateScore(secretNumber, guess, player);
                    if (secretNumber == guess) {
                        displayOutput(player, guess, "win");
                        break;
                        } else {
                        let previousGuess = guess;
                        checkResult(player, guess);
                }
            }
        }
    }
}


function checkResult(player, guess){
    if(guess > secretNumber && guess > maxNumber){
        //keeps deliberatly wrong guesses from confusing the bots
        displayOutput(player, guess, "too low");
    } else if(guess > secretNumber){
        displayOutput(player, guess, "lower");
    } else if(guess < secretNumber && guess < minNumber && guess < maxNumber){ 
        //keeps deliberatly wrong guesses from confusing the bots
        displayOutput(player, guess, "too high");
    } else if(guess < secretNumber) {
        displayOutput(player, guess, "higher");
    } else {
        displayOutput(player, guess, "error");
    }
}

function displayOutput(player, guess, result){
    //swaps pictures och text
    let swapPic = document.getElementById("display-image");
    let swapText = document.getElementById("display-text");
    //checks result and put it into words and pictures
    switch (result) {
        case "win":
            swapPic.src = "https://www.wyzowl.com/wp-content/uploads/2019/01/winner-gif.gif";
            swapText.innerHTML = guess + " Var rätt. " + player + " vann!";
            display(player + " gissade rätt: " + guess);
            break;
        case "lower":
            swapPic.src = "https://www.meme-arsenal.com/memes/c200eba39c45882b7dd47b7411f123f3.jpg";
            maxNumber = guess;
            swapText.innerHTML = "Gissa lägre: " + minNumber + "-" + maxNumber;
            display( player + " gissade " + guess + ", gissa lägre");
            break;
        case "higher":
            swapPic.src = "https://www.meme-arsenal.com/memes/c200eba39c45882b7dd47b7411f123f3.jpg";
            minNumber = guess;
            swapText.innerHTML = "Gissa högre: "  + minNumber + "-" + maxNumber;
            display(player + " gissade " + guess + ", gissa högre");
            break;
        case "too low":
            swapPic.src = "https://www.meme-arsenal.com/memes/c200eba39c45882b7dd47b7411f123f3.jpg";
            swapText.innerHTML = "Du gissade över maximum: " + maxNumber;
            display( player + " gissade " + guess + ", gissa mycket lägre");
            break;
        case "too high":
            swapPic.src = "https://www.meme-arsenal.com/memes/c200eba39c45882b7dd47b7411f123f3.jpg";
            swapText.innerHTML = "Du gissade under minimum: "  + minNumber;
            display(player + " gissade " + guess + ", gissa mycket högre");
            break;
        case "error":
            swapPic.src = "https://i.imgflip.com/1qwh2e.jpg";
            swapText.innerHTML = guess + " är inte en siffra "  + minNumber + "-" + maxNumber;
            display("Inte en siffra " + guess);
            break;
    }
}

//Just for checking the test easier
function display(textToDisplay){
    const displayResult = document.getElementById("guessingList")
    const p = document.createElement("p");
    displayResult.append(p);
    p.append(textToDisplay);
}

function calculateScore (secretNumber, guess, player) {
    if (guess >= secretNumber) {
        let difPercentage = (guess - secretNumber) / secretNumber; 
        let scoreToAdd = round((1- difPercentage) * 100 * 3);//Hur stor del av distansen mellan rätt nummer är den nya gissningen (*100*3 för att poäng ska se bättre ut och vara svårare att använda för a lista ut svaret(decoy))
        if (player === "Du") {
        playerScore += scoreToAdd;
        scoreList[0] += playerScore;
        }
        else if (player === "SnittBert") {
            scoreList[1] += scoreToAdd;
        }
        else if (player === "DumBert") {
            scoreList[2] += scoreToAdd;
        }
        else if (player === "SlumpBert") {
            scoreList[3] += scoreToAdd;
        }
    } else if (guess < secretNumber) {
        let difPercentage = (secretNumber - guess) / secretNumber;
        let scoreToAdd = round((1 - difPercentage) * 100 * 3);
        if (player === "Du") {
            playerScore += scoreToAdd;
            scoreList[0] += playerScore;
            }
            else if (player === "SnittBert") {
                scoreList[1] += scoreToAdd;
            }
            else if (player === "DumBert") {
                scoreList[2] += scoreToAdd;
            }
            else if (player === "SlumpBert") {
                scoreList[3] += scoreToAdd;
            }
    }
}



//Bot-graveyard
/* //activate to play on you"re own
function checkUserGuess(){
    let guess = document.getElementById("user-guess")["0"].value;

    if(guess == secretNumber){
        displayOutput(player, guess, "win");
    } else if(guess > secretNumber){
        displayOutput(player, guess, "lower");
    } else if(guess < secretNumber){
        displayOutput(player, guess, "higher");
    } else {
        displayOutput(player, guess, "error");
    }
}
 */

/* // function for snittBert singleplayer , just put snittBert(minNumber, maxNumber) in init()
function snittBert(minNumber, maxNumber){
    let guess = (maxNumber-minNumber)/2 + minNumber;
    do {
        if (secretNumber < guess) {
            displayOutput(player, guess, "lower");
            maxNumber = guess;
            guess = Math.floor((maxNumber-minNumber)/2 + minNumber);
        } else if (secretNumber > guess) {
            displayOutput(player, guess, "higher");
            minNumber = guess;
            guess = Math.floor((maxNumber-minNumber)/2 + minNumber);
        }
    } while (guess != secretNumber);
    displayOutput(player, guess, "win");
}*/


/* // function for dumBert singleplayer , just put dumBert(minNumber, maxNumber) in init()
function dumBert(){
    for (let i = 0; i < maxNumber; i++) {
        let guess = i;
        if (guess === secretNumber){
            displayOutput(player, guess, "win")
            break; 
        } else if(guess > secretNumber){
            displayOutput(player, guess, "lower");
        } else if(guess < secretNumber){
            displayOutput(player, guess, "higher");
        } else {
            displayOutput(player, guess, "error");
        }
    }
}*/

/* // function for slumpBert singleplayer , just put slumpBert(minNumber, maxNumber) in init()
function slumpBert(minNumber, maxNumber){
    let guess = Math.floor(Math.random()*(maxNumber-minNumber)+minNumber);
    do {
        if (secretNumber < guess) {
            displayOutput(player, guess, "lower");
            maxNumber = guess;
            guess = Math.floor(Math.random()*((maxNumber-1)-minNumber)+minNumber);
        } else if (secretNumber > guess) {
            displayOutput(player, guess, "higher");
            minNumber = guess;
            guess = Math.floor(Math.random()*(maxNumber-(minNumber-1))+minNumber);
        }
    } while (guess != secretNumber);
    displayOutput(player, guess, "win");
}*/