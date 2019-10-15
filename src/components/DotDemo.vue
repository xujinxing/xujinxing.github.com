<template>
  <div>
    <svg>
    </svg>
  </div>
</template>
<script>
const d3 = Object.assign({},
  require('d3-selection'),
  require('d3-scale'),
  require('d3-axis'),
  require('d3-array'),
  require('d3-brush'),
  require('d3-shape'));

// const data = [99, 71, 78, 25, 36, 92, 100];
// const padding = { top: 20, right: 20, bottom: 20, left: 20 };

const height = 500;
const width = 500;

export default {
  name: 'dot-demo',
  mounted() {
    const svg = d3.select(this.$el)
      .select('svg')
      .attr('width', width)
      .attr('height', height);

    // const xScale = d3.scaleLinear().range([0, width]);
    // const yScale = d3.scaleLinear().range([0, height]);

    // xScale.domain([0, width]);
    // yScale.domain([0, height]);

    // const createPath = d3.line()
    //   .x((d, i) => x(i))
    //   .y(d => y(d));

    svg.append('rect')
      .attr('fill', 'black')
      .attr('x', 150)
      .attr('y', 70)
      .attr('width', 70)
      .attr('height', 60);

    svg.append('circle')
      .attr('fill', 'black')
      .attr('cx', 100)
      .attr('cy', 300)
      .attr('r', 30);

    const brush = d3.brushX()
      // .brushX(xScale)
      // .brushY(yScale)
      // .extent([[0, 0], [100, 100]])
      .on('brush', brushed);
    
    function brushed() {
      const extent = brush.extent();
      console.log(extent);
    }

    svg.append('g')
      .call(brush)
      .selectAll('rect')
      .style('fill-opacity', 0.3);
    
    
    // const scaleX = d3.axisBottom().scale(xScale);
    // const scaleY = d3.axisLeft().scale(yScale);

    // svg.append('g').attr('transform', 'translate(' + padding.left + ', ' + (height + padding.top) + ')').call(scaleX);
    // svg.append('g').attr('transform', 'translate(' + padding.left + ', ' + padding.top + ')').call(scaleY);
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
