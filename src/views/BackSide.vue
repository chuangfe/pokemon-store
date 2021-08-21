<template>
  <div class="self-back-side position-relative">
    <header class="self-header">
      <div
        class="container-xl d-flex align-items-center justify-content-between"
      >
        <div>
          <router-link
            class="btn text-white fs-5 fw-bold"
            to="/back-side/back-side-merchandises"
            >產品</router-link
          >
          <router-link
            class="btn text-white fs-5 fw-bold"
            to="/back-side/back-side-orders"
            >訂單</router-link
          >
        </div>

        <div>
          <router-link class="btn text-white fs-5 fw-bold" to="/home"
            >首頁</router-link
          >
          <a
            class="btn text-white fs-5 fw-bold"
            href="#/home"
            @click="signOutHandler"
            >登出</a
          >
        </div>
      </div>
    </header>

    <!-- 切換商品列表, 訂單列表. -->
    <router-view />
  </div>
</template>

<script>
// 後台頁面.

export default {
  name: "BackSide",

  methods: {
    signOutHandler() {
      this.$store.commit("SIGN_OUT");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";

.self-back-side {
  .self-header {
    background-color: $blue-alpha;
  }
}
</style>
