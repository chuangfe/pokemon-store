import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Categories from "../views/Categories.vue";
import Vuex from "../store/index";
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
      checkRoute.category({
        category: to.params.category,
        next,
      });
    },
  },
  {
    path: "*",
    redirect: "/home",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
