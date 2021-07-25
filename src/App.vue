<template>
  <div id="app">
    <Header />

    <router-view />

    <Footer />

    <div class="loading" v-show="$store.state.isLoading">
      <img src="../public/images/loading.gif" alt="loading" />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  data() {
    return {};
  },

  components: { Header, Footer },
};
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>

<style lang="scss" scoped>
@import "./assets/style/class.scss";
@import "./assets/style/mixin.scss";
@import "./assets/style/variable.scss";

#app {
  overflow-x: hidden;

  .loading {
    width: 100vw;
    height: 100vh;
    background-color: rgba($white, 0.8);
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 50%;
    }
  }
}
</style>
