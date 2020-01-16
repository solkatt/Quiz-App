const submitUsername = document.querySelector('#submitUsername');

submitUsername.addEventListener('click', gatherUsername);

 function gatherUsername(){
    const username = document.querySelector('#inputUsername');
    console.log(username.value)

    let userScore = {
        "username":username.value
      // "highscore": userHighscore
    }

    const highScore = []// = getUserScoreFromLocalStorage();
    
    highScore.push(userScore);

    saveUserScoreToLocalStorage(highScore);
}

function saveUserScoreToLocalStorage(highScore){
    localStorage.setItem('highSore', JSON.stringify(highScore));
}

function getUserScoreFromLocalStorage(){
    return JSON.parse(localStorage.getItem('highScore')) || [];
}  