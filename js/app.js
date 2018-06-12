let cards = [],

    memoryValues = [],

    symbol,

    heckMatch,

    hasFlipCardClass,

    firstCard,

    secondCard,

    tilesFlipped = 0,

    ratingStarsCounter = 5,

    movesCounter = 0,

    createTimer,

    seconds = 0,

    minutes = 0,

    hours = 0,

    firstClick = true,

    gamerName,

    successfulNote = "Wooooooo! great job, you have great memory";

const deck = document.querySelector(".deck"),

      stars = document.querySelectorAll(".star"),

      hoursContainer = document.querySelector(".hours"),

      minutesContainer = document.querySelector(".minutes"),

      secondsContainer = document.querySelector(".seconds"),

      movesNumberContainer = document.querySelector(".moves-number"),

      resetIcon = document.querySelector(".reset-game"),

      modal = document.querySelector(".modal"),

      checkSymbol = document.querySelector(".check-symbol"),

      movesStat = document.querySelector(".moves-stat"),

      starsStat = document.querySelector(".stars-stat"),

      hoursStat = document.querySelector(".hours-stat"),

      minutesStat = document.querySelector(".minutes-stat"),

      secondsStat = document.querySelector(".seconds-stat"),

      starsContainer = document.querySelector(".stars"),

      noteText = document.querySelector(".note-text"),

      playAgain = document.querySelector(".play-again"),

      warningMsg = document.querySelector(".warning-msg"),

      gamerNameElm = document.querySelector(".gamer-name"),

      submitGamerNameBtn = document.querySelector(".save-name"),

      gamerNameModal = document.querySelector(".gamer-name-modal"),

      latestScoresModal = document.querySelector(".last-scores-modal"),

      lastFiveIcon = document.querySelector(".last-five"),

      OpenLatestScoresBtn = document.querySelectorAll(".open-latest-scores"),

      closeBtn = document.querySelector(".close-btn"),

      helpIcon = document.querySelector(".help-icon"),

      closeHelp = document.querySelector(".close-help"),

      helpModal = document.querySelector(".help"),

      cardsList = cardsInitialize(),

      shuffleCards = shuffle(cardsList);

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
    @Description : Replace The Old Deck With The Shuffled Deck
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
    deck.innerHTML = newDeck.innerHTML;
}

// TODO : Add Click Event To Every Cards
$(".card").on("click", gameLogic);

/*
    Description : Game Logic
*/
function gameLogic () {

    // TODO : Get The Symbol Inside The Card
    symbol = this.firstElementChild;

    // TODO : Get Matched Card
    checkMatch = this.classList.contains("match");

    // TODO : Get The Flipped Cards
    hasFlipCardClass = this.classList.contains("flip-card");

    // TODO : Run The Timer
    fireTiming ();

    // TODO : Make Sure That The Memory Values Array Has Maxmum Two Cards And The Card isn't Flipped To Avoid The Bug That Happens When The Gamer Clicks The Same Flipped Card Again
    if (memoryValues.length < 2 && !hasFlipCardClass) { // Start If

        this.classList.add("flip-card"); // TODO : Flip The Current Card

        symbol.classList.add("display-symbol"); // TODO : Display The Symbol

        // TODO : Check if The Memory Values Array Doesn't Has Any Cards Than Push The First Card into it.
        if (memoryValues.length == 0 && !checkMatch) { // Start If

            // TODO : Push The First Card Into The Memory Values Array
            memoryValues.push(this);

            // TODO : Get The First Card Unique Class
            firstCard = this.firstElementChild.classList.item(1);

        // TODO : if The Memory Values Array Has One Cards Then Push The Second Cards Into it
        } else if (memoryValues.length == 1 && !checkMatch) { // Start Else If

            // Push The Second Card Into The Memory Values Array
            memoryValues.push(this);

            moves (); // TODO : Run Moves Counter

            // TODO : Get The Second Card Unique Class
            secondCard = this.firstElementChild.classList.item(1);

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

                    finishGame ();

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

                        memoryValues[0].classList.add("unmatch");

                        memoryValues[0].firstElementChild.classList.remove("display-symbol");

                        memoryValues[0].firstElementChild.classList.add("hide-symbol");

                        memoryValues[1].classList.remove("flip-card");

                        memoryValues[1].classList.add("unmatch");

                        memoryValues[1].firstElementChild.classList.remove("display-symbol");

                        memoryValues[1].firstElementChild.classList.add("hide-symbol");

                        /*
                            @Description : Remove unmatch And hide-symbol Classes After Flip Both Unmatched cards To Avoid Preventing Unmatching Animation When The Gamer Clicks The Same Cards Again
                        */
                        setTimeout(function () {

                            memoryValues[0].classList.remove("unmatch");

                            memoryValues[0].firstElementChild.classList.remove("hide-symbol");

                            memoryValues[1].classList.remove("unmatch");

                            memoryValues[1].firstElementChild.classList.remove("hide-symbol");

                            memoryValues = [];

                        }, 600);

                    }

                }
                setTimeout(unmatchedCards, 600);
            } // End Else

        } // End Else If

    } // End If

} // End gameLogic

