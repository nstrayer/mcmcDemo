// @ts-check
// import {randomNormal} from 'd3-random';

// Calculates the pdf of a uniform for either a vector or a scaler
/**
 * @param {number[] | number} vals - values desired for pdf calculation.
 * @param {number} [min = 0] - low end of range
 * @param {number} [max = 1] - high end of range
 * @return {number[] | number} - array or scaler of pdf values
 */
export default function(vals, min = 0, max = 1) {
  if (Array.isArray(vals)) {
    return vals.map((d) => (d < max && d > min ? 1 / (max - min) : 0));
  } else {
    return vals < max && vals > min ? 1 / (max - min) : 0;
  }
}
