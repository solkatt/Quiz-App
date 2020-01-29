/**
 * Prints user selected bots by creating DOM-elements.
 */
function printGameplay(minNumber, maxNumber) {
    updateNumberRange(minNumber, maxNumber);
    printSelectedBots();
    console.log('printgameplay', state.gameplayState.secretNumber, maxNumber);
}

/**
 * Completes the number range by printing the 'secret number' in the guess number field.
 */
function updateNumberRange(minNumber, maxNumber) {
    let showGuesses = true;
    let settings
    if ("settings" in localStorage){
            settings = JSON.parse(localStorage.getItem("settings"));
        }
    if (settings.settingShowGuessesOn == true){
        state.gameplayState.numberRange.innerHTML = minNumber + " - " + maxNumber;
    } else {
        state.gameplayState.numberRange.innerHTML =  "1 - " + settings.settingMaxNumber;;
    }
}

/**
 * Prints user selected bots by creating DOM-elements.
 */
function printSelectedBots() {
    state.newGameState.selectedBots.forEach(bot => {
        let botDiv = document.createElement('div');
        botDiv.classList.add('botDiv', bot);

        let img = document.createElement('img');
        img.classList.add('botImg');
        img.src = './assets/' + bot + '.svg';

        let botGuess = document.createElement('p');
        botGuess.classList.add('botGuess');
        botGuess.innerText = ". . .";

        let botResult = document.createElement('p');
        botResult.classList.add('botResult');

        if (state.newGameState.selectedBots.length > 3) {
            let botText = document.createElement('p');
            botText.classList.add('botText');
            botText.innerText = bot;
            botDiv.append(img, botText, botGuess, botResult);
        }

        else {
            botDiv.append(img, botGuess, botResult);
        }

        state.gameplayState.botContainer.append(botDiv);
    })
}

/**
 * Print gameplay info: bot names, bot guesses, bot results, user's guess.
 * @param {string} player - the player that guessed.
 * @param {number} guess - the player's guess as a number.
 * @param {string} result - the result from the player's guess.
 */
function printBotGuess(player, guess, result, minNumber, maxNumber) {
        setTimeout(function() {printBotGuessDelay(player, guess, result, minNumber, maxNumber);}, botDelay);
}

function printBotGuessDelay(player, guess, result, minNumber, maxNumber) {
    updateNumberRange(minNumber, maxNumber);
    if (player != "Du") {
        let showGuesses = true;

        // changes if setting has picked settingShowGuessesOn == false
        if ("settings" in localStorage){
                let settings = JSON.parse(localStorage.getItem("settings"));
                showGuesses = settings.settingShowGuessesOn;
            }
     
        if (showGuesses == false){
            guess = "...";
        }

        let botGuessElement = document.querySelector('.' + player + ' .botGuess');
        let botResultElement = document.querySelector('.' + player + ' .botResult');
        botGuessElement.innerText = guess;
        botResultElement.innerText = result;
    }
    else if (player == "Du") {
        state.gameplayState.userGuess.innerHTML = "<p>" + guess + "</p><p>" + result + "</p>";
    }
}

/**
 * 
 * @param {string} winner The winner name as string.
 * @param {number} winnerScore The winner's score.
 * @param {Array<number>} scoreList List of all player's scores.
 */
