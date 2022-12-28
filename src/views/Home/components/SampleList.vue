<template>
  <div class="sampleList">
    <el-table
      highlight-current-row
      :default-sort="{ prop: 'date', order: 'descending' }"
      :data="sampleList"
      height="575"
      style="width: 100%"
      @row-click="getRowSignal"
      class="table"
    >
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="date" label="时间" sortable></el-table-column>
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
  reqRelatedSample,
} from "@/service/websocket/send.js";

const store = useStore();
const sampleList = computed(() => store.state.sampleList);

// 点击行数据 请求震动样本数据、傅里叶变换数据、样本分类结果、相关样本
const getRowSignal = (e) => {
  store.commit("resetData", []);

  console.log(e);
  // 请求样本数据;
  reqSampleData(e.id);
  // 请求傅里叶变换
  reqFftData(e.id);
  // 请求样本分类结果
  reqSampleClassifyRes(e.id);
  // 请求相关样本 （图片列表）请求之前先将原有数据置空
  // eslint-disable-next-line no-undef
  reqRelatedSample(e.id, proto.EntityType.SS_CAMERA);
  emitter.emit("sendRow", e);
};
</script>

<style scoped lang="scss">
.sampleList {
  margin: 0 auto;
  width: 98%;
}
</style>
