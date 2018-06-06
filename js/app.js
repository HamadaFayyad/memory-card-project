let cards = [],

    memoryValues = [],

    firstCard,

    secondCard,

    tilesFlipped = 0,

    movesCounter = 0,

    createTimer,

    seconds = 0,

    minutes = 0,

    hours = 0,

    firstClick = true,

    stars = document.querySelectorAll(".star");

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

    // TODO : Get The Symbol Inside The Card
    let symbol = this.firstElementChild,

        // TODO : Get Matched Card
        checkMatch = this.classList.contains("match");

    // TODO : Run The Timer
    fireTiming ();

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

            moves (); // TODO : Run Moves Counter

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

                    clearInterval(createTimer);

                    memoryValues = [];
                } // End If

            // TODO : If The Both Flipped Cards Are Not Matched Then Flip Them Back
            } else { // Start Else

                /*
                    @Description : Flip The Flipped Cards Back If They Not Matched
                */
                function unmatchedCards () {

                    // TODO : Check If The Card That The Gamer Clicks Doesn't Have Match Class To Avoid Flipping Cards Back When The Gamer Clicks Them Again After They Have Matched
                    if (!checkMatch) {

                        memoryValues[0].classList.remove("flip-card");

                        memoryValues[0].firstElementChild.classList.remove("display-symbol");

                        memoryValues[1].classList.remove("flip-card");

                        memoryValues[1].firstElementChild.classList.remove("display-symbol");

                        memoryValues = [];
                    }

                }
                setTimeout(unmatchedCards, 700);
            } // End Else

        } // End Else If

    } // End If

}); // End Click Event

/*
    @Description : Count Number Of Clicks That The Gamer Takes To Finish The Game. Every Two Clicks Equal One Move
*/
function moves () {

    // TODO : Check If There Are Two Flipped Cards
    if (memoryValues.length == 2) {

        movesCounter++; // TODO : Increase movesCounter By 1 For Every Two Flipped Cards

        // TODO : Append The movesCounter Into The moves-number
        document.getElementsByClassName("moves-number")[0].innerHTML = movesCounter;

        // TODO : Run Rating Star
        ratingStars ();
    }

}

/*
    @Description : Create A Timer To Count The Time That The Gamer Takes To Finish The Game
*/
function startTiming () {

    /*
        @Description : Create The Seconds, Minutes And Hours And Append Them To The Timer
    */
    createTimer = setInterval(function () {

        // TODO : Increase The Seconds By One Every 1000 Miliseconds
        seconds++;

        if (seconds < 10) {

            // TODO : Put 0 Before The Seconds If The Seconds Less Than 10
            seconds = "0" + seconds;

        }

        // TODO : Append The Second To The Seconds Container
        document.querySelector(".seconds").innerHTML = seconds;

        if (seconds == 60) { // Start If

            // TODO : Increase The Minutes By 1 Evey 60 Seconds
            minutes++;

            // TODO : Rest The Seconds To 0 Every 60 Seconds
            seconds = 0;

            if (minutes < 10) { // Start If

                // TODO : Put 0 Before The Minutes If The Minutes Less Than 10
                minutes = "0" + minutes;

            } // End If

            // TODO : Append The Minutes To The Minutes Container
            document.querySelector(".minutes").innerHTML = minutes + " : ";

        } // End If

        if (minutes == 60) { // Start If

            // TODO : Increase The Hours By 1 Every 60 Minutes
            hours++;

            // TODO : Rest The Minutes To 0 Every 60 Minutes
            minutes = 0;

            if (hours < 10) { // Start If

                // TODO : Put 0 Before The Hours If The Hours Less Than 10
                hours = "0" + hours;

            } // End If

            // TODO : Append The Hours To The Hours Container
            document.querySelector(".hours").innerHTML = hours + " : ";

        } // End If

    }, 1000);
}

/*
    @Description : Run The Timer When The Gamer Clicks The First Card
*/
function fireTiming () {

    // TODO : Check If The Click is The First Click To Run The Timer To Avoid Starting it Again When The Gamer Clicks The Next Cards
    if (firstClick) { // Start If

        startTiming ();

        firstClick = false;

    } // End If
}

/*
    @Description : Rating The Gamer based on The Number Of Moves
*/
function ratingStars () {

    // TODO : Set Four Stars If The Moves Number Between 21 And 40 Moves
    if (movesCounter >= 21 && movesCounter <= 40) {

        stars[4].classList.add("decrease-rating");

    // TODO : Set Three Stars If The Moves Number Between 41 And 60 Moves
    } else if (movesCounter >= 41 && movesCounter <= 60) {

        stars[3].classList.add("decrease-rating");

    // TODO : Set Two Stars If The Moves Number Between 61 And 80 Moves
    } else if (movesCounter >= 61 && movesCounter <= 80) {

        stars[2].classList.add("decrease-rating");

    // TODO : Set One Stars If The Moves Number Between 81 And 100 Moves
    } else if (movesCounter >= 81 && movesCounter <= 100) {

        stars[1].classList.add("decrease-rating");

    // TODO : Set No Stars If The Moves Number Greater Than Or Equal 110 Moves
    } else if (movesCounter >= 110) {

        stars[0].classList.add("decrease-rating");
    }
}
