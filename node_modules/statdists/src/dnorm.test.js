import dnorm from './dnorm';

test('properly evaluates on a scaler', () => {
  expect(dnorm(-2, 0, 1)).toBeCloseTo(0.05399097);
});
test('properly evaluates on a vector', () => {
  expect(dnorm([0, 1, 2, 3, 4])[3]).toBeCloseTo(0.0044318484);
});
