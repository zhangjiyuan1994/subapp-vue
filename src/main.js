import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import common from "qiankun-vue2-common";
import Common from "common";

Vue.config.productionTip = false;

let instance = null;
// 注册HTTP
Vue.prototype.$http = Common.http();

// 注册common
(function usComponent() {
  Vue.use(Common.Antd);
  Object.keys(Common.component).forEach(i => {
    Vue.component(i, Common.component[i]);
  });
})();

function render(props = {}) {
  const { container } = props;
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {}
export async function mount(props) {
  common.initGlobalState(store, props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}
