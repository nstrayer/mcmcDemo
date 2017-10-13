import vadd from './vadd';

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [3, 3, 3, 3, 3];

test('properly adds two arrays', () => {
  expect(vadd(arr1, arr2)).toEqual([4, 5, 6, 7, 8]);
});
