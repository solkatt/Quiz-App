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
      // "score": userHighscore
    }
    let highScore = getUserScoreFromLocalStorage();
    highScore.push(userScore);

    if(highScore.length > 5){
        highScore.shift();
    }
    console.log(highScore)
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

/**
 * Ranks and appends the list-elements to highsore ul with the right information from local storage.
 * @param {Object} userScore - contains username and score
 */
function showHighScore(userScore){
    const ul = document.querySelector('.highScore');
    const highScore = getUserScoreFromLocalStorage();
    let rank = 1
    
    for (userScore of highScore) {
        const li = createLiElement(rank, userScore);
        rank ++
        ul.append(li);
    }
}

/**
 * 
 * @param {Number} rank - the rank of userScore
 * @param {String} rankDot - some text between rank and score
 * @param {Object} userScore - conains username and score
 */
function createLiElement(rank, userScore){
    const li = document.createElement('li');
    let rankDot = ". "
    li.append(rank, rankDot, userScore.username)
    return li;
}