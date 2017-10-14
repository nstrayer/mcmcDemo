import within from './within';

test('Says yes if true', () => {
  expect(within(3, 2, 4)).toBeTruthy();
});
test('Says no if false', () => {
  expect(within(1, 2, 4)).toBeFalsy();
});
