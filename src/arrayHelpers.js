// Sum of a vector
export const sum = (vec) => vec.reduce((s, d) => s + d, 0);
export const within = (val, a, b) => val > a && val < b;
export const emptyArr = (n, fill = 0) => Array.from(new Array(n), () => fill);
export const seq = (start, end, length) => {
  const stepSize = (end - start) / (length - 1);
  return Array.from(new Array(length), (d, i) => start + i * stepSize);
};
