import rnorm from './rnorm';
import mean from './arrayHelpers/mean';

test('properly returns values of desired length', () => {
  expect(rnorm(10).length).toEqual(10);
});

test('gets in the right vicinity for different means', () => {
  const generated = rnorm(150, 12, 2);
  expect(mean(generated)).toBeCloseTo(12, 0);
});
