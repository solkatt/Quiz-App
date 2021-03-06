/**
 * Prints user selected bots by creating DOM-elements.
 */
function printGameplay(minNumber, maxNumber) {
    updateNumberRange(minNumber, maxNumber);
    printSelectedBots();
}
/**
 * Completes the number range by printing the 'secret number' in the guess number field.
 */
function updateNumberRange(minNumber, maxNumber) {
    if ("settings" in localStorage) {
        let settings = JSON.parse(localStorage.getItem("settings"));
        if(settings.settingShowGuessesOn == false){
            settingMaxNumber = parseInt(settings.settingMaxNumber);
            state.gameplayState.numberRange.innerHTML = "1 - " + settingMaxNumber;
        } else {
            state.gameplayState.numberRange.innerHTML = minNumber + " - " + maxNumber;
        } 
    } else {
        state.gameplayState.numberRange.innerHTML = minNumber + " - " + maxNumber;
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

        let botText = document.createElement('p');
        botText.classList.add('botText');
        botText.innerText = bot;
        botDiv.append(img, botText, botGuess, botResult);
    
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
    setTimeout(function () { printBotGuessDelay(player, guess, result, minNumber, maxNumber); updateNumberRange(minNumber, maxNumber); }, botDelay);  
}

/**
 * Handles displaying of bot answers
 * @param {string} player - the player that guessed.
 * @param {number} guess - the player's guess as a number.
 * @param {string} result - the result from the player's guess.
 */
function printBotGuessDelay(player, guess, result) {
    if (player != "You") {
        let botGuessElement = document.querySelector('.' + player + ' .botGuess');
        let botResultElement = document.querySelector('.' + player + ' .botResult');
        botGuessElement.innerText = guess;
        botResultElement.innerText = result;
    }
    else if (player == "You") {
        state.gameplayState.userGuess.innerHTML = "<p>" + guess + "</p><p>" + result + "</p>";
    }
}

/**
 * Handles everything when game is over
 * @param {string} winner The winner name as string.
 * @param {number} winnerScore The winner's score.
 */
function clearOnWin(winner, winnerIndex, winnerScore) {
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


        if (bot === "You") {
            img.src = state.gameoverState.userAvatar;
        }

        if (bot != "You") {
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

        else if ("You" === winner) {
            "The secret number was " + state.gameplayState.secretNumber + " BUT " + winner + " got the highest score!"
            state.gameoverState.winnerHeading.innerHTML = "The secret number was " + state.gameplayState.secretNumber + " BUT " + gatherUsername() + " got the highest score.";
            playerText.classList.replace('botText', 'winnerName');
            playerText.innerText = state.gameoverState.userName;
            score.innerText = winnerScore;
            winnerText.append(playerText, score);
            state.gameoverState.winnerDiv.append(img, winnerText);
        }

        else if (bot === winner) {
            state.gameoverState.winnerHeading.innerHTML = "The secret number was " + state.gameplayState.secretNumber + " BUT " + winner + " got the highest score.";
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
                img.classList.add('purple-bg');
            } else if (input.checked == false) {
                img.classList.remove('purple-bg');
            }
        })

        let playerText = document.createElement('p');
        playerText.classList.add('botText');
        playerText.innerText = bot;

        botDiv.append(label, input, playerText);
        botDiv.append(label, input);
        state.newGameState.selectBotsForm.append(botDiv);
    })

    let botInfoDiv = document.createElement('div');
    botInfoDiv.setAttribute('id', 'botInfoDiv');
    let botInfoToggle = document.createElement('h4');
    botInfoToggle.setAttribute('id', 'botInfoToggle');
    botInfoToggle.innerText = 'Read about the bots..';
    botInfoDiv.appendChild(botInfoToggle);
    botInfoToggle.addEventListener('click', toggleBotSelection);
    state.newGameState.selectBotsForm.appendChild(botInfoDiv);
}

/**
 * returns random avatar image
 * @return {string} Returns string with random avatar for the user.
 */
function getUserAvatar() {
    return "./assets/userAvatars/user" + randomAvatarNum() + ".svg"
}

/**
 * return random number for returning random avatar
 * @return {number} Returns random number between 1-6.
 */
function randomAvatarNum() {
    return Math.floor(Math.random() * 9) + 1;
}
