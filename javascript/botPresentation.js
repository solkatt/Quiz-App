

let newGameWhiteCon = document.querySelector('.newGameWhiteCon');

let enterUsername = document.querySelector('.enterUsername');

let selectBotsForm = document.querySelector('.select-bots-form');

let enterYourName = document.querySelector('.enterYourName')



let rulesContainer = document.querySelector('.rules');

let botContainer = document.createElement('div');
botContainer.classList.add('toggleHide');



let closeDiv = document.createElement('div');
closeDiv.setAttribute('id', 'closeDiv');
closeDiv.classList.add('toggleHide');


/////////// PRINT THE STUFF/////////////////////
function printBotContainer() {

    botContainer.setAttribute('id', 'botPresentation');

    // botContainer.classList.add('hide');
    newGameWhiteCon.appendChild(botContainer);
    // selectBotsForm.appendChild(botInfoToggle);

   // Close X Div Relative/Absolute/
   



    // Close X

    let botSelectionToggle = document.createElement('i');
    botSelectionToggle.setAttribute('class', 'fa fa-times botCross');
    botSelectionToggle.setAttribute('aria-hidden', 'true');
    botSelectionToggle.setAttribute('style', 'font-size: 2rem;');

    botSelectionToggle.addEventListener('click', toggleBotInfo);


     closeDiv.appendChild(botSelectionToggle);
     newGameWhiteCon.appendChild(closeDiv);



    // botContainer.appendChild(botSelectionToggle);





}



/////////////////BOTS////////////////

let bot1 = new BotProfile('DumbBert', 'guesses wrong all the time. He likes to call himself a glue connoisseur', 'DumbBert.svg');
let bot2 = new BotProfile('AverageBert', 'he likes to guess the average number. He’s like every average Joe.', 'AverageBert.svg');
let bot3 = new BotProfile('RandomBert', 'always guesses randomly. He loves soft things especially on the floors and walls', 'RandomBert.svg');
let bot4 = new BotProfile('LowBert', 'he loves to guess the lowest number. He’s not the most confident.', 'LowBert.svg');
let bot5 = new BotProfile('HighBert', ' guesses the highest number. His favorite activity is walking in the forest and picking mushrooms.', 'HighBert.svg');
let bot6 = new BotProfile('SmartBert', 'guesses right on turn three. He says he’s as smart as Albert Einstein bet we are all pretty sure he cheats.', 'SmartBert.svg');


function BotProfile(name, description, img, arrow) {
    this.name = name;
    this.description = description;
    this.imgSrc = img;
    this.arrow = arrow;

    this.profile = document.createElement("section");
    this.image = document.createElement('img');
    this.title = document.createElement('h2');
    this.title.innerHTML = this.name;

    this.text = document.createElement('h4');
    this.text.innerHTML = this.description;

    this.iconDown = document.createElement('i');
    this.iconDown.setAttribute('class', 'fa fa-chevron-down arrowDown');
    this.iconDown.setAttribute('aria-hidden', 'true');
    this.iconDown.setAttribute('style', 'font-size: 2rem;');

 



    this.draw = function () {
        this.profile.classList.add('botProfilDiv');
        this.image.classList.add('botPhoto');
        this.image.setAttribute('src', './assets/' + img);
        this.title.classList.add('botTitle');
        this.text.classList.add('botDescription');

        this.profile.appendChild(this.iconDown);
        this.profile.appendChild(this.image);
        this.profile.appendChild(this.title);
        this.profile.appendChild(this.text);
        botContainer.appendChild(this.profile);
    }

}


printBotContainer();
bot1.draw();
bot2.draw();
bot3.draw();
bot4.draw();
bot5.draw();
bot6.draw();


//////////////TOGGLE////////////////////
function toggleBotInfo() {

    selectBotsForm.classList.remove('toggleHide');
    enterUsername.classList.remove('toggleHide');
    enterYourName.classList.remove('toggleHide');

    botContainer.classList.add('toggleHide');

    closeDiv.classList.add('toggleHide');


}

function toggleBotSelection() {
    selectBotsForm.classList.add('toggleHide');
    enterUsername.classList.add('toggleHide');
    enterYourName.classList.add('toggleHide');

    botContainer.classList.remove('toggleHide');
    closeDiv.classList.remove('toggleHide');
    botContainer.scrollTop = 0;


}