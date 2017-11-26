function HttpClient() {
  this.get = function(url, callback) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        var returnedItems = eval(request.response);
        callback(returnedItems);
      }
    };

    request.open( "GET", url, false );
    request.send( null );
  };
};

function getWordFromAPI(){
  var foundWord;

  var letters = "abcdefghijklmnopqrstuvwxyz",
      randomIndex = Math.floor(Math.random() * 25),
      randomLetter = letters.substring(randomIndex, randomIndex + 1),
      client = new HttpClient(),
      url = "https://api.datamuse.com/words?sp=" + randomLetter + "*";

  client.get(url, function(response) {
    var index = Math.floor(Math.random() * response.length),
        returnedWord = response[index];

    foundWord = returnedWord.word;
  });

  return foundWord;
};
