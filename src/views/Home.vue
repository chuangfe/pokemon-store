<template>
  <div class="home">
    <!-- 輪播圖 -->
    <Carousel :items="$store.state.slides" />

    <h1 class="main-title">＂冒險者！歡迎來到寶可夢購物中心＂</h1>

    <div class="news">
      <p>
        2018.09.21
        <span class="class emergency">緊急</span>
        因真新鎮受超夢大軍侵襲，暫時停止營業，不便之處，敬請見諒。
      </p>
    </div>

    <!-- 商品分類連結 -->
    <div class="categories-container">
      <p class="title">商品分類</p>
      <div class="items">
        <!-- 控制 rwd 的目標 -->
        <div class="item-container" v-for="(value, key) of calcData" :key="key">
          <Category
            :src="value.imageSrc"
            :alt="value.alt"
            :name="value.name"
            :categoryLink="getCategoryLink(key)"
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
  </div>
</template>

<script>
import Carousel from "../components/Carousel.vue";
import Category from "../components/Category.vue";
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

  components: { Carousel, Category, CarouselDrag },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.home {
  .main-title {
    padding: 1rem 0;
    @include font-style(
      $font-size: 1.25rem,
      $font-weight: 900,
      $color: #2b447d
    );
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
        padding: 0 0.625rem 0.625rem 0;
        box-sizing: border-box;
        // flex: 1 1 25%;
        flex-grow: 1;
        flex-shrink: 1;

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
      padding: 0.625rem 0 0.625rem 0.625rem;
      @include font-style(
        $font-size: 1.25rem,
        $font-weight: 900,
        $color: $green
      );
    }
  }
}
</style>
