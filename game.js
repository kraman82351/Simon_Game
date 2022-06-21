var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// random sequence
function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  sound(randomChosenColour);
}

// button clicks
$(".btn").click(handler);

function handler() {
  var userChosencolour = $(this).attr("id");
  userClickedPattern.push(userChosencolour);
  animatePress(userChosencolour);
  sound(userChosencolour);
  checkAnswer(userClickedPattern.length-1);
  userindex++;
};

function checkAnswer(i) {

  console.log(gamePattern);
  if (gamePattern[i] === userClickedPattern[i]) {
    console.log("sucess");

     if (gamePattern.length === userClickedPattern.length) {
        console.log(userClickedPattern);
      setTimeout(function(){
        nextSequence();
      }, 1000);
     }
  }
else {
  sound("wrong");
  $("#level-title").text("Game Over");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("Body").removeClass("game-over");
  }, 200);

  $("#level-title").text("press any key to Restart");
startOver();

}
};



// sound
function sound(colour) {

  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();

};

// animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

function startOver(){
  gamePattern = [];
  started = false;
  level = 0;
}
