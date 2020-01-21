let secretNumber;
let minNumber;
let maxNumber;

window.addEventListener("load", init);

function init(){
    minNumber = 0;
    maxNumber = 20;
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

    //Your Player
    if(guess == secretNumber){
        displayOutput(player, guess, "win");
        youWin = true;
    } else {
        checkResult(player, guess);
    }

    //stops the bots from guessing if the player wins
    if(youWin == false){
        // takes a guess for each bot
        for (i = 0; i <= 2; i++){
            if (i == 0) {
                //Same on all bots, somhow the maxNumber/ minNumber converts into strings, hence parseInt
                guess = Math.floor((parseInt(maxNumber) - parseInt(minNumber))/2 + parseInt(minNumber));
                player = "SnittBert";
                if (secretNumber == guess) {
                    displayOutput(player, guess, "win");
                    break;
                    } else {
                    checkResult(player, guess);
                }
            } else if (i == 1) {
                guess = parseInt(minNumber)+1;
                player = "DumBert";
                if (secretNumber == guess) {
                    displayOutput(player, guess, "win");
                    break;
                    } else {
                    checkResult(player, guess);
                }
            } else if (i == 2) {
                //Can't win if secretNumber is equal to start min an max, but keeps it from guessing the same number
                //If this feature isn't wanted, remove -1 and +1
                guess = Math.ceil(Math.random()*((parseInt(maxNumber)-1) - (parseInt(minNumber)+1))+(parseInt(minNumber)+1));
                player = "SlumpBert";
                    if (secretNumber == guess) {
                        displayOutput(player, guess, "win");
                        break;
                        } else {
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
            swapPic.src = "https://lundgrens-media.imgix.net/products/pokal-xxl.jpg";
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