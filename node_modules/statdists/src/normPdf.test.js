import normPdf from './normPdf';

test('properly evaluates on low end of curve', () => {
  expect(normPdf(-2, 0, 1)).toBeCloseTo(0.05399097);
});
test('properly evaluates on high end of curve', () => {
  expect(normPdf(3, 0, 1)).toBeCloseTo(0.004431848);
});
