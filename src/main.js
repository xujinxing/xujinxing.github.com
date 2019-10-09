import Vue from 'vue';
import Home from './components/Home.vue';
import About from './components/About.vue';
import vChartPlugin from './v-chart-plugin';

Vue.config.productionTip = false;
Vue.use(vChartPlugin);

const routes = {
  '/': Home,
  '/about': About,
};

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname,
  },
  computed: {
    ViewComponent() {
      return routes[this.currentRoute];
    },
  },
  render(h) { return h(this.ViewComponent); },
});