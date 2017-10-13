import { rnorm, dnorm, dunif, runif, scale, vadd, log } from "statdists";
import slid3r from 'slid3r';
import { debounce } from "lodash";
import { sum, within, emptyArr } from "./arrayHelpers";
import { plotHistogram } from "./plotlyHelpers";
import traceViz from "./traceViz";
import mcmcStep from "./mcmcStep";

const { sqrt } = Math;

// Setup: 
// We generate some data following a binomial distribution with true prob of p_user
// The user then sets their prior for what the probability of a success is using a beta
// They also select how varying their algorithm is at any moment for jumping
// MCMC cranks away and delivers their posterior 

// We want to be able to define a few parameters
// 1. How many samples of data we have
// 2. Our prior location and variance (beta)
// 3. The variance of our proposal dist
// 4. speed of simulation

// Want to see...
// - Original data.
// - Trace plot.
// - Current posterior estimate histogram w...
//  - prior overlayed
// - 95% credible interval
// constants for script
const std_dev = sqrt(0.5);
const proposal_low = -1;
const proposal_high = 1;
const numIterations = 5000;
const simSpeed = 0;
const initialValue = 0.5;

// placeholder for updateviz function.
let updateViz;

const makeMixture = (delta, n) => {
  const membership = runif(n);
  const numGroup1 = membership.filter(d => d < delta).length;
  const numGroup2 = n - numGroup1;
  const group1Vals = rnorm(numGroup1, 7, std_dev);
  const group2Vals = rnorm(numGroup2, 10, std_dev);
  return [...group1Vals, ...group2Vals];
};

const log_posterior = (delta, data) => {
  const N = data.length;
  const norm1 = dnorm(data, 7, std_dev);
  const norm2 = dnorm(data, 10, std_dev);
  const inside = vadd(scale(norm1, delta), scale(norm2, 1 - delta));
  return sum(log(inside)) + N * log(dunif(delta));
};

// generates a new proposed jump for exploring posterior.
const sampleProposal = () => runif(1, proposal_low, proposal_high)[0];

// Begin actual coding stuff
const mixSim = makeMixture(0.7, 200);
plotHistogram(mixSim, "data_histogram", "Mixture Data Distribution");

// setup mcmc step function
const takeMCMCStep = mcmcStep({
  logPosterior: log_posterior,
  proposalGenerator: sampleProposal,
  data: mixSim
});

// Initialize trace for parameters
const trace = emptyArr(numIterations);
const logPosts = emptyArr(numIterations);
let stepNum = 0;
let acceptedCount = 0;
trace[0] = initialValue;
logPosts[0] = log_posterior(trace[0], mixSim);

const takeStepAndPlot = simSpeed =>
  debounce(() => {
    const { newTheta: newDelta, newLogPost, accepted } = takeMCMCStep({
      theta: trace[stepNum],
      logPost: logPosts[stepNum],
    });

    // update step numbers and tracking arrays
    stepNum++;
    trace[stepNum] = newDelta;
    logPosts[stepNum] = newLogPost;
    acceptedCount += accepted;
    traceViz(trace.slice(0, stepNum), "trace_viz");

    // request animation frame unless we've run through all the steps we desire.
    if (stepNum < numIterations) {
      // window.requestAnimationFrame(updateViz);
    }
  }, simSpeed);

updateViz = takeStepAndPlot(simSpeed);
setInterval(updateViz, 0);
// window.requestAnimationFrame(updateViz);
