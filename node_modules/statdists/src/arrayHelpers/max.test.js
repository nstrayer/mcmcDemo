import max from './max';

test('properly finds the max', () => {
  expect(max([0, 1, 2, 3, 4, 5])).toEqual(5);
});

test('can deal with multiple maxes', () => {
  expect(max([100, 2, 100, 4, 5])).toEqual(100);
});
