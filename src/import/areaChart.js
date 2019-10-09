/**
 *  @fileOverview Area chart component definition
 *
 *  @author       Brian Greig
 *
 *  @requires     NPM:d3:Vue
 *  @requires     src/v-chart-plugin.js
 */

/* eslint-env browser */
const d3 = Object.assign({},
  require('d3-selection'),
  require('d3-scale'),
  require('d3-axis'),
  require('d3-shape'));
/**
 * Builds an Area Chart.
 * @module areaChart
 */
const areaChart = function chart() {
  /**
   * The SVG that stores the chart
   * @member svgContainer
   */
  const svgContainer = d3.select(`#${this.chartData.selector}`);
  /**
   * The configuration of the coordinate system
   * @member cs
   */
  let cs = {
    palette: {
      stroke: '#d1f4fa',
      fill: '#005792',
    },
    x: {
      domain: [],
      range: [],
      axisHeight: 45,
      axisWidth: 45,
    },
    y: {
      axisWidth: 45,
      ticks: 10,
    },
  };
  /**
   * Returns plot points
   * @member getPoints
   * @function
   * @param {Object} p
   */
  const getPoints = (p) => {
    let poly = (` ${this.width}, ${cs.x.yOffset} `);
    poly += (` ${cs.x.axisHeight}, ${cs.x.yOffset} `);
    poly += p.map(d => [cs.x.scale(d.dim) + cs.y.axisWidth + 5, cs.y.scale(d.metric)].join(',')).join(' ');
    return poly;
  };

  const poly = svgContainer.selectAll('polygon').data([this.ds]);

  /**
   * Runs when a new element is added to the dataset
   * @member enter
   * @function
   * @param {Object} s (svg element)
   */
  const enter = (s) => {
    s.enter()
      .append('polygon')
      .attr('stroke', cs.palette.stroke)
      .attr('fill', cs.palette.fill)
      .attr('points', getPoints);
  };
  /**
   * Runs when a value of an element in dataset is changed
   * @member transition
   * @function
   * @param {Object} s (svg element)
   */
  const transition = (s) => {
    s.transition()
      .attr('points', getPoints);
  };
  /**
   * Runs when an element is removed from the dataset
   * @member exit
   * @function
   * @param {Object} s (svg element)
   */
  const exit = (s) => {
    s.exit().remove();
    return s;
  };
  /**
   * Builds the scales for the x and y axes
   * @member buildScales
   * @function
   */
  const buildScales = () => {
    cs.y.scale = d3.scaleLinear()
      .domain([0, this.max])
      .range([this.displayHeight - cs.x.axisHeight, this.titleHeight]);
    cs.y.axis = d3.axisLeft().ticks(cs.y.ticks, 's').scale(cs.y.scale);
    this.ds.forEach(t => cs.x.domain.push(t.dim));
    this.ds.forEach((t, i) => cs.x.range.push((((
      this.width - cs.x.axisWidth) * i)) / this.ds.length));
    cs.x.scale = d3.scaleOrdinal().domain(cs.x.domain).range(cs.x.range);
    cs.x.axis = d3.axisBottom().scale(cs.x.scale);
  };
  /**
   * Draws the x and y axes on the svg
   * @member drawAxis
   * @function
   */
  const drawAxis = () => {
    this.drawGrid(cs);
    cs.polyFunction = d3.line()
      .x(d => cs.x.scale(d.dim) + cs.y.axisWidth + 5)
      .y(d => cs.y.scale(d.metric));
    cs.x.xOffset = cs.y.axisWidth + 5;
    cs.x.yOffset = this.displayHeight - cs.x.axisHeight;
    cs.y.xOffset = cs.y.axisWidth;
    cs.y.yOffset = 0;
    svgContainer.append('g').append('g')
      .attr('class', 'axis').attr('transform', `translate(${cs.x.xOffset}, ${cs.x.yOffset})`)
      .call(cs.x.axis);
    if (this.ds[0].dim) {
      svgContainer.append('g').append('g').attr('class', 'axis')
        .attr('transform', `translate(${cs.y.xOffset},${cs.y.yOffset})`)
        .call(cs.y.axis);
    }
  };

  cs = this.setOverrides(cs, this.chartData.overrides);
  buildScales(cs);
  drawAxis(cs);
  enter(poly);
  transition(poly);
  exit(poly);

  return cs;
};

export default areaChart;
