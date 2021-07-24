import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 商品資料.
const data = {
  // 精靈球.
  ball: {
    name: "精靈球",
    imageSrc: "./images/poke-ball-00.png",
    alt: "poke-ball",
    merchandises: [
      {
        id: "poke-ball-00",
        // 商品分類.
        category: "ball",
        categoryName: "精靈球",
        // 商品名稱.
        name: "精靈球",
        // 商品說明.
        text:
          "是精靈寶可夢世界中隨處可見的一種道具。精靈球的作用是捕捉或者攜帶寶可夢，不同種類的精靈球擁有不同的特殊效果。",
        // 商品圖片.
        imageSrc: "./images/poke-ball-00.png",
        // 圖片屬性.
        alt: "poke-ball-00",
        // 商品庫存.
        remaining: 10,
        // 商品售價.
        originalPrice: 200,
        // 商品特價.
        specialPrice: false,
        // 商品特價的折扣.
        specialOffer: false,
      },
      {
        id: "poke-ball-01",
        category: "ball",
        categoryName: "精靈球",
        name: "精靈球X3",
        text:
          "是精靈寶可夢世界中隨處可見的一種道具。精靈球的作用是捕捉或者攜帶寶可夢，不同種類的精靈球擁有不同的特殊效果。",
        imageSrc: "./images/poke-ball-01.png",
        alt: "poke-ball-01",
        remaining: 0,
        originalPrice: 600,
        specialPrice: false,
        specialOffer: false,
      },
      {
        id: "poke-ball-02",
        category: "ball",
        categoryName: "精靈球",
        name: "精靈球X5",
        text:
          "是精靈寶可夢世界中隨處可見的一種道具。精靈球的作用是捕捉或者攜帶寶可夢，不同種類的精靈球擁有不同的特殊效果。",
        imageSrc: "./images/poke-ball-02.png",
        alt: "poke-ball-02",
        remaining: 20,
        originalPrice: 1000,
        specialPrice: 900,
        specialOffer: 0.9,
      },
    ],
  },
  // 藥品.
  drug: {
    name: "藥品",
    imageSrc: "./images/potion.png",
    alt: "potion",
    merchandises: [
      {
        id: "potion",
        category: "drug",
        categoryName: "藥品",
        name: "傷藥",
        text: "噴霧式傷藥。能讓寶可夢回復２０ＨＰ。",
        imageSrc: "./images/potion.png",
        alt: "potion",
        remaining: 12,
        originalPrice: 50,
        specialPrice: false,
        specialOffer: false,
      },
      {
        id: "max-revive",
        category: "drug",
        categoryName: "藥品",
        name: "復活石",
        text: "能讓陷入瀕死的寶可夢重獲生機，並回復所有ＨＰ。",
        imageSrc: "./images/max-revive.png",
        alt: "max-revive",
        remaining: 0,
        originalPrice: 200,
        specialPrice: false,
        specialOffer: false,
      },
    ],
  },
  // 道具.
  props: {
    name: "道具",
    imageSrc: "./images/backpack.png",
    alt: "backpack",
    merchandises: [
      {
        id: "backpack",
        category: "props",
        categoryName: "道具",
        name: "背包",
        text: "每 200 元寶可夢幣(約新台幣 60 元)可讓道具背包上限增加 50 個。",
        imageSrc: "./images/backpack.png",
        alt: "backpack",
        remaining: 12,
        originalPrice: 200,
        specialPrice: 140,
        specialOffer: 0.7,
      },
      {
        id: "lucky-egg",
        category: "props",
        categoryName: "道具",
        name: "幸運蛋",
        text:
          "使用幸運蛋後的 30 分鐘內，每當遇到寶可夢或進化都有雙倍經驗值，可以加快訓練師等級升等速度。",
        imageSrc: "./images/lucky-egg.png",
        alt: "lucky-egg",
        remaining: 12,
        originalPrice: 300,
        specialPrice: false,
        specialOffer: false,
      },
    ],
  },
  // 商城.
  mall: {
    name: "商城",
    imageSrc: "./images/gift-box.png",
    alt: "gift-box",
    merchandises: [
      {
        id: "gold-00",
        category: "mall",
        categoryName: "商城",
        name: "皮卡丘紀念幣",
        text: "寶可夢通用貨幣。",
        imageSrc: "./images/gold-00.png",
        alt: "gold-00",
        remaining: 12,
        originalPrice: 100,
        specialPrice: 50,
        specialOffer: 0.5,
      },
      {
        id: "gold-01",
        category: "mall",
        categoryName: "商城",
        name: "皮卡丘幣X100",
        text: "寶可夢通用貨幣。",
        imageSrc: "./images/gold-01.png",
        alt: "gold-01",
        remaining: 12,
        originalPrice: 10000,
        specialPrice: 5000,
        specialOffer: 0.5,
      },
      {
        id: "gold-02",
        category: "mall",
        categoryName: "商城",
        name: "皮卡丘幣X500",
        text: "寶可夢通用貨幣。",
        imageSrc: "./images/gold-02.png",
        alt: "gold-02",
        remaining: 12,
        originalPrice: 50000,
        specialPrice: 25000,
        specialOffer: 0.5,
      },
      {
        id: "gold-03",
        category: "mall",
        categoryName: "商城",
        name: "皮卡丘幣X1000",
        text: "寶可夢通用貨幣。",
        imageSrc: "./images/gold-03.png",
        alt: "gold-03",
        remaining: 12,
        originalPrice: 100000,
        specialPrice: 50000,
        specialOffer: 0.5,
      },
      {
        id: "camera",
        category: "mall",
        categoryName: "商城",
        name: "相機",
        text: "當你遇到寶可夢時，可以透過 Camera 相機幫它拍照。",
        imageSrc: "./images/camera.png",
        alt: "camera",
        remaining: 1,
        originalPrice: 12000,
        specialPrice: 9600,
        specialOffer: 0.8,
      },
      {
        id: "gift-box",
        category: "mall",
        categoryName: "商城",
        name: "綜合禮物",
        text: "不知道裡面有什麼。",
        imageSrc: "./images/gift-box.png",
        alt: "gift-box",
        remaining: 1,
        originalPrice: 999,
        specialPrice: 99,
        specialOffer: 0.1,
      },
    ],
  },
};

