<template>
  <div class="photoList">
    图片列表
    <div class="photo" v-for="(i, item) in data" :key="i">
      <!-- <img :src="item.sampleValue" alt="" srcset="" /> -->
      ???
      <span>{{ item.sampleId }}</span>
      <span>{{ item.time }}</span>
    </div>
    {{ data }}
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
const data = computed(() => store.state.data);
</script>

<style scoped lang="sass">
.photoList {
    width: 98%;
    // height: 200px;
    margin: 1% auto;
    border: 1px soli #000;
    // background-color: #ffe4c4;
    .photo {
      height: 100%
      img {
          background-color: pink;
      }
      span {
          font-size: 16px;
          background-color: blue;
          color: #fff;
      }
    }
}
</style>
