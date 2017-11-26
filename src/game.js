function Hangman(){
  this.computerChosenWord;

  this.userGuessedLetters = [];
  this.currentGuess;
  this.currentEvent;

  this.errorMovesLeft = 10;
  this.blankLetterSpaces;

  this.selectGameWord();
  this.createBlankGuessSpaces();
  this.attachInputListener();
};

Hangman.prototype.selectGameWord = function(){
  this.computerChosenWord = getWordFromAPI();
  return this.computerChosenWord;
};

Hangman.prototype.createBlankGuessSpaces = function(){
  for(var i=0; i < this.computerChosenWord.length; i++){
    var newDiv = htmlToElement("<div class='blank-guess'></div>"),
        parentElement = document.getElementsByClassName("show-guess-result-section")[0];

    parentElement.appendChild(newDiv);
  }
};

Hangman.prototype.getUserGuess = function(){
  this.currentGuess = this.currentEvent.key;
  return this.currentGuess;
};

Hangman.prototype.guessPresentInChosenWord = function() {
  return this.computerChosenWord.indexOf(this.currentGuess) > -1;
};

Hangman.prototype.userHasGuessedThisLetter = function(){
  var hasGuessed = this.userGuessedLetters.indexOf(this.currentGuess) > -1;
  if (!hasGuessed) { return false; }
  bounceLetter(this.currentGuess);
  return true;
};

Hangman.prototype.appendToListOfGuesses = function(){
  if (this.userHasGuessedThisLetter()) { return; }
  this.userGuessedLetters.push(this.currentGuess);

  var guessedLettersArrayElement = document.getElementById("guessed-letters-array"),
      newLetterString = "<div class='guessed-letter'>" + this.currentGuess + "</div>",
      newLetter = htmlToElement(newLetterString);

  guessedLettersArrayElement.appendChild(newLetter);
};

Hangman.prototype.populateCorrectGuessSpaces = function (){
  var guessElements = document.getElementsByClassName("show-guess-result-section")[0].children;

  for(var i=0; i<this.computerChosenWord.length; i++){
    var currentLetter = this.computerChosenWord[i];
    if (this.currentGuess == currentLetter) {
      var showElement = guessElements[i];
      showElement.textContent = currentLetter;
    }
  }
};

Hangman.prototype.manageSuccessfulGuess = function() {
  this.appendToListOfGuesses();
  this.populateCorrectGuessSpaces();
  return this.checkEndGameConditions();
};

Hangman.prototype.manageUnsuccessfulGuess = function() {
  if (this.userHasGuessedThisLetter()) { return; }

  this.errorMovesLeft -= 1;
  document.getElementById("guesses-left").innerText = this.errorMovesLeft;
  growCircle(this.errorMovesLeft);
  this.appendToListOfGuesses();

  return this.checkEndGameConditions();
};

Hangman.prototype.allLettersPresentInGuessList = function(){
  var word = this.computerChosenWord,
      originalUniqueLetters = word.split("").filter(function(l, i){ return word.indexOf(l) == i; });

  var allLetters = this.userGuessedLetters,
      correctGuesses = allLetters.filter(function(l){ return word.indexOf(l) > -1; });

  return correctGuesses.length == originalUniqueLetters.length;
};

Hangman.prototype.checkEndGameConditions = function(){
  var userHasWon = this.allLettersPresentInGuessList();
  if (userHasWon) { return this.showWinMessage(); }

  var userHasLost = this.errorMovesLeft <= 0;
  if (userHasLost) { return this.showLossMessage(); }
};

Hangman.prototype.showWinMessage = function(e){
  document.getElementById("you-win-message").style.display = "block";
  return true;
};

Hangman.prototype.showLossMessage = function(e){
  document.getElementById("you-lose-message").style.display = "block";
  return true;
}

Hangman.prototype.manageUserGuess = function(){
  if (this.checkEndGameConditions()) { return; }
  this.getUserGuess();

  if (this.guessPresentInChosenWord()) { return this.manageSuccessfulGuess(); }
  this.manageUnsuccessfulGuess();
}

Hangman.prototype.attachInputListener = function(){
  var input = document.body,
      $scope = this;

  input.addEventListener("keypress", function(e){
    $scope.currentEvent = e;
    $scope.manageUserGuess();
  });
};

new Hangman();
