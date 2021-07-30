<template>
  <div class="categories">
    <Header />

    <!-- 輪播圖 -->
    <Carousel :items="$store.state.slides" />

    <!-- 路徑 -->
    <div class="breadcrumb-container">
      <Breadcrumb
        :homeLink="'/home'"
        :category="$route.params.category"
        :categoryName="categoryObject.name"
        :categoryLink="getCategoryLink(categoryTitle)"
      />
    </div>

    <!-- 商品種類. -->
    <div class="categories-container">
      <div class="items">
        <!-- 控制 rwd 的目標 -->
        <div class="item-container" v-for="(value, key) of calcData" :key="key">
          <CategoryItem
            :src="value.imageSrc"
            :alt="value.alt"
            :name="value.name"
            :categoryLink="getCategoryLink(key)"
            :isActive="$route.params.category === key"
          />
        </div>
      </div>
    </div>

    <!-- 商品瀏覽 -->
    <div class="merchandises-container">
      <p class="title">{{ categoryObject.name }}</p>

      <!-- rwd 目標 -->
      <div
        class="item-container"
        v-for="(item, i) of showMerchandises"
        :key="i"
      >
        <!-- 商品. -->
        <MerchandiseItem
          :id="item.id"
          :category="item.category"
          :categoryName="item.categoryName"
          :name="item.name"
          :text="item.text"
          :imageSrc="item.imageSrc"
          :alt="item.alt"
          :remaining="item.remaining"
          :originalPrice="item.originalPrice"
          :specialPrice="item.specialPrice"
          :merchandiseLink="
            getMerchandiseLink({ category: item.category, id: item.id })
          "
        />
      </div>
    </div>

    <!-- 分頁. -->
    <div class="pagination-container" v-show="pages">
      <Pagination
        :index="index"
        :length="length"
        :pages="pages"
        @setIndex="setIndexHandler"
      />
    </div>

    <Footer />
  </div>
</template>

<script>
// 商品種類瀏覽頁面.

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

// 輪播圖.
import Carousel from "../components/Carousel.vue";
// 連結.
import Breadcrumb from "../components/Breadcrumb.vue";
// 商品種類.
import CategoryItem from "../components/CategoryItem.vue";
// 單項商品.
import MerchandiseItem from "../components/MerchandiseItem.vue";
// 分頁.
import Pagination from "../components/Pagination.vue";
// 檢查 route 參數.
import checkRoute from "../modules/checkRoute";

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
    // data, 縮短屬性.
    calcData() {
      return this.$store.getters.calcData;
    },

    // 商品分類的名稱, 縮短屬性.
    categoryTitle() {
      return this.$route.params.category;
    },

    // 商品分類的物件.
    categoryObject() {
      return this.calcData[this.categoryTitle];
    },

    // 當前分類的所有商品.
    merchandises() {
      return this.categoryObject.merchandises;
    },

    // 切割分頁的所有商品.
    showMerchandises() {
      // 這是索引.
      const start = this.index * this.length;
      // 不包含 end element.
      const end = start + this.length;

      return this.merchandises.length < this.length
        ? this.merchandises
        : this.merchandises.slice(start, end);
    },

    // 計算頁數.
    pages() {
      return this.merchandises.length > this.length
        ? Math.ceil(this.merchandises.length / this.length)
        : 0;
    },
  },

  methods: {
    // 獲取分類的 link.
    getCategoryLink(category) {
      return "/categories/" + category;
    },

    // 商品頁面 link.
    getMerchandiseLink({ category, id }) {
      return "/merchandise/" + category + "/" + id;
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
    // 不知道要把分頁用的 index 重置寫在哪.
    this.index = 0;

    // 檢查 route category 參數是否正確.
    checkRoute.category(to.params.category) ? next() : next("/home");
  },

  components: {
    Header,
    Footer,
    Carousel,
    Breadcrumb,
    CategoryItem,
    MerchandiseItem,
    Pagination,
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.categories {
  // 路徑 path.
  .breadcrumb-container {
    padding: 0.375rem 0 0.375rem 0.625rem;
  }

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
    padding: 0.625rem 0 0 0.375rem;
  }
}
</style>
