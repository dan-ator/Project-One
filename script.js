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
    $("#instructions").css("display","none")
  }
}

function flip() {
  $("#frontOfCard").toggle();
  $("#backOfCard").toggle();
}

function removeCard () {
  cardData.splice(currentNumber, 1);
  drawCard();
}

function markCorrect() {
  if (currentNumber < (cardData.length - 1)) {
    removeCard();
  } else if ((currentNumber <= (cardData.length-1)) && (cardData.length > 1)){
    cardData.splice(currentNumber, 1);
     currentNumber = 0;
     drawCard();
  } else {
    $("#next").css("display", "none");
    $("#previous").css("display", "none");
    $("#scoreBoard").css("display", "none");
    $(".card").empty();
    $("#reset").css("display", "inline-block");
    alert("You're So Smart!")
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
$("#frontOfCard").on("keydown",function(){
  console.log("key is down")
});
$("#backOfCard").on("keydown", flip);
$("#correctButton").on("click", markCorrect);
$("#incorrectButton").on("click", markWrong);

$("#reset").click(function() {
  document.location.reload(true);
});

//Make your own cards area//
$( "#cardCreator" ).submit(function(event) {
  console.log( $( this ).serializeArray() );
  event.preventDefault();
});
