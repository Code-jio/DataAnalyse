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
    />
  </el-select>
  <el-button color="#626aef">确认</el-button>
</template>

<script setup>
import { ref } from "vue";
const value = ref();
const options = [
  {
    value: "Option1",
    label: "支持向量机",
  },
  {
    value: "Option2",
    label: "图像识别",
  },
];
</script>

<style lang="scss" scoped></style>
