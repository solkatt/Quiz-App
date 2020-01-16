/**
 * gets button for submitting username
 */
const submitUsername = document.querySelector('#submitUsername');

/**
 * the array to save the highscore in
 */

/**
 * Adds clickevent to button and triggers the gatherUsername function
 */
submitUsername.addEventListener('click', gatherUsername);
showHighScore();
/**
 * Handels the gathering of username and saving the userScore-object in local storage 
 * (for now, probably this will happen in another function when the score-functions are done).
 */
function gatherUsername(){
   const username = document.querySelector('#inputUsername');
    console.log(username.value)

    let userScore = {
        "username":username.value
      // "highscore": userHighscore
    }
    const highScore = getUserScoreFromLocalStorage();
    highScore.push(userScore);

    //showHighScore(userScore);
    saveUserScoreToLocalStorage(highScore);
}

/**
 * Saves Userscore/highScore in local storage
 * @param {Array} highScore - each item contains username and userScore
 */
function saveUserScoreToLocalStorage(highScore){
    localStorage.setItem('highScore', JSON.stringify(highScore));
}

/**
 * Gets userscore from local storage
 */
function getUserScoreFromLocalStorage(){
    return JSON.parse(localStorage.getItem('highScore')) || [];
}

//NEEDS TO DELETE LI EVERYTIME I CLICK ON BUTTON AND WRITE OUT NEW ARRAY
function showHighScore(userScore){
    const ul = document.querySelector('.highScore');
    const highScore = getUserScoreFromLocalStorage();

    for (userScore of highScore) {
        const li = createLiElement(userScore);
        ul.append(li);
    }
}

function createLiElement(userScore){
    const li = document.createElement('li');
    li.append(userScore.username)
    return li;
}

