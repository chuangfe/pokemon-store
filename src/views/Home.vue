<template>
  <div class="home">
    <Header />

    <!-- 輪播圖 -->
    <Carousel :items="$store.state.slides" />

    <div class="title-container">
      <h1 class="main-title">＂冒險者！歡迎來到寶可夢購物中心＂</h1>
    </div>

    <div class="news">
      <p>
        2018.09.21
        <span class="emergency">緊急</span>
        因真新鎮受超夢大軍侵襲，暫時停止營業，不便之處，敬請見諒。
      </p>
    </div>

    <!-- 商品分類連結 -->
    <div class="categories-container">
      <p class="title">商品分類</p>
      <div class="items">
        <!-- 控制 rwd 的目標 -->
        <div class="item-container" v-for="(value, key) of calcData" :key="key">
          <CategoryItem
            :src="value.imageSrc"
            :alt="value.alt"
            :name="value.name"
            :categoryLink="getCategoryLink(key)"
            :isActive="false"
          />
        </div>
      </div>
    </div>

    <!-- 商品瀏覽 -->
    <div class="merchandises-container">
      <p class="title">商品瀏覽</p>
      <!-- 可拖放輪播圖 -->
      <CarouselDrag />
    </div>

    <Footer />
  </div>
</template>

<script>
// 首頁.

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
// 基本輪播圖.
import Carousel from "../components/Carousel.vue";
// 商品分類組件.
import CategoryItem from "../components/CategoryItem.vue";
// 可拖放輪播圖.
import CarouselDrag from "../components/CarouselDrag.vue";

export default {
  name: "Home",

  computed: {
    calcData() {
      return this.$store.getters.calcData;
    },
  },

  methods: {
    getCategoryLink(category) {
      return "/categories/" + category;
    },
  },

  components: { Header, Footer, Carousel, CategoryItem, CarouselDrag },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.home {
  .title-container {
    padding: 1rem 0;
    font-size: 0px;
    text-align: center;
    display: flex;
  }

  .main-title {
    margin: 0 auto;
    // 17個字.
    width: 1.25rem * 17;
    overflow: hidden;
    @include font-style($font-size: 1.25rem, $font-weight: 900, $color: $blue);
    white-space: nowrap;
    border-right: 1px solid $black;
    display: inline-block;
    // 17個字.
    animation: typing 4s steps(17) 1s both, caret 1s steps(1) infinite;
  }

  .news {
    margin: 0 0.625rem;
    padding: 0.625rem;
    // width: 94%;
    @include font-style($font-size: 1rem, $font-weight: 900, $color: $gray);
    letter-spacing: 1px;
    box-shadow: 1px 3px 5px $black-alpha;

    p {
      margin: 0px;

      .emergency {
        padding: 2px 4px;
        border-radius: 4px;
        display: inline-block;
      }
    }
  }

  // 商品分類.
  .categories-container {
    // 標題.
    .title {
      padding: 1rem 0 0 0.625rem;
      @include font-style(
        $font-size: 1.25rem,
        $font-weight: 900,
        $color: $green
      );
    }

    // 外層容器
    .items {
      padding: 0.375rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      // 控制 rwd 的目標.
      .item-container {
        // padding: 0 0.625rem 0.625rem 0;
        box-sizing: border-box;
        flex-basis: 23%;

        &:last-child {
          padding-top: 0.625rem;
          flex-basis: 100%;
        }
      }
    }
  }

  // 商品輪播
  .merchandises-container {
    // 標題.
    .title {
      padding: 0.625rem 0 0.625rem 0.625rem;
      @include font-style(
        $font-size: 1.25rem,
        $font-weight: 900,
        $color: $green
      );
    }
  }
}

// 打字效果.
@keyframes typing {
  from {
    width: 0%;
  }
}

@keyframes caret {
  50% {
    border-color: transparent;
  }
}

@media only screen and (min-width: $screen-width-md) {
  .home {
    .categories-container {
      .items {
        .item-container {
          box-sizing: border-box;
          flex-basis: 18%;

          &:last-child {
            padding: 0px;
            flex-basis: 20%;
          }
        }
      }
    }
  }
}
</style>
