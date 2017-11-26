document.body.addEventListener("keypress", function(e){
  e.target.removeEventListener(e.type, arguments.callee);
  document.getElementById("type-to-play-notice").remove();
});

function showWelcomeMessage(){
  var welcomeElement = document.getElementById("welcome-message");
  function showMessage(){ welcomeElement.style.opacity = "1"; }
  setTimeout(showMessage, 100);

  function removeMessage(){ welcomeElement.style.opacity = "0"; }
  setTimeout(removeMessage, 2000);
};

document.getElementById("restart-button").addEventListener("click", function(e){
  location.reload();
});

function htmlToElement(html) {
  var template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstChild;
};

function bounceLetter(letter){
  if (letter === undefined) { return; }

  var letterElem,
      lettersArray = document.getElementById("guessed-letters-array").children;

  for (var i=0; i<lettersArray.length; i++){
    var currentLetter = lettersArray[i];
    if (currentLetter.textContent == letter) {
      letterElem = currentLetter;
      break;
    }
  }

  letterElem.classList.add("bounce");
  function removeBold(){ letterElem.classList.remove("bounce"); }
  setTimeout(removeBold, 200);
};

function growCircle(errorsLeft){
  var newTransform = "rotate(" + (32 * errorsLeft) + "deg) skewX(10deg)",
      currentArc = document.getElementsByClassName("arc red-" + errorsLeft)[0];

  currentArc.style.transform = newTransform;
  currentArc.style.display = "block";
};
