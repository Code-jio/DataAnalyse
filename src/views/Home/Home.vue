<!-- eslint-disable -->
<template>
  <div class="home">
    <TimePicker></TimePicker>
    <sample-list></sample-list>
    <LineChart></LineChart>
    <BarChart></BarChart>
  </div>
</template>
<script setup>
import BarChart from "./components/BarChart.vue";
import LineChart from "./components/LineChart.vue";
import TimePicker from "./components/TimePicker.vue";
import SampleList from "./components/SampleList.vue";
</script>
<style lang="sass" scoped></style>
