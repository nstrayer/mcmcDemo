export const plotHistogram = (data, div_id, title = "") => {
  const trace = {
    x: data,
    type: 'histogram',
  };

  const layout = {
    title
  }
  
  Plotly.newPlot(div_id, [trace], layout);
}

export const plotTrace = (trace, div_id, title = "") => {
  const plotInfo = {
    x: trace.map((d,i) => i),
    y: trace,
    type: 'scatter',
  };

  const layout = {
    title
  }
  
  Plotly.newPlot(div_id, [plotInfo], layout);
}