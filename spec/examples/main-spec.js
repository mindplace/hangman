describe("Main", function(){

  describe("#htmlToElement", function(){
    html = "<span>Hello World</span>";
    builtElement = htmlToElement(html);

    it("returns an HTML element when given an HTML string", function(){
      expect(builtElement).toBeDefined();
      expect(builtElement.innerHTML).toBeDefined();
    });

    it("has the qualities passed in with the original string", function(){
      expect(builtElement.innerHTML).toEqual("Hello World");
    });
  });

});
