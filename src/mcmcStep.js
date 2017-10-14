// performs a single step of exploration.
import {runif, log, within} from 'statdists';
import {curry} from 'lodash';

// takes a setup object containing the unregularized posterior density and
// the propsal generator plus data that the function is getting evaluated on.
// Returns a function that takes the delta and previous log posterior to calculate a new step.
export default curry(function(setup, {theta, logPost}) {
  const {logPosterior, proposalGenerator, data} = setup;

  const proposedTheta = theta + proposalGenerator();

  // if your new delta is out of range give it a really bad score so we dont try and calculate logs etc.
  const proposedLogPost = within(proposedTheta, 0, 1)
    ? logPosterior(proposedTheta, data)
    : -1e20;

  // log acceptance rate
  const alpha = proposedLogPost - logPost;

  // random uniform draw to see if we accept new proposal
  const accept = log(runif()) < alpha;

  return {
    newTheta: accept ? proposedTheta : theta,
    newLogPost: accept ? proposedLogPost : logPost,
    accepted: accept,
    proposed: proposedTheta,
  };
});
