btnColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var userChosen,
  level = 0;
var gameState = false;

$(document).on("keypress", function () {
  if (!gameState) {
    $("#level-title").text("Level " + level);
    newSeq();
    gameState = true;
    //console.log(gamePattern);
  }
});

$(".btn").on("click", function () {
  userChosen = $(this).attr("id");
  userClickedPattern.push(userChosen);
  animatePress(userChosen);
  playSound(userChosen);

  checkAnswer(userClickedPattern.length - 1);

  console.log(userClickedPattern);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //console.log("Success");
    console.log(currentLevel);
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        newSeq();
      }, 1000);
    }
  } else {
    //console.log("Wrong");

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key To Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gameState = false;
  gamePattern = [];
}

function newSeq() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  randomNo = Math.floor(Math.random() * 4);
  randoColourChosen = btnColours[randomNo];
  gamePattern.push(randoColourChosen);
  playSound(randoColourChosen);
  animatePress(randoColourChosen);

  //   $("<audio></audio>").attr({
  //     src: "sounds/" + randoColourChosen + ".mp3",
  //     autoplay: "autoplay",
  //   });
}

function animatePress(currentColour) {
  $("#" + currentColour)
    .fadeOut(100)
    .fadeIn(100);
}

function playSound(choice) {
  var audio = new Audio("sounds/" + choice + ".mp3");
  audio.play();
}
