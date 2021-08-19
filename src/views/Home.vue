<template>
  <div class="self-home py-3">
    <div class="container-xl">
      <Header />
    </div>

    <!-- 輪播圖. -->
    <div class="container-xl">
      <Carousel :items="$store.state.slides" />
    </div>

    <!-- 打字動畫標題. -->
    <div class="container-xl">
      <div class="font-size-delete py-4 text-center">
        <h1 class="self-typeing m-0">＂冒險者！歡迎來到寶可夢購物中心＂</h1>
      </div>
    </div>

    <!-- 新聞. -->
    <div class="self-news container-xl">
      <p class="fs-6 fw-bold text-muted m-0 mx-2 p-2">
        2018.09.21
        <span class="badge bg-danger fs-6 fw-bold text-white p-1">緊急</span>
        因真新鎮受超夢大軍侵襲，暫時停止營業，不便之處，敬請見諒。
      </p>
    </div>

    <!-- 商品分類連結. -->
    <div class="self-categories container-xl">
      <h5 class="self-title h5 pt-4 ps-2 fw-bold">商品分類</h5>

      <div class="row row-cols-4 row-cols-md-5 px-2">
        <!-- 控制 rwd 的目標. -->
        <div
          class="py-2"
          v-for="(value, key, i) of calcData"
          :key="key"
          :class="{
            'col-12': i === calcDataKeys.length - 1,
            'col-md': i === calcDataKeys.length - 1,
          }"
        >
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

    <!-- 商品瀏覽. -->
    <div class="self-merchandises container-xl">
      <h5 class="self-title h5 pt-4 ps-2 fw-bold">商品瀏覽</h5>

      <!-- 可拖放輪播圖 -->
      <CarouselDrag />
    </div>

    <div class="container-xl">
      <Footer />
    </div>
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

    calcDataKeys() {
      return Object.keys(this.calcData);
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

.self-home {
  // 打字動畫標題.
  .self-typeing {
    // 17個字.
    width: 1.25rem * 17;
    // 隱藏還沒出現的文字.
    overflow: hidden;
    @include font-style($font-size: 1.25rem, $font-weight: 900, $color: $blue);
    // 文字不換行.
    white-space: nowrap;
    // 輸入直線.
    border-right: 1px solid $black;
    // 讓寬度不要自動填滿.
    display: inline-block;
    // 17個字.
    animation: typing 4s steps(17) 1s both, caret 1s steps(1) infinite;
  }

  // 新聞
  .self-news p {
    letter-spacing: 1px;
    box-shadow: 1px 3px 5px $black-alpha;
  }

  // 商品分類的標題.
  .self-categories .self-title, 
  // 商品輪播的標題.
  .self-merchandises .self-title {
    color: $green;
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
</style>
