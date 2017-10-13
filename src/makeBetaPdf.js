const sqr = (x) => Math.pow(x, 2);

const factorial = (x) =>
  Array.from(new Array(x - 1), (d, i) => i + 1).reduce(
    (prod, j) => prod * (x - j),
    x
  );

// Uses a lanscoz approximation to the gamma. 
const gammaFunc = (x) => {
  const p = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];

  const g = 7;
  if (x < 0.5) {
    return Math.PI / (Math.sin(Math.PI * x) * gammaFunc(1 - x));
  }

  x -= 1;
  let a = p[0];
  const t = x + g + 0.5;
  for (let i = 1; i < p.length; i++) {
    a += p[i] / (x + i);
  }

  return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;
};


const betaFunc = (alpha, beta) =>
  gammaFunc(alpha) * gammaFunc(beta) / gammaFunc(alpha + beta);


const meanVarToAlphaBeta = (mu, sigma) => {
  const alpha = ((1 - mu) / sqr(sigma) - 1 / mu) * sqr(mu);
  const beta = alpha * (1 / mu - 1);
  console.log(`alpha: ${alpha} beta: ${beta}`);
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

export default (mu, sigma) => {
  const {alpha, beta} = meanVarToAlphaBeta(mu, sigma);
  return (x) => betaPdf(x, alpha, beta);
};
