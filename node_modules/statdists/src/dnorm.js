import normPdf from './normPdf';

// computes pdf for a given x  given
// normal dist w/ given params
export default (x, mu = 0, sigma = 1) =>
  Array.isArray(x) ? x.map((d) => normPdf(d, mu, sigma)) : normPdf(x, mu, sigma);
