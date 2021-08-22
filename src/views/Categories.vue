<template>
  <div class="self-categories">
    <div class="container-xl">
      <Header />
    </div>

    <!-- 輪播圖 -->
    <div class="container-xl">
      <Carousel :items="$store.state.slides" />
    </div>

    <!-- 路徑 -->
    <div class="container-xl">
      <div class="py-4">
        <Breadcrumb
          :homeLink="'/home'"
          :category="$route.params.category"
          :categoryName="categoryObject.name"
          :categoryLink="getCategoryLink(categoryTitle)"
        />
      </div>
    </div>

    <!-- 商品分類與商品瀏覽. -->
    <div class="container-xl">
      <div class="row">
        <!-- 商品分類. -->
        <div class="col-12 col-md-2">
          <div class="row row-cols-4 row-cols-sm-5 row-cols-md-1">
            <!-- 分類容器, 可以做 RWD. -->
            <div
              class="pb-4 col"
              :class="{
                'col-12': i === calcDataKeys.length - 1,
                'col-sm': i === calcDataKeys.length - 1,
              }"
              v-for="(val, i) of calcDataKeys"
              :key="val"
            >
              <!-- 分類. -->
              <CategoryItem
                :src="calcData[val].imageSrc"
                :alt="calcData[val].alt"
                :name="calcData[val].name"
                :categoryLink="getCategoryLink(val)"
                :isActive="$route.params.category === val"
              />
            </div>
          </div>
        </div>

        <!-- 商品瀏覽. -->
        <div class="col-12 col-md-10">
          <!-- 標題. -->
          <h3 class="self-title-merchandises h3 fw-bold">
            {{ categoryObject.name }}
          </h3>

          <!-- 商品容器, 可以做 RWD. -->
          <div class="row">
            <div
              class="col-12 col-md-6 col-lg-4 pb-4"
              v-for="(item, i) of showMerchandises"
              :key="i"
            >
              <!-- 單項商品展示. -->
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
          <div v-show="pages">
            <Pagination
              :index="index"
              :length="length"
              :pages="pages"
              @setIndex="setIndexHandler"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="container-xl">
      <Footer />
    </div>
  </div>
</template>

<script>
// 商品分類頁面.

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
    calcDataKeys() {
      return Object.keys(this.calcData);
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

      // 畫面回到最上方.
      window.scrollTo(0, 0);
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

.self-categories {
  .self-title-merchandises {
    color: $green;
  }
}
</style>
