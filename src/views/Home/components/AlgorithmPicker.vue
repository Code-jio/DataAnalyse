<template>
  <el-select
    v-model="value"
    placeholder="算法选择"
    style="width: 240px; margin-right: 16px; vertical-align: middle"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="!sampleInfo"
    />
  </el-select>
  <el-button color="#626aef" @click="pickAlgo">确认</el-button>
</template>

<script setup>
import { ref } from "vue";
// import { reqAlgo } from "@/service/websoket/send.js";
import emitter from "@/utils/eventBus.js";
const value = ref();
const options = [
  {
    // eslint-disable-next-line no-undef
    value: proto.EntityType.ALGO_SVM,
    label: "支持向量机",
  },
  {
    // eslint-disable-next-line no-undef
    value: proto.EntityType.ALGO_VISION,
    label: "图像识别",
  },
];
let sampleInfo = ref(undefined);
// 获取行数据
emitter.on("sendRow", (info) => {
  sampleInfo.value = info;
});

const pickAlgo = () => {
  console.log(sampleInfo.value.id, value.value);
};
</script>

<style lang="scss" scoped></style>
