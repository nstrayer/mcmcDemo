import dataGenPlot from './dataGenPlot';
import priorChoose from './priorChoose';
import startMCMC from './startMCMC';
import {dunif} from 'statdists';
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

// initialize a holder for the interval that runs the simulation.

// let prior = makeBetaPdf(0.5, 0.25);
let prior = dunif;

let intervalRunner;
let proposalWidth = 2;
let curData;
let curMean1;
let curMean2;

dataGenPlot({
  divId: 'data_plot',
  onNewData: (data, mean1, mean2) => {
    curData = data;
    curMean1 = mean1;
    curMean2 = mean2;
    clearInterval(intervalRunner);
    intervalRunner = startMCMC({
      data: curData,
      mean1: curMean1,
      mean2: curMean2,
      prior,
      intervalRunner,
      proposalWidth,
    });
  },
  onNewPropWidth: (newWidth) => {
    clearInterval(intervalRunner);
    proposalWidth = newWidth;
    intervalRunner = startMCMC({
      data: curData,
      mean1: curMean1,
      mean2: curMean2,
      prior,
      intervalRunner,
      proposalWidth,
    });
  },
});
priorChoose();
