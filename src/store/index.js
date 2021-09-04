import Vue from "vue";
import Vuex from "vuex";
// 商品資料.
import data from "../data/data";
// 用戶.
import users from "../data/users";

Vue.use(Vuex);

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

// mutations.
const // 新增商品至購物車.
  ADD_SHOPPING_CART_MUTATIONS = "ADD_SHOPPING_CART_MUTATIONS",
  // 刪除購物車的商品.
  REMOVE_SHOPPING_CART_MUTATIONS = "REMOVE_SHOPPING_CART_MUTATIONS",
  // 新增訂單.
  CREATE_ORDER_MUTATIONS = "CREATE_ORDER_MUTATIONS",
  // 刪除訂單.
  REMOVE_ORDER = "REMOVE_ORDER",
  // 訂單確認付款.
  SET_PAYMENT = "SET_PAYMENT",
  // 登入.
  SIGN_IN = "SIGN_IN",
  // 登出.
  SIGN_OUT = "SIGN_OUT",
  // 讀取中.
  LOADING = "LOADING",
  // 讀取完成.
  LOADED = "LOADED",
  // 新增商品.
  CREATE_MERCHANDISE_MUTATIONS = "CREATE_MERCHANDISE_MUTATIONS",
  // 刪除商品.
  REMOVE_MERCHANDISE_MUTATIONS = "REMOVE_MERCHANDISE_MUTATIONS",
  // 修改商品資料.
  UPDATE_MERCHANDISE_MUTATIONS = "UPDATE_MERCHANDISE_MUTATIONS";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

// actions.
const // 搜尋商品.
  SEARCH_MERCHANDISE_ACTIONS = "SEARCH_MERCHANDISE_ACTIONS",
  // 新增商品.
  CREATE_MERCHANDISE_ACTIONS = "CREATE_MERCHANDISE_ACTIONS",
  // 刪除商品.
  REMOVE_MERCHANDISE_ACTIONS = "REMOVE_MERCHANDISE_ACTIONS",
  // 更新商品.
  UPDATE_MERCHANDISE_ACTIONS = "UPDATE_MERCHANDISE_ACTIONS",
  // 檢查用戶.
  CHECK_USER_ACTIONS = "CHECK_USER_ACTIONS",
  // 新增商品至購物車.
  ADD_SHOPPING_CART_ACTIONS = "ADD_SHOPPING_CART_ACTIONS",
  // 刪除購物車的商品.
  REMOVE_SHOPPING_CART_ACTIONS = "REMOVE_SHOPPING_CART_ACTIONS",
  // 新增訂單.
  CREATE_ORDER_ACTIONS = "CREATE_ORDER_ACTIONS",
  // 刪除訂單.
  REMOVE_ORDER_ACTIONS = "REMOVE_ORDER_ACTIONS";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