/*
    @Description : Count Number Of Clicks That The Gamer Takes To Finish The Game. Every Two Clicks Equal One Move
*/
function moves () {

    // TODO : Check If There Are Two Flipped Cards
    if (memoryValues.length == 2) {

        movesCounter++; // TODO : Increase movesCounter By 1 For Every Two Flipped Cards

        // TODO : Append The movesCounter Into The moves-number
        movesNumberContainer.innerHTML = movesCounter;

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
        secondsContainer.innerHTML = seconds;

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
            minutesContainer.innerHTML = minutes;

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
            hoursContainer.innerHTML = hours;

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
    if (movesCounter >= 21 && movesCounter <= 30) {

        stars[4].classList.add("decrease-rating");

        ratingStarsCounter = 4;

        successfulNote = "Wooooooo! great job, you have great memory";

    // TODO : Set Three Stars If The Moves Number Between 41 And 60 Moves
    } else if (movesCounter >= 31 && movesCounter <= 40) {

        stars[3].classList.add("decrease-rating");

        ratingStarsCounter = 3;

        successfulNote = "great job, you have great memory";

    // TODO : Set Two Stars If The Moves Number Between 61 And 80 Moves
    } else if (movesCounter >= 41 && movesCounter <= 50) {

        stars[2].classList.add("decrease-rating");

        ratingStarsCounter = 2;

        successfulNote = "great job, try to finish it faster next time";

    // TODO : Set One Stars If The Moves Number Between 81 And 100 Moves
    } else if (movesCounter >= 51 && movesCounter <= 60) {

        stars[1].classList.add("decrease-rating");

        ratingStarsCounter = 1;

        successfulNote = "great job! you did it, try to finish it faster next time";

    // TODO : Set No Stars If The Moves Number Greater Than Or Equal 110 Moves
    } else if (movesCounter >= 61) {

        stars[0].classList.add("decrease-rating");

        ratingStarsCounter = 0;

        successfulNote = "great! finally you have finished it, try to finish it faster next time";
    } else {

        ratingStarsCounter = 5;

        successfulNote = "Wooooooo! great job, you have great memory";
    }
}

/*
    @Description : Reset Game
*/
function resetGame () {

    memoryValues = [];

    tilesFlipped = 0;

    movesCounter = 0;

    clearInterval(createTimer);

    ratingStarsCounter = 5,

    seconds = 0;

    minutes = 0;

    hours = 0;

    firstClick = true;

    // TODO : Remove decrease-rating From All Stars To Display Them Again
    for (let i = 0; i < stars.length; i++) {

        stars[i].classList.remove("decrease-rating");
    }

    hoursContainer.innerHTML = "00";

    minutesContainer.innerHTML = "00";

    secondsContainer.innerHTML = "00";

    movesNumberContainer.innerHTML = movesCounter;

    gamerName = document.querySelector(".gamer-name").value = "";

    // TODO : Display The Gamer Name Modal To Get  The Gamer Name
    document.querySelector(".gamer-name-modal").classList.remove("hide-modal");

    shuffle (cardsList);

    changeCardsPosition ();

    $(".card").on("click", gameLogic);
}

// TODO : Reset The Game When The Gamer Clicks The Reset Icon
resetIcon.addEventListener("click", resetGame);

/*
    @Description : Display Game Statistics When The Gamer Finishes The Game Successfully And Give Him Option To Play Again
*/
function finishGame () {

    modal.classList.add("display-modal");

    checkSymbol.classList.add("animate-check");

    movesStat.innerHTML = movesNumberContainer.textContent;

    starsStat.innerHTML = ratingStarsCounter;

    hoursStat.innerHTML = hours;

    minutesStat.innerHTML = minutes;

    secondsStat.innerHTML = seconds;

    noteText.textContent = successfulNote;

    // TODO : Reset The Game When The Gamer Clicks The Reset Icon
    playAgain.addEventListener("click", function () {

        resetGame ();

        modal.classList.remove("display-modal");

        checkSymbol.classList.remove("animate-check");
    });

    saveLatestScores ();

}

/*
    @Description : Get The Gamer Name To Start playing
    @Param {e} e - Target The Event
*/
submitGamerNameBtn.onclick = function (e) {

    e.preventDefault();

    gamerName = document.querySelector(".gamer-name").value;

    if (!gamerName) {

        warningMsg.textContent = "Please Enter Your name";

        warningMsg.classList.remove("hide-msg");

        gamerNameElm.classList.add("red-border");

        return false;

    } else if (gamerName.length > 20) {

        warningMsg.textContent = "The Should Be less Than 20 Letter";

        warningMsg.classList.remove("hide-msg");

        gamerNameElm.classList.add("red-border");

        return false;

    } else {

        warningMsg.classList.add("hide-msg");

        gamerNameElm.classList.remove("red-border");

        // TODO : Hide The Gamer Name Modal After Getting Gamer Name
        gamerNameModal.classList.add("hide-modal");

        return true
    }

};

/*
    @description : Save The Latest Scores
*/
function saveLatestScores () {

    const latestScore = {

        name : gamerName,

        movesNumber : movesNumberContainer.textContent + " moves",

        starsNumber : ratingStarsCounter + " Stars"
    };

    // TODO : Check If There Isn't LatestScores Item In Local Storage To Initialize A New One
    if(localStorage.getItem("latestScores") === null) {

        // TODO : Create LatestScores Array To Store The Scores Into it
        let latestScores = [];

        // TODO : Push The Score Into The LatestScores Array
        latestScores.push(latestScore);

        // TODO : Store The latestScores Array Into Local Storage After Transfer it To String
        localStorage.setItem("latestScores", JSON.stringify(latestScores));

        console.log(latestScores);

    // TODO : If Already There Is latestScores Array in Local Storage Fetch it
    } else {

        // TODO : Get latestScores From Local Storage And Transfer It To Object Again
        let latestScores = JSON.parse(localStorage.getItem("latestScores"));

        latestScores.push(latestScore);

        localStorage.setItem("latestScores", JSON.stringify(latestScores));
    }

    fetchLatestScores ();

}

/*
    @Description : Fetch The latestScores From The Local Storage And Display it
*/
function fetchLatestScores () {

    let latestScores = JSON.parse(localStorage.getItem("latestScores")),

        latestScoresBoard = document.querySelector(".last-scores-board");

        latestScoresBoard.innerHTML = "";

    for (let i = 0; i < latestScores.length; i++) {

        let name = latestScores[i].name,

            movesNumber = latestScores[i].movesNumber,

            starsNumber = latestScores[i].starsNumber;

        // TODO : If The latestScores Has Less Than 5 Scores Then Add New One
        if (latestScores.length <= 5) {

            // TODO : Create New Score And Add It To The Latest Five Scores Board
            latestScoresBoard.innerHTML +=
                            "<ul class='score'>"+
                                "<li class='item'>"+
                                    "<i class='fa fa-user'></i>"+
                                    name+
                                "</li>"+
                                "<li class='item'>"+
                                    "<i class='fa fa-calculator'></i>"+
                                    movesNumber+
                                "</li>"+
                                "<li class='item'>"+
                                    "<i class='fa fa-star'></i>"+
                                    starsNumber+
                                "</li>"+
                            "</ul>";

        // TODO : If The latestScores Has 5 Scores
        } else {

            // TODO : Remove The First Score In The Board
            latestScores.splice(0, 1);

            // TODO : Create New Score And Add It To The Latest Five Scores Board
            latestScoresBoard.innerHTML +=
                            "<ul class='score'>"+
                                "<li class='item'>"+
                                    "<i class='fa fa-user'></i>"+
                                    name+
                                "</li>"+
                                "<li class='item'>"+
                                    "<i class='fa fa-calculator'></i>"+
                                    movesNumber+
                                "</li>"+
                                "<li class='item'>"+
                                    "<i class='fa fa-star'></i>"+
                                    starsNumber+
                                "</li>"+
                            "</ul>";
        }

        localStorage.setItem("latestScores", JSON.stringify(latestScores));
    }

}

/*
    @Description : Display Latest Five Scores Board
    @Param {e} e - Target The Event
*/
function openLatestScores (e) {

    e.preventDefault();

    latestScoresModal.classList.add("show-modal");

    fetchLatestScores ();
}

// TODO : Open The Latest Five Scores Board When The Gamer Clicks Last Five Icon
lastFiveIcon.addEventListener("click", openLatestScores);

// TODO : Open The Latest Five Scores Board When The Gamer Clicks Latest Scores Button
for (let i = 0; i < OpenLatestScoresBtn.length; i++) {

    OpenLatestScoresBtn[i].addEventListener("click", openLatestScores);
}

//TODO : Close The Latest Five Scores Board When The Gamer Clicks Close Button
closeBtn.onclick = function () {

    latestScoresModal.classList.remove("show-modal");
};

// TODO : Open Help Modal When The Gamer Clicks Help Icon
helpIcon.onclick = function () {

    helpModal.classList.add("display-modal");
}

// TODO : Close Help Modal When The Gamer Clicks Close Help icon
closeHelp.onclick = function () {

    helpModal.classList.remove("display-modal");
}


