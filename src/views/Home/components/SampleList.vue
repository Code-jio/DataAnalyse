<template>
  <div class="sampleList">
    <el-table :data="data" height="250" style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column prop="label" label="标签"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
const data = ref([]);
</script>

<style scoped lang="sass">
.sampleList {
  margin:0 auto;
  width: 98%;
  height:95vh;
  background-color: lightblue;
}
</style>
