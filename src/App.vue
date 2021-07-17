<template>
  <div id="app">
    <Header />

    <!-- 圖片輪播. -->
    <div class="carousel-container">
      <Carousel :items="slides" />
    </div>

    <h1 class="main-title">＂冒險者！歡迎來到神奇寶貝購物中心＂</h1>

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
        <div class="item">
          <div class="image-container">
            <img src="../public/images/gold-00.png" alt="gold" />
          </div>
          <p class="text">所有商品</p>
        </div>

        <div class="item">
          <div class="image-container">
            <img src="../public/images/poke-ball-00.png" alt="poke-ball" />
          </div>
          <p class="text">精靈球</p>
        </div>

        <div class="item">
          <div class="image-container">
            <img src="../public/images/potion.png" alt="potion" />
          </div>
          <p class="text">藥品補給</p>
        </div>

        <div class="item">
          <div class="image-container">
            <img src="../public/images/backpack.png" alt="backpack" />
          </div>
          <p class="text">野外求生道具</p>
        </div>

        <div class="item">
          <div class="image-container">
            <img src="../public/images/gift-box.png" alt="gift-box" />
          </div>
          <p class="text">商城</p>
        </div>
      </div>
    </div>

    <div class="new-products"></div>

    <div class="merchandises-container">
      <p class="title">商品瀏覽</p>
      <Merchandises />
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
import Carousel from "./components/Carousel.vue";
import Merchandises from "./components/Merchandises.vue";
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

  components: { Header, Carousel, Merchandises, Footer },
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

// 圖片輪播.
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
  margin: 0 auto;
  padding: 0.625rem;
  width: 94%;
  @include font-style($font-size: 1rem, $font-weight: 900, $color: #666);
  letter-spacing: 1px;
  box-shadow: 1px 3px 5px $gray;

  p {
    margin: 0px;
  }

  .emergency {
    padding: 2px 4px;
    border-radius: 4px;
  }
}

// 商品分類.
.categories {
  .title {
    padding: 1rem 1rem 0 1rem;
    @include font-style($font-size: 1.25rem, $font-weight: 900, $color: $green);
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .item {
    margin: 6px;
    padding: 10px;
    border: 1px solid $gray;
    border-radius: 4px;
    box-sizing: border-box;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 20%;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &:last-child {
      flex-basis: 100%;
    }
  }

  .image-container {
    margin: 0 auto;
    width: 50px;
    height: 50px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .text {
    margin-top: 4px;
    width: 100%;
    text-align: center;
    @include font-style($font-size: 0.75rem);
    overflow-wrap: break-word;
  }
}

// 商品輪播
.merchandises-container {
  .title {
    padding: 0.625rem;
    @include font-style($font-size: 1.25rem, $font-weight: 900, $color: $green);
  }
}
</style>
