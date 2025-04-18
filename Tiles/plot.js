function tilesPlot() {
  const width = globalConfig.settings.width;
  const height = globalConfig.settings.width;

  const labels = d3.range(config.data.n).map(i => String.fromCharCode(65 + i)); // Labels: A, B, C, ...

  // Generate the data array
  const data = d3.range(config.data.n ** 2).map(i => ({
    x: labels[i % config.data.n],
    y: labels[Math.floor(i / config.data.n)],
    z1: Math.random(),
    z2: Math.random(),
    z3: Math.random()
  }));

  const xGroups = labels;
  const yGroups = [...labels].reverse(); 

  let colour = d3.scaleSequential()
    .domain([0, 1])
    .interpolator(d3.interpolateRgbBasis(config.style.colPalette));

  const chartContainer = d3.select('#tiles')
    .style('background-color', config.style.bgCol)
    .style('padding', globalConfig.style.padding + 'px')
    .style('width', width + globalConfig.style.padding*2 + 'px');

  const svg = chartContainer
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%')
    .style('height', 'auto')
    .append('g'); 

  const x = d3.scaleBand()
    .range([0, width])
    .domain(labels)
    .padding(0.05);

  const y = d3.scaleBand()
    .range([height, 0])
    .domain(labels)
    .padding(0.05);

  svg.selectAll('rect-1')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => x(d.x))
    .attr('y', d => y(d.y))
    .attr('width', x.bandwidth())
    .attr('height', y.bandwidth())
    .style('fill', d => colour(d.z1))
    .style('stroke', 'none');

  svg.selectAll('rect-2')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => x(d.x) + x.bandwidth() / 6)
    .attr('y', d => y(d.y) + y.bandwidth() / 6) 
    .attr('width', x.bandwidth() * 2/3) 
    .attr('height', y.bandwidth() * 2/3)
    .style('fill', d => colour(d.z2))
    .style('stroke', 'none');

  svg.selectAll('rect-3')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => x(d.x) + x.bandwidth() / 3)
    .attr('y', d => y(d.y) + y.bandwidth() / 3) 
    .attr('width', x.bandwidth() * 1/3) 
    .attr('height', y.bandwidth() * 1/3)
    .style('fill', d => colour(d.z3))
    .style('stroke', 'none');
  
}

window.onload = function () {
  tilesPlot();
};
