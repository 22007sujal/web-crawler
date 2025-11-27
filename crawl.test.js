const { normalizeURL, getURLsfromHTML } = require("./shy");
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


test('getURLsfromHTML' , () => {
    const htmlbody = `
    <html>
    <body>
     <a href="https://sujal.com/"></a>
    </body>
    </html>`;
    const baseURL = "https://sujal.com";
    const response = getURLsfromHTML(htmlbody , baseURL);
    const expected = ["https://sujal.com/"];
    expect(response).toEqual(expected);
})

test('getURLsfromHTML with relative url' , () => {
    const htmlbody = `
    <html>
    <body>
     <a href = "https://sujal.com/path1"></a>
     <a href="/path2"></a>
    </body>
    </html>`;
    const baseURL = "https://sujal.com";
    const response = getURLsfromHTML(htmlbody , baseURL);
    console.log(response);
    const expected = ["https://sujal.com/path1" , "https://sujal.com/path2"];

    expect(response).toEqual(expected);
})



test('getURLsfromHTML with invalid url' , () => {
    const htmlbody = `
    <html>
    <body>
     <a href = "invalid"></a>
    </body>
    </html>`;
    const baseURL = "https://sujal.com";
    const response = getURLsfromHTML(htmlbody , baseURL);
    console.log(response);
    const expected = [];

    expect(response).toEqual(expected);
})

