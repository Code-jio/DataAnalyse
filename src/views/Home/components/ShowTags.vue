<template>
  <div class="tagArea">
    <span>样本ID: {{ sampleInfo.id }}</span>
    <br />
    <span>样本获取时间: {{ sampleInfo.time }}</span>
    <br />
    <span>目标类型: {{}}</span>
    <br />
    <el-button
      type="danger"
      :icon="Delete"
      plain
      @click="deleteSample(sampleInfo)"
      >删除</el-button
    >
  </div>
</template>

<script setup>
import { Delete } from "@element-plus/icons-vue";
// import { getTargetType } from "@/service/websocket";
import { reqDeleteSample } from "@/service/websocket/send.js";
import emitter from "@/utils/eventBus.js";
import { ref } from "vue";
// import { useStore } from "vuex";
// const store = useStore();
// const tagInfo = computed(() => store.state.sampleTag);
const sampleInfo = ref({});
emitter.on("sendRow", (info) => {
  sampleInfo.value = info;
});

const deleteSample = (e) => {
  console.log(e);
  reqDeleteSample(e.id);
};
</script>

<style lang="sass" scoped></style>
