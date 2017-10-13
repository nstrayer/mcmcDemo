const d3 = Object.assign({}, require('d3'), require('d3-jetpack'));
import slid3r from './slid3r/main';
import {margins} from './plotDefaults';
import sampleAndDrawData from './sampleAndDrawData';

const meanRange = [50, 100];
const rangePadding = (meanRange[1] - meanRange[0]) * 0.2;
const histRange = [meanRange[0] - rangePadding, meanRange[1] + rangePadding];
const sliderGap = 40;
const nRange = [50,500];

export default ({divId, onNewData}) => {
  // these are variables that our sliders will change.
  let birdOneMean = 65;
  let birdTwoMean = 85;
  let delta = 0.5; // proportion of samples from bird one
  let n = 250; // total sample size

  const divWidth = document.getElementById(divId).offsetWidth;
  const divHeight = divWidth / 1.5;
  // setup the viz
  const c = d3.conventions({
    parentSel: d3.select(`#${divId}`),
    totalWidth: divWidth,
    totalHeight: divHeight,
    margin: margins,
  });
  const histHeight = c.height - 4.5 * sliderGap;
  c.y.domain([0, 1]).range([0, histHeight]);
  c.x.domain(histRange);

  // draw x axis between plots
  c.svg
    .selectAppend('g.xaxis')
    .translate([0, histHeight])
    .call(d3.axisBottom(c.x));

  // setup rendering function with the setup object
  const sampleAndRender = sampleAndDrawData({c, histHeight, onNewData});

  const sliderStarts = c.x(meanRange[0]);
  const sliderWidth = c.x(meanRange[1]) - sliderStarts;
  const b1Slider = slid3r()
    .width(sliderWidth)
    .range(meanRange)
    .startPos(birdOneMean)
    .loc([sliderStarts, c.height - 3 * sliderGap])
    .numTicks(0)
    .label('Bird 1 mean seeds')
    .onDone((newMean) => {
      birdOneMean = newMean;
      sampleAndRender(birdOneMean, birdTwoMean, delta, n);
    });

  c.svg.selectAppend('g.birdOne').call(b1Slider);

  const b2Slider = slid3r()
    .width(sliderWidth)
    .range(meanRange)
    .startPos(birdTwoMean)
    .loc([sliderStarts, c.height - 2 * sliderGap])
    .numTicks(0)
    .label('Bird 2 mean seeds')
    .onDone((newMean) => {
      birdTwoMean = newMean;
      sampleAndRender(birdOneMean, birdTwoMean, delta, n);
    });
  c.svg.selectAppend('g.birdTwo').call(b2Slider);

  const deltaSlider = slid3r()
    .width(sliderWidth)
    .range([0, 100])
    .startPos(50)
    .loc([sliderStarts, c.height - sliderGap])
    .numTicks(10)
    .label('True percentage of time Bird 1 is at the feeder')
    .onDone((newPercent) => {
      delta = newPercent / 100;
      sampleAndRender(birdOneMean, birdTwoMean, delta, n);
    });
  c.svg.selectAppend('g.delta').call(deltaSlider);

  const nSlider = slid3r()
    .width(sliderWidth)
    .range(nRange)
    .startPos(200)
    .loc([sliderStarts, c.height + 0.25*sliderGap])
    // .numTicks(10)
    .clamp(true)
    .label('Number of observations')
    .onDone((newNumber) => {
      n = newNumber;
      sampleAndRender(birdOneMean, birdTwoMean, delta, n);
    });
  c.svg.selectAppend('g.numObs').call(nSlider);

  sampleAndRender(birdOneMean, birdTwoMean, delta, n);
};
