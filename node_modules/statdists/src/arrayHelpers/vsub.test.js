import vsub from './vsub';

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [3, 3, 3, 3, 3];

test('properly subtracts two arrays', () => {
  expect(vsub(arr1, arr2)).toEqual([-2, -1, 0, 1, 2]);
});

test('order of opps matters subtracts two arrays', () => {
  expect(vsub(arr2, arr1)).toEqual([2, 1, 0, -1, -2]);
});
