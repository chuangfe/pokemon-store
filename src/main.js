import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 使用 vee-validate 框架, 專門為 vue 準備的表單驗證.
import "./modules/veeValidate";

// 唯一個樣式.
import "./assets/style/main.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
