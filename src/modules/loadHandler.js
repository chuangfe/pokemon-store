// 引入 vuex 的資料做為判斷條件.
import Store from "../store/index";

// 假的讀取進度
// 使用在:
// /router/index.js
// /components/RecipientList.vue

// 保存排程.
let timer = null;

function loaded() {
  // 刪除排程.
  clearTimeout(timer);
  // 讀取結束.
  Store.state.isLoading = false;
}

export default {
  // 讀取中.
  isLoading() {
    // 讀取中.
    Store.state.isLoading = true;

    // 刪除排程.
    clearTimeout(timer);
    // 讀取 500 毫秒後成功.
    timer = setTimeout(loaded, Store.state.loadingTime);
  },

  // 讀取完成.
  isLoaded() {
    // 刪除排程.
    clearTimeout(timer);
    // 讀取結束.
    Store.state.isLoading = false;
  },
};
