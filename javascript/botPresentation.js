
/**
 * gets the white container in new game state
 */
let newGameWhiteCon = document.querySelector('.newGameWhiteCon');

/**
 * gets the inputfield for enter username
 */
let enterUsername = document.querySelector('.enterUsername');

/**
 * gets the form for selecting bots
 */
let selectBotsForm = document.querySelector('.select-bots-form');

/**
 * The header for enter username input
 */
let enterYourName = document.querySelector('.enterYourName')

/**
 * contains the rules
 */
let rulesContainer = document.querySelector('.rules');

/**
 * contains bots
 */
let botContainer = document.createElement('div');
botContainer.classList.add('toggleHide');

/**
 *closes div
 */
let closeDiv = document.createElement('div');
closeDiv.setAttribute('id', 'closeDiv');
closeDiv.classList.add('toggleHide');

/**
 * Prints the bot-container and adds classes and events to elements in the container
 */
function printBotContainer() {

    botContainer.setAttribute('id', 'botPresentation');
    newGameWhiteCon.appendChild(botContainer);

    let botSelectionToggle = document.createElement('i');
    botSelectionToggle.setAttribute('class', 'fa fa-times botCross');
    botSelectionToggle.setAttribute('aria-hidden', 'true');
    botSelectionToggle.setAttribute('style', 'font-size: 2rem;');
    botSelectionToggle.addEventListener('click', toggleBotInfo);

    closeDiv.appendChild(botSelectionToggle);
    newGameWhiteCon.appendChild(closeDiv);
}

/////////////////BOTS////////////////

let bot1 = new BotProfile('DumbBert', 'Guesses wrong all the time. He likes to call himself a glue connoisseur.', 'DumbBert.svg');
let bot2 = new BotProfile('AverageBert', 'He likes to guess the average number. He’s like every average Joe.', 'AverageBert.svg');
let bot3 = new BotProfile('RandomBert', 'Always guesses randomly. He loves soft things especially on the floors and walls.', 'RandomBert.svg');
let bot4 = new BotProfile('LowBert', 'He loves to guess the lowest number. He’s not the most confident.', 'LowBert.svg');
let bot5 = new BotProfile('HighBert', 'Guesses the highest number. His favorite activity is walking in the forest and picking mushrooms.', 'HighBert.svg');
let bot6 = new BotProfile('SmartBert', 'Guesses right on turn three. He says he’s as smart as Albert Einstein bet we are all pretty sure he cheats.', 'SmartBert.svg');

/**
 * Handles the presentation of bots
 * @param {string} name - bots name
 * @param {string} description -  bot description
 * @param {image} img - image of bot
 * @param {any} arrow - arrow to show user that downscroll is possible
 */
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

/**
 * where the bots are printed out
 */
printBotContainer();
bot1.draw();
bot2.draw();
bot3.draw();
bot4.draw();
bot5.draw();
bot6.draw();

/**
 * Handles showing and hideing bot description
 */
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