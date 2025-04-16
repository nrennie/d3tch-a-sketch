function bubblesPlot() {
  
  const width = globalConfig.settings.width;
  const height = globalConfig.settings.width;

  // Generate data
  const data = d3.range(bubblesConfig.data.n).map(() => ({
    x: d3.randomUniform(-globalConfig.settings.width/2, globalConfig.settings.width/2)(),
    y: d3.randomUniform(-globalConfig.settings.width/2, globalConfig.settings.width/2)(),
    size: d3.randomUniform(bubblesConfig.data.rMin, bubblesConfig.data.rMax)(),
    fillCol: d3.randomUniform(0, 1)(),
    fillOpacity: d3.randomUniform(bubblesConfig.data.fillOpacityMin, bubblesConfig.data.fillOpacityMax)()
  }));

  let bubblesColour = d3.scaleOrdinal(bubblesConfig.style.colPalette);

  // Plot
  const bubblesContainer = d3.select("#bubbles")
    .style('background-color', bubblesConfig.style.bgCol)
    .style('padding', 10 + 'px')
    .style('margin', 10 + 'px')
    .style('width', globalConfig.settings.width + 20 + 'px');

  const svg = bubblesContainer
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("width", "100%")
    .style("height", "auto")
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', d => d.size)
    .attr('fill', d => bubblesColour(d.fillCol))
    .attr('fill-opacity', d => d.fillOpacity);

};


