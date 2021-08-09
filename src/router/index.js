import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import test from "@/views/index";
import home from "@/views/home";
import home1 from "@/views/home1";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "test",
    component: home,
    meta: { isTabs: false, isSide: false, moduleName: "main", title: "home" }
  },
  {
    path: "/home1",
    name: "test",
    component: home1,
    meta: { isTabs: false, isSide: false, moduleName: "main", title: "home1" }
  },
  {
    path: "/",
    name: "test",
    component: test,
    meta: { isTabs: false, isSide: false, moduleName: "main", title: "demo" }
  }
];

// 处理重复点击同一个路由报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? `${process.env.VUE_APP_BASE_URL}` : "/",
  isAddAsyncMenuData: false,
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  // 自动调试
  if (!window.__POWERED_BY_QIANKUN__) {
    next();
  } else {
    let rotesData = store.state.routes.routesData;
    if (!router.options.isAddAsyncMenuData) {
      if (rotesData.length > 0) {
        rotesData.forEach(element => {
          router.addRoute(element);
        });
      }
      router.options.isAddAsyncMenuData = true;
      next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
    } else {
      router.options.isAddAsyncMenuData = true;
      next();
    }
  }
});

export default router;
