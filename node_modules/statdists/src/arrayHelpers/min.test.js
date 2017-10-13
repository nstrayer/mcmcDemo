import min from './min';

test('properly finds the min', () => {
  expect(min([0, 1, 2, 3, 4, 5])).toEqual(0);
});

test('can deal with multiple mins', () => {
  expect(min([-100, 2, -100, 4, 5])).toEqual(-100);
});
