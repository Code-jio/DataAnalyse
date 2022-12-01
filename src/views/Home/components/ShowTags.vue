<template>
  <div class="tagArea">
    <span>样本ID: {{ sampleInfo.id }}</span>
    <br />
    <span>样本获取时间: {{ sampleInfo.time }}</span>
    <br />
    <span
      >目标类型:
      {{
        sampleClassifyInfo.targetType
          ? sampleClassifyInfo.targetType
          : "尚无数据"
      }}</span
    >
    <br />
    <span
      >置信度:
      {{
        sampleClassifyInfo.confidenceLevel
          ? sampleClassifyInfo.confidenceLevel
          : "0"
      }}</span
    >
    <br />
    <span
      >实体ID:
      {{
        sampleClassifyInfo.entityId ? sampleClassifyInfo.entityId : "尚无数据"
      }}</span
    >
    <br />
    <span
      >实体类型:
      {{
        sampleClassifyInfo.entityType
          ? sampleClassifyInfo.entityType
          : "尚无数据"
      }}</span
    >
    <el-divider direction="vertical" />

    <el-button
      type="danger"
      :icon="Delete"
      plain
      @click="deleteSample(sampleInfo)"
      >删除</el-button
    >
    <el-divider />
    <!-- 标签区域 -->
    <div class="labelArea">
      <el-radio-group v-model="labels" @change="chooseLabel">
        <el-radio-button label="人员" />
        <el-radio-button label="车辆" />
        <el-radio-button label="未分类" />
        <el-radio-button label="其他" />
      </el-radio-group>
      <el-divider direction="vertical" />
      <el-divider direction="vertical" />
      <el-divider direction="vertical" />
      <el-divider direction="vertical" />
      <el-button color="#626aef">确定</el-button>
    </div>
  </div>
</template>

<script setup>
import { Delete } from "@element-plus/icons-vue";
// import { getTargetType } from "@/service/websocket";
import { reqDeleteSample } from "@/service/websocket/send.js";
import emitter from "@/utils/eventBus.js";
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const sampleClassifyInfo = computed(() => store.state.sampleClassifyInfo);
const sampleInfo = ref({});
// 获取行数据
emitter.on("sendRow", (info) => {
  sampleInfo.value = info;
});
// 删除样本
const deleteSample = (e) => {
  console.log(e);
  reqDeleteSample(e.id);
};

// 标签
const labels = ref("");
// 选取标签
const chooseLabel = (e) => {
  console.log(e);
};
</script>

<style lang="sass" scoped>
.labelArea{
  vertical-align: middle;
}
</style>
