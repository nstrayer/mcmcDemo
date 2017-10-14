// @ts-check

// Calculates the beta function between alpha and beta
/**
 * @param {number[]} vec - vector of numbers
 * @return {number} - sum of vector
 */
export default function(vec) {
  return vec.reduce((s, d) => s + d, 0);
}
