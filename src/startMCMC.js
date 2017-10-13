import {runif} from 'statdists';
import {debounce} from 'lodash';
import {emptyArr, seq} from './arrayHelpers';
import traceViz from './traceViz';
import mcmcStep from './mcmcStep';
import setupLogPosterior from './setupLogPosterior';
import {simSpeed, initialValue} from './plotDefaults';

const proposalLow = -1;
const proposalHigh = 1;

// generates a new proposed jump for exploring posterior.
const sampleProposal = () => runif(1, proposalLow, proposalHigh)[0];

export default ({
  data,
  mean1,
  mean2,
  maxSteps = 10000,
  prior,
  intervalRunner,
}) => {
  const logPosterior = setupLogPosterior({data, mean1, mean2, prior});
  // placeholder for updateviz function.
  let updateViz;

  // get data to draw prior curve with.
  const priorData = seq(0, 1, 150).map((x) => ({x, y: prior(x)}));

  // setup mcmc step function
  const takeMCMCStep = mcmcStep({
    logPosterior,
    proposalGenerator: sampleProposal,
    data: data,
  });

  // Initialize trace for parameters
  const trace = emptyArr(maxSteps);
  const logPosts = emptyArr(maxSteps);
  let stepNum = 0;
  trace[0] = initialValue;
  logPosts[0] = logPosterior(trace[0]);

  const takeStepAndPlot = (simSpeed) =>
    debounce(() => {
      const {newTheta: newDelta, newLogPost} = takeMCMCStep({
        theta: trace[stepNum],
        logPost: logPosts[stepNum],
      });

      // update step numbers and tracking arrays
      stepNum++;
      trace[stepNum] = newDelta;
      logPosts[stepNum] = newLogPost;
      traceViz({
        trace: trace.slice(0, stepNum),
        priorData,
        divId: 'trace_viz',
      });

      // request animation frame unless we've run through all the steps we desire.
      if (stepNum > maxSteps) {
        // window.requestAnimationFrame(updateViz);
        clearInterval(intervalRunner);
      }
    }, simSpeed);

  updateViz = takeStepAndPlot(simSpeed);
  intervalRunner = setInterval(updateViz, 0);
  return intervalRunner;
  // window.requestAnimationFrame(updateViz);
};
