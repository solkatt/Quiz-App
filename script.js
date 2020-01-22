let secretNumber;
let minNumber;
let maxNumber;
let turn;
let guess;
/**
 * Sparar spelare och botars poäng under spelomgången.
 */
let scoreList = [0, 0, 0, 0, 0 ,0, 0]; 
/**
 * Sparar spelarens poäng, till för highscore.
 */
let playerScore = 0;
/**
 *  Sparar antal gissningar
 */
let totalGuesses = 0;
/**
 * Sparar tidigare gissningar.
 */
let previousGuess;

let startButton = document.querySelector('#startgameButton');


// start button
startButton.addEventListener('click', () => {
    scoreList = [0, 0, 0, 0, 0 ,0, 0]; 
    playerScore = 0;
    totalGuess = 0;
    secretNumber = getRandom(minNumber, maxNumber);
})

window.addEventListener("load", init);

function init(){
    minNumber = 1;
    maxNumber = 20;
    turn = 0;
    let previousGuess = maxNumber;
    secretNumber = getRandom(minNumber, maxNumber);
}

window.addEventListener("load", init);

//randomly assigns a number
function getRandom(minNumber, maxNumber){
    return Math.floor(Math.random()*(maxNumber - minNumber) + minNumber);
}

//checks when the player guesses
document.querySelector(".checkUserGuess").addEventListener("click", checkUserGuess);

function checkUserGuess(){
    //players guess
    guess = parseInt(document.getElementById("user-guess")["0"].value);
    let player = "Du";
    let youWin = false;
    turn = turn + 1;

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

    //remove after fixing 
    let bots = ["AverageBert", "LowBert" , "RandomBert", "HighBert", "DumbBert", "SmartBert"];

    //stops the bots from guessing if the player wins
    if(youWin == false){
        // takes a guess for each bot
        for (let bot of bots) {
            if(guess == secretNumber){
             break;
            } else {
                botGuesses(bot);
            }
        }
    }
}

//switch that lets the bots make a guess
function botGuesses(player){
    switch (player) {
        case "AverageBert":
            guess = Math.floor((maxNumber - minNumber)/2 + minNumber);
            player = "AverageBert";
            if (secretNumber == guess) {
                displayOutput(player, guess, "win");
                } else {
                checkResult(player, guess);
            }
            break;
        case "LowBert": 
            player = "LowBert";
            if (secretNumber == 0){
                guess = 0;
            } else {
                guess = minNumber+1;
            }
            if (secretNumber == guess) {
                displayOutput(player, guess, "win");
                } else {
                checkResult(player, guess);
            }
            break;
        case "RandomBert":
            // Fixes so that random guesses can't be the same
            if (secretNumber == minNumber){
                guess = Math.floor(Math.random()*((maxNumber-1) - minNumber) + (minNumber));
            } else if (secretNumber == maxNumber) {
                guess = Math.floor(Math.random()*(maxNumber - (minNumber+1))+(minNumber)+1);
            } else {
                guess = Math.floor(Math.random()*((maxNumber-1) - (minNumber+1))+(minNumber+1));
            }
            player = "RandomBert";
                if (secretNumber == guess) {
                    displayOutput(player, guess, "win");

                    } else {
                    checkResult(player, guess);
            }
            break;
        case "HighBert": 
            player = "HighBert";
            if (secretNumber == maxNumber){
                guess = maxNumber;
            } else {
                guess = maxNumber-1;
            }
            if (secretNumber == guess) {
                displayOutput(player, guess, "win");
                } else {
                checkResult(player, guess);
            }
            break;
        case "DumbBert":
            player = "DumbBert";
            //Unlike randombert, dumbert can guess already guessed guesses
            //This is to hide if it guesses right
            guess = Math.floor(Math.random()*(maxNumber - minNumber)+minNumber);
            //If DumbBert guesses right it istead guesses the highest number
            if (secretNumber == guess){
                guess = maxNumber;
                checkResult(player, guess);
            } else {
                checkResult(player, guess);
            }
            break;
        case "SmartBert": 
            player = "SmartBert";
            if(turn <= 2){
                guess = maxNumber;
                displayOutput(player, guess, "wait");
            } else {
                displayOutput(player, guess, "win");
            }
            break;
    }
}

//decide if the guess was to high or low, or other
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
            swapText.innerHTML = "Du gissade under minimum: "  + minNumber + "-" + maxNumber;
            display(player + " gissade " + guess + ", gissa mycket högre");
            break;
        case "wait":
            swapPic.src = "https://www.meme-arsenal.com/memes/c200eba39c45882b7dd47b7411f123f3.jpg";
            swapText.innerHTML = player + " väntar..." + minNumber + "-" + maxNumber;
            display(player + " väntar... ");
            break;
        case "error":
            swapPic.src = "https://i.imgflip.com/1qwh2e.jpg";
            swapText.innerHTML = guess + " är inte en siffra "  + minNumber + "-" + maxNumber;
            display("Inte en siffra " + guess);
            break;
    }
}

//Just for checking the tests easier
function display(textToDisplay){
    const displayResult = document.getElementById("guessingList")
    const p = document.createElement("p");
    displayResult.append(p);
    p.append(textToDisplay);
}

function calculateScore (secretNumber, guess, player) {
    if (guess >= secretNumber) {
        let difPercentage = (guess - secretNumber) / secretNumber; 
        let scoreToAdd = Math.round((1- difPercentage) * 100 * 3);//Hur stor del av distansen mellan rätt nummer är den nya gissningen (*100*3 för att poäng ska se bättre ut och vara svårare att använda för a lista ut svaret(decoy))
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
        let scoreToAdd = Math.round((1 - difPercentage) * 100 * 3);
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
   // addHighScoreToLocalStorage();
}