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
  xAxis: [
    {
      type: "category",
      // data: categories.value,

      // data: () => {
      //   const arr = [];
      //   for (let i = 0; i < store.state.shakeData.length; i++) {
      //     arr.push(i + 1);
      //   }
      //   return arr;
      // },
      // data: [],
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
onMounted(() => {
  let LineChart = echarts.init(chart.value, "dark");

  setInterval(() => {
    option &&
      LineChart.setOption({
        series: [
          {
            name: "",
            type: "line",
            data: store.state.shakeData,
          },
        ],
      });
  }, 500);
  option && LineChart.setOption(option);
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
