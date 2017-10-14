import betaFunc from './betaFunc';

test('properly gets result for decimals', () => {
  expect(betaFunc(3, 2)).toBeCloseTo(0.08333333);
});

test('properly gets result for integers', () => {
  expect(betaFunc(10.5, 2.1)).toBeCloseTo(0.006756709);
});
