<template>
  <div class="sampleList">
    <el-table
      :data="sampleList"
      height="500"
      style="width: 100%"
      @row-click="getRowSignal"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import emitter from "@/utils/eventBus.js";
import { computed } from "vue";
import { useStore } from "vuex";
import {
  reqSampleData,
  reqFftData,
  reqSampleClassifyRes,
} from "@/service/websocket/send.js";

const store = useStore();
const sampleList = computed(() => store.state.sampleList);

// 请求震动样本数据、傅立叶变换数据、样本分类结果
const getRowSignal = (e) => {
  reqSampleData(e.id);
  reqFftData(e.id);
  reqSampleClassifyRes(e.id);
  emitter.emit("sendRow", e);
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
