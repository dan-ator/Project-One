// I think this is a great way to structure your data!
cardData = [{
  front: "שלום",
  back: "Hello (Peace)"
}, {
  front: "תודה",
  back: "Thanks"
}, {
  front: "בית",
  back: "House"
}, {
  front: "כיסא",
  back: "Chair"
}, {
  front: "שולחן",
  back: "Table"
}, {
  front: "ארוחה",
  back: "Meal"
}];

var currentNumber = 0;

function drawCard() {
  $("#backOfCard").css("background-color", "white")
  $("#frontOfCard").text(cardData[currentNumber].front);
  $("#backOfCard").text(cardData[currentNumber].back);
  $("#frontOfCard").show();
  $("#backOfCard").hide();
}

// I like that you renamed this function to be more active and readable!
function advanceCard() {
  if (currentNumber < (cardData.length - 1)) {
    currentNumber++;
    drawCard();
  } else {
    currentNumber = 0;
    drawCard();
  }
}

function reverseCard() {
  if (currentNumber >= 1) {
    currentNumber--;
    drawCard();
  }
}

function initializeGame() {
  // is there a reason for this if statement?
  if (($("#frontOfCard").text() === "") && ($("#backOfCard").text() === "")) {
    drawCard();
    toggleButtons();
    $("#start").toggle();
    $("#instructions").toggle();
  }
}

function toggleButtons() {
  $("#next").toggle();
  $("#previous").toggle();
  $("#correctButton").toggle();
  $("#incorrectButton").toggle();
}

function flipCard() {
  $("#frontOfCard").toggle();
  $("#backOfCard").toggle();
}

function removeCard() {
  cardData.splice(currentNumber, 1);
  drawCard();
}

function markCorrect() {
  if (currentNumber < (cardData.length - 1)) {
    removeCard();
  } else if ((currentNumber <= (cardData.length - 1)) && (cardData.length > 1)) {
    // the conditional above definitely needs a comment. I can't quite figure
    // out why it's there, and why you have to reset the currentNumber to zero
    // in this case...
    cardData.splice(currentNumber, 1);
    currentNumber = 0;
    drawCard();
  } else {
    toggleButtons();
    $(".card").empty();
    $("#reset").css("display", "inline-block");
    alert("You're So Smart!");
  }
}

function markWrong() {
  $("#backOfCard").css("background-color", "red");
  cardData[currentNumber].correct = false
  // do you use this property anywhere? I thought the idea was to use this
  // property in `drawCard()` to decide what color to draw the card as.
}

$("#start").on("click", initializeGame);
$("#next").on("click", advanceCard);
$("#previous").on("click", reverseCard);
$("#frontOfCard").on("click", flipCard);
$("#backOfCard").on("click", flipCard);
$("body").on("keydown", function(e) {
  if (e.keyCode === 70) {
    flipCard();
  }
});

$("#correctButton").on("click", markCorrect);
$("#incorrectButton").on("click", markWrong);

$("#reset").click(function() {
  document.location.reload(true);
});

//Make your own cards area//
// $( "#cardCreator" ).submit(function(event) {
//   console.log( $( this ).serializeArray() );
//   event.preventDefault();
// });
