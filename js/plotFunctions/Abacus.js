function abacusPlot() {
  
  const width = globalConfig.settings.width;
  const height = globalConfig.settings.width;
  const padding = globalConfig.style.padding;
  
  const data = d3.range(config.data.n * config.data.nCol).map(i => ({
    x: (-width + 20) / 2 + ((width - 20) / (config.data.nCol - 1)) * (i % config.data.nCol),
    y: d3.randomUniform((-width + 20) / 2, (width - 20) / 2)(),
    size: d3.randomUniform(config.data.rMin, config.data.rMax)()
  }));

  const dataGrouped = d3.groups(data, d => d.x);

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

  svg.selectAll('line')
    .data(dataGrouped)
    .enter()
    .append('line')
    .attr('x1', d => d[0])
    .attr('x2', d => d[0])
    .attr('y1', d => d3.min(d[1], p => p.y))
    .attr('y2', d => d3.max(d[1], p => p.y))
    .attr('stroke', config.style.mainCol)
    .attr('stroke-width', config.style.strokeWidth);

  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', d => d.size)
    .attr('fill', config.style.mainCol)
    .attr('fill-opacity', config.style.fillOpacity);

};
