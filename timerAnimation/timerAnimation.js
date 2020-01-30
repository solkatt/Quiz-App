function startTimer(duration, display) {

    var minTimer = duration, minutes, seconds;

    state.countdownState.countdownInterval = setInterval(function () {

        countdownAnimation('start', state.countdownState.countdownInterval);

        minutes = parseInt(minTimer / 60)
        seconds = parseInt(minTimer % 60);

        seconds = seconds < 3 ? "" + seconds : seconds;

        display.textContent = seconds;

        if (--minTimer < 0) {
            countdownAnimation('stop', state.countdownState.countdownInterval);

            ellipse.classList.remove("countdownAnimation");
            minTimer = duration
        }

    }, 1000);
}




function countdownAnimation(gameState, interval) {
    if (gameState == 'start') {
        console.log('START');

        document.getElementById("ellipse").classList.add("ellipseAnim");
        // document.getElementById("ellipse").style.transition("mystyle");

    } else if (gameState == 'stop') {
        // console.log('STOP')
        clearInterval(interval);
        document.getElementById("ellipse").classList.remove("ellipseAnim");
        toggleClass(state.gameplayState, 'hide');
    }
}



function showCountdown() {
    toggleClass(state.countdownState, 'hide');
    document.querySelector('svg').classList.remove('hide');
    var oneMin = 3 * 1,
        display = document.querySelector('#time');
    startTimer(oneMin, display);
}