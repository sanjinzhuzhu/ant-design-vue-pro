<template>
  <!-- <div ref="chartDom" style="height: 400px"></div>高度也是从组件中传进来 -->
  <div ref="chartDom"></div>
</template>

<script>
import * as echarts from "echarts";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";
export default {
  props: {
    option: {
      type: Object,
      default: () => {},
    }
  },
  watch: {
    option(val) {
      this.chart.setOption(val);
    }
    // option: {
    //   handler(val){
    //     this.chart.setOption(val);
    //   },
    //   deep:true
    // }
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    // 基于准备好的dom，初始化echarts实例
    // var myChart = echarts.init(document.getElementById("main"));
  
    addListener(this.$refs.chartDom, this.resize);
  
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      console.log("resize");
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      // var myChart = echarts.init(document.getElementById("main"));
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
    },
  },
};
</script>
