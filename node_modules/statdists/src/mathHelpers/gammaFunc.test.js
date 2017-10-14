import gammaFunc from './gammaFunc';

test('properly gets result for integer', () => {
  expect(gammaFunc(3)).toBeCloseTo(2);
});

test('properly gets result for decimal', () => {
  expect(gammaFunc(3.2)).toBeCloseTo(2.423965);
});
