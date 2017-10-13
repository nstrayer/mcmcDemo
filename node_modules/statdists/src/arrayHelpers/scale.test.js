import scale from './scale';

test('properly doubles array', () => {
  expect(scale([0, 1, 2, 3, 4, 5], 2)).toEqual([0, 2, 4, 6, 8, 10]);
});

test('properly halves an array', () => {
  expect(scale([8, 6, 4, 2, 0], 0.5)).toEqual([4, 3, 2, 1, 0]);
});
