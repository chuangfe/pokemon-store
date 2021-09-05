import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 使用 bootstrap 5.
import "bootstrap/dist/css/bootstrap.css";
// 使用 vee-validate 框架, 專門為 vue 準備的表單驗證.
import "./modules/veeValidate";
// 自訂 plugin.
import selfPlugin from "./plugin/selfPlugin";

// 唯一個樣式.
import "./assets/style/main.scss";

Vue.config.productionTip = false;

// 可以參考 src/plugin/selfPlugin.
Vue.use(selfPlugin, { consoleLog: true });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
