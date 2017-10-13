import dataGenPlot from './dataGenPlot';
import priorChoose from './priorChoose';
import startMCMC from './startMCMC';
import {dunif} from 'statdists';
import makeBetaPdf from './makeBetaPdf';

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

let prior = makeBetaPdf(0.5, 0.25);

let intervalRunner;
// let prior = dunif;
dataGenPlot({
  divId: 'data_plot',
  onNewData: (data, mean1, mean2) => {
    clearInterval(intervalRunner);
    intervalRunner = startMCMC({data, mean1, mean2, prior, intervalRunner});
  },
});
priorChoose();