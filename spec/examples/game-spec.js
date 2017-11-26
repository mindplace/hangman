describe("Game", function(){
  var hangman,
      initialGamePageString = document.getElementById("hangman-game").outerHTML;

  function createKeypressEvent(letter){
    var e = new KeyboardEvent("keypress", { bubbles: true, cancelable: true, key: letter, char: letter, shiftKey: false });

    document.body.dispatchEvent(e);
    return e;
  };

  function rebuildGameBoard(){
    document.getElementById("hangman-game").remove();
    var newGamePage = htmlToElement(initialGamePageString);
    document.body.prepend(newGamePage);
  };

  describe("Game setup", function(){
    beforeEach(function(){
      rebuildGameBoard();
    });

    it("sets its own values", function(){
      hangman = new Hangman();

      [ hangman.userGuessedLetters,
        hangman.errorMovesLeft
      ].forEach(function(item){
        expect(item).toBeDefined();
      });
    });

    it("selects a game word", function(){
      hangman = new Hangman();

      expect(hangman.computerChosenWord).toBeDefined();
    });

    it("creates blank guess spaces", function(){
      var blankLettersArray = document.getElementsByClassName("show-guess-result-section")[0];

      expect(blankLettersArray.children.length).toEqual(0);

      hangman = new Hangman();

      var blankLettersArray = document.getElementsByClassName("show-guess-result-section")[0],
          blankLetters = blankLettersArray.children;

      expect(blankLetters.length).toEqual(hangman.computerChosenWord.length)
    });

    it("sets a listener to fire on keypress", function(){
      hangman = new Hangman();
      var keypress = createKeypressEvent("a");

      expect(hangman.currentEvent).toEqual(keypress);
      expect(hangman.currentGuess).toEqual("a");
    });
  });

  describe("gameplay", function(){
    beforeEach(function(){
      rebuildGameBoard();
      var keypress;
      hangman = new Hangman();
      hangman.computerChosenWord = "bunny";
    });

    describe("user guesses a correct letter", function(){
      beforeEach(function(){
        keypress = createKeypressEvent("b");
      });

      it("listens for user input and fires manageUserGuess function", function(){
        expect(hangman.getUserGuess()).toEqual("b");
      });

      it("appends a user's guess to the existing list of guesses", function(){
        expect(hangman.userGuessedLetters.indexOf("b")).not.toBeLessThan(0);
      });

      it("doesn't decrement errorMovesLeft when user guesses successfully", function(){
        expect(hangman.errorMovesLeft).toEqual(10);
      });
    });

    describe("user guesses incorrect letter", function(){
      beforeEach(function(){
        keypress = createKeypressEvent("a");
      });

      it("still appends a user's guess to the existing list of guesses", function(){
        expect(hangman.userGuessedLetters.indexOf("a")).not.toBeLessThan(0);
      });

      it("decrements errorMovesLeft", function(){
        expect(hangman.errorMovesLeft).not.toEqual(10);
      });
    });

    describe("end game conditions", function(){
      // specs here
    });
  });
});
