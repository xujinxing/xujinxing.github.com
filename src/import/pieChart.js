/**
 *  @fileOverview Pie Chart component definition
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
 * Builds an Pie Chart.
 * @module pieChart
 */

const pieChart = function chart() {
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
    radius: null,
    ordinalColors: ['#d1f4fa', '#005792', '#ffe6eb', '#ffcdcd'],
  };
  cs.radius = this.height > this.width ? (
    this.width - this.width * 0.1) / 2 : (this.height - this.height * 0.1) / 2;

  const color = d3.scaleOrdinal()
    .range(cs.ordinalColors);

  /**
   * Returns colors for pie chart
   * @member getColor
   * @function
   */
  const getColor = (d, i) => color(i);

  /**
   * Adds a tooltip on mouse over
   * @member mouseOver
   * @function
   * @param {Object} d (svg element)
   */
  const mouseOver = (d) => {
    this.addTooltip(d.data, window.event);
  };

  /**
   * Removes tooltip on mouse out
   * @member mouseOut
   * @function
   * @param {Object} d (svg element)
   */
  const mouseOut = (d) => {
    this.removeTooltip(d);
  };

  /**
   * emits "chart-click" vue event
   * @member mouseClick
   * @function
   * @param {Object} d (svg element)
   */
  const mouseClick = (d) => {
    this.$emit('chart-click', d);
  };

  const path = d3.arc()
    .outerRadius(cs.radius - 10)
    .innerRadius(25);

  /**
   * Runs when a new element is added to the dataset
   * @member enter
   * @function
   * @param {Object} arc (svg element)
   */
  const enter = (arc) => {
    arc.enter()
      .append('g')
      .attr('transform', `translate(${this.width / 2},${this.height / 2})`)
      .append('path')
      .merge(arc)
      .attr('class', 'arc')
      .attr('d', path)
      .attr('fill', getColor)
      .on('mouseover', mouseOver)
      .on('mouseout', mouseOut)
      .on('click', mouseClick)
      .attr('transform', `translate(0,${this.header})`);
    return arc;
  };
  /**
   * Runs when a value of an element in dataset is changed
   * @member transition
   * @function
   * @param {Object} arc (svg element)
   */
  const transition = (arc) => {
    arc.transition()
      .attr('d', path)
      .attr('fill', getColor);
    return arc;
  };
  /**
   * Runs when an element is removed from the dataset
   * @member exit
   * @function
   * @param {Object} arc (svg element)
   */
  const exit = (arc) => {
    arc.exit().remove();
    return arc;
  };

  const pie = d3.pie()
    .sort(null)
    .value(d => d.metric);

  const arc = svgContainer.selectAll('.arc')
    .data(pie(this.ds));

  cs = this.setOverrides(cs, this.chartData.overrides);
  enter(arc);
  transition(arc);
  exit(arc);

  return cs;
};

export default pieChart;
