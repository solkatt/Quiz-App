let secretNumber;
let minNumber;
let maxNumber;
let turn;
let guess;
/**
 * Sparar spelare och botars poäng under spelomgången.
 */
let scoreList; 
/**
 * Sparar spelarens poäng, till för highscore.
 */
let playerScore;
/**
 *  Sparar antal gissningar för varje spelare/bot
 */
let numberOfGuesses;
/**
 * Sparar tidigare gissningar.
 */
let previousGuess;

//Ha kvar var användbart for calculateScores()
let bots = ["Du", "AverageBert", "LowBert" , "RandomBert", "HighBert", "DumbBert", "SmartBert"];

let startButton = document.querySelector('#startgameButton');


// start button
startButton.addEventListener('click', () => {
    scoreList = [0, 0, 0, 0, 0 ,0, 0]; 
    playerScore = 0;
    totalGuess = 0;
    numberOfGuesses= [0, 0, 0, 0, 0, 0, 0];
    secretNumber = getRandom(minNumber, maxNumber);
})

window.addEventListener("load", init);

function init(){
    minNumber = 1;
    maxNumber = 50;
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

    calculateScore(secretNumber, guess, player, maxNumber, minNumber);


    //Your Player
    if(guess == secretNumber){
        //showWinner(scoreList, playerScore, numberOfGuesses[])
        displayOutput(player, guess, "win");
        youWin = true;
    } else {
        let previousGuess = guess;
        checkResult(player, guess);
    }

    

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
            calculateScore(secretNumber, guess, player, maxNumber, minNumber);
            if (secretNumber == guess) {
                displayOutput(player, guess, "win");
                } else {
                checkResult(player, guess);
            }
            break;
        case "LowBert": 
            player = "LowBert";
            calculateScore(secretNumber, guess, player, maxNumber, minNumber);
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
            calculateScore(secretNumber, guess, player, maxNumber, minNumber);
                if (secretNumber == guess) {
                    displayOutput(player, guess, "win");

                    } else {
                    checkResult(player, guess);
            }
            break;
        case "HighBert": 
            player = "HighBert";
            calculateScore(secretNumber, guess, player, maxNumber, minNumber);
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
            calculateScore(secretNumber, guess, player, maxNumber, minNumber);
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
            calculateScore(secretNumber, guess, player, maxNumber, minNumber);
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
            numberOfGuesses[bots.indexOf(player)] ++;
            scoreList[bots.indexOf(player)] += 300;
            scoreList[bots.indexOf(player)] = scoreList[bots.indexOf(player)]/numberOfGuesses[bots.indexOf(player)];
            console.log(scoreList)
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

function calculateScore (secretNumber, guess, player, maxNumber, minNumber) {
    if (guess > secretNumber) {
        let distanceSecretMax = maxNumber - secretNumber; //Distance between highest possible number and correct answer
        let guessDistanceFromSecret = guess - secretNumber; //Avstånd mellan gissning och rätt nummer
        let partOfDistance = distanceSecretMax - guessDistanceFromSecret; //Hur stor del av avståndet har din gissning täckt
        let mainPoints = (distanceSecretMax / maxNumber) * 100;
        let scoreToAdd = Math.round(partOfDistance + mainPoints); //Multiplicera med 100 för snyggare score och 3 som decoy avrunda till heltal
        if (player === "Du") {
            numberOfGuesses[0]++;
            playerScore += scoreToAdd;
            scoreList[0] += scoreToAdd;
            scoreList[0] = Math.round(scoreList[0]/numberOfGuesses[0]); //Delar på antal gissningar man gjort så att man inte får fördel av att fått gisa fler gånger
        }   
        else if (player === "AverageBert") {
            numberOfGuesses[1]++;
            scoreList[1] += scoreToAdd;
            scoreList[1] = Math.round(scoreList[1]/numberOfGuesses[1]);
        }
        else if (player === "LowBert") {
            numberOfGuesses[2]++;
            scoreList[2] += scoreToAdd;
            scoreList[2] = Math.round(scoreList[2]/numberOfGuesses[2]);
        }
        else if (player === "RandomBert") {
            numberOfGuesses[3]++;
            scoreList[3] += scoreToAdd;
            scoreList[3] = Math.round(scoreList[3]/numberOfGuesses[3]);
        }
        else if (player === "HighBert") {
            numberOfGuesses[4]++;
            scoreList[4] += scoreToAdd;
            scoreList[4] = Math.round(scoreList[4]/numberOfGuesses[4]);
        }
        else if (player === "DumbBert") {
            numberOfGuesses[5]++;
            scoreList[5] += scoreToAdd;
            scoreList[5] = Math.round(scoreList[5]/numberOfGuesses[5]);
        }
        else if (player === "SmartBert") {
            numberOfGuesses[6]++;
            scoreList[6] += scoreToAdd;
            scoreList[6] = Math.round(scoreList[6]/numberOfGuesses[6]);
        }
    } else if (guess < secretNumber) {
        console.log(minNumber)
        let distanceSecretMin = (secretNumber - (Math.round(minNumber/2))); //Avstånd mellan lägsta möjliga nummer och rätt nummer
        console.log(distanceSecretMin)
        let guessDistanceFromSecret = secretNumber - guess; //Avstånd mellan gissning och rätt nummer
        console.log(guessDistanceFromSecret)
        partOfDistance = distanceSecretMin - guessDistanceFromSecret; //Ju större spann och närmare gissning desto mer poäng.
        console.log(partOfDistance)
        let mainPoints = (distanceSecretMin / maxNumber) * 100;
        let scoreToAdd = Math.round(partOfDistance + mainPoints);  //Multiplicera med 100 för snyggare score och 3 som decoy avrunda till heltal
        if (player === "Du") {
            numberOfGuesses[0]++;
            playerScore += scoreToAdd;
            scoreList[0] += playerScore;
            scoreList[0] = Math.round(scoreList[0]/numberOfGuesses[0]); //Delar på antal gissningar man gjort så att man inte får fördel om man gissar fler gånger.
        }
        else if (player === "AverageBert") {
            numberOfGuesses[1]++;
            scoreList[1] += scoreToAdd;
            scoreList[1] = Math.round(scoreList[1]/numberOfGuesses[1]);
        }
        else if (player === "LowBert") {
            numberOfGuesses[2]++;
            scoreList[2] += scoreToAdd;
            scoreList[2] = Math.round(scoreList[2]/numberOfGuesses[2]);
        }
        else if (player === "RandomBert") {
            numberOfGuesses[3]++;
            scoreList[3] += scoreToAdd;
            scoreList[3] = Math.round(scoreList[3]/numberOfGuesses[3]);
        }
        else if (player === "HighBert") {
            numberOfGuesses[4]++;
            scoreList[4] += scoreToAdd;
            scoreList[4] = Math.round(scoreList[4]/numberOfGuesses[4]);
        }
        else if (player === "DumbBert") {
            numberOfGuesses[5]++;
            scoreList[5] += scoreToAdd;
            scoreList[5] = Math.round(scoreList[5]/numberOfGuesses[5]);
        }
        else if (player === "SmartBert") {
            numberOfGuesses[6]++;
            scoreList[6] += scoreToAdd;
            scoreList[6] = Math.round(scoreList[6]/numberOfGuesses[6]);
        }
    }
}