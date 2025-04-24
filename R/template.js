function templatePlot() {
  const width = globalConfig.settings.width;
  const height = globalConfig.settings.width;
  const padding = globalConfig.style.padding;
  
  const chartContainer = d3.select("#plot")
    .style('background-color', config.style.bgCol)
    .style('padding', padding + 'px')
    .style('width', width + padding*2 + 'px');

  const svg = chartContainer
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%')
    .style('height', 'auto')
    .append('g'); 

}