// 新增商品至購物車.
const ADD_SHOPPING_CART = "ADD_SHOPPING_CART",
  // 刪除購物車的商品.
  REMOVE_SHOPPING_CART = "REMOVE_SHOPPING_CART",
  // 新增訂單.
  CREATE_ORDER = "CREATE_ORDER";

export default new Vuex.Store({
  state: {
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

    // 購物車的商品, 物件可能需要 id, 數量, ...
    shoppingCart: [
      {
        // 商品 id.
        id: "poke-ball-00",
        // 商品名稱.
        name: "精靈球",
        // 商品價格.
        price: 200,
        // 購買的數量.
        count: 10,
        // 總額.
        total: 2000,
      },
      {
        id: "backpack",
        name: "背包",
        price: 200,
        count: 8,
        total: 1600,
      },
      {
        id: "potion",
        name: "傷藥",
        price: 50,
        count: 2,
        total: 100,
      },
    ],

    // 訂單資料.
    orderData: {
      name: undefined,
      email: undefined,
      phone: undefined,
      address: undefined,
      merchandises: [],
    },
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
    // calcData 的所有種類.
    categories(state, getters) {
      return Object.keys(getters.calcData);
    },
  },
  // 只能在這裡設定修改 state 的 methods, 這裡是同步模式.
  mutations: {
    // 新增商品至購物車, price 在外面傳入時, 就決定好是原價還是特價.
    [ADD_SHOPPING_CART](state, { id, name, price, count }) {
      const index = state.shoppingCart.findIndex((item) => {
        return item.id === id;
      });

      if (index === -1) {
        state.shoppingCart.push({
          id,
          name,
          price,
          count,
          total: price * count,
        });
      } else {
        let item = state.shoppingCart[index];
        item.count += count;
        item.total = item.price * item.count;
      }
    },
    // 刪除購物車的商品.
    [REMOVE_SHOPPING_CART](state, id) {
      const index = state.shoppingCart.findIndex((item) => {
        return item.id === id;
      });

      state.shoppingCart.splice(index, 1);
    },

    // 新增訂單.
    [CREATE_ORDER](state, { name, email, phone, address }) {
      state.orderData = {
        name,
        email,
        phone,
        address,
        merchandises: state.shoppingCart,
      };
    },
  },
  // 邏輯運算, API 異步模式, 在必要的地方調用 mutations 修改 state.
  actions: {},
  // vuex 的模組化.
  modules: {},
});
