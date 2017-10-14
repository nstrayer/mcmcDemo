const meanVarToAlphaBeta = (mu, sigma) => {
  const alpha = ((1 - mu) / sqr(sigma) - 1 / mu) * sqr(mu);
  const beta = alpha * (1 / mu - 1);
  return {alpha, beta};
};

const betaPdf = (x, alpha, beta) => {
  // PDF is zero outside the support
  if (x > 1 || x < 0) return 0;
  // PDF is one for the uniform case
  if (alpha == 1 && beta == 1) return 1;

  if (alpha < 512 && beta < 512) {
    return (
      Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1) / betaFunc(alpha, beta)
    );
  } else {
    return Math.exp(
      (alpha - 1) * Math.log(x) +
        (beta - 1) * Math.log(1 - x) -
        betaFunc(alpha, beta)
    );
  }
};
