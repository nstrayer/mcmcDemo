export default (vals) => {
  const N = vals.length;
  return vals.reduce(
    (total, current) => total + current/N,
    0
  );
};
