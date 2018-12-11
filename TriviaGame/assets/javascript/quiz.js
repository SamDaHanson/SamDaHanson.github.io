var qOne = {
  question:"How's it going?",
  option1:"ok",
  option2:"bad",
  option3:"good",
  option4:"great",
  answer: 2
}
var qTwo = {
  question:"What color is the sky?",
  option1:"red",
  option2:"blue",
  option3:"yellow",
  option4:"green",
  answer: 1
}
var qThree = {
  question:"What is this?",
  option1:"An idea",
  option2:"A place",
  option3:"A world",
  option4:"object[]",
  answer: 3
}
var qFour = {
  question:"What what?",
  option1:"what?",
  option2:"option2",
  option3:"option3",
  option4:"ok",
  answer: 0
}
var qFive = {
  question:"Blahabalaha4",
  option1:"option1",
  option2:"option2",
  option3:"optino3",
  option4:"option4",
  answer: 2
}

function loadQuestion(qObj) {
  $("#question").html("<h2>"+qObj.question+"</h2>");
  $("#o1").html("<h3>"+qObj.option1+"</h3>");
  $("#o2").html("<h3>"+qObj.option2+"</h3>");
  $("#o3").html("<h3>"+qObj.option3+"</h3>");
  $("#o4").html("<h3>"+qObj.option4+"</h3>");
}

var questions = [qOne,qTwo,qThree,qFour,qFive];
var curQ = 0;
var correct = 0;
var wrong = 0;
var qLeft = questions.length;
var startTimer;

$(document).ready(function() {

  var timeLeft = 30;
  console.log("test");
  function writeTime() {
    console.log("TL: "+timeLeft);
    if (timeLeft > 0) {
      console.log(timeLeft);
      $("#timer").text(timeLeft+" seconds left!");
      timeLeft--;
    } else {
      endGame();
    }
  }

  startTimer = setInterval(writeTime,1000);

  function startQ() {
    console.log("Starting Question "+curQ);
    loadQuestion(questions[curQ]);
    $("#qLeft").text(qLeft);
  }

  function checkAnswer() {
    var c1 = $("#c1").is(":checked");
    var c2 = $("#c2").is(":checked");
    var c3 = $("#c3").is(":checked");
    var c4 = $("#c4").is(":checked");

    var checks = [c1,c2,c3,c4];
    var numChecked = 0;
    for (var i = 0; i < 4; i++) {
      if (checks[i])
        numChecked++;
    }

    if (numChecked == 1) {

      clearInterval(startTimer);
      timeLeft = 30;
      startTimer = setInterval(writeTime,1000);

      var correctAns = false;
      for (var i = 0; i < 4; i++) {
        if (checks[i] && questions[curQ].answer == i) {
          correctAns = true;
          break;
        }
      }
      if (correctAns) {
        console.log("You won!");
        correct++;
        $("#corAns").html(correct);
      } else {
        console.log("You lost!");
        wrong++;
        $("#wrgAns").html(wrong);
      }
      return true;
    } else if (numChecked > 1) {
      alert("Please check only one option!");
    } else {
      alert("Please check an option!");
      return false;
    }
  }

  function endGame() {
    if (correct == 5) {
      $("#question").html("<h2>You Win!</h2>");
    } else {
      $("#question").html("<h2>You Lose!</h2>");
    }
    document.getElementById("inputs").style.display = "none";
    console.log("Done!");
  }

  $("#submit").on("click", function() {
    if(checkAnswer()) {
      curQ++;
      qLeft--;
      $("#qLeft").text(qLeft);
      if (curQ <= 4) {
        startQ();
      } else {
        endGame();
      }
    };
  });

  startQ();

});
