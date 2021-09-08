import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import Vuex from "vuex";
import Antds from "common/src/utils/antds";
import { zhCN, default as commonInstall } from "common";

import directives from "common/src/directives";
Vue.config.productionTip = false;

// 注册common
Vue.use(Antds);
Vue.use(Vuex);
// 使用directives
Vue.use(directives);

commonInstall.install(Vue);

Vue.prototype.$zhCN = zhCN;
let instance = null;
function render(props = {}) {
  const { container, store } = props;
  Vue.observable(store);
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
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}
