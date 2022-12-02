<template>
  <div class="barChart" ref="bar"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";

const bar = ref(null);
const store = useStore();

const categories = function () {
  let res = [];
  for (let i = 0; i < 256; i++) {
    res.push(i);
  }
  return res;
};
let option = {
  backgroundColor: "",
  title: {
    text: "傅立叶变换",
    left: "center",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#283b56",
      },
    },
  },
  legend: {},
  toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {},
    },
  },
  dataZoom: {
    show: false,
    start: 0,
    end: 100,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: true,
      data: categories(),
    },
  ],
  yAxis: [
    {
      type: "value",
      scale: true,
      name: "",
      boundaryGap: [0, 0.2],
    },
  ],
  series: [
    {
      name: "",
      type: "bar",
      data: store.state.ssSeimicFft,
    },
  ],
};
onMounted(() => {
  let BarChart = echarts.init(bar.value, "dark");

  setInterval(() => {
    option &&
      BarChart.setOption({
        series: [
          {
            name: "",
            type: "bar",
            data: store.state.ssSeimicFft,
          },
        ],
      });
  }, 500);
  option && BarChart.setOption(option);
});
</script>
<style lang="sass" scoped>
.barChart{
  width: 98%;
  height: 280px;
  margin: 0 auto;
  border: 1px solid #000;
  background-color: rgb(15,12,40);
}
</style>
