<template>
  <div class="photoList" ref="scrollBar" @mousewheel="horizontalScroll">
    <div class="photo" v-for="(item, i) in store.state.photoList" :key="i">
      <img class="image" :src="item.sampleValue" />
      <div class="imageInfo">
        <el-descriptions :column="1" direction="horizontal">
          <el-descriptions-item label="ID:">
            {{ item.sampleId }}
          </el-descriptions-item>
          <el-descriptions-item label="采样时间:">
            {{ getTime(item.time * 1000, "hh:mm:ss") }}
          </el-descriptions-item>
          <el-descriptions-item label="分类器:">
            {{ getEntityType(item.originEntityType).id }}
          </el-descriptions-item>
          <el-descriptions-item label="分类结果:"> </el-descriptions-item>
          <el-descriptions-item>
            <el-radio-group
              v-model="item.tag"
              @change="chooseLabel(item)"
              size="small"
            >
              <el-radio-button label="人员" />
              <el-radio-button label="车辆" />
              <el-radio-button label="未分类" />
              <el-radio-button label="其他" />
            </el-radio-group>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { getTime } from "@/utils/utils.js";
import { getEntityType, sendTags } from "@/service/websocket/send.js";
const store = useStore();

// eslint-disable-next-line no-unused-vars
const photoList = computed(() => store.state.photoList);

const scrollBar = ref(null);
const horizontalScroll = (e) => {
  scrollBar.value.scrollLeft += e.deltaY;
};
const chooseLabel = (item) => {
  switch (item.tag) {
    case "人员":
      // eslint-disable-next-line no-undef
      sendTags(item.sampleId, proto.TargetType.TT_HUMAN);
      break;
    case "车辆":
      // eslint-disable-next-line no-undef
      sendTags(item.sampleId, proto.TargetType.TT_VEHICLE);
      break;
    case "未分类":
      // eslint-disable-next-line no-undef
      sendTags(item.sampleId, proto.TargetType.TT_UNCLASSIFIED);
      break;
    case "其他":
      // eslint-disable-next-line no-undef
      sendTags(item.sampleId, proto.TargetType.TT_OTHER);
      break;
    default:
      return;
  }
};
</script>

<style scoped lang="scss">
.photoList {
  width: 98%;
  height: 190px;
  margin: 0px auto;
  display: flex;
  overflow-x: scroll;
  justify-content: space-between;
  align-content: flex-start;
  // flex-wrap: wrap;
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(100, 100, 100, 0.5);
  }

  .photo {
    width: 100%;
    height: 180px;
    display: flex;

    img {
      background-color: pink;
    }
    .imageInfo {
      margin-left: 10px;
      width: 210px;
    }
    span {
      font-size: 16px;
      color: #000;
    }
  }
}
</style>
