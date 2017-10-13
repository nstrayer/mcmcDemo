import dunif from './dunif';

test('properly returns values of desired length', () => {
  expect(dunif([0, 1, 3]).length).toEqual(3);
});

test('returns 0 if out of range', () => {
  expect(dunif(3, -1, 1)).toEqual(0);
});

test('returns 1/b -a if in range', () => {
  expect(dunif(-0.9, -1, 1)).toEqual(0.5);
  expect(dunif([-0.9, 0.3], -1, 1)[1]).toEqual(0.5);
});
