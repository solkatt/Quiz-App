/**
 * gets button for submitting username
 */
const submitUsername = document.querySelector('#submitUsername');

/**
 * Adds clickevent to button and triggers the gatherUsername function
 */
submitUsername.addEventListener('click', gatherUsername);


/**
 *  * Handels the gathering of username and saving the userScore-object in local storage 
 */
function gatherUsername(){
    const username = document.querySelector('#inputUsername');
    return username.value;
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
 * Appends the list-elements to highsore ol with the right information from local storage.
 * @param {Object} userScore - contains username and score
 * @param {Element} placeForHighscore - contains class-name for the chosen ol where the highscore should be displayed.
 */
function showHighScore(placeForHighscore, userScore){
    const ol = document.querySelector(placeForHighscore);
    const highScore = getUserScoreFromLocalStorage();
    
    for (userScore of highScore) {
        const li = createHighScoreListElements(userScore);
        ol.append(li);
    }
}

function removeOldHighScore(olClassName){
    let ol = document.querySelector(olClassName);
while( ol.firstChild ){
    ol.removeChild(ol.firstChild );
} 
}
 

/**
 * Creates List elements to display Highscore in.
 * @param {Object} userScore - conains username and score
 */
function createHighScoreListElements(userScore){
    const li = document.createElement('li');
    let div = document.createElement('div');
    let div2 = document.createElement('div');
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    span1.append(userScore.username);
    span2.append(userScore.score);
    div.setAttribute('class', 'highScoreListItem');
    div.append(span1, span2);
    li.append(div);
    return li;
}

/**
 * Creates the userScore-object, adds it to highScore-array in local storage. Keeps array short.
 * @param {String} registeredUsername - username that's registered through inputUsername
 * @param {Number} playerScore - the calculated user-score
 */
function addHighScoreToLocalStorage(registeredUsername, playerScore){
    let userScore = {
        "username":registeredUsername,
        "score": playerScore
    }
    updateHighScore(userScore);

    let highScore = getUserScoreFromLocalStorage();
    if(highScore.length > 5){
        highScore.pop();
        saveUserScoreToLocalStorage(highScore);
    }
}

/**
 * Finds and replaces / knocks down lower scores. Updates Highscore-array in local storage.
 * @param {Object} userScore - object containing username and score
 */
function updateHighScore(userScore){
    const highScore = getUserScoreFromLocalStorage();
    let index 
    for (let i = 0; i < highScore.length; i++) {
        const storedHighScore = highScore[i];
        if(userScore.score < storedHighScore.score){
            index = i + 1;   
        }
    }
    console.log(index + ' is the place to splice')
    highScore.splice(index, 0, userScore);
    saveUserScoreToLocalStorage(highScore);
}  

