import factorial from './factorial';

test('properly gets result for 0', () => {
  expect(factorial(0)).toEqual(1);
});

test('properly gets result for normal integer', () => {
  expect(factorial(3)).toEqual(3*2*1);
});
