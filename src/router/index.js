import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Categories from "../views/Categories.vue";
import Vuex from "../store/index";

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
    path: "/categories/:class([a-z]+)",
    name: "Categories",
    component: Categories,
    beforeEnter(to, from, next) {
      if (Vuex.state.categories.indexOf(to.params.class) !== -1) {
        next();
      } else {
        next("/home");
      }
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
