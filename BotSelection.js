function addEventListenerToCheckbox() {
    state.newGameState.botCheckboxes = document.querySelectorAll('.newGameCon input[type="checkbox"]');
    console.log(state.newGameState.botCheckboxes)
    // add event listener to bot checkboxes
    for (let i = 0; i < 6; i++) {
        console.log(state.newGameState.botCheckboxes[i])
        const checkbox = state.newGameState.botCheckboxes[i];
        checkbox.addEventListener('change', () => {
            selectBots(checkbox, i);
        })
    }
}

/**
 * Handles bot selection from onclick-event.
 * @param {string} selectedBot The bot that was clicked on, recieved from event listener.
 * @param {number} i Index for the bot that was clicked on.
 */
function selectBots(selectedBot, i) {
    // add selected bot value (bot name) to array of selected bots
    if (selectedBot.checked == true) {
        state.newGameState.selectedBots.push(selectedBot.value);
        console.log(state.newGameState.selectedBots)
    }
    // remove any doubles, just in case
    else if (selectedBot.value == selectedBot) {
        state.newGameState.selectedBots.splice(i, 1);
    }
    // fires if above requirements are not met (checked = false or no doubles)
    // removes selected bot
    else {
        removeBot(selectedBot);
    }
}

/**
 * Remove bot from array of user selected bots.
 * @param {string} botToRemove Bot as string to remove, param recieved from selectBots().
 */
function removeBot(botToRemove) {
    for (let i = 0; i < state.newGameState.selectedBots.length; i++) {
        if (state.newGameState.selectedBots[i] == botToRemove.value) {
            state.newGameState.selectedBots.splice(i, 1);
        }
    }
}