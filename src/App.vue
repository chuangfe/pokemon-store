<template>
  <div id="app" class="mx-auto">
    <router-view />

    <div class="loading" v-show="$store.state.isLoading">
      <img src="../public/images/loading.gif" alt="loading" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "./assets/style/class.scss";
@import "./assets/style/mixin.scss";
@import "./assets/style/variable.scss";

#app {
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
      max-width: 500px;
      width: 50%;
    }
  }
}
</style>
