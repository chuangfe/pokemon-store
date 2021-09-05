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
  PUSH_SHOPPING_CART_MUTATIONS = "PUSH_SHOPPING_CART_MUTATIONS",
  // 刪除購物車的商品.
  REMOVE_SHOPPING_CART_MUTATIONS = "REMOVE_SHOPPING_CART_MUTATIONS",
  // 更新購物車的商品.
  UPDATE_SHOPPING_CART_MUTATIONS = "UPDATE_SHOPPING_CART_MUTATIONS",
  // 新增訂單.
  CREATE_ORDER_MUTATIONS = "CREATE_ORDER_MUTATIONS",
  // 刪除訂單.
  REMOVE_ORDER_MUTATIONS = "REMOVE_ORDER_MUTATIONS",
  // 訂單確認付款.
  SET_PAYMENT_MUTATIONS = "SET_PAYMENT_MUTATIONS",
  // 登入.
  SIGN_IN_MUTATIONS = "SIGN_IN_MUTATIONS",
  // 登出.
  SIGN_OUT_MUTATIONS = "SIGN_OUT_MUTATIONS",
  // 讀取中.
  LOADING_MUTATIONS = "LOADING_MUTATIONS",
  // 讀取完成.
  LOADED_MUTATIONS = "LOADED_MUTATIONS",
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
const // 搜尋 data 與 shopping 的商品.
  SEARCH_DATA_ACTIONS = "SEARCH_DATA_ACTIONS",
  // 新增商品至購物車.
  UPDATE_SHOPPING_CART_ACTIONS = "UPDATE_SHOPPING_CART_ACTIONS",
  // 刪除購物車的商品.
  REMOVE_SHOPPING_CART_ACTIONS = "REMOVE_SHOPPING_CART_ACTIONS",
  // 新增訂單.
  CREATE_ORDER_ACTIONS = "CREATE_ORDER_ACTIONS",
  // 刪除訂單.
  REMOVE_ORDER_ACTIONS = "REMOVE_ORDER_ACTIONS",
  // 新增商品.
  CREATE_MERCHANDISE_ACTIONS = "CREATE_MERCHANDISE_ACTIONS",
  // 刪除商品.
  REMOVE_MERCHANDISE_ACTIONS = "REMOVE_MERCHANDISE_ACTIONS",
  // 更新商品.
  UPDATE_MERCHANDISE_ACTIONS = "UPDATE_MERCHANDISE_ACTIONS",
  // 檢查用戶.
  CHECK_USER_ACTIONS = "CHECK_USER_ACTIONS";

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

    // 購物車的商品
    shoppingCart: {
      merchandises: [
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

      total: 1840,
    },

    // 訂單.
    orders: [
      {
        id: 0,
        email: "aaa@aaa.aa",
        name: "Tired",
        phone: "0912345678",
        address: "不可以輸入英文",
        text: "沒有備註",
        shoppingCart: {
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
        },
        payment: true,
      },
      {
        id: 1,
        email: "aaa@aaa.aa",
        name: "Tired",
        phone: "0912345678",
        address: "不可以輸入英文",
        text: "沒有備註",
        shoppingCart: {
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
        },
        payment: false,
      },
      {
        id: 2,
        email: "aaa@aaa.aa",
        name: "Tired",
        phone: "0912345678",
        address: "不可以輸入英文",
        text: "沒有備註",
        shoppingCart: {
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
        },
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
    [PUSH_SHOPPING_CART_MUTATIONS](state, payload) {
      // 將商品 push 至購物車.
      state.shoppingCart.merchandises.push(payload);

      // 計算購物車總額.
      const total = state.shoppingCart.merchandises.reduce(
        (sum, item, index) => {
          return Math.floor((sum = sum + item.total));
        },
        0
      );

      state.shoppingCart.total = total;
    },

    // 更新購物車內商品.
    [UPDATE_SHOPPING_CART_MUTATIONS](
      state,
      { shoppingCartIndex, shoppingCartData }
    ) {
      state.shoppingCart.merchandises.splice(
        shoppingCartIndex,
        1,
        shoppingCartData
      );

      // 計算購物車總額.
      const total = state.shoppingCart.merchandises.reduce(
        (sum, item, index) => {
          return Math.floor((sum = sum + item.total));
        },
        0
      );

      state.shoppingCart.total = total;
    },

    // 刪除購物車的商品.
    [REMOVE_SHOPPING_CART_MUTATIONS](state, { shoppingCartIndex }) {
      state.shoppingCart.merchandises.splice(shoppingCartIndex, 1);

      // 計算購物車總額.
      const total = state.shoppingCart.merchandises.reduce(
        (sum, item, index) => {
          return Math.floor((sum = sum + item.total));
        },
        0
      );

      state.shoppingCart.total = total;
    },

    // 新增訂單.
    [CREATE_ORDER_MUTATIONS](state, payload) {
      // 新增訂單.
      state.orders.push(payload);
      // 清空購物車.
      state.shoppingCart = {
        merchandises: [],
        total: 0,
      };
    },

    // 刪除訂單.
    [REMOVE_ORDER_MUTATIONS](state, index) {
      state.orders.splice(index, 1);
    },

    // 確認付款.
    [SET_PAYMENT_MUTATIONS](state, id) {
      const order = state.orders.find((order) => {
        return order.id == id;
      });

      order.payment = true;
    },

    // 登入.
    [SIGN_IN_MUTATIONS](state, { email, password }) {
      state.user = { email, password };
      state.isSignIn = true;
    },

    // 登出.
    [SIGN_OUT_MUTATIONS](state) {
      // 清空當前使用者.
      state.user = {};
      // 已登出.
      state.isSignIn = false;
    },

    // 讀取中.
    [LOADING_MUTATIONS](state) {
      state.isLoading = true;
    },

    // 讀取完成.
    [LOADED_MUTATIONS](state) {
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
        merchandiseIndex,
        // 商品的新資料.
        merchandiseData,
      }
    ) {
      // 修改商品資料.
      state.data[merchandiseData.category].merchandises.splice(
        merchandiseIndex,
        1,
        merchandiseData
      );
    },

    // 刪除商品.
    [REMOVE_MERCHANDISE_MUTATIONS](
      state,
      { merchandiseIndex, merchandiseData }
    ) {
      // 刪除商品.
      state.data[merchandiseData.category].merchandises.splice(
        merchandiseIndex,
        1
      );
    },
  },

  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------

  // 邏輯運算, API 異步模式, 在必要的地方調用 mutations 修改 state.
  actions: {
    // 尋找商品在 data shoppingCart 內各自的資料與索引.
    [SEARCH_DATA_ACTIONS]({ state, commit }, payload) {
      // 讀取中.
      commit("LOADING_MUTATIONS");

      // 回傳的陣列.
      const resultArr = [];

      payload.forEach((item, i) => {
        // 縮短 merchandises 屬性長度.
        const merchandises = state.data[payload[i].category].merchandises;
        // 找 data 商品的索引.
        const merchandiseIndex = merchandises.findIndex(
          (item) => item.id === payload[i].id
        );

        // 縮短 shoppingCart 屬性長度.
        const shoppingCart = state.shoppingCart.merchandises;
        // 找 shoppingCart 商品的索引.
        const shoppingCartIndex = shoppingCart.findIndex(
          (item) => item.id === payload[i].id
        );

        resultArr.push({
          merchandiseIndex,
          merchandiseData: merchandises[merchandiseIndex],
          shoppingCartIndex,
          shoppingCartData: shoppingCart[shoppingCartIndex],
        });
      });

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // 讀取完成.
          commit("LOADED_MUTATIONS");

          resolve(resultArr);
        }, state.loadingTime);
      });
    },

    // 新增商品至購物車.
    // 需要修改, 搜尋購物車內有無商品, 選擇修改數量或是加入購物車.
    /**
     * 新增商品至購物車.
     * @param {Object} payload
     * @param {String} payload.id
     * @param {String} payload.category
     * @param {String} payload.categoryName
     * @param {String} payload.name
     * @param {Number} payload.price
     * @param {Number} payload.count
     * @param {Number} payload.total
     */
    async [UPDATE_SHOPPING_CART_ACTIONS]({ commit, dispatch }, payload) {
      // 找 data 與 shopping 的商品資料與索引.
      const result = (await dispatch("SEARCH_DATA_ACTIONS", [payload]))[0];
      // data 商品物件複製.
      const merchandiseNewData = Object.assign({}, result.merchandiseData);
      // 購物車商品複製, 這個可能是空物件.
      const shoppingCartNewData = Object.assign({}, result.shoppingCartData);

      // 商品減少庫存.
      merchandiseNewData.remaining -= payload.count;
      // 商品資料更新.
      commit("UPDATE_MERCHANDISE_MUTATIONS", {
        // 商品的索引.
        merchandiseIndex: result.merchandiseIndex,
        // 商品的新資料.
        merchandiseData: merchandiseNewData,
      });

      // 購物車內沒有該商品.
      if (result.shoppingCartIndex === -1) {
        // 新增商品至購物車, 已經在 component 調整過物件的資料格式.
        commit("PUSH_SHOPPING_CART_MUTATIONS", payload);
      }
      // 購物車內有該商品.
      else {
        shoppingCartNewData.count += payload.count;
        shoppingCartNewData.total = Math.floor(
          shoppingCartNewData.price * shoppingCartNewData.count
        );

        // 修改購物車內商品, 已經在 component 調整過物件的資料格式.
        commit("UPDATE_SHOPPING_CART_MUTATIONS", {
          shoppingCartIndex: result.shoppingCartIndex,
          shoppingCartData: shoppingCartNewData,
        });
      }

      // 返回新增至購物車的商品資料.
      return payload;
    },

    // 刪除購物車的商品.
    async [REMOVE_SHOPPING_CART_ACTIONS]({ commit, dispatch }, payload) {
      // 找 data 與 shopping 的商品資料與索引.
      const result = (await dispatch("SEARCH_DATA_ACTIONS", [payload]))[0];
      // 商品 data 物件複製.
      const merchandiseData = Object.assign({}, result.merchandiseData);

      // 增加商品庫存.
      merchandiseData.remaining += payload.count;
      // 商品資料更新.
      commit("UPDATE_MERCHANDISE_MUTATIONS", {
        // 商品的索引.
        merchandiseIndex: result.merchandiseIndex,
        // 商品的新資料.
        merchandiseData: merchandiseData,
      });

      // 刪除購物車內的商品.
      commit("REMOVE_SHOPPING_CART_MUTATIONS", result.shoppingCartIndex);

      // 返回被刪除的商品.
      return payload;
    },

    // 新增訂單.
    [CREATE_ORDER_ACTIONS]({ state, commit }, payload) {
      // 訂單 id.
      payload.id = state.orders.length
        ? state.orders[state.orders.length - 1].id + 1
        : 0;
      // 訂單商品.
      payload.shoppingCart = state.shoppingCart;
      // 訂單是否付款.
      payload.payment = false;

      // 新增訂單.
      commit("CREATE_ORDER_MUTATIONS", payload);

      // 返回新增的訂單.
      return payload;
    },

    // 刪除訂單, payload 是 order data 訂單資料.
    async [REMOVE_ORDER_ACTIONS]({ state, commit, dispatch }, payload) {
      // 找舊商品的資料與索引, 訂單可能會只有一個商品.
      const resultArr = await dispatch(
        "SEARCH_DATA_ACTIONS",
        payload.shoppingCart.merchandises
      );
      const orderIndex = state.orders.findIndex((order) => {
        return order.id === payload.id;
      });

      // 對 search 回來的陣列迴圈.
      resultArr.forEach((result) => {
        // 複製 data 的商品物件.
        const merchandiseData = Object.assign({}, result.merchandiseData);
        // 減少商品庫存.
        merchandiseData.remaining += result.shoppingCartData.count;

        // 更新商品資料.
        commit("UPDATE_MERCHANDISE_MUTATIONS", {
          // 商品的索引.
          merchandiseIndex: result.merchandiseIndex,
          // 商品的新資料.
          merchandiseData,
        });
      });

      // 刪除訂單.
      commit("REMOVE_ORDER_MUTATIONS", orderIndex);

      // 返回被刪除的訂單.
      return payload;
    },

    // 新增商品, 商品 id 屬性不能重複.
    async [CREATE_MERCHANDISE_ACTIONS]({ commit, dispatch }, payload) {
      // 找舊商品的資料與索引, 沒找到相同 id 的商品, 會拿到空陣列.
      const result = (await dispatch("SEARCH_DATA_ACTIONS", [payload]))[0];

      // 需要新增的商品的 id 與舊的商品的 id 重複.
      const errorData = {
        message: "商品 Id 重複",
        merchandiseData: result.merchandiseData,
      };

      // undefined 才能發出 commit 事件.
      if (result.merchandiseData === undefined) {
        // 新增商品.
        commit("CREATE_MERCHANDISE_MUTATIONS", payload);
      }

      return result.merchandiseData === undefined
        ? // 商品 id 沒有重複, 返回新增的商品.
          payload
        : // 商品重覆, 返回重複的商品.
          errorData;
    },

    // 刪除商品.
    async [REMOVE_MERCHANDISE_ACTIONS]({ commit, dispatch }, payload) {
      // 找舊商品的資料與索引.
      const result = (await dispatch("SEARCH_DATA_ACTIONS", [payload]))[0];

      // 刪除商品.
      commit("REMOVE_MERCHANDISE_MUTATIONS", {
        merchandiseIndex: result.merchandiseIndex,
        merchandiseData: result.merchandiseData,
      });

      // 返回被刪除的商品.
      return result.merchandiseData;
    },

    // 更新商品, 依靠 id 找商品, 所以商品 id 不可更新.
    async [UPDATE_MERCHANDISE_ACTIONS]({ commit, dispatch }, payload) {
      // 找舊商品的資料與索引.
      const result = (await dispatch("SEARCH_DATA_ACTIONS", [payload]))[0];

      // 新增商品.
      if (result.merchandiseIndex === -1) {
        commit("CREATE_MERCHANDISE_MUTATIONS", payload);
      }
      // 修改商品.
      else {
        // 商品的分類沒有改變.
        if (result.merchandiseData.category === payload.category) {
          commit("UPDATE_MERCHANDISE_MUTATIONS", {
            merchandiseIndex: result.merchandiseIndex,
            merchandiseData: payload,
          });
        }
        // 商品分類改變.
        else {
          // 刪除舊的商品.
          commit("REMOVE_MERCHANDISE_MUTATIONS", {
            merchandiseIndex: result.merchandiseIndex,
            merchandiseData: result.merchandiseData,
          });
          // 將新的商品新增到指定的的分類.
          commit("CREATE_MERCHANDISE_MUTATIONS", payload);
        }
      }

      // result.merchandiseData === undefined, 代表是新增的商品.
      return result.merchandiseData === undefined
        ? // 返回新增的商品.
          payload
        : // 返回修改前的商品資料.
          result.merchandiseData;
    },

    // 用戶檢查.
    [CHECK_USER_ACTIONS]({ state, commit }, { email, password }) {
      // 讀取中.
      commit("LOADING_MUTATIONS");

      // 判斷 email 是否已經註冊, 找不到會返回 undefined.
      const user = state.users.find((user) => {
        return user.email === email;
      });
      // 判斷 password 是否正確.
      const check = user ? user.password === password : false;

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // 正確登入, 否則登出.
          check
            ? commit("SIGN_IN_MUTATIONS", { email, password })
            : commit("SIGN_OUT_MUTATIONS");

          // 讀取完成.
          commit("LOADED_MUTATIONS");

          // 返回登入狀態.
          resolve(state.isSignIn);
        }, state.loadingTime);
      });
    },
  },
});
