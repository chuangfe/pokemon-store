import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const data = {
  // 精靈球.
  ball: [
    {
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
      name: "精靈球",
      imageSrc: "./images/poke-ball-01.png",
      remaining: 0,
      price: 600,
      specialOffer: false,
    },
    {
      name: "精靈球",
      imageSrc: "./images/poke-ball-02.png",
      remaining: 2,
      price: 1000,
      specialOffer: 0.9,
    },
  ],
  // 藥品.
  drug: [],
  // 道具.
  props: [],
  // 課金商城.
  mall: [],
};

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
});
