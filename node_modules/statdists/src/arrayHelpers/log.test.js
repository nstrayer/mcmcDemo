import log from './log';

const arr1 = [1, 2, 3, 4, 5];
const arr1Logged = log(arr1);
test('properly logs a vector', () => {
  expect(arr1Logged[2]).toBeCloseTo(1.0986123);
  expect(arr1Logged[3]).toBeCloseTo(1.3862944);
});
test('properly logs a constant', () => {
  expect(log(4)).toBeCloseTo(1.386294);
});

