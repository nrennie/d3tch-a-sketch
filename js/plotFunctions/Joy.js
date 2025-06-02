function joyPlot() {
  const width = globalConfig.settings.width;
  const height = globalConfig.settings.width;
  const padding = 10;

  const rand = d3.randomNormal(0, 1);
  const data = d3.range(config.data.nGroups).map((groupId) => ({
    group: `Group ${groupId + 1}`,
    values: d3.range(config.data.n).map(() => rand()),
  }));
  const allValues = data.flatMap((d) => d.values);

  const chartContainer = d3
    .select("#plot")
    .style("background-color", config.style.bgCol)
    .style("padding", padding + "px")
    .style("width", width + padding * 2 + "px");

  const svg = chartContainer
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("width", "100%")
    .style("height", "auto")
    .append("g");

  const x = d3
    .scaleLinear()
    .domain(d3.extent(allValues))
    .range([0 - config.data.cutOff, width + config.data.cutOff]);
  const ridgeHeight = config.data.ridgeHeight;
  const y = d3
    .scalePoint()
    .domain(data.map((d) => d.group))
    .range([height, ridgeHeight])
    .padding(0);

  function kernelDensityEstimator(kernel, X) {
    return function (V) {
      return X.map((x) => [x, d3.mean(V, (v) => kernel(x - v))]);
    };
  }

  function kernelEpanechnikov(k) {
    return (v) => (Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0);
  }

  const kde = kernelDensityEstimator(kernelEpanechnikov(0.4), x.ticks(100));
  const maxDensity = d3.max(data, (d) => d3.max(kde(d.values), (d) => d[1]));
  const yScaleDensity = d3
    .scaleLinear()
    .domain([0, maxDensity])
    .range([0, 100]);

  const area = d3
    .area()
    .curve(d3.curveCardinal.tension(0.1))
    .x((d) => x(d[0]))
    .y0(0)
    .y1((d) => -yScaleDensity(d[1]));

  const defs = svg.append("defs");

  data.forEach((d, i) => {
    const grad = defs
      .append("linearGradient")
      .attr("id", `grad-${i}`)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    grad
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", config.style.mainCol)
      .attr("stop-opacity", 1);

    grad
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", config.style.mainCol)
      .attr("stop-opacity", 0);
  });

  svg
    .selectAll("path")
    .data(data)
    .join("path")
    .attr("fill", (d, i) => `url(#grad-${i})`)
    .attr("transform", (d) => `translate(0, ${y(d.group)})`)
    .attr("d", (d) => area(kde(d.values)));
}
