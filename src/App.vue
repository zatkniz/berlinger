<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap">
      <Sidebar />
      <div
        class="w-full bg-white-100 pl-0 lg:pl-64 min-h-screen"
        id="main-content"
      >
        <Navbar />
        <div class="p-6 h-5/6">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";
import { Store, useStore } from "vuex";
import { MainState } from "interfaces/store";

const store: Store<MainState> = useStore();

/**
 * On page load fill store with data
 */
store.dispatch("fetchData");
</script>
