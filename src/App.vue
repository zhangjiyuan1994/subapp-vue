<template>
  <a-config-provider :locale="$zhCN">
    <div id="app">
      <transition name="fade-transform" mode="out-in" appear>
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </div>
  </a-config-provider>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default class App extends Vue {}
</script>

<style></style>