export default new Vuex.Store({
  state: {
    // 讀取中.
    isLoading: false,
    // 讀取時間.
    loadingTime: 500,

    // 原始資料.
    data,

    // 已註冊的用戶們.
    users,

    // 當前登入的用戶.
    user: {},
    // 登入狀態.
    isSignIn: false,

    // 輪播圖片.
    slides: [
      {
        src: "./images/slide-00.jpg",
        alt: "slide-00",
      },
      {
        src: "./images/slide-01.jpg",
        alt: "slide-01",
      },
      {
        src: "./images/slide-02.jpg",
        alt: "slide-02",
      },
      {
        src: "./images/slide-03.jpg",
        alt: "slide-03",
      },
      {
        src: "./images/slide-04.jpg",
        alt: "slide-04",
      },
    ],

    /**
     * 購物車的商品, 物件可能需要 id, 數量, ...
     * price 在 component 新增時, 就需要判斷好使用原價還是特價.
     */
    shoppingCart: [
      {
        // 商品 id.
        id: "poke-ball-00",
        // 商品分類英文.
        category: "ball",
        // 商品分類中文.
        categoryName: "精靈球",
        // 商品名稱.
        name: "精靈球",
        // 商品價格.
        price: 200,
        // 購買的數量.
        count: 8,
        // 總額.
        total: 1600,
      },
      {
        id: "potion",
        category: "drug",
        categoryName: "藥品",
        name: "傷藥",
        price: 50,
        count: 2,
        total: 100,
      },
      {
        id: "backpack",
        category: "props",
        categoryName: "道具",
        name: "背包",
        price: 140,
        count: 1,
        total: 140,
      },
    ],

    // 訂單.
    orders: [
      {
        id: 0,
        email: "aaa@aaa.aa",
        name: "Tired",
        phone: "0912345678",
        address: "不可以輸入英文",
        text: "沒有備註",
        merchandises: [
          {
            id: "poke-ball-00",
            category: "ball",
            categoryName: "精靈球",
            name: "精靈球",
            price: 200,
            count: 8,
            total: 1600,
          },
          {
            id: "potion",
            category: "drug",
            categoryName: "藥品",
            name: "傷藥",
            price: 50,
            count: 2,
            total: 100,
          },
          {
            id: "backpack",
            category: "props",
            categoryName: "道具",
            name: "背包",
            price: 140,
            count: 1,
            total: 140,
          },
        ],
        total: 1840,
        payment: true,
      },
      {
        id: 1,
        email: "aaa@aaa.aa",
        name: "Tired",
        phone: "0912345678",
        address: "不可以輸入英文",
        text: "沒有備註",
        merchandises: [
          {
            id: "poke-ball-00",
            category: "ball",
            categoryName: "精靈球",
            name: "精靈球",
            price: 200,
            count: 6,
            total: 1200,
          },
          {
            id: "potion",
            category: "drug",
            categoryName: "藥品",
            name: "傷藥",
            price: 50,
            count: 10,
            total: 500,
          },
          {
            id: "backpack",
            category: "props",
            categoryName: "道具",
            name: "背包",
            price: 140,
            count: 2,
            total: 280,
          },
        ],
        total: 1980,
        payment: false,
      },
      {
        id: 2,
        email: "aaa@aaa.aa",
        name: "Tired",
        phone: "0912345678",
        address: "不可以輸入英文",
        text: "沒有備註",
        merchandises: [
          {
            id: "poke-ball-00",
            category: "ball",
            categoryName: "精靈球",
            name: "精靈球",
            price: 200,
            count: 1,
            total: 200,
          },
          {
            id: "potion",
            category: "drug",
            categoryName: "藥品",
            name: "傷藥",
            price: 50,
            count: 1,
            total: 50,
          },
          {
            id: "backpack",
            category: "props",
            categoryName: "道具",
            name: "背包",
            price: 140,
            count: 10,
            total: 1400,
          },
        ],
        total: 1650,
        payment: false,
      },
    ],
  },

  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------

  // 相當於 vm 的 computed.
  getters: {
    // 補充 all 選項的所有商品.
    calcData(state) {
      const calcData = Object.assign({}, state.data);

      calcData.all = {
        name: "全部商品",
        imageSrc: "./images/gold-00.png",
        alt: "gold",
        merchandises: [],
      };

      for (let key in state.data) {
        calcData.all.merchandises = calcData.all.merchandises.concat(
          state.data[key].merchandises
        );
      }

      return calcData;
    },

    // calcData 所有的商品類型.
    categories(state, getters) {
      return Object.keys(getters.calcData);
    },
  },

  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------

  // 只能在這裡設定修改 state 的 data, 這裡是同步模式.
  mutations: {
    // 新增商品至購物車, price 在外面傳入時, 就決定好是原價還是特價.
    [ADD_SHOPPING_CART_MUTATIONS](
      state,
      { id, category, categoryName, name, price, count }
    ) {
      // data 的商品資料.
      const dataItem = state.data[category].merchandises.find((item) => {
        return item.id === id;
      });

      // 購物車的商品資料.
      const shoppingCartItem = state.shoppingCart.find((item) => {
        return item.id === id;
      });

      // 如果 shoppingCart 裡面已經有, 要新增的商品時.
      if (shoppingCartItem) {
        // 單件商品購買數量增加.
        shoppingCartItem.count += count;

        // 重新計算總價.
        shoppingCartItem.total = Math.floor(
          shoppingCartItem.price * shoppingCartItem.count
        );
      } else {
        // 如果沒有就新增.
        return state.shoppingCart.push({
          id,
          category,
          categoryName,
          name,
          price,
          count,
          total: Math.floor(price * count),
        });
      }
    },

    // 刪除購物車的商品.
    [REMOVE_SHOPPING_CART_MUTATIONS](state, id) {
      const index = state.shoppingCart.findIndex((item) => {
        return item.id === id;
      });

      state.shoppingCart.splice(index, 1);
    },

    // 新增訂單.
    [CREATE_ORDER_MUTATIONS](state, payload) {
      // 新增訂單.
      state.orders.push(payload);
      // 清空購物車.
      state.shoppingCart = [];
    },

    // 刪除訂單.
    [REMOVE_ORDER](state, id) {
      const index = state.orders.findIndex((order) => order.id === id);

      state.orders.splice(index, 1);
    },

    // 確認付款.
    [SET_PAYMENT](state, id) {
      const item = state.orders.find((item) => {
        return item.id == id;
      });

      item.payment = true;
    },

    // 登入.
    [SIGN_IN](state, { email, password }) {
      state.user = { email, password };
      state.isSignIn = true;
    },

    // 登出.
    [SIGN_OUT](state) {
      // 清空當前使用者.
      state.user = {};
      // 已登出.
      state.isSignIn = false;
    },

    // 讀取中.
    [LOADING](state) {
      state.isLoading = true;
    },

    // 讀取完成.
    [LOADED](state) {
      state.isLoading = false;
    },

    // 新增商品, 只能在 actions 內使用.
    [CREATE_MERCHANDISE_MUTATIONS](state, payload) {
      state.data[payload.category].merchandises.push(payload);
    },

    // 修改商品資料, 只能在 actions 內使用.
    [UPDATE_MERCHANDISE_MUTATIONS](
      state,
      {
        // 商品的 index
        index,
        // 商品的新資料.
        merchandiseData,
      }
    ) {
      // 修改商品資料.
      state.data[merchandiseData.category].merchandises.splice(
        index,
        1,
        merchandiseData
      );
    },

    // 刪除商品.
    [REMOVE_MERCHANDISE_MUTATIONS](state, { index, merchandiseData }) {
      // 刪除商品.
      state.data[merchandiseData.category].merchandises.splice(index, 1);
    },
  },

  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------

  // 邏輯運算, API 異步模式, 在必要的地方調用 mutations 修改 state.
  actions: {
    // 因為更新商品可能會改變商品分類, 所以只使用 id 搜尋商品.
    // payload 應該是陣列包覆物件, 並且物件內有 id category 的值.
    [SEARCH_MERCHANDISE_ACTIONS]({ state, commit }, payload) {
      // 讀取中.
      commit("LOADING");

      return new Promise((resolve, reject) => {
        const dataArr = [];

        payload.forEach((item, i) => {
          // 分類中的全部商品.
          let merchandises = state.data[item.category].merchandises;
          // 舊的商品索引.
          let index = merchandises.findIndex((item) => {
            return item.id === payload[i].id;
          });

          dataArr.push({
            index,
            // 舊的商品資料.
            oldItem: merchandises[index],
          });
        });

        setTimeout(() => {
          // 讀取完成.
          commit("LOADED");

          resolve(dataArr);
        }, state.loadingTime);
      });
    },

    // 新增商品, 商品 id 屬性不能重複.
    async [CREATE_MERCHANDISE_ACTIONS]({ commit, dispatch }, payload) {
      // 找舊商品的資料與索引, 沒找到相同 id 的商品, 會拿到空陣列.
      const result = (
        await dispatch("SEARCH_MERCHANDISE_ACTIONS", [payload])
      )[0];

      // 需要新增的商品的 id 與舊的商品的 id 重複.
      const errorData = {
        message: "商品 Id 重複",
        merchandise: result.oldItem,
      };

      // !undefined 才能發出 commit 事件.
      if (!result.oldItem) {
        // 新增商品.
        commit("CREATE_MERCHANDISE_MUTATIONS", payload);
      }

      return !result.oldItem
        ? // 商品 id 沒有重複, 返回新增的商品.
          payload
        : errorData;
    },

    // 刪除商品.
    async [REMOVE_MERCHANDISE_ACTIONS]({ commit, dispatch }, payload) {
      // 找舊商品的資料與索引.
      const result = (
        await dispatch("SEARCH_MERCHANDISE_ACTIONS", [payload])
      )[0];

      // 刪除商品.
      commit("REMOVE_MERCHANDISE_MUTATIONS", {
        index: result.index,
        merchandiseData: result.oldItem,
      });

      // 返回被刪除的商品.
      return result.oldItem;
    },

    // 更新商品, 依靠 id 找商品, 所以商品 id 不可更新.
    async [UPDATE_MERCHANDISE_ACTIONS]({ commit, dispatch }, payload) {
      // 找舊商品的資料與索引.
      const result = (
        await dispatch("SEARCH_MERCHANDISE_ACTIONS", [payload])
      )[0];

      // 商品的分類沒有改變.
      if (result.oldItem.category === payload.category) {
        commit("UPDATE_MERCHANDISE_MUTATIONS", {
          index: result.index,
          merchandiseData: payload,
        });
      }
      // 商品分類改變.
      else {
        // 將新的商品新增到指定的的分類.
        commit("CREATE_MERCHANDISE_MUTATIONS", payload);
        // 刪除舊的商品.
        commit("REMOVE_MERCHANDISE_MUTATIONS", {
          index: result.index,
          merchandiseData: result.oldItem,
        });
      }

      // 返回商品的舊資料.
      return result.oldItem;
    },

    // 用戶檢查
    [CHECK_USER_ACTIONS]({ state, commit }, { email, password }) {
      // 讀取中.
      commit("LOADING");

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // 判斷 email 是否已經註冊, 找不到會返回 undefined.
          const user = state.users.find((user) => {
            return user.email === email;
          });
          // 判斷 password 是否正確.
          const check = user ? user.password === password : false;

          // 正確登入, 否則登出.
          check ? commit("SIGN_IN", { email, password }) : commit("SIGN_OUT");

          // 讀取完成.
          commit("LOADED");

          // 返回登入狀態.
          resolve(state.isSignIn);
        }, state.loadingTime);
      });
    },

    // 新增商品至購物車.
    async [ADD_SHOPPING_CART_ACTIONS]({ commit, dispatch }, payload) {
      // 找舊商品的資料與索引.
      const result = (
        await dispatch("SEARCH_MERCHANDISE_ACTIONS", [payload])
      )[0];

      // 商品物件複製.
      const data = Object.assign({}, result.oldItem);

      // 減少商品庫存.
      data.remaining -= payload.count;

      // 商品資料更新.
      commit("UPDATE_MERCHANDISE_MUTATIONS", {
        // 商品的索引.
        index: result.index,
        // 商品的新資料.
        merchandiseData: data,
      });

      // 新增商品至購物車, 已經在 component 調整過物件的資料格式.
      commit("ADD_SHOPPING_CART_MUTATIONS", payload);

      // 返回新增至購物車的商品資料.
      return data;
    },

    // 刪除購物車的商品.
    async [REMOVE_SHOPPING_CART_ACTIONS]({ commit, dispatch }, payload) {
      // 找舊商品的資料與索引.
      const result = (
        await dispatch("SEARCH_MERCHANDISE_ACTIONS", [payload])
      )[0];
      // 商品物件複製.
      const data = Object.assign({}, result.oldItem);

      // 增加商品庫存.
      data.remaining += payload.count;

      // 商品資料更新.
      commit("UPDATE_MERCHANDISE_MUTATIONS", {
        // 商品的索引.
        index: result.index,
        // 商品的新資料.
        merchandiseData: data,
      });

      // 刪除購物車內的商品.
      commit("REMOVE_SHOPPING_CART_MUTATIONS", payload.id);

      return result;
    },

    // 新增訂單, 還需要刪除剩餘商品數量.
    async [CREATE_ORDER_ACTIONS]({ state, commit }, payload) {
      // 訂單 id.
      payload.id = state.orders.length
        ? state.orders[state.orders.length - 1].id + 1
        : 0;
      // 訂單商品.
      payload.merchandises = state.shoppingCart;
      // 訂單是否付款.
      payload.payment = false;

      // 新增訂單.
      commit("CREATE_ORDER_MUTATIONS", payload);

      // 返回新增的訂單.
      return payload;
    },

    // 刪除訂單.
    // payload 是訂單資料.
    async [REMOVE_ORDER_ACTIONS]({ commit, dispatch }, payload) {
      // 找舊商品的資料與索引, 訂單可能會只有一個商品.
      const resultArr = await dispatch(
        "SEARCH_MERCHANDISE_ACTIONS",
        payload.merchandises
      );

      // 依照刪除的訂單商品, 增加商品數存.
      resultArr.forEach((el, i) => {
        // 複製物件.
        const data = Object.assign({}, el.oldItem);
        // 減少商品庫存.
        data.remaining += payload.merchandises[i].count;
        // 更新商品資料.
        commit("UPDATE_MERCHANDISE_MUTATIONS", {
          // 商品的索引.
          index: el.index,
          // 商品的新資料.
          merchandiseData: data,
        });
      });

      // 刪除訂單.
      commit("REMOVE_ORDER", payload.id);

      return payload;
    },
  },
});
