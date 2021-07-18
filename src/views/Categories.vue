<template>
  <div class="categories">
    <Carousel :items="$store.state.slides" />

    <!-- 商品種類. -->
    <div class="categories-container">
      <div class="items">
        <!-- 控制 rwd 的目標 -->
        <div
          class="item-container"
          v-for="(value, key) of $store.state.data"
          :key="key"
        >
          <Category
            :src="value.imageSrc"
            :alt="value.alt"
            :name="value.name"
            :link="getLink(key)"
          />
        </div>
      </div>
    </div>

    <div class="merchandises-container">
      <p class="title">{{ title }}</p>
      <!-- rwd 目標 -->
      <div class="item-container" v-for="(item, i) of items" :key="i">
        <!-- 商品. -->
        <Merchandise
          :src="item.imageSrc"
          :alt="item.alt"
          :category="item.category"
          :name="item.name"
          :text="item.text"
          :specialOffer="item.specialOffer"
          :price="item.price"
          :remaining="item.remaining"
        />
      </div>
    </div>
  </div>
</template>

<script>
// 商品種類瀏覽頁面.

// 輪播圖.
import Carousel from "../components/Carousel.vue";
// 商品種類.
import Category from "../components/Category.vue";
// 單項商品.
import Merchandise from "../components/Merchandise.vue";

export default {
  name: "Categories",

  computed: {
    title() {
      return this.$store.state.data[this.$route.params.class].name;
    },
    items() {
      return this.$store.state.data[this.$route.params.class].merchandises;
    },
  },

  methods: {
    getLink(category) {
      return "/categories/" + category;
    },
  },

  // 這個頁面修改 router 參數時觸發.
  beforeRouteUpdate(to, from, next) {
    if (this.$store.state.categories.indexOf(to.params.class) !== -1) {
      next();
    } else {
      next("/home");
    }
  },

  components: { Carousel, Category, Merchandise },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.categories {
  .categories-container {
    padding: 0.375rem;

    .items {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;

      .item-container {
        flex-basis: 18%;
      }
    }
  }

  .merchandises-container {
    padding: 0 0.375rem;

    .title {
      padding: 0.375rem 0;
      @include font-style(
        $font-size: 1.5rem,
        $font-weight: 900,
        $color: $green
      );
    }

    .item-container {
      padding-bottom: 0.625rem;

      &:last-child {
        padding-bottom: 0px;
      }
    }
  }
}
</style>
