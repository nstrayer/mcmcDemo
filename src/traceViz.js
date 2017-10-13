const d3 = Object.assign({}, require("d3"), require("d3-jetpack"));

const histColor = "#ff7f00";
const traceColor = "#4daf4a";
const margins = {
  top: 50,
  bottom: 50,
  left: 50,
  right: 50
};

const numBins = 25;

export default function(trace, divId, propHist = 0.3, paddingProp = 0.05) {
  const divWidth = document.getElementById(divId).offsetWidth;
  const divHeight = divWidth / 1.5;
  const width = divWidth - margins.left - margins.right;
  const height = divHeight - margins.top - margins.bottom;
  const paddingHeight = paddingProp * height;
  const traceHeight = height * (1 - propHist) - paddingHeight / 2;
  const histHeight = height - traceHeight - paddingHeight/2;
  
  // setup svg if it isn't already there
  const svg = d3.select(`#${divId}`)
    .selectAppend("svg")
    .at({ height:divHeight, width:divWidth })
    .selectAppend("g.viz_container")
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
    .domain(d3.extent(trace))
    .range([0, width]);

  // format data for a histogram
  const traceBins = d3.histogram()
    .domain(x.domain())
    .thresholds(x.ticks(numBins))
    (trace);

  const maxBin = d3.max(traceBins, (bin) => bin.length);

  // line generator for the trace plot
  const traceLine = d3
    .line()
    .x((d, i) => x(d))
    .y((d,i) => traceY(i));

  // draw the trace path.
  svg
    .selectAppend('path.traceHistory')
    .at({
      fill: 'none',
      stroke: traceColor,
      strokeWidth: '2px',
    })
    .datum(trace)
    .attr('d', traceLine);

  // draw margins histogram
  const barWidth = x(traceBins[0].x1) -  x(traceBins[0].x0);
  
  const histG = svg.selectAppend('g.histogram')
    .translate([0, histHeight]);

  const bar = histG.selectAll(".bar")
    .data(traceBins, (d, i) => i)
    
  bar.exit().remove();
  
  bar.enter().append("g")
      .attr("class", "bar")
      .merge(bar)
      .translate( (d) => [x(d.x0), 0])
        .selectAppend("rect")
          .at({
            x: -barWidth/2,
            y: d => - histY(d.length/maxBin),
            height:  d => histY(d.length/maxBin) - histY(0),
            width: barWidth,
            fill: histColor,
          }); 
  
  // draw y axis between plots
  svg.selectAppend("g.yaxis")
    .translate([0,histHeight])
    .call(d3.axisBottom(x));

}
