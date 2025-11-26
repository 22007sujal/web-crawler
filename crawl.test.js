const { normalizeURL } = require("./shy");
const {test , expect} = require("@jest/globals");


test('normalizeURL', () => {
      const input = "https://sujal.com";
      const response = normalizeURL(input);
      const output = input;
      expect(response).toEqual("sujal.com");
});


test('normalizeURL with strip traling path', () => {
      const input = "https://sujal.com/path";
      const response = normalizeURL(input);
      const output = input;
      expect(response).toEqual("sujal.com/path");
});


test('normalizeURL with capital letters', () => {
      const input = "https://SUJAL.com/path";
      const response = normalizeURL(input);
      const output = input;
      expect(response).toEqual("sujal.com/path");
});


test('normalizeURL strips http', () => {
      const input = "https://sujal.com/path";
      const response = normalizeURL(input);
      const output = input;
      expect(response).toEqual("sujal.com/path");
});



