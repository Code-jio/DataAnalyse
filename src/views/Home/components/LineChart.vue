<!-- eslint-disable -->
<template>
  <div class="chart" ref="chart"></div>
</template>
<script setup>
import * as echarts from "echarts";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";

const chart = ref(null);
const store = useStore();
let option = {
  backgroundColor: "",
  title: {
    text: "震动信号",
    left: "center",
  },
  tooltip: {
    trigger: "axis",
    snap: true,
    formatter: "index:{b}<br/> 参数值：{c}",
  },
  xAxis: [
    {
      type: "category",
    },
  ],
  yAxis: {
    type: "value",
  },
  dataZoom: [
    {
      type: "inside",
    },
  ],
  legend: {
    left: "left",
    orient: "verical",
  },
  series: [
    {
      type: "line",
      data: [...store.state.home.shakeData.data],
      smooth: true, // 开启平滑过渡
      markLine: {},
    },
  ],
  toolbox: {
    show: true,
    feature: {
      restore: {},
      saveAsImage: {},
      maginType: {
        type: ["line", "bar"],
      },
    },
    showTitle: true,
  },
};
onMounted(() => {
  let LineChart = echarts.init(chart.value);

  setInterval(() => {
    option &&
      LineChart.setOption({
        series: [
          {
            name: "",
            type: "line",
            data: store.state.home.shakeData.data,
          },
        ],
      });
  }, 500);
  option && LineChart.setOption(option);
  // 折线图自适应
  window.addEventListener("resize", function () {
    LineChart.resize();
  });
});
</script>
<style lang="scss" scoped>
.chart {
  width: 98%;
  height: 276px;
  margin: 0 auto;
  // border: 1px solid #000;
  // background-color:  rgb(15,12,40);
}
</style>
