import mean from './mean';

test('properly calculates the meah', () => {
  expect(mean([0, 1, 2, 3, 4, 5])).toEqual(2.5);
});
