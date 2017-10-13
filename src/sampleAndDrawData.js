const d3 = Object.assign({}, require('d3'), require('d3-jetpack'));
import {curry} from 'lodash';
import {histColor, numBins} from './plotDefaults';
import {rnorm, runif} from 'statdists';
import {stdDev} from './plotDefaults';

const generateData = (b1Mean, b2Mean, delta, n) => {
  const membership = runif(n);
  const numGroup1 = membership.filter((d) => d < delta).length;
  const numGroup2 = n - numGroup1;
  const group1Vals = rnorm(numGroup1, b1Mean, stdDev);
  const group2Vals = rnorm(numGroup2, b2Mean, stdDev);
  return [...group1Vals, ...group2Vals];
};

// Sample data and draw histogram
export default curry(
  ({c, histHeight, onNewData}, birdOneMean, birdTwoMean, delta, n) => {
    const mixSim = generateData(birdOneMean, birdTwoMean, delta, n);

    // format data for a histogram
    const dataBins = d3
      .histogram()
      .domain(c.x.domain())
      .thresholds(c.x.ticks(numBins))(mixSim);

    const maxBin = d3.max(dataBins, (bin) => bin.length);

    // draw margins histogram
    const barWidth = c.x(dataBins[0].x1) - c.x(dataBins[0].x0);
    const histG = c.svg.selectAppend('g.histogram').translate([0, histHeight]);

    const bar = histG.selectAll('.bar').data(dataBins, (d, i) => i);

    bar.exit().remove();

    const enterUpdateBars = bar
      .enter()
      .append('g')
      .attr('class', 'bar')
      .merge(bar);

    enterUpdateBars
      .transition(d3.transition('moveBarsOver').duration(500))
      .translate((d) => [c.x(d.x0), 0]);

    enterUpdateBars
      .selectAppend('rect')
      .transition(d3.transition('moveBarsUp').duration(500))
      .at({
        x: -barWidth / 2,
        y: (d) => -c.y(d.length / maxBin),
        height: (d) => c.y(d.length / maxBin),
        width: barWidth,
        fill: histColor,
      });

    // send off new data to callback
    onNewData(mixSim, birdOneMean, birdTwoMean);
  }
);
