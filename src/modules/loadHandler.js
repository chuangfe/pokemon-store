// 引入 vuex 的資料做為判斷條件.
import Store from "../store/index";

// 保存排程.
let timer = null;

// 應該寫在 api 回調, component mounted, 各種真正讀資料的地方.
function loaded() {
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
    timer = setTimeout(loaded, 500);
  },

  // 讀取完成.
  // isLoaded() {
  //   Store.state.isLoading = false;
  // },
};
