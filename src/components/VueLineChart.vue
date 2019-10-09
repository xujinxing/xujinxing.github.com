<template>
  <svg width="500" height="270">
    <g style="transform: translate(10, 10px)">
      <path :d="line" />
    </g>
  </svg>
</template>

<script>
const d3 = Object.assign({},
  require('d3-selection'),
  require('d3-scale'),
  require('d3-axis'),
  require('d3-array'),
  require('d3-shape'));

export default {
  name: 'vue-line-chart',
  data() {
    return {
      data: [99, 71, 78, 25, 36, 92],
      line: '',
    };
  },
  mounted() {
    this.calculatePath();
  },
  methods: {
    getScales() {
      const x = d3.scaleTime().range([0, 430]);
      const y = d3.scaleLinear().range([210, 0]);
      x.domain(d3.extent(this.data, (d, i) => i));
      y.domain([0, d3.max(this.data, d => d)]);
      return { x, y };
    },
    calculatePath() {
      const scale = this.getScales();
      const path = d3.line()
        .x((d, i) => scale.x(i))
        .y(d => scale.y(d));

      this.line = path(this.data);
      const axisX = d3.axisLeft().scale(scale.x);
      const axisY = d3.axisBottom().scale(scale.y);
      const svg = d3.select(this.$el).select('svg');
      console.log(axisX, axisY);
      svg.append('g')
        .attr("transform", "translate(10,10)")
        .call(axisX);
      svg.append('g')
        .attr("transform", "translate(10,10)")
        .call(axisY);
    },
  },
};
</script>

<style lang="sass" scoped>
svg
  margin: 25px;
  border: solid 1px black;

path
  fill: none
  stroke: #76BF8A
  stroke-width: 3px
</style>
