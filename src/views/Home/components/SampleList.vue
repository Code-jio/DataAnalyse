<template>
  <div class="sampleList">
    <el-table
      :data="sampleList"
      height="600"
      style="width: 100%"
      @row-click="getRowSignal"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
      <!-- <el-table-column prop="label" label="标签"></el-table-column> -->
    </el-table>
  </div>
</template>

<script setup>
import { computed } from "vue";
// import { getTime } from "@/utils/utils.js";
import { useStore } from "vuex";
import { reqSampleData, reqFftData } from "@/service/websocket/send.js";
// const data = ref([]);

const store = useStore();
const sampleList = computed(() => store.state.sampleList);

const getRowSignal = (e) => {
  reqSampleData(e.id);
  reqFftData(e.id);
};
</script>

<style scoped lang="sass">
.sampleList {
  margin:0 auto;
  width: 98%;
  // height:%;
  // background-color: lightblue;
}
</style>
