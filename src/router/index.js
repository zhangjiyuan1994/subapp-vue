import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/welcome",
    name: "welcome",
    moduleName: "subapp-monitor",
    component: () => import("@/views/index.vue"),
    meta: {
      cname: "WELCOME",
    },
  },
];

// 处理重复点击同一个路由报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? `${process.env.VUE_APP_BASE_URL}` : "/",
  isAddAsyncMenuData: false,
  mode: "history",
  routes,
});

export default router;
export { routes };
