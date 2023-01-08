// var level = 0;
// var started = false;
// var buttonColors = ["red", "blue", "green", "yellow" ];
// var gamePattern = [] ;
// var userClickedPattern = [];
// $(document).keypress(function() {
//     if (!started) {
  
//       //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
//       $("#level-title").text("Level " + level);
//       nextSequence();
//       started = true;
//     }
//   });
 
//   //clicking the button through user

  
// const checkAnswer= (currentLevel) =>{
//     for(let i = 0 ; i < userClickedPattern.length ; i++){

//         if(userClickedPattern[i] === gamePattern[i]){
//             // alert("succers");
//         }else{
//             console.log("no");
//             break;
//         }
//         console.log("yes");
//     }
//     setTimeout(function(){
//         nextSequence();
//      },1000);


// }

// const nextSequence=()=>{
//     userClickedPattern = [];
//     var randomNumber = Math.floor(Math.random()*4);
//     var randomChosenColour = buttonColors[randomNumber];
//     // console.log(randomChosenColour);

//     gamePattern.push(randomChosenColour);
//     console.log(gamePattern);
//     playSound(randomChosenColour)
//         $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//         // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
//         // audio.play();
//         level++;
//         $("h1").text("level " + level);

   
// }
// // $(".btn").click(function(){alert("hello");});
// // nextSequence();

// // console.log(gamePattern);



// $(".btn").click(function(){
//     var userChosenColour = $(this).attr('id');
//     userClickedPattern.push(userChosenColour);
//     // console.log(userClickedPattern);
//     playSound(userChosenColour);
//     animatePress(userChosenColour);
//     setTimeout(function(){

//         checkAnswer(userClickedPattern.length - 1);
//     },110);
   
// });

// const animatePress=(currentColour)=>{
//     $("#"+currentColour).addClass("pressed");
    
//     //.delay(100).removeClass("pressed");
//     // $("."+currentColour).removeClass("pressed");
//     setTimeout(function(){
//         $("#"+currentColour).removeClass("pressed");
//     },100);
    
// } 
// // $(document).keypress(function(event){
// //     nextSequence();
// //     $("h1").text("level 0");
   
// // });

// const playSound=(name)=>
// {
//  var audio = new Audio("sounds/" + name + ".mp3");
//         audio.play();   
// }

 

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
const startOver=()=> {
    started = false ;
    gamePattern = [];
    level = 0 ;
}

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});


//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
            let audio = new Audio("sounds/wrong.mp3");
            audio.play();

            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();

    }

}

function nextSequence() {

  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

