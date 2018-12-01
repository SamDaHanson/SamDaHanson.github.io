$(document).ready(function(){
  var wins = 0;
  var losses = 0;

  function startGame() {
    var score = 0;
    $("#score").text(score);
    var randNum = Math.floor(Math.random() * 99)+1;
    $("#rand").text(randNum);

    var crystal1 = 0;
    var crystal2 = 0;
    var crystal3 = 0;
    var crystal4 = 0;

    var possibleValues = [1,2,3,4,5,6,7,8,9];
    var gemValues = [];
    for (var i = 0; i < 4; i++) {
      var redo = true;
      while (redo) {
        redo = false;
        var chosen = possibleValues[Math.floor(Math.random() * possibleValues.length)];
        for (var j = 0; j < i; j++) {
          if (chosen == gemValues[j]) {
            redo = true;
          }
        }
      }
      gemValues.push(chosen);
    }
    console.log(gemValues);

    var gem1 = $("#gem1");
    gem1.val(gemValues[0]);
    var gem2 = $("#gem2");
    gem2.val(gemValues[1]);
    var gem3 = $("#gem3");
    gem3.val(gemValues[2]);
    var gem4 = $("#gem4");
    gem4.val(gemValues[3]);

    var gems = [gem1,gem2,gem3,gem4];
    for (var i = 0; i < gems.length; i++) {
      gems[i].unbind("click");
      gems[i].click(function() {
        score += parseInt($(this).val());
        $("#score").html(score);
        checkWinLoss();
      });
    }
  }

  function checkWinLoss() {
    var goal = parseInt($("#rand").text());
    var score = parseInt($("#score").text());
    if (score == goal) {
      alert("You Win!");
      console.log("Goal: "+goal+" == Score: "+score);
      wins++;
      $("#wins").text(wins);
      startGame();
    } else if (score > goal) {
      alert("You lose!");
      console.log("Goal: "+goal+" < Score: "+score);
      losses++;
      $("#losses").text(losses);
      startGame();
    }
  }

  startGame();
});
