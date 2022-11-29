<template>
  <div class="block">
    <!-- 开始时间 -->
    <div class="startTime">
      <span class="demonstration">开始时间: </span>
      <el-date-picker
        v-model="startTime"
        type="datetime"
        placeholder="Select date and time"
      />
    </div>
    <!-- 结束时间 -->
    <div class="endTime">
      <span class="demonstration">结束时间: </span>
      <el-date-picker
        v-model="endTime"
        type="datetime"
        placeholder="Select date and time"
      />
    </div>

    <el-button @click="timeCommit()" type="primary">提交</el-button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const startTime = ref("");
const endTime = ref("");

const timeCommit = () => {};
</script>

<style lang="sass" scoped>

.block{
  width:300px;
  border:1px solid #000;
  }
</style>
