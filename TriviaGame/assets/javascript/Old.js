var qOne = {
  question:"Blahabalaha0",
  option1:"option1",
  option2:"option2",
  option3:"option3",
  option4:"option4",
  answer: 1
}
var qTwo = {
  question:"Blahabalaha1",
  option1:"option1",
  option2:"option2",
  option3:"option3",
  option4:"option4",
  answer: 2
}
var qThree = {
  question:"Blahabalaha2",
  option1:"option1",
  option2:"option2",
  option3:"option3",
  option4:"option4",
  answer: 0
}
var qFour = {
  question:"Blahabalaha3",
  option1:"option1",
  option2:"option2",
  option3:"option3",
  option4:"option4",
  answer: 3
}
var qFive = {
  question:"Blahabalaha4",
  option1:"option1",
  option2:"option2",
  option3:"option3",
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

$(document).ready(function() {

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
