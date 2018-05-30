const cardsList = cardsInitialize();

const shuffleCards = shuffle(cardsList);

changeCardsPosition(); //TODO : Run changeCardsPosition Function

/*
    @Description : Get All Card-box Elements
    @Return {object} All Card-box Elements Inside The Deck
*/
function cardsInitialize() {

    let cards = [];

    cards = document.getElementsByClassName('card-box');

    return convertToArray(cards);
}

/*
    @Description : Transform The Object That Came From cardsInitialize() To An Array
    @Param {object} obj - All card-box Objects.
    @Return {array} All The Cards Inside The Deck.
*/
function convertToArray(obj) {

    let maped = [];

    for (let key in obj) {

        //TODO : Check if The Object Exist Already.
        if(obj.hasOwnProperty(key)) {

            //TODo : Get Only Figure Elements And Store Them inside The maped Array
            maped.push(obj[key].innerHTML);
        }
    }

    return maped;
}

/*
    @Description : Change Cards position
    @Param {array} array - All Cards Elements That Came From The convertToArray() Function
    @Return {array} The Cards After Shuffled Them

*/
function shuffle(array) {

    let currentIndex = array.length, temperoryValue, randomIndex;

    //TODO : Make Sure That The Loop Will Stop Before Index Number 0
    while (--currentIndex > 0) {

        //TODO : Generate Random Index
        randomIndex = Math.floor(Math.random() * (currentIndex + 1));

        //TODO : Set The TemperoryValue That The function Will Swap it With The RondamIndex
        temperoryValue = array[randomIndex];

        //TODO : Swap The Current Index With The Random Index
        array[randomIndex] = array[currentIndex];

        //TODO: Set The Temperory Value To The Current Index
        array[currentIndex] = temperoryValue;
    }

    return array;
}

/*
    @Description : Replace The Old Deck With The Shuffled Deck.
*/
function changeCardsPosition() {

    const newDeck = document.createElement("div");

    for (let i = 0; i < shuffleCards.length; i++) {

        //TODO : Craete A New card-box
        newCardBox = document.createElement("div");

        //TODO : Put The Cards Inside The Box-Cards
        newCardBox.innerHTML = shuffleCards[i];

        //TODO : Set The A class To The New Card Box
        newCardBox.classList.add("card-box");

        //TODO: Append The New Card Box To The New Deck
        newDeck.appendChild(newCardBox);
    }

    //TODO: Append The Shuffled Cards To The Deck
    document.getElementsByClassName("deck")[0].innerHTML = newDeck.innerHTML;
}