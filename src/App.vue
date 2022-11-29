<template>
  <div class="App">
    <!-- <router-view /> -->
    <Home />
  </div>
</template>

<script>
import Home from "./views/Home/Home.vue";
// import { ElButton } from "element-plus";
export default {
  name: "App",
  components: { Home },
};
</script>

<style></style>
