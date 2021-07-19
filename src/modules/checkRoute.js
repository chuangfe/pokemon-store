// 引入 vuex 的資料做為判斷條件.
import Store from "../store/index";

// 用於檢查 router 跳轉時, route 的參數是否正確.
export default {
  // 檢查 route category 參數是否正確.
  category({ category, next, errorPath = "/home" }) {
    // route 參數正確執行 next(), 否則 next(errorPath) 跳轉至指定頁面.
    return Store.getters.categories.indexOf(category) < 0
      ? next(errorPath)
      : next();
  },
};
