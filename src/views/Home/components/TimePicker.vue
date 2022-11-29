<template>
  <div class="block flex">
    <!-- 开始时间 -->
    <div class="startTime">
      <span class="demonstration">开始时间: </span>
      <el-date-picker
        v-model="startTime"
        type="datetime"
        placeholder="Select date and time"
        format="YYYY/MM/DD hh:mm:ss"
        value-format="x"
      />
    </div>
    <!-- 结束时间 -->
    <div class="endTime">
      <span class="demonstration">结束时间: </span>
      <el-date-picker
        v-model="endTime"
        type="datetime"
        placeholder="Select date and time"
        format="YYYY/MM/DD hh:mm:ss"
        value-format="x"
      />
    </div>

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
  if (startTime.value && endTime.value) {
    getSampleList(startTime.value, endTime.value);
  } else {
    console.log("未输入参数");
  }
};
</script>

<style lang="sass" scoped>

.block{
  width:300px;
  border:1px solid #000;
  }
</style>
