describe("Word API", function() {

  describe("#getWordFromAPI", function(){

    it("uses XMLHttpRequest to get the response", function(){
      // Test using JSONPlaceholder https://jsonplaceholder.typicode.com/
      var newClient = new HttpClient(),
          url = "https://jsonplaceholder.typicode.com/users";

      newClient.get(url, function(response){
        expect(response).toBeDefined();
        expect(typeof response).toEqual('object')
      });
    });

    it("returns a word from the Datamuse API", function(){
      var foundWord = getWordFromAPI();
      expect(foundWord).not.toBeUndefined();
    });

  });
  
});
