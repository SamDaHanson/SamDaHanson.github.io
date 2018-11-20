function startGame() {
  var numGuesses = 5;
  var wordsToGuess = ["Winston","Mercy","Zen","Pharah","Roadhog","Reinhardt","Lucio","DVA"];

  for (var i = 0; i < wordsToGuess.length; i++) {
    wordsToGuess[i] = wordsToGuess[i].toLowerCase();
  }
  var randNum = Math.floor(Math.random()*wordsToGuess.length);
  var guessWord = wordsToGuess[randNum];

  var guessThis = document.getElementById("guessDiv");
  var hiddenWord = "";
  for (var i = 0; i < guessWord.length; i++) {
    hiddenWord = hiddenWord + "_ ";
  }
  guessThis.innerHTML = hiddenWord;

  var guessLeft = document.getElementById("guessRemain");
  guessLeft.innerHTML = numGuesses;

  console.log(guessWord);
  var lettersGuessed = [];

  document.onkeyup = function (event) {
    var letter = event.key.toLowerCase();
    var alreadyGuessed = false;
    for (var i = 0; i < lettersGuessed.length; i++) {
      if (lettersGuessed[i] === letter)
        alreadyGuessed = true;
    }

    if (!alreadyGuessed && letter.length == 1 && letter.charCodeAt(0) >= 97 && letter.charCodeAt(0) <= 122) {
      lettersGuessed.push(letter);
      document.getElementById("lettersUsed").innerHTML = lettersGuessed.toString();

      var letterHitDiv = document.getElementById("keyHit");
      letterHitDiv.innerHTML = letter;

      var notFound = true;
      var guessWord = wordsToGuess[randNum];

      for (var i = 0; i < guessWord.length; i++) {
        if (letter === guessWord[i]) {
          hiddenWord = hiddenWord.substr(0,i*2) + letter + hiddenWord.substr(1+i*2);
          notFound = false;
        }
      }

      if (notFound)
        numGuesses--;
      document.getElementById("guessDiv").innerHTML = hiddenWord;

      if (!hiddenWord.includes('_')) {
        document.getElementById("game").style.display = "none";
        document.getElementById("winScreen").style.display = "block";

        var audioElement = document.createElement("audio");
        audioElement.setAttribute("src", "assets/winner.mp3");
        audioElement.play();
      } else {
        document.getElementById("guessRemain").innerHTML = numGuesses;
        if (numGuesses <= 0) {
          document.getElementById("game").style.display = "none";
          document.getElementById("loseScreen").style.display = "block";
        }
      }
    }
  }
}
