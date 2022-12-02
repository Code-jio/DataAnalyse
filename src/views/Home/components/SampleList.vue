<template>
  <div class="sampleList">
    <el-table
      :data="sampleList"
      height="400"
      style="width: 100%"
      @row-click="getRowSignal"
      class="table"
    >
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="date" label="时间"></el-table-column>
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
  getPhotoList,
} from "@/service/websocket/send.js";

const store = useStore();
const sampleList = computed(() => store.state.sampleList);

// 请求震动样本数据、傅立叶变换数据、样本分类结果
const getRowSignal = (e) => {
  reqSampleData(e.id);
  reqFftData(e.id);
  reqSampleClassifyRes(e.id);
  getPhotoList(e.id, e.time - 60, e.time + 60);
  emitter.emit("sendRow", e);
};
</script>

<style scoped lang="sass">
.sampleList {
  margin:0 auto;
  width: 98%;
}
</style>
