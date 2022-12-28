<template>
  <div class="block flex">
    <el-date-picker
      v-model="time"
      type="datetimerange"
      :shortcuts="shortcuts"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      format="YYYY/MM/DD hh:mm:ss"
      value-format="x"
    />
    <el-button
      class="btn"
      :disabled="!time"
      @click="timeCommit()"
      color="#626aef"
    >
      提交
    </el-button>
  </div>
</template>

<script setup>
import "@/service/proto/proto_main.js";
import { ref } from "vue";
import { reqSampleList } from "@/service/websocket/send.js";
const time = ref("");

const shortcuts = [
  {
    text: "最近一小时",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 1);
      return [start, end];
    },
  },
  {
    text: "最近三小时",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 3);
      return [start, end];
    },
  },
  {
    text: "最近一天",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24);
      return [start, end];
    },
  },
  {
    text: "最近一周",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
];

const timeCommit = () => {
  if (time.value) {
    reqSampleList(
      parseInt(time.value[0] / 1000),
      parseInt(time.value[1] / 1000)
    );
  } else {
    console.log("未输入正确参数");
  }
};
</script>

<style lang="sass" scoped>

.block{
  width: 80%;
  margin-left: 1%;
  .btn {
    // margin: 0 auto;
    position: relative;
left: 30px;
  top: -2px;
  }
}
</style>
