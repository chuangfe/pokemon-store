<template>
  <div class="categories">
    <Carousel :items="$store.state.slides" />

    <Breadcrumb />

    <!-- 商品種類. -->
    <div class="categories-container">
      <div class="items">
        <!-- 控制 rwd 的目標 -->
        <div class="item-container" v-for="(value, key) of calcData" :key="key">
          <Category
            :src="value.imageSrc"
            :alt="value.alt"
            :name="value.name"
            :link="getLink(key)"
          />
        </div>
      </div>
    </div>

    <!-- 商品瀏覽 -->
    <div class="merchandises-container">
      <p class="title">{{ title }}</p>

      <!-- rwd 目標 -->
      <div class="item-container" v-for="(item, i) of showItems" :key="i">
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

    <!-- 分頁. -->
    <div class="pagination-container" v-show="getPages">
      <Pagination
        :index="index"
        :length="length"
        :pages="getPages"
        @setIndex="setIndexHandler"
      />
    </div>
  </div>
</template>

<script>
// 商品種類瀏覽頁面.

// 輪播圖.
import Carousel from "../components/Carousel.vue";
// 連結.
import Breadcrumb from "../components/Breadcrumb.vue";
// 商品種類.
import Category from "../components/Category.vue";
// 單項商品.
import Merchandise from "../components/Merchandise.vue";
// 分頁.
import Pagination from "../components/Pagination.vue";

export default {
  name: "Categories",

  data() {
    return {
      // 當前分頁的索引.
      index: 0,
      // 每頁幾項商品.
      length: 5,
    };
  },

  computed: {
    // 屬性太長了.
    calcData() {
      return this.$store.getters.calcData;
    },

    // 當前商品的類型.
    title() {
      return this.calcData[this.$route.params.class].name;
    },

    // 當前類型的所有商品.
    items() {
      return this.calcData[this.$route.params.class].merchandises;
    },

    // 切割分頁後的 items.
    showItems() {
      // 這是索引.
      const start = this.index * this.length;
      // 不包含 end element.
      const end = start + this.length;

      return this.items.length < this.length
        ? this.items
        : this.items.slice(start, end);
    },

    // 計算頁數.
    getPages() {
      return this.items.length > this.length
        ? Math.ceil(this.items.length / this.length)
        : 0;
    },
  },

  methods: {
    // 獲取 link.
    getLink(category) {
      return "/categories/" + category;
    },

    // 給分頁使用的事件.
    setIndexHandler(i) {
      this.index = i;
      this.index =
        this.index < 0
          ? 0
          : this.index > this.getPage
          ? this.getPage
          : this.index;
    },
  },

  // 這個頁面修改 route 參數時觸發.
  beforeRouteUpdate(to, from, next) {
    // 不知道要把 index 重置寫在哪.
    this.index = 0;

    if (this.$store.getters.categories.indexOf(to.params.class) !== -1) {
      next();
    } else {
      next("/home");
    }
  },

  components: { Carousel, Breadcrumb, Category, Merchandise, Pagination },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.categories {
  // 商品種類.
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

  // 展示商品.
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

  // 分頁.
  .pagination-container {
    padding: 0.625rem 0 0 0.3125rem;
  }
}
</style>
