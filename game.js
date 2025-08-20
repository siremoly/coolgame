var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "yellow", "green", "blue"];

var started = false;
var level = 0;

var currentLevel=0;

$(document).on("keypress", function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence () {

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * buttonColors.length);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

$(".btn").on("click", function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("correct");

    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        userClickedPattern = [];
        nextSequence();
      }, 1000);

    }
  } else {
    console.log("wrong");
    level = 0;
    $("body").addClass("game-over")
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    setTimeout(function(){
      userClickedPattern = [];
      gamePattern = [];
      nextSequence();
    },1000);
    $("h2").text("Nice try... You're back to Level 1.");
    setTimeout(function(){
      $("h2").text("");
    }, 1000)
}

}

$("button").click(function(){
    $("body").css("background-color", "#FFD4D1");
    $(".red").css("background-color", "#E37C78");
    $(".blue").css("background-color", "#82BAC4");
    $(".yellow").css("background-color", "#FAEFED");
    $(".green").css("background-color", "#C06078");
    $(".btn").css("border", "10px solid #5b3e31");
    $("h1").css("color", "#5b3e31")
    $("#wrong").css("color", "#642027")
});





//current level represents the index, which corresponds to the length of the array only when the position in array = position in player pattern

//if i click on a button, the color is logged into console   setTimeout(() => {
    //currentColor.removeClass(".pressed");
  //}, 100);
