<!-- eslint-disable -->
<template>
  <div class="common-layout">
    <el-container>
      <!-- 侧栏 样本列表 -->
      <el-aside width="350px">
        <!-- 时间选择 -->

        <!-- 样本列表 -->
        <el-card class="box-card Card">
          <SampleList></SampleList>
        </el-card>
        <!-- 算法选择 -->
        <el-card class="box-card Card">
          <AlgorithmPicker></AlgorithmPicker>
        </el-card>
        <!-- 标签展示 -->
        <ShowTags></ShowTags>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <el-card>
            <!-- 时间选择器 -->
            <TimePicker></TimePicker>
          </el-card>
        </el-header>
        <!-- 主体部分 -->
        <el-main
          ><!-- 图片列表 -->
          <el-card class="Card">
            <PhotoList></PhotoList>
          </el-card>
          <!-- 统计图 -->
          <el-card>
            <LineChart></LineChart>
            <BarChart></BarChart>
          </el-card>
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
