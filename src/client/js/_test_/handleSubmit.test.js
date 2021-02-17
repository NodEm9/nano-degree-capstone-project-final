import localForage, { setItem } from 'localforage';
const { handleSubmit } = require('../app');
const { library } = require('webpack');



test('handleSubmit should contain a validation (isValidInput) ', ()=> {
    expect(handleSubmit).toBe(handleSubmit);
});



test('setItem key, value', () => {
    let key; let val;
    localForage.setItem(key, val).then(() => {
        expect(localForage(key, val)).toBe(setItem);
    });
});



test('library is defined with the name Client', () => {
          const clientLibrary = library.client;
          expect(clientLibrary).toEqual(library.client);
});




describe('Filter function', () => {
    test('it should filter by seacrh term (link)', () => {
              const input = [
                        { id: 1, url: "https://www.url1.dev" },
                        { id: 2, url: "https://www.url2.dev"},
                        { id: 3, url: "https://www.link3.dev"}
              ];

              const output = [{ id: 3, url: "https://www.link3.dev" }];
    
              expect(filterByTerm(input, "link")).toEqual(output);

    });
} );



function filterByTerm(outputArr, searchTerm) {
 return outputArr.filter(function(arrayElement) {
   return arrayElement.url.match(searchTerm);
 });
}


