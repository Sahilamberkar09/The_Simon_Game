let buttonColours = ["red", "blue", "green", "yellow"]; //Array to Store the Name

let gamePattern = []; //Array to store the Game Pattern
var userClickedPattern = []; //Array to store the Clicked Pattern

let started = false; //Boolean Flag To check game status
let level = 0; //Level Counter

// ==========================================================
$(document).keypress(function () {
  if (!started) {
    //Check The Boolean Flag is False or Not
    // IF False Carry the Tasks inside

    $("#level-title").text("Level " + level); //To update the Level Title

    nextSequence(); //Call the function nextSquence

    started = true; //Set The Boolean Flag to True as the Game is Started
  }
});

// ==========================================================
$(".btn").on("click", function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// ==========================================================

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
  }
}

// ==========================================================

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// ==========================================================

function nextSequence() {
  userClickedPattern = []; //To Store The Pattern
  level++;
  $("#level-title ").text("Level " + level);
  // Random Number Generator
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

// ==========================================================

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// ==========================================================
