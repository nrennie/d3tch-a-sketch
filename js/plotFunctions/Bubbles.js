function bubblesPlot() {
  
  const width = globalConfig.settings.width;
  const height = globalConfig.settings.width;
  const padding = globalConfig.style.padding;

  // Generate data
  const data = d3.range(config.data.n).map(() => ({
    x: d3.randomUniform(-width/2, width/2)(),
    y: d3.randomUniform(-width/2, width/2)(),
    size: d3.randomUniform(config.data.rMin, config.data.rMax)(),
    fillCol: d3.randomUniform(0, 1)(),
    fillOpacity: d3.randomUniform(config.data.fillOpacityMin, config.data.fillOpacityMax)()
  }));

  let colour = d3.scaleOrdinal(config.style.colPalette);

  // Plot
  const chartContainer = d3.select("#plot")
    .style('background-color', config.style.bgCol)
    .style('padding', padding + 'px')
    .style('width', width + padding*2 + 'px');

  const svg = chartContainer
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
    .attr('fill', d => colour(d.fillCol))
    .attr('fill-opacity', d => d.fillOpacity);

};
