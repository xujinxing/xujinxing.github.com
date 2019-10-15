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
  require('d3-format'),
  require('d3-shape'));

const dataset = [{
    country: 'china',
    gdp: [
        [2000, 11920], [2001, 13170], [2002, 14550],
        [2003, 16500], [2004, 19440], [2005, 22870],
        [2006, 27930], [2007, 35040], [2008, 45470],
        [2009, 51050], [2010, 59490], [2011, 73140],
        [2012, 83860], [2013, 103550],
    ],
}, {
    country: 'japan',
    gdp: [
        [2000, 47310], [2001, 41590], [2002, 39800],
        [2003, 43020], [2004, 46550], [2005, 45710],
        [2006, 43560], [2007, 43560], [2008, 48490],
        [2009, 50350], [2010, 54950], [2011, 59050],
        [2012, 59370], [2013, 48980],
    ],
}];
const padding = { top: 50, right: 50, bottom: 50, left: 50 };
let gdpmax = 0;
for(let i = 0; i < dataset.length; i++) {
    let currGdp = d3.max(dataset[i].gdp, function(d) {
        return d[1];
    });
    if (currGdp > gdpmax) {
        gdpmax = currGdp;
    }
}


const rectStep = 35;
const rectWidth = 30;
const height = 420;
const width = 860;

export default {
  name: 'line-demo',
  mounted() {
    const svg = d3.select(this.$el)
      .select('svg')
      .attr('width', width + padding.left + padding.right)
      .attr('height', height + padding.top + padding.bottom);

    let xScale = d3.scaleLinear()
        .domain([2000, 2013])
        .range([0, width - padding.left -padding.right]);
    let yScale = d3.scaleLinear()
        .domain([0, gdpmax * 1.1])
        .range([height - padding.top -padding.bottom, 0]);

    const linePath = d3.line()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]));

    const colors = ['blue', 'yellow'];

    const path = updateRect(svg.selectAll('path').data(dataset));
    updateRect(path.enter().append('path'));
    path.exit().remove();
    function updateRect(path) {
      return path.attr('fill', 'none')
        .attr('transform', 'translate(' + padding.left
            + ',' + padding.top + ')')
        .attr('d', function(d) {
          return linePath(d.gdp);
        })
        .attr('stroke-width', 3)
        .attr('stroke', function(d, i) {
          return colors[i];
        });
    }

    const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(5)
        .tickFormat(d3.format('d'));
        
    const yAxis = d3.axisLeft()
        .scale(yScale);

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding.left + ', ' + (height - padding.bottom) + ')')
        .call(xAxis);
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding.left + ', ' + padding.top + ')')
        .call(yAxis);
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
