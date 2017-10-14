export default (vec, percent = 95) => {
  const bounds = (100 - percent) / (2 * 100);
  const N = vec.length;
  if (N == 1) {
    return [vec[0], vec[0]];
  }
  const lowerIndex = Math.round(N * bounds);
  const upperIndex = Math.round(N * (1 - bounds));

  // sort vector and filter to the indexes of the bounds
  return vec.sort().filter((d, i) => i == lowerIndex || i == upperIndex);
};
