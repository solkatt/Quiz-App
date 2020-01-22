/**
 * gets button for submitting username
 */
const submitUsername = document.querySelector('#submitUsername');

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
    //addHighScoreToLocalStorage(username.value)
    //GÖR EVENTUELLT EN RETURN AV DETTA ATT ANVÄNDA I CALCULATE USERSCORE
    return username.value
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
    const ol = document.querySelector('.highScore');
    const highScore = getUserScoreFromLocalStorage();
    
    for (userScore of highScore) {
        const li = createLiElement(userScore);
        ol.append(li);
    }
}

/**
 * 
 * @param {Number} rank - the rank of userScore
 * @param {String} rankDot - some text between rank and score
 * @param {Object} userScore - conains username and score
 */
function createLiElement(userScore){
    const li = document.createElement('li');
    li.append(userScore.username, ', ', userScore.score)
    return li;
}

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
    
    
    //highScore.push(userScore);

/*     if(highScore.length > 5){
        highScore.shift();
    } */
    console.log(highScore)
    //showHighScore(userScore);
   // saveUserScoreToLocalStorage(highScore);
}

/******** THESE FUNCTIONS ARE FOR WHEN THE SCORE IS IMPLEMENED IN THE GAME, ARE NOT TESTED ****/

/**
 * Finds and replaces / knocks down lower scores
 * @param {Object} userScore - object containing username and score
 */
function updateHighScore(userScore){
    //let indexToRemove = calculateRankingPosition(userScore);
    //const highScore = getUserScoreFromLocalStorage();
    //console.log(indexToRemove + ' is the place')
   // highScore.splice(calculateRankingPosition(), 0, userScore);
   calculateRankingPosition(userScore);
} 

/**
 * Finds array-position for where the user's highscore should be
 * @param {Number} i - index
 * @param {Object} userScore - object containing username and score
 */
function calculateRankingPosition(userScore){
/*     const highScore = getUserScoreFromLocalStorage();
    console.log('kalkyleraR')
    let index;
    for (let i = 0; i < highScore.length; i++) {
        //const storedScore = highScore;
        if(highScore.score > userScore.score && highScore.score < userScore.score){
            index = i;
            break;
        }
    } */
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

