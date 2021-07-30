<template>
  <div class="back-side">
    <header class="header">
      <div class="between-container">
        <div class="content-container">
          <router-link to="/back-side/back-side-merchandises">產品</router-link>
          <router-link to="/back-side/back-side-orders">訂單</router-link>
        </div>
      </div>
      <div class="between-container">
        <div class="content-container">
          <router-link to="/home">首頁</router-link>
          <a href="#/home" @click="signOutHandler">登出</a>
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

.back-side {
  position: relative;

  .header {
    width: 100%;
    background-color: rgba($blue, 0.8);
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;

    .between-container {
      display: flex;
      flex-wrap: nowrap;

      .content-container {
        display: flex;
        flex-wrap: nowrap;

        a {
          padding: 1rem;
          @include font-style($font-size: 1rem, $color: $white);
          display: block;

          &:first-child {
            margin-right: 1rem;
          }
        }
      }
    }
  }
}
</style>
