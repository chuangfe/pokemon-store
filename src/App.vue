<template>
  <div id="app">
    <Header />

    <!-- 圖片輪播. -->
    <div class="carousel-container">
      <Carousel :items="slides" />
    </div>

    <h1 class="main-title">＂冒險者！歡迎來到寶可夢購物中心＂</h1>

    <div class="news">
      <p>
        2018.09.21
        <span class="class emergency">緊急</span>
        因真新鎮受超夢大軍侵襲，暫時停止營業，不便之處，敬請見諒。
      </p>
    </div>

    <!-- 商品分類連結 -->
    <div class="categories">
      <p class="title">商品分類</p>
      <div class="items">
        <!-- 控制 rwd 的目標 -->
        <div class="item-container">
          <Category
            :src="$store.getters.all.imageSrc"
            :alt="$store.getters.all.alt"
            :name="$store.getters.all.name"
          />
        </div>

        <!-- 控制 rwd 的目標 -->
        <div
          class="item-container"
          v-for="(value, key) of $store.state.data"
          :key="key"
        >
          <Category :src="value.imageSrc" :alt="value.alt" :name="value.name" />
        </div>
      </div>
    </div>

    <div class="merchandises-container">
      <p class="title">商品瀏覽</p>
      <CarouselDrag />
    </div>

    <Footer />

    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view /> -->
  </div>
</template>

<script>
import Header from "./components/Header.vue";
// 輪播圖.
import Carousel from "./components/Carousel.vue";
// 商品分類.
import Category from "./components/Category.vue";
// 商品流覽
import CarouselDrag from "./components/CarouselDrag.vue";
import Footer from "./components/Footer.vue";

export default {
  data() {
    return {
      slides: [
        {
          src: "./images/slide-00.jpg",
          alt: "slide-00",
        },
        {
          src: "./images/slide-01.jpg",
          alt: "slide-01",
        },
        {
          src: "./images/slide-02.jpg",
          alt: "slide-02",
        },
        {
          src: "./images/slide-03.jpg",
          alt: "slide-03",
        },
        {
          src: "./images/slide-04.jpg",
          alt: "slide-04",
        },
      ],
    };
  },

  components: { Header, Carousel, Category, CarouselDrag, Footer },
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
}

// 輪播容器, 可以做 rdw.
.carousel-container {
  padding-top: 74.666666%;
  position: relative;
}

.main-title {
  padding: 1rem 0;
  @include font-style($font-size: 1.25rem, $font-weight: 900, $color: #2b447d);
  text-align: center;
}

.news {
  margin: 0 0.625rem;
  padding: 0.625rem;
  // width: 94%;
  @include font-style($font-size: 1rem, $font-weight: 900, $color: #666);
  letter-spacing: 1px;
  box-shadow: 1px 3px 5px $black-alpha;

  p {
    margin: 0px;

    .emergency {
      padding: 2px 4px;
      border-radius: 4px;
    }
  }
}

// 商品分類.
.categories {
  // 標題.
  .title {
    padding: 1rem 1rem 0 1rem;
    @include font-style($font-size: 1.25rem, $font-weight: 900, $color: $green);
  }

  // 外層容器
  .items {
    padding: 0.375rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    // 控制 rwd 的目標.
    .item-container {
      padding: 0 0.625rem 0.625rem 0;
      box-sizing: border-box;
      flex: 1 1 25%;

      &:last-child,
      &:nth-last-of-type(2) {
        padding-right: 0px;
      }

      &:last-child {
        padding-bottom: 0px;
      }
    }
  }
}

// 商品輪播
.merchandises-container {
  // 標題.
  .title {
    padding: 0.625rem;
    @include font-style($font-size: 1.25rem, $font-weight: 900, $color: $green);
  }
}
</style>
