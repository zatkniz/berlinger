<template>
  <div class="flex justify-center items-center h-full">
    <div id="wrapper">
      <ChartFilters />
      <div id="chart-line">
        <Temperature />
      </div>
      <div id="chart-line2">
        <Humidity />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Temperature from "@/components/charts/Temperature.vue";
import Humidity from "@/components/charts/Humidity.vue";
import ChartFilters from "@/components/ChartFilters.vue";
</script>
