let secretNumber;
let minNumber;
let maxNumber;

window.addEventListener('load', init);

function init(){
    minNumber = 0;
    maxNumber = 20;
    secretNumber = getRandom(minNumber, maxNumber);
    slumpBert(minNumber, maxNumber);
}

//randomly assigns a number
function getRandom(minNumber, maxNumber){
    return Math.floor(Math.random()*(maxNumber-minNumber)+minNumber);
}

//dumBert
/*
function dumBert(){
    for (let i = 0; i < maxNumber; i++) {
        let guess = i;
        if (guess === secretNumber){
            displayOutput(guess, "win")
            break; 
        } else if(guess > secretNumber){
            displayOutput(guess, "lower");
        } else if(guess < secretNumber){
            displayOutput(guess, "higher");
        } else {
            displayOutput(guess, "error");
        }
    }
}*/

/*
function snittBert(minNumber, maxNumber){
    let guess = (maxNumber-minNumber)/2 + minNumber;
    do {
        if (secretNumber < guess) {
            displayOutput(guess, "lower");
            maxNumber = guess;
            guess = Math.floor((maxNumber-minNumber)/2 + minNumber);
        } else if (secretNumber > guess) {
            displayOutput(guess, "higher");
            minNumber = guess;
            guess = Math.floor((maxNumber-minNumber)/2 + minNumber);
        }
    } while (guess != secretNumber);
    displayOutput(guess, "win");
}*/


function slumpBert(minNumber, maxNumber){
    let guess = Math.floor(Math.random()*(maxNumber-minNumber)+minNumber);
    do {
        if (secretNumber < guess) {
            displayOutput(guess, "lower");
            maxNumber = guess;
            guess = Math.floor(Math.random()*((maxNumber-1)-minNumber)+minNumber);
        } else if (secretNumber > guess) {
            displayOutput(guess, "higher");
            minNumber = guess;
            guess = Math.floor(Math.random()*(maxNumber-(minNumber-1))+minNumber);
        }
    } while (guess != secretNumber);
    displayOutput(guess, "win");
}

/* //activate to play on you're own
function checkPlayersGuess(guess){
    let guess = document.getElementById('user-guess')["0"].value;

    if(guess == secretNumber){
        displayOutput(guess, "win");
    } else if(guess > secretNumber){
        displayOutput(guess, "lower");
    } else if(guess < secretNumber){
        displayOutput(guess, "higher");
    } else {
        displayOutput(guess, "error");
    }
}*/

function displayOutput(guess, result){
    //swaps pictures och text
    let swapPic = document.getElementById("display-image");
    let swapText = document.getElementById("display-text");
    //checks result and put it into words and pictures
    switch (result) {
        case "win":
            swapPic.src = "https://lundgrens-media.imgix.net/products/pokal-xxl.jpg";
            swapText.innerHTML = guess + " Var rätt. A winner is you";
            display('var rätt: ' + guess);
            snittBertIsGuessing = false;
            break;
        case "lower":
            swapPic.src = "https://image.shutterstock.com/image-photo/photo-shocked-bearded-male-looks-260nw-776210818.jpg";
            maxNumber = guess;
            swapText.innerHTML = "Gissa lägre: " + minNumber + "-" + maxNumber;
            display('lägre: ' + guess);
            break;
        case "higher":
            swapPic.src = "https://image.shutterstock.com/image-photo/portrait-happy-bearded-man-pointing-260nw-1029061363.jpg";
            minNumber = guess;
            swapText.innerHTML = "Gissa högre: "  + minNumber + "-" + maxNumber;
            display('högre: ' + guess);
            break;
        case "error":
            swapPic.src = "https://i.imgflip.com/1qwh2e.jpg";
            swapText.innerHTML = guess + " är inte en siffra "  + minNumber + "-" + maxNumber;
            display('Inte en siffra ' + guess);
            break;
    }
}

//Just for checking test easier
function display(textToDisplay){
    const displayResult = document.getElementById('guessingList')
    const p = document.createElement('p');
    displayResult.append(p);
    p.append(textToDisplay);
}

