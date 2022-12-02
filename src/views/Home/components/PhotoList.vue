<template>
  <div class="photoList" ref="scrollBar" @mousewheel="horizontalScroll">
    <div class="photo" v-for="i in 20" :key="i">
      <img class="image" src="@/assets/images/23.jpg" alt="" srcset="" />
      <span>{{ data }}</span>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";

const store = useStore();
const data = computed(() => store.state.photoList);

const scrollBar = ref(null);
const horizontalScroll = (e) => {
  scrollBar.value.scrollLeft += e.deltaY;
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
    margin: auto 10px;
    img {
        background-color: pink;
        width: 200px;
    }
    span {
        font-size: 16px;
        color: #000;
    }
  }
}
</style>
