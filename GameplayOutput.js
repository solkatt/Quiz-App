/**
 * Prints user selected bots by creating DOM-elements.
 */
function printGameplay(minNumber, maxNumber) {
    updateNumberRange(minNumber, maxNumber);
    printSelectedBots();
    console.log('printgameplay', state.gameplayState.secretNumber, maxNumber)
}

/**
 * Completes the number range by printing the 'secret number' in the guess number field.
 */
function updateNumberRange(minNumber, maxNumber) {
    state.gameplayState.numberRange.innerHTML = minNumber + " - " + maxNumber;
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
function printBotGuess(player, guess, result) {
    if (player != "Du") {
        let botGuessElement = document.querySelector('.' + player + ' .botGuess');
        let botResultElement = document.querySelector('.' + player + ' .botResult');
        botGuessElement.innerText = guess;
        botResultElement.innerText = result;
    }
    else if (player == "Du") {
        state.gameplayState.userGuess.innerHTML = "<p>" + guess + "</p><p>" + result + "</p>";
    }
}

function clearOnWin(winner, winnerScore, scoreList) {
    for (let i = 0; i < scoreList.length; i++) {
        if (scoreList[i] == 0 || scoreList[i] == "0") {
            scoreList.splice(i, 1);
        }
    }

    state.gameplayState.stopTheGame = true;
    toggleClass(state.gameoverState, 'hide');
    state.newGameState.selectedBots.forEach(bot => {
        
        let winnerText = document.createElement('div');

        let score = document.createElement('p');
        score.classList.add('playerScore');

        if (bot != winner) {
            score.innerText = "[score]";
        }

        let img = document.createElement('img');
        img.classList.add('botImg');

        if (bot != "Du") {
            img.src = './assets/' + bot + '.svg';
        }

        let playerText = document.createElement('p');
        playerText.classList.add('botText');
        playerText.innerText = bot;

        let botDiv = document.createElement('div');

        if (bot != winner) {
            botDiv.classList.add('botDiv', bot);
            if (state.newGameState.selectedBots.length > 4) {
                botDiv.classList.add('moreThanThreeBots');
            }
            botDiv.append(img, playerText, score);
            state.gameoverState.botContainer.append(botDiv);
        }

        else if ("Du" === winner) {
            playerText.innerText = state.gameoverState.userName;
            playerText.classList.remove('botText');
            score.innerText = winnerScore;
            img.src = state.gameoverState.userAvatar;
            winnerText.append(playerText, score);
            state.gameoverState.winnerDiv.append(img, winnerText);
        }

        else if (bot === winner) {
            playerText.innerText = bot + " won!";
            playerText.classList.remove('botText');
            score.innerText = winnerScore;
            winnerText.append(playerText, score);
            state.gameoverState.winnerDiv.append(img, winnerText);
        }
    })
}

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

        let botDesc = document.createElement('label')
        botDesc.setAttribute('for', bot)

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

        // let img = document.createElement('img');
        // img.classList.add('botImg');
        // img.src = './assets/' + bot + '.svg';

        botDiv.append(label, input);
        state.newGameState.selectBotsForm.append(botDiv);
    })


}

function getUserAvatar() {
    return './assets/userAvatars/user' + randomAvatarNum() + '.svg'
}

function randomAvatarNum() {
    return Math.floor(Math.random() * 6) + 1;
}