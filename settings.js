document.querySelector(".set-user-settings").addEventListener("click", checkUserSettings);
document.querySelector(".set-user-settings").addEventListener("click", checkUserSettings);

function checkUserSettings(){
    let settingMaxNumberBox = document.querySelector(".set-user-maxNumber");
    let timePressureButton = document.getElementById("timePressureButton");
    let showOpponentsButton = document.getElementById("showOpponentsButton");
    let settings = {
        settingShowGuessesOn: true,
        settingMaxNumber: 20,
        settingTimePressureOn: true
    }

    if (isNaN(parseInt(settingMaxNumberBox.value))){
        //If a non-number is put in, the setting-object resets it, so tempSettings gets settingMaxNumber from local storage
        settingMaxNumberBox.value = "Error";
        if ("settings" in localStorage){
            let tempSettings = JSON.parse(localStorage.getItem("settings"));
            settings.settingMaxNumber = tempSettings.settingMaxNumber;
        } else {
            settingMaxNumberBox.placeholder = "Max Range: 20";
        }
    } else {
        settings.settingMaxNumber = parseInt(settingMaxNumberBox.value);
        settingMaxNumberBox.value = "Max now: " + settings.settingMaxNumber;
    } 

    if (timePressureButton.classList == "buttonClicked"){
        settings.settingTimePressureOn = false;
    }

    if (showOpponentsButton.classList == "buttonClicked"){
        settings.settingShowGuessesOn = false;
    }
    localStorage.setItem('settings', JSON.stringify(settings));
}

//change text in settings
function setSettingValues(){
    let settingMaxNumberBox = document.querySelector(".set-user-maxNumber");
    let settings = JSON.parse(localStorage.getItem("settings"));
    if ("settings" in localStorage){
        settingMaxNumberBox.placeholder = "Max Range: " + settings.settingMaxNumber;
    } else {
        settingMaxNumberBox.placeholder = "Max Range: 20";
    }
}