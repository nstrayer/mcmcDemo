import sum from './sum';

test('properly gets result for plain vector', () => {
  expect(sum([0, 1, 2, 3, 4])).toEqual(10);
});

test('properly gets result for decimal vector', () => {
  expect(sum([0, 1.3, 2.6, 3.1, 4])).toEqual(11);
});
