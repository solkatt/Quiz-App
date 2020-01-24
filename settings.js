document.querySelector(".set-user-settings").addEventListener("click", checkUserSettings);

document.querySelector(".see-opponents-guesses").addEventListener("click", seeOpponentsGuesses);

function seeOpponentsGuesses(){
    let settingsSeeOpponentsGuesses = true;
    document.querySelector(".see-opponents-guesses").innerHTML = "<p>show opponents guesses: off<p>";
}

function checkUserSettings(){
    settingMaxNumberBox = document.querySelector(".settings-input")["0"];
    if (isNaN(parseInt(settingMaxNumberBox.value))){
        settingMaxNumberBox.value = "Error";
    } else {
        maxNumber = parseInt(settingMaxNumberBox.value);
        settingMaxNumberBox.value = "Max now: " + maxNumber;
        localStorage.setItem('maxNumber', JSON.stringify(maxNumber));
    }

}

//change text in settings
function setSettingValues(){
    let settingMaxNumberBox = document.querySelector(".settings-input")["0"];
    if (localStorage.getItem("maxNumber") === null){
        settingMaxNumberBox.placeholder = "Max Range: 20";
    } else {
        settingMaxNumberBox.placeholder = "Max Range: " + localStorage.getItem("maxNumber");
    }
}