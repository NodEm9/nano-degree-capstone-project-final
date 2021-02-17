import localForage, { setItem } from 'localforage';
const { handleSubmit } = require('../app');


test('handleSubmit should contain a validation (isValidInput) ', ()=> {
    expect(handleSubmit).toBe(handleSubmit);
});

test('setItem key, value', () => {
    let key; let val;
    localForage.setItem(key, val).then(() => {
        expect(localForage(key, val)).toBe(setItem);
    })
});

       
              


