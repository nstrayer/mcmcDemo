// @ts-check

// takes a vector and a scaler and returns a scaled vector.
/**
 * @param {number[]} vec - vector of numbers
 * @param {number} scaler - single scaler
 * @return {number[]} - Scaled vector
 */
export default function(vec, scaler) {
  return vec.map((d) => d*scaler);
}
