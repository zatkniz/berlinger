<template>
  <div class="flex justify-between px-3 py-5">
    <div class="inline-flex rounded-md shadow-sm" role="group">
      <button
        type="button"
        @click="setRangeType(type.name.toLowerCase())"
        v-for="(type, index) in rangeTypeButtons"
        :key="type.name"
        :class="{
          'bg-blue-300 text-white': rangeType == type.name.toLowerCase(),
          'text-gray-900': rangeType !== type.name.toLowerCase(),
          'rounded-l-lg border': index == 0,
          'border-t border-b': index == 1,
          'rounded-r-md border': index == 2,
        }"
        class="py-2 px-4 text-sm font-medium bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
      >
        {{ type.name }}
      </button>
    </div>
    <div>
      <select
        @change="setDateType($event, type.name.toLowerCase())"
        v-show="rangeType == type.name.toLowerCase()"
        v-for="type in rangeTypeButtons"
        :key="type.name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option v-for="day in type.data" :key="day">{{ day }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import store from "@/store";
import { computed, ComputedRef, Ref } from "vue";

const rangeType = computed(() => store.getters.getRangeType);

const setDateType = (event: Event, type: string): void => {
  const element = event.currentTarget as HTMLInputElement;

  store.commit("setDateType", type);
  store.commit("setSelectedDay", element.value);
};
const setRangeType = (type: string): void => {
  store.commit("setRangeType", type);
};

const availableDays: ComputedRef<number[]> = computed(
  () => store.getters.getAvailableDays
);

const availableWeeks: ComputedRef<number[]> = computed(
  () => store.getters.getAvailableWeeks
);

const availableMonths: ComputedRef<number[]> = computed(
  () => store.getters.getAvailableMonths
);

const rangeTypeButtons = computed(() => {
  return [
    { name: "Day", data: availableDays.value },
    { name: "Week", data: availableWeeks.value },
    { name: "Month", data: availableMonths.value },
  ];
});
</script>
