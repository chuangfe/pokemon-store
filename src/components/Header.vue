<template>
  <header class="self-header position-relative">
    <div
      class="self-header-container d-flex justify-content-between align-items-center position-relative bg-white py-3"
    >
      <div class="self-between-container">
        <router-link to="/home">
          <img
            src="../../public/images/pokemon-store.png"
            alt="Pokemon Store"
            class="self-logo"
          />
        </router-link>
      </div>

      <div
        class="self-between-container bg-white fs-6 d-flex justify-content-between align-items-center"
      >
        <router-link
          class="text-reset text-decoration-none me-2"
          to="/shopping-cart"
        >
          購物車(<span>{{ $store.state.shoppingCart.merchandises.length }}</span
          >)
        </router-link>

        <button
          type="button"
          id="menu-button"
          class="btn"
          @click="isMenu = !isMenu"
          @blur="isMenu = false"
        >
          <i
            class="bi d-flex justify-content-between align-items-center"
            :class="{
              'bi-menu-button-wide': !isMenu,
              'bi-menu-button-wide-fill': isMenu,
            }"
          ></i>
        </button>
      </div>
    </div>

    <transition name="label">
      <label
        for="menu-button"
        class="self-label self-border-box position-absolute top-100 end-0"
        v-show="isMenu"
      >
        <ul class="navbar-nav bg-white border">
          <li class="nav-item my-1" v-if="$store.state.isSignIn">
            <a
              class="nav-link px-4 self-nav-link"
              href="#/home"
              @click="singOutHandler"
              >登出</a
            >
          </li>

          <li class="nav-item my-1" v-else>
            <router-link
              to="/sign-in"
              class="nav-link px-4 self-nav-link"
              :class="{ active: $route.path === '/sign-in' }"
              >登入</router-link
            >
          </li>

          <li class="nav-item my-1" v-if="$store.state.isSignIn">
            <router-link class="nav-link px-4 self-nav-link" to="/back-side"
              >後台</router-link
            >
          </li>

          <li class="nav-item my-1">
            <router-link
              to="/shopping-cart"
              class="nav-link px-4 self-nav-link"
              :class="{ active: $route.path === '/shopping-cart' }"
              >購物車</router-link
            >
          </li>

          <li class="nav-item my-1">
            <router-link
              to="/orders"
              class="nav-link px-4 self-nav-link"
              :class="{ active: $route.path === '/orders' }"
              >訂單</router-link
            >
          </li>

          <li class="nav-item my-1">
            <router-link
              class="nav-link px-4 self-nav-link"
              to="/home"
              :class="{ active: $route.path === '/home' }"
              >首頁</router-link
            >
          </li>

          <li
            class="nav-item my-1"
            v-for="(item, key) in $store.getters.calcData"
            :key="key"
          >
            <router-link
              :to="'/categories/' + key"
              class="nav-link px-4 self-nav-link"
              :class="{ active: $route.params.category === key }"
              >{{ item.name }}</router-link
            >
          </li>
        </ul>
      </label>
    </transition>
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
    async singOutHandler() {
      const b = await this.$store.dispatch("CHECK_USER_ACTIONS", {
        email: "",
        password: "",
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.self-header {
  z-index: 1;

  .self-header-container {
    z-index: 1;

    .self-logo {
      width: 12rem;
    }
  }

  .self-label {
    .self-nav-link {
      color: $black;

      &:hover {
        background-color: $header-nav-hover-color;
      }

      &.active {
        color: $white;
        background-color: $green-alpha;
      }
    }
  }
}

// 進場前的樣式.
.label-enter,
// 離場結束的樣式.
.label-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

// 進場結束的樣式.
.label-enter-to,
// 離場前的樣式.
.label-leave {
  transform: translateY(0%);
  opacity: 1;
}

// 進場動畫.
.label-enter-active,
// 離場動畫.
.label-leave-active {
  transition: transform 0.3s ease-out 0.1s, opacity 0.3s ease-out 0.1s;
}
</style>
