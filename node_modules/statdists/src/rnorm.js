import {randomNormal} from 'd3-random';

// Generates n normal values
export default (n = 1, mu = 0, sigma = 1) => {
  const gen = randomNormal(mu, sigma);
  return Array.from(new Array(n), () => gen());
};
