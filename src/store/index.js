import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const data = {
  // 精靈球.
  ball: {
    name: "精靈球",
    merchandises: [
      {
        // 商品分類.
        category: "精靈球",
        // 商品名稱.
        name: "精靈球",
        // 商品說明.
        text:
          "是精靈寶可夢世界中隨處可見的一種道具。精靈球的作用是捕捉或者攜帶寶可夢，不同種類的精靈球擁有不同的特殊效果。",
        // 商品圖片.
        imageSrc: "./images/poke-ball-00.png",
        // 商品庫存.
        remaining: 10,
        // 商品售價.
        price: 200,
        // 商品特價.
        specialOffer: false,
      },
      {
        category: "精靈球",
        name: "精靈球X3",
        text:
          "是精靈寶可夢世界中隨處可見的一種道具。精靈球的作用是捕捉或者攜帶寶可夢，不同種類的精靈球擁有不同的特殊效果。",
        imageSrc: "./images/poke-ball-01.png",
        remaining: 0,
        price: 200 * 3,
        specialOffer: false,
      },
      {
        category: "精靈球",
        name: "精靈球X5",
        text:
          "是精靈寶可夢世界中隨處可見的一種道具。精靈球的作用是捕捉或者攜帶寶可夢，不同種類的精靈球擁有不同的特殊效果。",
        imageSrc: "./images/poke-ball-02.png",
        remaining: 2,
        price: 200 * 5,
        specialOffer: 0.9,
      },
    ],
  },
  // 藥品.
  drug: {
    name: "藥品",
    merchandises: [
      {
        category: "藥品",
        name: "傷藥",
        text: "噴霧式傷藥。能讓寶可夢回復２０ＨＰ。",
        imageSrc: "./images/potion.png",
        remaining: 12,
        price: 50,
        specialOffer: false,
      },
      {
        category: "藥品",
        name: "復活石",
        text: "能讓陷入瀕死的寶可夢重獲生機，並回復所有ＨＰ。",
        imageSrc: "./images/max-revive.png",
        remaining: 0,
        price: 200,
        specialOffer: false,
      },
    ],
  },
  // 道具.
  props: {
    name: "道具",
    merchandises: [
      {
        category: "道具",
        name: "背包",
        text: "每 200 元寶可夢幣(約新台幣 60 元)可讓道具背包上限增加 50 個。",
        imageSrc: "./images/backpack.png",
        remaining: 12,
        price: 200,
        specialOffer: 0.7,
      },
      {
        category: "道具",
        name: "幸運蛋",
        text:
          "使用幸運蛋後的 30 分鐘內，每當遇到寶可夢或進化都有雙倍經驗值，可以加快訓練師等級升等速度。",
        imageSrc: "./images/lucky-egg.png",
        remaining: 12,
        price: 300,
        specialOffer: false,
      },
    ],
  },
  // 商城.
  mall: {
    name: "商城",
    merchandises: [
      {
        category: "商城",
        name: "皮卡丘紀念幣",
        text: "寶可夢通用貨幣。",
        imageSrc: "./images/gold-00.png",
        remaining: 12,
        price: 200,
        specialOffer: 0.5,
      },
      {
        category: "商城",
        name: "皮卡丘幣X100",
        text: "寶可夢通用貨幣。",
        imageSrc: "./images/gold-01.png",
        remaining: 12,
        price: 200 * 100,
        specialOffer: 0.5,
      },
      {
        category: "商城",
        name: "皮卡丘幣X500",
        text: "寶可夢通用貨幣。",
        imageSrc: "./images/gold-02.png",
        remaining: 12,
        price: 200 * 500,
        specialOffer: 0.5,
      },
      {
        category: "商城",
        name: "皮卡丘幣X10000",
        text: "寶可夢通用貨幣。",
        imageSrc: "./images/gold-03.png",
        remaining: 12,
        price: 200 * 10000,
        specialOffer: 0.5,
      },
      {
        category: "商城",
        name: "相機",
        text: "當你遇到寶可夢時，可以透過 Camera 相機幫它拍照。",
        imageSrc: "./images/camera.png",
        remaining: 1,
        price: 12000,
        specialOffer: 0.8,
      },
      {
        category: "商城",
        name: "綜合禮物",
        text: "不知道裡面有什麼。",
        imageSrc: "./images/gift-box.png",
        remaining: 1,
        price: 999,
        specialOffer: 0.199,
      },
    ],
  },
};

export default new Vuex.Store({
  state: {
    data,
  },
  mutations: {},
  actions: {},
  modules: {},
});
