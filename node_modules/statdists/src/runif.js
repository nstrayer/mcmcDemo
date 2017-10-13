// @ts-check
// import {randomNormal} from 'd3-random';

// Generates n random uniform values
/**
 * @param {number} n - number of samples you want.
 * @param {number} [start = 0] - low end of range
 * @param {number} [end = 1] - high end of range
 * @return {number[]} - array of random uniforms
 */
export default function(n = 1, start = 0, end = 1) {
  const range = end - start;
  const gen = () => (Math.random()*range) + start;
  return Array.from(new Array(n), () => gen());
};
