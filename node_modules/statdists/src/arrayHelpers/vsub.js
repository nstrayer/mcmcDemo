// @ts-check

// Takes two equal length vectors and subtracts them.
/**
 * @param {number[]} vec1 - vector of numbers
 * @param {number[]} vec2 - vector of numbers
 * @return {number[]} - Element wise subtracted vectors
 */
export default function(vec1, vec2) {
  return vec1.map((d, i) => d - vec2[i]);
}
