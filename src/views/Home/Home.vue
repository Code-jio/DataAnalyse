<!-- eslint-disable -->

<template>
  <div class="chart" ref="chart"></div>
</template>
<script setup>
import * as echarts from "echarts";
import { useStore } from "vuex";
import { ref, onMounted, computed } from "vue";

const chart = ref(null);
const store = useStore();
const ShakeData = computed(() => store.state.shakeDate);

onMounted(() => {
  let LineChart = echarts.init(chart.value);
  let option = {
    title: {
      text: "折线图",
      left: "center",
    },
    xAxis: {
      type: "category",
      data: () => {
        const arr = [];
        for (let i = 0; i < arr.length; i++) {
          arr.push(i + 1);
        }
        return arr;
      },
    },
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
        data: ShakeData.value ? [] : [],
        smooth: false, // 开启平滑过渡

        // markPoint: {
        //   data: [
        //     { type: "max", name: "最大值" },
        //     { type: "min", name: "最小值" },
        //   ],
        // },
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
});
</script>
<style lang="sass" scoped>
.chart{
  width: 90%;
  height: 300px;
}
</style>
