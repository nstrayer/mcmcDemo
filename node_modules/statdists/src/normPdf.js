const {sqrt, exp, pow, PI: pi} = Math;

export default (x, mu, sigma) => {
  const variance = pow(sigma, 2);
  return 1 / sqrt(2 * pi * variance) * exp(-pow(x - mu, 2) / (2 * variance));
};
