import {dnorm, scale, vadd, log, sum} from 'statdists';
import {curry} from 'lodash';
import {stdDev} from './plotDefaults';


// Sets up a function to calculate the log posterior of normal mixture given data and two means
export default curry(({data, mean1, mean2, prior}, delta) => {
  const N = data.length;
  const norm1 = dnorm(data, mean1, stdDev);
  const norm2 = dnorm(data, mean2, stdDev);
  const inside = vadd(scale(norm1, delta), scale(norm2, 1 - delta));
  return sum(log(inside)) + N * log(prior(delta));
});
