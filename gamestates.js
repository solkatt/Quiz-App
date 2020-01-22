/**
 * Contains all game states/modes/values/html-elements.
 * - container = most outer html-tag of the game state div
 * - hide = check if hidden, maybe not useful?
 * - html-elements to add event listeners to, such as buttons etc
 * - elements inside container, like show this box when player does so and so
 * - store values, like scorelist, player name, player score and
 *   player settings (how many bots did the player want to play with? does the player want the sound on/off?)
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
        playerSettings: {
            nrOfBots: 3,
            soundOn: false,
            showBotsGuesses: true
        }
    },
    highscoreState: {
        container: document.querySelector('.highscoreCon'),
        hide: true,
        scoreList: []
    },
    // the state between menu and actual gameplay
    newGameState: {
        container: document.querySelector('.newGameCon'),
        hide: true,
        startPlayingButton: document.querySelector('#startPlayingButton'),
        playerName: undefined
    },
    gameplayState: {
        container: document.querySelector('.gameCon'),
        hide: true,
        numberInput: document.querySelector('#number--input'),
        numberSubmit: document.querySelector('[type="button"]'),
        playerInfo: {
            points: 0
        }
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
        toggleDisplay(state.highscoreState);
    })
    // settings button
    state.menuState.settingsButton.addEventListener('click', () => {
        toggleDisplay(state.settingsState);
    })
    // start button
    state.menuState.startButton.addEventListener('click', () => {
        toggleDisplay(state.newGameState);
    })
    // start playing button, after name is entered and bots selected
    state.newGameState.startPlayingButton.addEventListener('click', () => {
        toggleDisplay(state.gameplayState);
    })
    // rules button
    state.menuState.rulesButton.addEventListener('click', () => {
        toggleDisplay(state.rulesState);
    })
    // adds event listeners to all back-to-menu-buttons
    for (const button of state.backToMenuButton) {
        button.addEventListener('click', () => {
            toggleDisplay(state.menuState);
        })
    }
})

/**
 * Toggle visibility of html-element.
 * @param {HTMLDivElement} gameState The selected game state recieved from event listener.
 */
function toggleDisplay(gameState) {
    // show selected game state if it is hidden
    if (gameState.hide === true) {
        show(gameState);
        // hide everything but selected game state and back to menu button
        for (const key in state) {
            if (state[key] != gameState && state[key] != state.backToMenuButton) {
                hide(state[key]);
            }
        }
    }
    // hide game state if it is not hidden
    else if (gameState.hide === false) {
        hide(gameState);
    }
}

/**
 * Change 'hide' property value on selected game state container.
 * Add 'hide' class to html-element.
 * @param {HTMLDivElement} gameState The selected game state recieved from toggleDisplay() to hide.
 */
function hide(gameState) {
    gameState.hide = true;
    gameState.container.classList.add('hide');
}

/**
 * Change 'hide' property value on game state container.
 * Remove 'hide' class to html-element.
 * @param {HTMLDivElement} gameState The selected game state recieved from toggleDisplay() to show.
 */
function show(gameState) {
    gameState.hide = false;
    gameState.container.classList.remove('hide');
}