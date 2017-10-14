const d3 = Object.assign({}, require('d3'), require('d3-jetpack'));
import { margins, histColor, traceColor, numBins } from './plotDefaults';
import { sum, within } from 'statdists';
// import slid3r from './slid3r/main';
import credibleInterval from './credibleInterval';

export default ({
  trace,
  priorData,
  proposed,
  notAccepted,
  numRejected,
  divId,
  propHist = 0.3,
  paddingProp = 0.05
}) => {
  const divWidth = document.getElementById(divId).offsetWidth;
  const divHeight = divWidth / 1.5;
  const width = divWidth - margins.left - margins.right;
  const height = divHeight - margins.top - margins.bottom;
  const paddingHeight = paddingProp * height;
  const traceHeight = height * (1 - propHist) - paddingHeight / 2;
  const histHeight = height - traceHeight - paddingHeight / 2;

  // setup svg if it isn't already there
  const svg = d3
    .select(`#${divId}`)
    .selectAppend('svg')
    .at({ height: divHeight, width: divWidth })
    .selectAppend('g.viz_container')
    .translate([margins.left, margins.top]);

  // yscale for the trace line plot
  const traceY = d3
    .scaleLinear()
    .domain([0, trace.length])
    .range([height, histHeight + paddingHeight]);

  // yscale for the margins histogram
  const histY = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, histHeight]);

  // yscale for both plots
  const x = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, width]);

  // format data for a histogram
  const traceBins = d3
    .histogram()
    .domain(x.domain())
    .thresholds(x.ticks(100))(trace);

  // line generator for the trace plot
  const traceLine = d3
    .line()
    .x((d, i) => x(d))
    .y((d, i) => traceY(i));

  // generator for drawing the prior distribution.
  const priorLine = d3
    .line()
    .x(d => x(d.x))
    .y(d => -histY(d.y));

  // draw the trace path.
  svg
    .selectAppend('path.traceHistory')
    .at({
      fill: 'none',
      stroke: traceColor,
      strokeWidth: '2px'
    })
    .datum(trace)
    .attr('d', traceLine);

  // draw proposed value
  const failedProposals = svg
    .selectAll('circle.proposed')
    .data(notAccepted, d => d);

  failedProposals.exit().remove();

  failedProposals
    .enter()
    .append('circle.proposed')
    .merge(failedProposals)
    .at({
      cx: d => x(d.proposed),
      cy: d => traceY(d.i),
      r: 5,
      fill: 'orangered',
      fillOpacity: 0.5
    });

  // write current acceptance rate in top left corner
  svg
    .selectAppend('text.propRejected')
    .at({
      y: -25
    })
    .text(`Acceptance: ${Math.round(100 * (1 - numRejected / trace.length))}%`);

  // draw margins histogram
  const barWidth = x(traceBins[0].x1) - x(traceBins[0].x0);
  const binWidth = traceBins[0].x1 - traceBins[0].x0;
  const totalArea = trace.length * binWidth;
  const traceBinsNormed = traceBins.map(d => ({
    ...d,
    size: d.length / totalArea
  }));
  histY.domain([0, d3.max(traceBinsNormed, d => d.size)]);

  const [CiLowerBound, CiUpperBound] = credibleInterval(trace);

  const histG = svg.selectAppend('g.histogram').translate([0, histHeight]);

  const bar = histG.selectAll('.bar').data(traceBinsNormed, (d, i) => i);

  bar.exit().remove();

  bar
    .enter()
    .append('g')
    .attr('class', 'bar')
    .merge(bar)
    .translate(d => [x(d.x0), 0])
    .selectAppend('rect')
    .at({
      x: -barWidth / 2,
      y: d => -histY(d.size),
      height: d => histY(d.size) - histY(0),
      width: barWidth,
      fill: d =>
        d.x0 > CiLowerBound && d.x1 < CiUpperBound ? traceColor : histColor
    });

  // draw credible interval
  // console.log(CiLowerBound, CiUpperBound)
  const CiHeight = -histHeight * 1.02;
  histG.selectAppend('line.credibleInterval').at({
    x1: trace.length > 50 ? x(CiUpperBound) : 0,
    x2: trace.length > 50 ? x(CiLowerBound) : 0,
    y1: CiHeight,
    y2: CiHeight,
    stroke: histColor,
    strokeWidth: '2px'
  });

  // lower bound of Cred Int
  const intervalStyle = {
    alignmentBaseline: 'hanging',
    y: CiHeight
  };

  const showCI = trace.length > 50;
  histG
    .selectAppend('text.lowerBounds')
    .at({
      ...intervalStyle,
      x: showCI ? x(CiLowerBound) - 3 : 0,
      textAnchor: 'end'
    })
    .text(showCI ? CiLowerBound.toPrecision(2) : '');
  // upper bounds of cred int
  histG
    .selectAppend('text.upperBounds')
    .at({
      ...intervalStyle,
      x: showCI ? x(CiUpperBound) + 3 : 0,
      textAnchor: 'start'
    })
    .text(showCI ? CiUpperBound.toPrecision(2) : '');

  // label of cred int
  histG
    .selectAppend('text.CiLabel')
    .at({
      y: CiHeight - 3,
      x: showCI ? x(CiUpperBound) - x((CiUpperBound - CiLowerBound) / 2) : 0,
      textAnchor: 'middle'
    })
    .text(showCI ? '95% CI' : '');

  // draw y axis between plots
  svg
    .selectAppend('g.yaxis')
    .translate([0, histHeight])
    .call(d3.axisBottom(x));
};
