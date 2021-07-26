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
      <router-link class="shopping-cart" to="/shoppingcart">
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
        <li>
          <router-link
            to="/signin"
            :class="{ active: $route.path === '/signin' }"
            >登入</router-link
          >
        </li>

        <li>
          <router-link
            to="/shoppingcart"
            :class="{ active: $route.path === '/shoppingcart' }"
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
          background-color: rgba($green, 0.4);
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
