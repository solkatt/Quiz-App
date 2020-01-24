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
    rulesCon: {
        container: document.querySelector('.rulesCon'),
        hide: true
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
        /** Changes to gameplaystate onclick. */
        startPlayingButton: document.querySelector('#submitUsername'),
        /** NodeList of all bot checkboxes. */
        botCheckboxes: document.querySelectorAll('.newGameCon input[type="checkbox"]')
    },
    gameplayState: {
        container: document.querySelector('.gameCon'),
        hide: true,
        numberInput: document.querySelector('#number--input'),
        numberSubmit: document.querySelector('[type="button"]'),
        playerInfo: {
            name: undefined,
            points: 0
        }
    },
    backToMenuButton: document.querySelectorAll('.backToMenuButton')
}

/**
 * Add click event listener to menu buttons.
 */
window.addEventListener('load', function() {
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
        // empty array of user selected bots
        state.newGameState.selectedBots = [];
        // reset checkboxes to unchecked
        state.newGameState.botCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        })
    })
    // start playing button, after name is entered and bots selected
    state.newGameState.startPlayingButton.addEventListener('click', () => {
        if (3 <= state.newGameState.selectedBots.length) {
            toggleDisplay(state.gameplayState);
        }
        document.querySelector('.newGameCon p').textContent = 'Du måste välja minst 3st motståndare.';
    })
    // rules button
    state.menuState.rulesButton.addEventListener('click', () => {
        toggleDisplay(state.rulesState);
    })
    for (let i = 0; i < state.backToMenuButton.length; i++) {
        const button = state.backToMenuButton[i];
        button.addEventListener('click', toggleDisplay(state.menuState))
    }

})


/**
 * Toggle visibility of html-element.
 * @param {HTMLDivElement} gameState The chosen game state recieved from event listener.
 */
function toggleDisplay(gameState) {
    // show chosen game state if it is hidden
    if (gameState.hide === true) {
        show(gameState);
        // hide everything but chosen game state and menu state
        for (const key in state) {
            if (state[key] != state.menuState && state[key] != state.backToMenuButton) {
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
 * Change 'hide' property value on chosen game state container.
 * Add 'hide' class to html-element.
 * @param {HTMLDivElement} gameState 
 */
function hide(gameState) {
    console.log(gameState)
    gameState.hide = true;
    gameState.container.classList.add('hide');
}

/**
 * Change 'hide' property value on game state container.
 * Remove 'hide' class to html-element.
 * @param {HTMLDivElement} gameState 
 */
function show(gameState) {
    gameState.hide = false;
    gameState.container.classList.remove('hide');
}
