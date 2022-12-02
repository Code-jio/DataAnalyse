<!-- eslint-disable -->
<template>
  <div class="common-layout">
    <el-container>
      <!-- 侧栏 样本列表 -->
      <el-aside width="380px">
        <el-card class="box-card Card">
          <TimePicker></TimePicker>
        </el-card>
        <el-card class="box-card Card">
          <SampleList></SampleList>
        </el-card>
        <el-card class="box-card Card">
          <AlgorithmPicker></AlgorithmPicker>
        </el-card>
        <ShowTags></ShowTags>
      </el-aside>
      <el-container>
        <!-- 统计图 主体部分 -->
        <el-main>
          <el-card>
            <LineChart></LineChart>
            <BarChart></BarChart>
          </el-card>
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
import AlgorithmPicker from "./components/AlgorithmPicker.vue";
</script>
<style lang="sass" scoped>
// .box-card {
//   background-color: rgb(204,204,214)
// }
</style>
