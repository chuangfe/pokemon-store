import Vue from "vue";
import Vuex from "vuex";
// 商品資料.
import data from "../data/data";
// 用戶.
import users from "../data/users";

Vue.use(Vuex);

// mutations.
const // 新增商品至購物車.
  ADD_SHOPPING_CART = "ADD_SHOPPING_CART",
  // 刪除購物車的商品.
  REMOVE_SHOPPING_CART = "REMOVE_SHOPPING_CART",
  // 新增訂單.
  CREATE_ORDER = "CREATE_ORDER",
  // 訂單確認付款.
  SET_PAYMENT = "SET_PAYMENT",
  // 登入.
  SIGN_IN = "SIGN_IN",
  // 登出.
  SIGN_OUT = "SIGN_OUT",
  // 新增商品.
  CREATE_MERCHANDISE_MUTATIONS = "CREATE_MERCHANDISE_MUTATIONS",
  // 刪除商品.
  REMOVE_MERCHANDISE_MUTATIONS = "REMOVE_MERCHANDISE_MUTATIONS",
  // 修改商品資料.
  UPDATE_MERCHANDISE_MUTATIONS = "UPDATE_MERCHANDISE_MUTATIONS";

// actions
const // 新增商品.
  CREATE_MERCHANDISE_ACTIONS = "CREATE_MERCHANDISE_ACTIONS",
  // 刪除商品.
  REMOVE_MERCHANDISE_ACTIONS = "REMOVE_MERCHANDISE_ACTIONS",
  // 更新商品.
  UPDATE_MERCHANDISE_ACTIONS = "UPDATE_MERCHANDISE_ACTIONS",
  // 檢查用戶.
  CHECK_USER_ACTIONS = "CHECK_USER_ACTIONS";

export default new Vuex.Store({
  state: {
    // 讀取中.
    isLoading: false,

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
    orders: [],
  },
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
  // 只能在這裡設定修改 state 的 data, 這裡是同步模式.
  mutations: {
    // 新增商品至購物車, price 在外面傳入時, 就決定好是原價還是特價.
    [ADD_SHOPPING_CART](
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

        // 庫存的上限.
        shoppingCartItem.count =
          shoppingCartItem.count > dataItem.remaining
            ? dataItem.remaining
            : shoppingCartItem.count;

        // 重新計算總價.
        shoppingCartItem.total =
          shoppingCartItem.price * shoppingCartItem.count;

        // 返回加入購物車的商品.
        return shoppingCartItem;
      } else {
        // 如果沒有就新增.
        return state.shoppingCart.push({
          id,
          category,
          categoryName,
          name,
          price,
          count,
          total: price * count,
        });
      }
    },

    // 刪除購物車的商品.
    [REMOVE_SHOPPING_CART](state, id) {
      const index = state.shoppingCart.findIndex((item) => {
        return item.id === id;
      });

      return state.shoppingCart.splice(index, 1);
    },

    // 新增訂單.
    [CREATE_ORDER](state, { email, name, phone, address, text, total }) {
      const id = state.orders.length
        ? state.orders[state.orders.length - 1].id + 1
        : 0;

      // 訂單補商品資料.
      const order = {
        // 訂單編號.
        id,
        // 信箱.
        email,
        // 姓名.
        name,
        // 電話.
        phone,
        // 地址.
        address,
        // 訂單補充說明.
        text,
        // 訂單價格.
        total,
        // 訂單商品.
        merchandises: state.shoppingCart,
        // 是否付款.
        payment: false,
      };

      // 新增訂單.
      state.orders.push(order);

      // 清空購物車.
      state.shoppingCart = [];

      // 返回訂單.
      return order;
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
        // 商品分類英文.
        category,
        // 商品的新資料.
        data,
      }
    ) {
      // 修改商品資料.
      state.data[category].merchandises.splice(index, 1, data);
    },

    // 刪除商品.
    [REMOVE_MERCHANDISE_MUTATIONS](state, { category, index }) {
      // 刪除商品.
      state.data[category].merchandises.splice(index, 1);
    },
  },

  // 邏輯運算, API 異步模式, 在必要的地方調用 mutations 修改 state.
  actions: {
    // 新增商品, 商品 id 屬性不能重複.
    [CREATE_MERCHANDISE_ACTIONS]({ getters, commit, dispatch }, payload) {
      // 返回重覆的商品物件, 或是 undefined.
      const repeat = getters.calcData.merchandises.find((item) => {
        return item.id === payload.id;
      });

      // 商品重覆返回的物件有 message 屬性.
      return repeat
        ? // Object, 商品重複.
          { message: "商品 Id 重複", merchandise: repeat }
        : // undefined, 商品沒有重複, 可以新增.
          commit("CREATE_MERCHANDISE_MUTATIONS", payload);
    },

    // 刪除商品.
    [REMOVE_MERCHANDISE_ACTIONS]({ state, getters, commit }, { category, id }) {
      // 找舊商品的資料, 用 id 在 getters.calcData.all 裡面找舊的商品.
      const oldItem = getters.calcData.all.merchandises.find((item) => {
        return item.id === id;
      });

      // 找舊商品的索引, 用舊的商品的資料針對分類找索引.
      const index = state.data[oldItem.category].merchandises.findIndex(
        (item) => {
          return item.id === id;
        }
      );

      // 刪除商品.
      commit("REMOVE_MERCHANDISE_MUTATIONS", { category, index });

      return oldItem;
    },

    // 更新商品, 依靠 id 找商品, 所以商品 id 不可更新.
    [UPDATE_MERCHANDISE_ACTIONS]({ state, getters, commit }, payload) {
      // 找舊商品的資料, 用 id 在 getters.calcData.all 裡面找舊的商品.
      const oldItem = getters.calcData.all.merchandises.find((item) => {
        return item.id === payload.id;
      });
      // 找舊商品的索引, 用舊的商品的資料針對分類找索引.
      const oldIndex = state.data[oldItem.category].merchandises.findIndex(
        (item) => {
          return item.id === payload.id;
        }
      );

      // 商品的分類沒有改變.
      if (payload.category === oldItem.category) {
        commit("UPDATE_MERCHANDISE_MUTATIONS", {
          oldIndex,
          category: payload.category,
          data: payload,
        });
      }
      // 商品分類改變.
      else {
        // 將新的商品新增到指定的的分類.
        commit("CREATE_MERCHANDISE_MUTATIONS", payload);
        // 刪除舊的商品.
        commit("REMOVE_MERCHANDISE_MUTATIONS", {
          category: oldItem.category,
          index: oldIndex,
        });
      }

      // 返回商品的舊資料.
      return oldItem;
    },

    // 用戶檢查
    [CHECK_USER_ACTIONS]({ state, commit }, { email, password }) {
      // 判斷 email 是否已經註冊, 找不到會返回 undefined.
      const user = state.users.find((user) => {
        return user.email === email;
      });

      // 判斷 password 是否正確.
      const check = user ? user.password === password : false;

      // 都正確就登入.
      if (check) commit("SIGN_IN", { email, password });

      // 返回登入狀態.
      return state.isSignIn;
    },
  },
});
