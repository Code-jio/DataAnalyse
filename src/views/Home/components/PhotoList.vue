<template>
  <div class="photoList" ref="scrollBar" @mousewheel="horizontalScroll">
    <div class="photo" v-for="i in 20" :key="i">
      <img class="image" src="@/assets/images/23.jpg" alt="" srcset="" />
      <div class="imageInfo">
        <el-descriptions title="图片信息:" :column="1" direction="horizontal">
          <el-descriptions-item label="图片ID:"> {{}} </el-descriptions-item>
          <el-descriptions-item label="获取时间:">
            18100000000
          </el-descriptions-item>
          <el-descriptions-item label="目标类型:">Suzhou</el-descriptions-item>
          <el-descriptions-item label="标签:">
            <el-radio-group v-model="label" @change="chooseLabel" size="small">
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

const store = useStore();
// eslint-disable-next-line no-unused-vars
const data = computed(() => store.state.photoList);

const scrollBar = ref(null);
const horizontalScroll = (e) => {
  scrollBar.value.scrollLeft += e.deltaY;
};

const label = ref("");
const chooseLabel = (e) => {
  console.log(e);
};
</script>

<style scoped lang="sass">
.photoList {
  width: 98%;
  margin: 10px auto;
  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      // background: #fff;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(100, 100, 100, 0.5);
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.1);
    }
  .photo {
    width: 100%;
    height: 210px;
    margin: 10px 15px 14px;
    display: flex;
    img {
        background-color: pink;
        // width: 200px;
    }
    .imageInfo{
      margin-left:10px;
      width: 210px;
    }
    span {
        font-size: 16px;
        color: #000;
    }
  }
}
</style>
