const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Listen for keypress to start game
$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// Select next button in sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  // Randomly pick a color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // Flash button & play sound
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

//* Register Player input
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  animatePress(userChosenColor);
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// Animate clicked button
function animatePress(currentColor) {
  var button = $("#" + currentColor);
  button.addClass("pressed");
  setTimeout(function () {
    button.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
    startOver();
  }
}

// Game over screen
function gameOver() {
  $("#level-title").text("Game Over! Press Any Key to Restart");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

// Play button's sound
function playSound(name) {
  var sound = new Audio("./sounds/" + name + ".mp3");
  sound.volume = 0.5;
  sound.play();
}

// Restart game
function startOver() {
  level = 0;
  gamePattern.length = 0;
  started = false;
}
