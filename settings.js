
document.querySelector(".user-settings").addEventListener("click", checkUserSettings);

function checkUserSettings(){
    let rangeSettingsText = document.querySelector(".handle-range-settings-text");

    checkIfMaxNumberIsNumber = parseInt(document.getElementById("user-settings")["0"].value);
    if (isNaN(checkIfMaxNumberIsNumber)){
        rangeSettingsText.innerHTML = "Not a number";
    } else {
        maxNumber = checkIfMaxNumberIsNumber;
        rangeSettingsText.innerHTML = "Max range is now at " + maxNumber;
        localStorage.setItem('maxNumber', JSON.stringify(maxNumber));
    }

}



//Move this to a better place?
//change text in settings box
function setSettingValues(){
    let settingMaxNumberBox = document.getElementById("user-settings")["0"];
    if (localStorage.getItem("maxNumber") === null){
        settingMaxNumberBox.placeholder = "Max Range: 20";
    } else {
        settingMaxNumberBox.placeholder = "Max Range: " + localStorage.getItem("maxNumber");
    }
}