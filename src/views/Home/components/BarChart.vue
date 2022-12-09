<template>
  <div class="pos-rela">
    <div class="barChart" ref="bar"></div>
    <el-button
      class="btn256"
      :disabled="!sampleInfo"
      @click="reqFftData(sampleInfo.id, store.state.userID, 256)"
    >
      256
    </el-button>
    <el-button
      class="btn512"
      :disabled="!sampleInfo"
      @click="reqFftData(sampleInfo.id, store.state.userID, 512)"
    >
      512
    </el-button>
    <el-button
      class="btn1024"
      :disabled="!sampleInfo"
      @click="reqFftData(sampleInfo.id, store.state.userID, 1024)"
    >
      1024
    </el-button>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import emitter from "@/utils/eventBus.js";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import { reqFftData } from "@/service/websocket/send.js";
const bar = ref(null);
const store = useStore();

const sampleInfo = ref(undefined);
// 获取行数据
emitter.on("sendRow", (info) => {
  sampleInfo.value = info;
});

const categories = function (length) {
  let res = [];
  for (let i = 0; i < length; i++) {
    res.push(i);
  }
};

let option = {
  backgroundColor: "",
  title: {
    text: "傅里叶变换",
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
  dataZoom: [
    {
      type: "inside",
    },
  ],
  legend: {},
  toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {},
    },
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: true,
      data: categories(store.state.ssSeimicFft.length),
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
  let BarChart = echarts.init(bar.value);

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
  window.addEventListener("resize", function () {
    BarChart.resize();
  });
});
</script>
<style lang="sass" scoped>
.barChart{
  width: 98%;
  height: 276px;
  margin: 0 auto;
}
    .btn256{
    position: absolute;
    width: 50px;
    right: 20px;
    top: 40px;
  }
  .btn512{
    position: absolute;
    width: 50px;
    right: 20px;
    top:90px;
  }
  .btn1024{
    position: absolute;
    width: 50px;
    right: 20px;
    top: 140px;
  }
</style>
