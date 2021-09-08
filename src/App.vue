<template>
  <a-config-provider :locale="$zhCN">
    <div id="app">
      <template v-if="!singleMod">
        <transition name="fade-transform" mode="out-in" appear>
          <keep-alive>
            <router-view />
          </keep-alive>
        </transition>
      </template>
      <template v-else>
        <a-layout>
          <a-layout-sider>
            <SideMenu :menu-list="routes"></SideMenu>
          </a-layout-sider>
          <a-layout-content>
            <router-view />
          </a-layout-content>
        </a-layout>
      </template>
    </div>
  </a-config-provider>
</template>

<script>
import { SideMenu } from "common/src/components";
import { routes } from "@/router";
export default {
  name: "App",
  components: {
    SideMenu
  },
  data() {
    return {
      routes
    };
  },
  computed: {
    singleMod() {
      return !window.__POWERED_BY_QIANKUN__;
    }
  }
};
</script>

<style></style>
