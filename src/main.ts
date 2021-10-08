import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import Antds from "common/src/utils/antds";
import { zhCN, default as commonInstall } from "common";

import directives from "common/src/directives";
Vue.config.productionTip = false;

// 注册common
Vue.use(Antds);
// 使用directives
Vue.use(directives);
// 使用组件
Vue.prototype.$zhCN = zhCN;
commonInstall.install(Vue);

let instance: any = null;
function render(props: any = {}) {
  const { container, store } = props;
  Vue.observable(store);
  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {}
export async function mount(props: unknown): Promise<void> {
  render(props);
}
export async function unmount(): Promise<void> {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}
