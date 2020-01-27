
document.querySelector("#rangeButton").addEventListener("click", selectRangeText);

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
        if ("settings" in localStorage){
            let tempSettings = JSON.parse(localStorage.getItem("settings"));
            settingMaxNumberBox.value = "Err";
            settings.settingMaxNumber = tempSettings.settingMaxNumber;
        } else {
            settingMaxNumberBox.value = tempSettings.settingMaxNumber;
        }

    } else {
        settings.settingMaxNumber = parseInt(settingMaxNumberBox.value);
        settingMaxNumberBox.value = settings.settingMaxNumber + "✔";
    } 

    if (timePressureButton.classList == "buttonClicked"){
        settings.settingTimePressureOn = false;
    }

    if (showOpponentsButton.classList == "buttonClicked"){
        settings.settingShowGuessesOn = false;
    }
    localStorage.setItem('settings', JSON.stringify(settings));
}

function selectRangeText(){
    document.querySelector(".set-user-maxNumber").select();
}

//change text in settings
function setSettingValues(){
    let settingMaxNumberBox = document.querySelector(".set-user-maxNumber");
    let settings = JSON.parse(localStorage.getItem("settings"));
    if ("settings" in localStorage){
        settingMaxNumberBox.value = settings.settingMaxNumber;
    } else {
        settingMaxNumberBox.placeholder = "20";
    }
}