<template>
  <div class="tagArea">
    <span>目标类型: {{ tagInfo.targetType }}</span>
    <br />
    <span>样本ID: {{ tagInfo.sampleId }}</span>
  </div>
</template>

<script setup>
// import { getTargetType } from "@/service/websocket";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const tagInfo = computed(() => store.state.sampleTag);
</script>

<style lang="sass" scoped></style>
