export const seq = (start, end, length) => {
  const stepSize = (end - start) / (length - 1);
  return Array.from(new Array(length), (d, i) => start + i * stepSize);
};
