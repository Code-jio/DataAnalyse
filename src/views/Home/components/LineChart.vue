<!-- eslint-disable -->
<template>
  <div class="chart" ref="chart"></div>
</template>
<script setup>
import * as echarts from "echarts";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";

const chart = ref(null);
const store = useStore();

onMounted(() => {
  let LineChart = echarts.init(chart.value, "dark");

  let option = {
    backgroundColor: "",
    title: {
      text: "震动信号",
      left: "center",
    },
    xAxis: [
      {
        type: "category",
        // data: categories.value,
        data: [],
      },
    ],
    yAxis: {
      type: "value",
    },
    legend: {
      left: "left",
      // 图例的布局朝向
      orient: "verical",
    },
    series: [
      {
        type: "line",
        data: [...store.state.shakeData],
        smooth: true, // 开启平滑过渡
        markLine: {
          // data: [{ type: 'average', name: '平均值' }]
        },
      },
    ],
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
        maginType: {
          type: ["line", "bar"],
        },
      },
      showTitle: true,
    },
  };
  setInterval(() => {
    LineChart.setOption(option);
  }, 100);
});
</script>
<style lang="sass" scoped>
.chart{
  width: 98%;
  height: 300px;
  margin: 30px auto;
  border: 1px solid #000;
  background-color:  rgb(15,12,40);
}
</style>
