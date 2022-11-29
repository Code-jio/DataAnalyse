<template>
  <div class="block flex">
    <!-- 开始时间 -->

    <span class="demonstration">开始时间: </span>
    <el-date-picker
      v-model="startTime"
      type="datetime"
      placeholder="Select date and time"
      format="YYYY/MM/DD hh:mm:ss"
      value-format="x"
    />

    <span class="demonstration">结束时间: </span>
    <el-date-picker
      v-model="endTime"
      type="datetime"
      placeholder="Select date and time"
      format="YYYY/MM/DD hh:mm:ss"
      value-format="x"
    />

    <el-button @click="timeCommit()" type="primary">提交</el-button>
  </div>
</template>

<script setup>
import "@/service/proto/proto_main.js";
import { ref } from "vue";
import { getSampleList } from "@/service/websocket/send.js";
const startTime = ref("");
const endTime = ref("");

const timeCommit = () => {
  console.log(startTime.value, endTime.value);
  if (startTime.value && endTime.value) {
    getSampleList(startTime.value, endTime.value);
  } else {
    console.log("未输入参数");
  }
};
</script>

<style lang="sass" scoped>

.block{
  width: 100%;
  height: 100%;
  margin-left: 1%;
  }
</style>