function clearOnWin(winner, winnerScore, scoreList) {
    if ("settings" in localStorage) {
        let settings = JSON.parse(localStorage.getItem("settings"));
        maxNumber = parseInt(settings.settingMaxNumber);
        updateNumberRange(minNumber, maxNumber);
    }

    state.gameplayState.stopTheGame = true;
    toggleClass(state.gameoverState, 'hide');

    removeOldHighScore('.gameoverCon .highScore');
    showHighScore('.gameoverCon .highScore');

    let winnerText = document.createElement('div');

    let highscoreLis = document.querySelectorAll('.gameoverCon .highScore li');
    for (let i = 0; i < highscoreLis.length; i++) {
        const highscore = highscoreLis[i];
        if (i == 3 || i == 4) {
            highscoreLis.item(i).remove();
        }
    }

    for (let i = 0; i < state.newGameState.selectedBots.length; i++) {
        const bot = state.newGameState.selectedBots[i];

        let score = document.createElement('p');
        score.classList.add('playerScore');

        let img = document.createElement('img');
        img.classList.add('botImg');


        if (bot == "Du" && winner != "Du") {
            img.src = state.gameoverState.userAvatar;
        }

        if (bot != "Du") {
            img.src = './assets/' + bot + '.svg';
        }

        let playerText = document.createElement('p');
        playerText.classList.add('botText');
        playerText.innerText = bot;

        let botDiv = document.createElement('div');

        if (bot != winner) {
            if (isNaN(scoreList[i]) || scoreList[i] == undefined) {
                score.innerText = 0;
            }
            else {
                score.innerText = scoreList[i];
            }

            botDiv.classList.add('botDiv', bot);
            console.log(state.newGameState.selectedBots)
            if (state.newGameState.selectedBots.length > 4) {
                botDiv.classList.add('moreThanThreeBots');
                if (!state.gameoverState.winnerHeading.classList.contains('moreThanThreeBots')) {
                    state.gameoverState.winnerHeading.classList.add('moreThanThreeBots');
                }
            }

            else {
                if (state.gameoverState.winnerHeading.classList.contains('moreThanThreeBots')) {
                    state.gameoverState.winnerHeading.classList.remove('moreThanThreeBots');
                }
            }

            botDiv.append(img, playerText, score);
            state.gameoverState.botContainer.append(botDiv);
        }

        else if ("Du" === winner) {
            state.gameoverState.winnerHeading.innerHTML = gatherUsername() + "'s guess was correct! The secret number was " + state.gameplayState.secretNumber + ".";
            playerText.classList.replace('botText', 'winnerName');
            playerText.innerText = state.gameoverState.userName;
            score.innerText = winnerScore;
            img.src = state.gameoverState.userAvatar;
            winnerText.append(playerText, score);
            state.gameoverState.winnerDiv.append(img, winnerText);
        }

        else if (bot === winner) {
            state.gameoverState.winnerHeading.innerHTML = winner + " guess was correct! The secret number was " + state.gameplayState.secretNumber + ".";
            playerText.classList.replace('botText', 'winnerName');
            playerText.innerText = bot;
            score.innerText = winnerScore;
            winnerText.append(playerText, score);
            state.gameoverState.winnerDiv.append(img, winnerText);
        }
    }
}

/**
 * Creates html-elements and prints out each bot the user has selected.
 */
function printSelectBotsCon() {
    let allBots = ["AverageBert", "LowBert", "RandomBert", "HighBert", "DumbBert", "SmartBert"];
    allBots.forEach(bot => {
        let botDiv = document.createElement('div');
        botDiv.classList.add(bot, 'botWidth');

        let img = document.createElement('img');
        img.classList.add('botImg');
        img.src = './assets/' + bot + '.svg';

        let label = document.createElement('label');
        label.setAttribute('for', bot);
        label.append(img);

        let input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', bot);
        input.setAttribute('value', bot);
        input.setAttribute('id', bot);
        botDiv.addEventListener('click', () => {
            if (input.checked == true) {
                botDiv.classList.add('purple-bg');
            }
            else if (input.checked == false) {
                botDiv.classList.remove('purple-bg');
            }
        })

        let playerText = document.createElement('p');
        playerText.classList.add('botText');
        playerText.innerText = bot;

        botDiv.append(label, input);
        state.newGameState.selectBotsForm.append(botDiv);
    })

}

/**
 * @return {string} Returns string with random avatar for the user.
 */
function getUserAvatar() {
    return './assets/userAvatars/user' + randomAvatarNum() + '.svg'
}

/**
 * @return {number} Returns random number between 1-6.
 */
function randomAvatarNum() {
    return Math.floor(Math.random() * 6) + 1;
}