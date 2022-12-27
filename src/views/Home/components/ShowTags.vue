<template>
  <div class="tagArea">
    <el-card class="Card">
      <span>样本ID: {{ sampleInfo ? sampleInfo.id : "暂未选中目标样本" }}</span>
      <br />
      <span>
        样本获取时间:
        {{ sampleInfo ? sampleInfo.date : "暂未选中目标样本" }}
      </span>
      <br />
      <span>
        目标类型:
        {{ getTargetType(sampleTag.targetType) }}
      </span>
      <br />
      <span>
        置信度:
        {{
          sampleTag.confidenceLevel === 0
            ? "尚无数据"
            : sampleTag.confidenceLevel
        }}
      </span>
      <br />
      <span>
        实体ID:
        {{
          sampleClassifyInfo.entityId ? sampleClassifyInfo.entityId : "尚无数据"
        }}
      </span>
      <br />
      <span>
        算法类型:
        {{
          sampleClassifyInfo.entityType
            ? getEntityType(sampleClassifyInfo.entityType).id
            : "尚无数据"
        }}
      </span>
      <el-button
        type="danger"
        :icon="Delete"
        plain
        class="del-button"
        :disabled="!sampleInfo"
        @click="deleteSample(sampleInfo)"
      >
        删除
      </el-button>
      <br />
      <!-- 标签区域 -->
      <div class="labelArea">
        <el-radio-group
          v-model="sampleClassifyInfo.targetType"
          @change="chooseLabel"
        >
          <el-radio-button label="人员" :disabled="!sampleInfo" />
          <el-radio-button label="车辆" :disabled="!sampleInfo" />
          <el-radio-button label="未分类" :disabled="!sampleInfo" />
          <el-radio-button label="其他" :disabled="!sampleInfo" />
        </el-radio-group>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { Delete } from "@element-plus/icons-vue";
// import { getTargetType } from "@/service/websocket/send.js";
import {
  reqDeleteSample,
  sendTags,
  getTargetType,
  getEntityType,
} from "@/service/websocket/send.js";
import emitter from "@/utils/eventBus.js";
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const sampleClassifyInfo = computed(() => store.state.sampleClassifyInfo);
const sampleTag = computed(() => store.state.sampleTag);
const sampleInfo = ref(undefined);
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
// const labels = ref("");
// 选取标签
const chooseLabel = (e) => {
  // sendTags(sendTags, e);
  // eslint-disable-next-line no-undef
  console.log(sampleInfo.value, e, proto.TargetType, "发送标签");
  switch (e) {
    case "人员":
      // eslint-disable-next-line no-undef
      sendTags(sampleInfo.value.id, proto.TargetType.TT_HUMAN);
      break;
    case "车辆":
      // eslint-disable-next-line no-undef
      sendTags(sampleInfo.value.id, proto.TargetType.TT_VEHICLE);
      break;
    case "未分类":
      // eslint-disable-next-line no-undef
      sendTags(sampleInfo.value.id, proto.TargetType.TT_UNCLASSIFIED);
      break;
    case "其他":
      // eslint-disable-next-line no-undef
      sendTags(sampleInfo.value.id, proto.TargetType.TT_OTHER);
      break;
    default:
      return;
  }
};
</script>

<style lang="sass" scoped>
.labelArea{
  vertical-align: middle;
}
</style>
