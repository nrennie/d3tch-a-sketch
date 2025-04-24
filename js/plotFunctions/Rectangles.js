function rectanglesPlot() {
  
  const width = globalConfig.settings.width;
  const height = globalConfig.settings.width;
  const padding = globalConfig.style.padding;

  const n = getRandomInt(config.data.nMin, config.data.nMax)

  // Generate data
  const data = d3.range(n).map(() => ({
    x: d3.randomUniform(padding, width - config.data.rWidthMax)(),
    y: d3.randomUniform(padding, width - config.data.rHeightMax)(),
    rHeight: d3.randomUniform(config.data.rHeightMin, config.data.rHeightMax)(),
    rWidth: d3.randomUniform(config.data.rWidthMin, config.data.rWidthMax)(),
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

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .attr('width', d => d.rWidth)
    .attr('height', d => d.rHeight)
    .style('fill', d => colour(d.fillCol))
    .style('fill-opacity', d => d.fillOpacity)
    .style('stroke', d => colour(d.fillCol))
    .style('stroke-width', config.style.strokeWidth);

};
