import Vue from "vue";
import Vuex from "vuex";
// 模擬資料.
import data from "../data/data";

Vue.use(Vuex);

const // 新增商品至購物車.
  ADD_SHOPPING_CART = "ADD_SHOPPING_CART",
  // 刪除購物車的商品.
  REMOVE_SHOPPING_CART = "REMOVE_SHOPPING_CART",
  // 新增訂單.
  CREATE_ORDER = "CREATE_ORDER",
  // 訂單確認付款.
  SET_PAYMENT = "SET_PAYMENT";

export default new Vuex.Store({
  state: {
    // 讀取中.
    isLoading: false,

    // 原始資料.
    data: data,

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
  // 只能在這裡設定修改 state 的 methods, 這裡是同步模式.
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
  },
  // 邏輯運算, API 異步模式, 在必要的地方調用 mutations 修改 state.
  actions: {},
  // vuex 的模組化.
  modules: {},
});
