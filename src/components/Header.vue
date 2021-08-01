<template>
  <header class="header" :class="{ menu: isMenu }">
    <div class="between-container">
      <router-link to="/home">
        <img
          src="../../public/images/pokemon-store.png"
          alt="Pokemon Store"
          class="logo"
        />
      </router-link>
    </div>

    <div class="between-container">
      <router-link class="shopping-cart" to="/shopping-cart">
        購物車(<span>{{ $store.state.shoppingCart.length }}</span
        >)
      </router-link>

      <button
        type="button"
        id="menu-button"
        class="menu"
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
    </div>

    <label for="menu-button" class="list">
      <ul>
        <li v-if="$store.state.isSignIn">
          <a href="#/sign-out" @click="singOutHandler">登出</a>
        </li>

        <li v-else>
          <router-link
            to="/sign-in"
            :class="{ active: $route.path === '/sign-in' }"
            >登入</router-link
          >
        </li>

        <li v-if="$store.state.isSignIn">
          <router-link to="/back-side">後台</router-link>
        </li>

        <li>
          <router-link
            to="/shopping-cart"
            :class="{ active: $route.path === '/shopping-cart' }"
            >購物車</router-link
          >
        </li>

        <li>
          <router-link
            to="/orders"
            :class="{ active: $route.path === '/orders' }"
            >訂單</router-link
          >
        </li>

        <li>
          <router-link to="/home" :class="{ active: $route.path === '/home' }"
            >首頁</router-link
          >
        </li>

        <li v-for="(item, key) in $store.getters.calcData" :key="key">
          <router-link
            :to="'/categories/' + key"
            :class="{ active: $route.params.category === key }"
            >{{ item.name }}</router-link
          >
        </li>
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

  methods: {
    singOutHandler() {
      this.$store.commit("SIGN_OUT");
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";

.header {
  padding: 10px 10px 20px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;

  .between-container {
    font-size: 1rem;
    display: flex;
    align-items: center;

    .logo {
      width: 180px;
    }

    .shopping-cart {
      margin-right: 1rem;
    }

    .menu i {
      margin-top: 4px;
      font-size: 1.2rem;
      display: block;
      cursor: pointer;
    }
  }

  .list {
    display: block;
    width: 100%;
    box-sizing: border-box;
    background-color: $white;
    transform: translateX(-100%);
    transition: transform 0.2s cubic-bezier(0, 0.8, 1, 1) 0.1s;
    position: absolute;
    left: 0px;
    top: 100%;

    li {
      border-top: 1px solid $black-alpha;

      &:last-child {
        border-bottom: 1px solid $black-alpha;
      }

      a {
        padding: 1rem 0;
        @include font-style($font-size: 1.2rem);
        text-align: center;
        display: block;

        &.active {
          color: $white;
          background-color: $green-alpha;
        }
      }
    }
  }

  &.menu {
    .list {
      transition: transform 0.2s cubic-bezier(0, 0.8, 1, 1) 0s;
      transform: translateX(0%);
    }
  }
}
</style>
