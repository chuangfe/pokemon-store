import Vue from "vue";
import VueRouter from "vue-router";

// 頁面.
import Home from "../views/Home.vue";
import Categories from "../views/Categories.vue";
import Merchandise from "../views/Merchandise.vue";

// 功能函式.
import checkRoute from "../modules/checkRoute";

Vue.use(VueRouter);

const routes = [
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
  {
    path: "*",
    redirect: "/home",
  },
];

const router = new VueRouter({
  routes, // 進入該頁面時, 畫面在最上方.
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
