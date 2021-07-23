// 引入 vuex 的資料做為判斷條件.
import Store from "../store/index";

// 用於檢查 router 跳轉時, route 的參數是否正確.
export default {
  // 檢查進入 Categories 頁面, route category 參數是否正確.
  category(category) {
    // route 參數正確執行 next(), 否則 next(errorPath) 跳轉至指定頁面.
    return Store.getters.categories.indexOf(category) < 0 ? false : true;
  },

  // 檢查進入 Merchandise 頁面, route category id 參數是否正確.
  merchandise({ category, id }) {
    const item = Store.getters.calcData[category].merchandises.find((item) => {
      return item.id === id;
    });

    return item ? true : false;
  },
};
