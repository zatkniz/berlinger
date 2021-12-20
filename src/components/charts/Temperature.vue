<template>
  <apexchart
    type="area"
    height="500"
    width="1000"
    id="fb"
    group="social"
    :options="chartOptions"
    :series="chartData"
  ></apexchart>
</template>

<script lang="ts" setup>
import { ServerData } from "interfaces/server-data";
import { MainState } from "interfaces/store";
import moment from "moment";
import { computed, ComputedRef } from "vue";
import { Store, useStore } from "vuex";

const store: Store<MainState> = useStore();

const selectedDay: ComputedRef<string> = computed(() => store.getters.getSelectedDay);
const dateType: ComputedRef<moment.unitOfTime.StartOf> = computed(() => store.getters.getDateType);

const chartData = computed(() => {
  const data = store.getters.getTemperatureData
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

const getXAxisData: ComputedRef<string[]> = computed(() => {
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
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    tooltip: {
      y: {
        formatter: undefined,
        title: {
          formatter: () => {
            return "Value: ";
          },
        },
      },
    },
    chart: {
      id: "we",
      group: "data",
    },
    yaxis: {
      title: {
        text: "Temperature",
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
