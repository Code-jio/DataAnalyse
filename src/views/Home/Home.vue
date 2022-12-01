<!-- eslint-disable -->
<template>
  <div class="common-layout">
    <el-container>
      <!-- 侧栏 样本列表 -->
      <el-aside width="380px">
        <TimePicker></TimePicker>
        <SampleList></SampleList>
        <ShowTags></ShowTags>
      </el-aside>
      <el-container>
        <!-- 统计图 主体部分 -->
        <el-main>
          <LineChart></LineChart>
          <BarChart></BarChart>
          <PhotoList></PhotoList>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import BarChart from "./components/BarChart.vue";
import LineChart from "./components/LineChart.vue";
import TimePicker from "./components/TimePicker.vue";
import SampleList from "./components/SampleList.vue";
import PhotoList from "./components/PhotoList.vue";
import ShowTags from "./components/ShowTags.vue";
</script>
<style lang="sass" scoped></style>
