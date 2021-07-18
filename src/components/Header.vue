<template>
  <header class="header" :class="{ menu: isMenu }">
    <div class="between-container">
      <router-link to="javascript:;">
        <img
          src="../../public/images/pokemon-store.png"
          alt="Pokemon Store"
          class="logo"
        />
      </router-link>
    </div>

    <div class="between-container">
      <router-link to="javascript:;">
        <button
          type="button"
          id="menu-button"
          class="button"
          @click="isMenu = !isMenu"
          @blur="isMenu = false"
        >
          <i
            class="bi"
            :class="{
              'bi-menu-button-wide': !isMenu,
              'bi-menu-button-wide-fill': isMenu,
            }"
          ></i>
        </button>
      </router-link>
    </div>

    <label for="menu-button" class="list">
      <ul>
        <li>登入 / 註冊</li>
        <li>回首頁</li>
        <li>精靈球</li>
        <li>藥品補給</li>
        <li>生活道具</li>
        <li>購物商城</li>
      </ul>
    </label>
  </header>
</template>

<script>
export default {
  name: "Header",

  props: {},

  data() {
    return {
      isMenu: false,
    };
  },

  methods: {},
};
</script>

<style scoped lang="scss">
@import "../assets/style/mixin.scss";

.header {
  padding: 10px 10px 20px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;

  a {
    display: block;
  }

  .logo {
    width: 180px;
  }

  .button {
    background-color: #fff;
    border: none;

    i {
      font-size: 1.2rem;
    }
  }

  .list {
    box-shadow: 3px 3px 5px 2px #eee;
    padding: 0px 10px;
    background-color: #fff;
    transform: translateX(100%);
    transition: transform 0.2s cubic-bezier(0, 0.8, 1, 1) 0s;
    position: absolute;
    right: 0px;
    top: 100%;

    li {
      @include font-style($font-size: 1.2rem);
      margin: 10px 0;
    }
  }

  &.menu {
    .list {
      transform: translateX(0%);
    }
  }
}
</style>
