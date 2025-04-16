function nexusPlot() {
  
  const width = globalConfig.settings.width;
  const height = globalConfig.settings.width;

  // Generate data
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  // Generate start and end ranges
  const n_y_start = Array.from({length: globalConfig.settings.width}, () => getRandomInt(-globalConfig.settings.width/2, 0));
  const n_y_end = Array.from({length: globalConfig.settings.width}, () => getRandomInt(0, 200));
  
  // Create x and y lists
  const data = [];
  for (let i = 0; i < globalConfig.settings.width; i = i + nexusConfig.data.xSpace) {
    for (let y = n_y_start[i]; y < n_y_end[i]; y = y + nexusConfig.data.ySpace) {
      data.push({ x: i, y: y });
    }
  }

  const grouped = d3.groups(data, d => d.x);

  let nexusColour = d3.scaleSequential()
    .domain(d3.extent(data, d => d.x))
    .interpolator(d3.interpolateRgbBasis(nexusConfig.style.colPalette));

  // Plot
  const chartContainer = d3.select("#nexus")
    .style('background-color', nexusConfig.style.bgCol)
    .style('padding', 10 + 'px')
    .style('margin', 10 + 'px')
    .style('width', globalConfig.settings.width + 20 + 'px');

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
    .attr('x1', d => d[0] - globalConfig.settings.width/2 + 10)
    .attr('x2', d => d[0] - globalConfig.settings.width/2 + 10)
    .attr('y1', d => d3.min(d[1], p => p.y) + 40)
    .attr('y2', d => d3.max(d[1], p => p.y) + 40)
    .attr('stroke', d => nexusColour(d[0]))
    .attr('stroke-width', 0.5);

  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => d.x - globalConfig.settings.width/2 + 10)
    .attr('cy', d => d.y + 40)
    .attr('r', nexusConfig.data.r)
    .attr('fill', d => nexusColour(d.x))

};


