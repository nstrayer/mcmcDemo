import runif from './runif';
import min from './arrayHelpers/min';
import max from './arrayHelpers/min';

test('properly returns values of desired length', () => {
  expect(runif(10).length).toEqual(10);
});

// generate a bunch of values from U(-10,10)
const generated = runif(500, -10, 22);

test('Doesnt give us values below of desired range', () => {
  expect(min(generated) > -10).toBeTruthy();
});
test('Doesnt give us values above of desired range', () => {
  expect(max(generated) < 22).toBeTruthy();
});
