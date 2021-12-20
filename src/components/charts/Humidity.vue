<template>
  <apexchart
    type="line"
    height="200"
    id="tw"
    group="social"
    :options="chartOptions"
    :series="chartData"
  ></apexchart>
</template>

<script lang="ts" setup>
import { ServerData } from "interfaces/server-data";
import { MainState } from "interfaces/store";
import moment from "moment";
import { computed } from "vue";
import { Store, useStore } from "vuex";

const store: Store<MainState> = useStore();

const selectedDay = computed(() => store.getters.getSelectedDay);
const dateType = computed(() => store.getters.getDateType);

const chartData = computed(() => {
  const data = store.getters.getHumidityData
    .filter((data: ServerData) =>
      moment(data.ts).isSame(
        moment(selectedDay.value, "DD-MM-YYYY"),
        dateType.value
      )
    )
    .map((item: ServerData) => item.value);

  return [
    {
      data,
    },
  ];
});

const getXAxisData = computed(() => {
  return store.getters.getTemperatureData
    .filter((data: ServerData) =>
      moment(data.ts).isSame(
        moment(selectedDay.value, "DD-MM-YYYY"),
        dateType.value
      )
    )
    .map((item: ServerData) =>
      moment(item.ts).format(
        dateType.value == "day" ? "HH:mm" : "DD-MM-YYYY HH:mm"
      )
    );
});

const chartOptions = computed(() => {
  return {
    colors: ["#008FFB"],
    chart: {
      id: "te",
      group: "data",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    yaxis: {
      title: {
        text: "Humidity",
      },
      labels: {
        formatter: (value: string) => parseInt(value),
      },
    },
    xaxis: {
      tickAmount: 10,
      categories: getXAxisData.value,
    },
  };
});
</script>
