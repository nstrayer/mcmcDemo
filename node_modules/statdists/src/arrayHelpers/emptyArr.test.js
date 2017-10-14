import emptyArr from './emptyArr';

test('Three length empty', () => {
  expect(emptyArr(3)).toEqual([0, 0, 0]);
});

test('One length empty', () => {
  expect(emptyArr(1)).toEqual([0]);
});
