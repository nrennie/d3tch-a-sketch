function windowsPlot(outputID) {
  const width = globalConfig.settings.width;
  const height = globalConfig.settings.width;

  const n = getRandomInt(config.data.nMin, config.data.nMax)

  const labels = d3.range(n).map(i => String.fromCharCode(65 + i)); // Labels: A, B, C, ...

  // Generate the data array
  const data = d3.range(n ** 2).map(i => ({
    x: labels[i % n],
    y: labels[Math.floor(i / n)],
    colX: i % n,
    colY: Math.floor(i / n)
  }));

  const xGroups = labels;
  const yGroups = [...labels].reverse(); 

  let colour = d3.scaleSequential()
    .domain([0, n])
    .interpolator(d3.interpolateRgbBasis(config.style.colPalette));

  let reversedPalette = config.style.colPalette.slice().reverse();

  let revColour = d3.scaleSequential()
    .domain([0, n])
    .interpolator(d3.interpolateRgbBasis(reversedPalette));

  const chartContainer = d3.select(outputID)
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

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => x(d.x))
    .attr('y', d => y(d.y))
    .attr('width', x.bandwidth())
    .attr('height', y.bandwidth())
    .style('fill', d => colour(d.colX))
    .style('stroke', d => revColour(d.colY))
    .style('stroke-width', config.style.strokeWidth);
  
}
