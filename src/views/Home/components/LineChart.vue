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
// let categories = (num) => {
//   let res = ref([]);
//   for (let k = 0; k < num; k++) {
//     res.value.push[k];
//   }
//   return res;
// };

onMounted(() => {
  let LineChart = echarts.init(chart.value);
  setInterval(() => {
    // console.log(categories(5000));
    let option = {
      title: {
        text: "折线图",
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
          data: store.state.shakeData,
          smooth: false, // 开启平滑过渡
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
        },
      },
    };

    LineChart.setOption(option);
  }, 50);
});
</script>
<style lang="sass" scoped>
.chart{
  width: 95%;
  height: 300px;
  margin: 3% auto;
  border: 1px solid #000;
}
</style>
