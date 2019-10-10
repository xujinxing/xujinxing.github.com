<template>
  <div>
    <svg>
      <rect fill="steelblue" x="20" y="281" width="30" height="99"></rect>
      <text fill="white" font-size="14px" text-anchor="middle" x="20" y="281" dx="15" dy="1em">99</text>
    </svg>
  </div>
</template>
<script>
const d3 = Object.assign({},
  require('d3-selection'),
  require('d3-scale'),
  require('d3-axis'),
  require('d3-array'),
  require('d3-shape'));

const data = [99, 71, 78, 25, 36, 92, 100];
const padding = { top: 20, right: 20, bottom: 20, left: 20 };
const rectStep = 35;
const rectWidth = 30;
const height = 210;
const width = 430;

export default {
  name: 'non-vue-line-chart',
  mounted() {
    const svg = d3.select(this.$el)
      .select('svg')
      .attr('width', width + padding.left + padding.right)
      .attr('height', height + padding.top + padding.bottom);

    const x = d3.scaleLinear().range([0, width], 0.2);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain(d3.extent(data, (d, i) => i));
    y.domain([0, d3.max(data, d => d)]);

    const createPath = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d));
    // svg.append('path').attr('d', createPath(data));
    const rect = updateRect(svg.selectAll('rect').data(data));
    updateRect(rect.enter().append('rect'));
    rect.exit().remove();
    function updateRect(rect) {
      return rect.attr('fill', 'steelblue')
        .attr('x', function(d, i) {
          return padding.left + i * rectStep + 5;
        })
        .attr('y', function(d) {
          return height + padding.top - d;
        })
        .attr('width', rectWidth)
        .attr('height', function(d) {
          return d;
        });
    }

    const text = svg.selectAll('text').data(data);
    console.log(text);
    text.enter().append('text');
    text.exit().remove();
    svg.selectAll('text')
      .attr('fill', 'white')
      .attr('font-size', '14px')
      .attr('text-anchor', 'middle')
      .attr('x', function(d, i) {
        return padding.left + i * rectStep + 5;
      })
      .attr('y', function(d) {
        return height + padding.top - d;
      })
      .attr('dx', rectWidth/2)
      .attr('dy', '1em')
      .text(function(d) {
        return d;
      });

    
    const scaleX = d3.axisBottom().scale(x);
    const scaleY = d3.axisLeft().scale(y);

    svg.append('g').attr('transform', 'translate(' + padding.left + ', ' + (height + padding.top) + ')').call(scaleX);
    svg.append('g').attr('transform', 'translate(' + padding.left + ', ' + padding.top + ')').call(scaleY);
  },
};
</script>

<style lang="sass">
svg
  margin: 25px;
  border: solid 1px black;
  path
    fill: none
    stroke: #76BF8A
    stroke-width: 3px
</style>
