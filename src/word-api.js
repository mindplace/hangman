var fallbackWords = ["reject", "lacking", "level", "consider", "adjustment", "bead", "lock", "spill", "impress", "square", "impartial", "question", "reply","effect", "walk", "devilish", "ahead", "loud", "concern", "penitent", "uninterested", "load", "guide", "bikes", "subtract", "addition","wiggly", "foamy", "own", "numberless", "fluttering", "debonair", "throat", "flowery", "flap", "memorise", "compete", "form", "jelly", "branch", "petite", "sordid", "anger", "natural", "price", "ambiguous", "swing", "spiffy", "ready", "frantic", "limping", "vagabond", "abashed", "historical", "fear", "seal", "giraffe", "greasy", "scarf", "sudden", "silent", "mountainous", "oafish", "pollution", "possessive", "exultant", "squealing", "war", "hands", "note", "maid", "rare", "slap", "touch", "scribble", "chicken", "immense", "kick", "reflective", "mate", "laughable", "beef", "judge", "morning", "minor", "neck", "crowded", "texture", "gaudy", "escape", "wholesale", "creepy", "untidy", "flash", "modern", "form", "delightful"
];

function HttpClient() {
  this.get = function(url, callback) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        var returnedItems = eval(request.response);
        callback(returnedItems);
      }
    };

    try {
      request.open( "GET", url, false );
      request.send( null );
      
    } catch(error) {
      var randomIndex = Math.floor(Math.random() * 100),
          fallbackWord = fallbackWords[ randomIndex ];

      callback([{ word: fallbackWord }]);
    }
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
