function startTimer(duration, display) {

    var minTimer = duration, minutes, seconds;
    
    setInterval(function () {

        countdownAnimation('start');
       
        minutes = parseInt(minTimer / 60)
        seconds = parseInt(minTimer % 60);

        seconds = seconds < 10 ? "" + seconds : seconds;

        display.textContent =  seconds;

        if (--minTimer < 0) {
            countdownAnimation('stop');

            ellipse.classList.remove("countdownAnimation");
            minTimer = duration
        }

    }, 1000);
}




function countdownAnimation(state) {
    if(state== 'start') {
        console.log('START');
        
        document.getElementById("ellipse").classList.add("ellipseAnim");
        // document.getElementById("ellipse").style.transition("mystyle");

    } else if (state == 'stop') {
        console.log('STOP')
        document.getElementById("ellipse").classList.remove("ellipseAnim");


    }

  }







window.onload = function () {
    var oneMin = 10 * 1,
        display = document.querySelector('#time');
    startTimer(oneMin, display);
    
};