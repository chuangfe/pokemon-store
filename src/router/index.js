import Vue from "vue";
import VueRouter from "vue-router";
// 引入 vuex 的資料, 作為登入判斷.
import Store from "../store/index";

// 首頁.
import Home from "../views/Home.vue";
// 商品分類頁面.
import Categories from "../views/Categories.vue";
// 商品詳細介紹頁面.
import Merchandise from "../views/Merchandise.vue";
// 購物車頁面.
import ShoppingCart from "../views/ShoppingCart.vue";
// 訂單確認頁面
import Orders from "../views/Orders.vue";
// 登入頁面.
import SignIn from "../views/SignIn.vue";
// 後台頁面.
import BackSide from "../views/BackSide.vue";
// 後台商品頁面.
import BackSideMerchandises from "../components/BackSideMerchandises.vue";
// 後台訂單頁面
import BackSideOrders from "../components/BackSideOrders.vue";

// 功能函式.
// 檢查 url 參數.
import checkRoute from "../modules/checkRoute";
// 假的讀取進度
import loadHandler from "../modules/loadHandler";

Vue.use(VueRouter);

const routes = [
  // 首頁.
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },

  // 商品分類頁面.
  {
    // [a-z] 代表全部的英文字母小寫.
    // + 代表 1 個至多個英文字母.
    path: "/categories/:category([a-z]+)",
    name: "Categories",
    component: Categories,
    beforeEnter(to, from, next) {
      // 檢查 route category 參數是否正確.
      checkRoute.category(to.params.category) ? next() : next("/home");
    },
  },

  // 商品詳細介紹頁面.
  {
    path: "/merchandise/:category([a-z]+)/:id([a-zA-Z0-9-_]+)",
    name: "Merchandise",
    component: Merchandise,
    beforeEnter(to, from, next) {
      // 檢查分類是否正確, route category 參數是否正確.
      if (!checkRoute.category(to.params.category)) return next("/home");

      // 檢查商品 id 是否正確, route id 參數是否正確.
      checkRoute.merchandise({
        category: to.params.category,
        id: to.params.id,
      })
        ? next()
        : next("/categories/" + to.params.category);
    },
  },

  // 購物車頁面.
  {
    path: "/shopping-cart",
    name: "ShoppingCart",
    component: ShoppingCart,
  },

  // 訂單確認頁面.
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },

  // 登入頁面
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,

    // 進入 SignIn 時檢查登入.
    beforeEnter(to, from, next) {
      Store.state.isSignIn ? next("/back-side") : next();
    },
  },

  // 後台頁面.
  {
    path: "/back-side",
    name: "BackSide",
    component: BackSide,
    children: [
      {
        path: "back-side-merchandises",
        component: BackSideMerchandises,
      },
      {
        path: "back-side-orders",
        component: BackSideOrders,
      },
      {
        path: "",
        // 沒有保留歷史紀錄
        redirect: "/back-side/back-side-merchandises",
      },
    ],

    // 進入 BackSide 時檢查登入.
    beforeEnter(to, from, next) {
      Store.state.isSignIn ? next() : next("/home");
    },
  },

  // 阻擋其他網址.
  {
    path: "*",
    redirect: "/home",
  },
];

const router = new VueRouter({
  routes,

  // 進入該頁面時, 畫面在最上方.
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  // 跳轉頁面時的假讀取.
  loadHandler.isLoading();

  // 跳轉頁面
  next();
});

export default router;
