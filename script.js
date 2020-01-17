let secretNumber = getRandom();

//Slumpar fram siffra (mellan 0-10)
function getRandom(){
 let randomNumber = Math.ceil(Math.random()*10);
 return randomNumber;
}

function checkUserGuess(){
    let guess = document.getElementById('user-guess')["0"].value;
    if(guess == secretNumber){
        displayOutput("win");
    } else if(guess > secretNumber){
        displayOutput("lower");
    } else if(guess < secretNumber){
        displayOutput("higher");
    } else {
        displayOutput("error");
    }
    //hämtar resultat
    guess = document.getElementById('user-guess')["0"].select();
}

function displayOutput(result){

    //Ändrar bild och text
    let swapPic = document.getElementById("display-image");
    let swapText = document.getElementById("display-text");

    switch (result) {
        case "win":
            swapPic.src = "https://lundgrens-media.imgix.net/products/pokal-xxl.jpg";
            swapText.innerHTML = "A winner is you"
            break;
        case "lower":
            swapPic.src = "https://image.shutterstock.com/image-photo/photo-shocked-bearded-male-looks-260nw-776210818.jpg";
            swapText.innerHTML = "Gissa lägre"
            break;
        case "higher":
            swapPic.src = "https://image.shutterstock.com/image-photo/portrait-happy-bearded-man-pointing-260nw-1029061363.jpg";
            swapText.innerHTML = "Gissa högre"
            break;
        case "error":
            swapPic.src = "https://i.imgflip.com/1qwh2e.jpg";
            swapText.innerHTML = "Inte en siffra"
            break;
    }
}

function reset(){

}