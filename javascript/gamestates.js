/**
 * Contains all game states/modes/values/html-elements.
 * - container = most outer html-tag of the game state div
 * - hide = check if hidden, maybe not useful?
 * - html-elements to add event listeners to, such as buttons etc
 * - elements inside container, like show this box when player does so and so
 * - store values, like scorelist, player name, player score and
 * player settings (how many bots did the player want to play with? does the player want the sound on/off?)
 */
let state = {
    menuState: {
        container: document.querySelector('.menuCon'),
        hide: false,
        startButton: document.querySelector('#startgameButton'),
        settingsButton: document.querySelector('#settingsButton'),
        highscoreButton: document.querySelector('#hightScoreButton'),
        rulesButton: document.querySelector('#rulesButton')
    },
    settingsState: {
        container: document.querySelector('.settingsCon'),
        hide: true,
        buttons: {
            showBotsGuessButton: document.querySelector('#showOpponentsButton'),
            timePressureButton: document.querySelector('#timePressureButton')
        }
    },
    highscoreState: {
        container: document.querySelector('.highScoreCon'),
        hide: true
    },
    // the state between menu and actual gameplay
    newGameState: {
        container: document.querySelector('.newGameCon'),
        hide: true,
        selectedBots: [],
        selectBotsCon: document.querySelector('.newGameCon .whiteContainer:first-of-type'),
        selectBotsForm: document.querySelector('.select-bots-form'),
        /** Changes to gameplaystate onclick. */
        startPlayingButton: document.querySelector('#submitUsername'),
        /** NodeList of all bot checkboxes. */
        botCheckboxes: 0
    },
    gameplayState: {
        container: document.querySelector('.gameCon'),
        hide: true,
        stopTheGame: true,
        secretNumber: 0,
        yellowContainer: document.querySelector('.gameCon .yellowContainer'),
        guessButton: document.querySelector('.checkUserGuess'),
        botContainer: document.querySelector('.display-bots'),
        guessList: document.querySelector('.yellowContainer #guessingList'),
        userGuess: document.querySelector('.user-guess-div'),
        guessInput: document.querySelector('.user-guess > input'),
        numberRange: document.querySelector('#display-text span')
    },
    gameoverState: {
        container: document.querySelector('.gameoverCon'),
        hide: true,
        userName: undefined,
        userAvatar: 0,
        yellowContainer: document.querySelector('.gameoverCon .yellowContainer'),
        botContainer: document.querySelector('.gameover-display-bots'),
        winnerDiv: document.querySelector('.winner')
    },
    rulesState: {
        container: document.querySelector('.rulesCon'),
        hide: true
    },
    backToMenuButton: document.querySelectorAll('.backToMenuButton')
}

/**
 * Add click event listener to buttons on page load.
 */
window.addEventListener('load', function () {
    // highscore button
    state.menuState.highscoreButton.addEventListener('click', () => {
        toggleClass(state.highscoreState, 'hide');
        removeOldHighScore('.highScore');
        showHighScore('.highScore');
    })
    // settings button
    state.menuState.settingsButton.addEventListener('click', () => {
        toggleClass(state.settingsState, 'hide');
    })
    // start button
    state.menuState.startButton.addEventListener('click', () => {
        state.gameoverState.userAvatar = getUserAvatar();
        toggleClass(state.newGameState, 'hide');
        state.newGameState.selectBotsForm.innerHTML = "";
        printSelectBotsCon();
        addEventListenerToCheckbox();
    })
    // start playing button, after name is entered and bots selected
    state.newGameState.startPlayingButton.addEventListener('click', () => {
        state.gameoverState.userName = gatherUsername();
        if (3 > state.newGameState.selectedBots.length) {
            //document.querySelector('.notThree').textContent = 'Select at least 3 opponents.';
            isThreeBotsSelected = false;
        }
        else if (3 <= state.newGameState.selectedBots.length) {
            state.gameplayState.stopTheGame = false;
            state.newGameState.selectedBots.unshift("Du");
            isThreeBotsSelected = true;
            toggleClass(state.gameplayState, 'hide');
        }
        showCorrectStartbuttonText();
    })
    // rules button
    state.menuState.rulesButton.addEventListener('click', () => {
        toggleClass(state.rulesState, 'hide');
    })
    // adds event listeners to all back-to-menu-buttons
    for (const button of state.backToMenuButton) {
        button.addEventListener('click', () => {
            // empty gameplay outputs
            state.gameplayState.yellowContainer.querySelectorAll('div').forEach(div => {
                div.innerHTML = "";
            })
            state.gameplayState.botContainer.innerHTML = "";
            // empty array of user selected bots
            state.newGameState.selectedBots.length = 0;
            // reset checkboxes to unchecked
            state.newGameState.botCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            })
            toggleClass(state.menuState, 'hide');
        })
    }

    //fixes input with enter button
    document.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (state.gameplayState.hide == false) {
                checkUserGuess();
            } if (state.settingsState.hide == false) {
                checkUserSettings();
            }
        }
    });

    // add event listners to buttons in settingsState
    for (const key in state.settingsState.buttons) {
        if (state.settingsState.buttons.hasOwnProperty(key)) {
            const button = state.settingsState.buttons[key];
            button.addEventListener('click', () => {
                changeButtonStyle(button, 'buttonClicked');
            })
        }
    }

    state.settingsState.buttons.showBotsGuessButton.addEventListener('click', () => {
        // vad som händer när man klickar på show bots previous guesses
    })

    state.settingsState.buttons.timePressureButton.addEventListener('click', () => {
        // vad som händer när man klickar på tidpressknappen
    })
})

/**
 * Toggle visibility of html-element.
 * @param {(HTMLDivElement|HTMLButtonElement)}  gameState The selected game state recieved from event listener.
 */
function toggleClass(gameState, classToToggle) {
    // show selected game state if it is hidden
    if (gameState.hide === true) {
        show(gameState, classToToggle);
        // hide everything but selected game state and back to menu button
        for (const key in state) {
            if (state[key] != gameState && state[key] != state.backToMenuButton) {
                hide(state[key], classToToggle);
            }
        }
    }
    // hide game state if it is not hidden
    else if (gameState.hide === false) {
        hide(gameState, classToToggle);
    }
}

/**
 * Remove class and change 'hide' property value to show html element.
 * @param {HTMLDivElement} gameState - the game state container to remove a class on.
 * @param {string} classToToggle - the class to remove.
 */
function show(gameState, classToToggle) {
    gameState.hide = false;
    gameState.container.classList.remove(classToToggle);
}

/**
 * Add class and change 'hide' property value to hide html element.
 * @param {HTMLDivElement} gameState - the game state container to add a class to.
 * @param {string} classToToggle - the class to add.
 */
function hide(gameState, classToToggle) {
    gameState.hide = true;
    gameState.container.classList.add(classToToggle);
}

/**
 * Toggle classes on buttons and change innerhtml.
 * @param {HTMLButtonElement} button - the button as html element.
 * @param {string} classToToggle - the class to toggle.
 */
function changeButtonStyle(button, classToToggle) {
    if (button.classList.contains(classToToggle)) {
        button.querySelector('span').innerHTML = 'on';
        button.classList.remove(classToToggle);
    }
    else {
        button.querySelector('span').innerHTML = 'off';
        button.classList.add(classToToggle);
    }
}