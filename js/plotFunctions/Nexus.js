function nexusPlot() {
  
  const width = globalConfig.settings.width;
  const height = globalConfig.settings.width;
  const padding = globalConfig.style.padding;

  // Generate start and end ranges
  const n_y_start = Array.from({length: width}, () => getRandomInt(-width/2 + padding*2, 0));
  const n_y_end = Array.from({length: width}, () => getRandomInt(0, width/2 - padding*2));
  
  // Create x and y lists
  const data = [];
  for (let i = padding; i < width - padding; i = i + config.data.xSpace) {
    for (let y = n_y_start[i]; y < n_y_end[i]; y = y + config.data.ySpace) {
      data.push({ x: i, y: y });
    }
  }

  const grouped = d3.groups(data, d => d.x);

  let colour = d3.scaleSequential()
    .domain(d3.extent(data, d => d.x))
    .interpolator(d3.interpolateRgbBasis(config.style.colPalette));

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
    .data(grouped)
    .enter()
    .append('line')
    .attr('x1', d => d[0] - width/2)
    .attr('x2', d => d[0] - width/2)
    .attr('y1', d => d3.min(d[1], p => p.y))
    .attr('y2', d => d3.max(d[1], p => p.y))
    .attr('stroke', d => colour(d[0]))
    .attr('stroke-width', config.style.strokeWidth);

  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => d.x - width/2)
    .attr('cy', d => d.y)
    .attr('r', config.style.r)
    .attr('fill', d => colour(d.x))

};
