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

function nextButton() {
  if (currentNumber < (cardData.length - 1)) {
    currentNumber++;
    drawCard();
  } else {
    currentNumber = 0;
    drawCard();
  }
}

function previousButton() {
  if (currentNumber >= 1) {
    currentNumber--;
    drawCard();
  }
}

function initializeGame() {
  if (($("#frontOfCard").text() === "") && ($("#backOfCard").text() === "")) {
    drawCard();
    $("#next").css("display", "inline-block")
    $("#previous").css("display", "inline-block")
    $("#scoreBoard").css("display", "inline-block")
    $("#start").css("display", "none")
  }
}

function flip() {
  $("#frontOfCard").toggle();
  $("#backOfCard").toggle();
}

function markCorrect() {
  if (currentNumber < (cardData.length - 1)) {
    $("#backOfCard").css("background-color", "green");
    cardData.splice(currentNumber, 1);
    drawCard();
  } else if (currentNumber === (cardData.length < 1)) {
    cardData.splice(currentNumber, 1);
    currentNumber = 0;
    drawCard();
  } else {
    $("#next").css("display", "none");
    $("#previous").css("display", "none");
    $("#scoreBoard").css("display", "none");
    $(".card").empty();
    $("#reset").css("display", "inline-block");
    alert("You're a Genius!");
  }
}

function markWrong() {
  $("#backOfCard").css("background-color", "red");
  cardData[currentNumber].correct = false
}

$("#start").on("click", initializeGame);
$("#next").on("click", nextButton);
$("#previous").on("click", previousButton);
$("#frontOfCard").on("click", flip);
$("#backOfCard").on("click", flip);
$("#frontOfCard").keydown(flip);
$("#backOfCard").on("keydown", flip);
$("#correctButton").on("click", markCorrect);
$("#incorrectButton").on("click", markWrong);

$("#reset").click(function() {
  document.location.reload(true);
});
