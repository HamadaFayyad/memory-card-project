let cards = [],

    memoryValues = [],

    firstCard,

    secondCard,

    tilesFlipped = 0,

    movesCounter = 0,

    rattingStars = 0,

    clickes = 0;

const cardsList = cardsInitialize();

const shuffleCards = shuffle(cardsList);

changeCardsPosition(); // TODO : Run changeCardsPosition Function

/*
    @Description : Get All Card-box Elements
    @Return {object} All Card-box Elements Inside The Deck
*/
function cardsInitialize() {

    cards = document.getElementsByClassName("card");

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

        // TODO : Check if The Object Exist Already.
        if(obj.hasOwnProperty(key)) {

            // TODo : Get Only Figure Elements And Store Them inside The maped Array
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

    // TODO : Make Sure That The Loop Will Stop Before Index Number 0
    while (--currentIndex > 0) {

        // TODO : Generate Random Index
        randomIndex = Math.floor(Math.random() * (currentIndex + 1));

        // TODO : Set The TemperoryValue That The function Will Swap it With The RondamIndex
        temperoryValue = array[randomIndex];

        // TODO : Swap The Current Index With The Random Index
        array[randomIndex] = array[currentIndex];

        // TODO: Set The Temperory Value To The Current Index
        array[currentIndex] = temperoryValue;
    }

    return array;
}

/*
    @Description : Replace The Old Deck With The Shuffled Deck.
*/
function changeCardsPosition() {

    tilesFlipped = 0;

    const newDeck = document.createElement("div");

    for (let i = 0; i < shuffleCards.length; i++) {

        // TODO : Craete A New Card
        newCard = document.createElement("figure");

        // TODO : Put The Symbol Inside The Card
        newCard.innerHTML = shuffleCards[i];

        // TODO : Set The A class To The New Card
        newCard.classList.add("card");

        // TODO : Append The New Card To The New Deck
        newDeck.appendChild(newCard);
    }

    // TODO : Append The Shuffled Cards To The Deck
    document.getElementsByClassName("deck")[0].innerHTML = newDeck.innerHTML;
}

// TODO : Add Click Event To Every Cards
$(".card").on("click", function () {

    let symbol = this.firstElementChild; // Get The Symbol Inside The Card

    // console.log(symbol);

    // TODO : Make Sure That The Memory Values Array Has Maxmum Two Cards
    if (memoryValues.length < 2) { // Start If

        this.classList.add("flip-card"); // TODO : Flip The Current Card

        symbol.classList.add("display-symbol"); // TODO : Display The Symbol

        // TODO : Check if The Memory Values Array Doesn't Has Any Cards Than Push The First Card into it.
        if (memoryValues.length == 0) { // Start If

            // TODO : Push The First Card Into The Memory Values Array
            memoryValues.push(this);

            // TODO : Get The First Card Unique Class
            firstCard = this.firstElementChild.classList.item(1);

            // console.log("First Card Class ==> " + firstCard);

        // TODO : if The Memory Values Array Has One Cards Then Push The Second Cards Into it
        } else if (memoryValues.length == 1) { // Start Else If

            // Push The Second Card Into The Memory Values Array
            memoryValues.push(this);

            // TODO : Get The Second Card Unique Class
            secondCard = this.firstElementChild.classList.item(1);

            // console.log("Second Card Class ==> " + secondCard);

            // TODO : Check if The Both Flipped Cards Are Matched The Mark Them As Matched Cards
            if (firstCard == secondCard) { // Start If

                memoryValues[0].classList.add("match");

                memoryValues[1].classList.add("match");

                // TODO : Increase The Tiles Flipped Cards Counter By The Two Matched Cards
                tilesFlipped += 2;

                // TODO : Empty The Memory Values Cards To Receive A New Cards
                memoryValues = [];

                // TODO : Check If The Flipped Cards Number Equal The Cards Number Then Finish The Game
                if (tilesFlipped == cards.length) { // Start If

                    console.log("Congratulion, You Win");

                    memoryValues = [];
                } // End If

            // TODO : If The Both Flipped Cards Are Not Matched Then Flip Them Back
            } else { // Start Else

                /*
                    @Description : Flip The Flipped Cards Back If They Not Matched
                */
                function unmatchedCards () {

                    memoryValues[0].classList.remove("flip-card");

                    memoryValues[0].firstElementChild.classList.remove("display-symbol");

                    memoryValues[1].classList.remove("flip-card");

                    memoryValues[1].firstElementChild.classList.remove("display-symbol");

                    memoryValues = [];
                }
                setTimeout(unmatchedCards, 700);
            } // End Else

        } // End Else If

    } // End If

});