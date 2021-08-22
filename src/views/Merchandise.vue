<template>
  <div class="self-merchandise">
    <div class="container-xl">
      <Header />
    </div>

    <!-- path 路徑. -->
    <div class="container-xl py-3">
      <Breadcrumb
        :homeLink="homeLink"
        :category="$route.params.category"
        :categoryName="category.name"
        :categoryLink="categoryLink"
        :merchandiseName="merchandiseData.name"
      />
    </div>

    <div class="container-xl">
      <div class="row">
        <!-- 商品說明. -->
        <div class="col-12 col-md-6">
          <section class="border border-2 p-3 mb-4 mb-md-0">
            <div class="self-image-container text-center">
              <img
                class="image-object-fit-height-contain mx-auto"
                :src="merchandiseData.imageSrc"
                :alt="merchandiseData.alt"
              />
            </div>

            <h4 class="h4 fw-bold border-bottom border-2 py-2">商品介紹</h4>
            <p>{{ merchandiseData.text }}</p>

            <h4 class="h4 fw-bold border-bottom border-2 py-2">運費資訊</h4>
            <p>無</p>
          </section>
        </div>

        <!-- 商品購買 -->
        <div class="col-12 col-md-6">
          <section
            class="border border-2 p-3 h-100"
            :class="{ 'special-offer': merchandiseData.specialOffer }"
          >
            <h4 class="h4 fw-bold border-bottom border-2 pb-2 m-0 mb-2">
              {{ merchandiseData.name }}
            </h4>

            <p
              class="self-special fs-3 fw-bold m-0 mb-2"
              v-if="merchandiseData.specialPrice"
            >
              特價 NT$
              {{ merchandiseData.specialPrice }}
            </p>

            <p class="fs-3 fw-bold m-0 mb-2" v-else>
              原價 NT${{ merchandiseData.originalPrice }}
            </p>

            <!-- 選擇購買數量. -->
            <select
              class="d-block w-100 fs-5 p-2 m-0 mb-3"
              v-model="count"
              v-if="merchandiseData.remaining !== 0"
            >
              <option :value="0">請選擇數量</option>
              <option
                v-for="(num, i) in merchandiseData.remaining"
                :key="i"
                :value="num"
              >
                選購 {{ num }} 項
              </option>
            </select>

            <button
              class="self-buy btn d-block fs-5 text-center w-100"
              :class="{ 'self-close': count === 0 }"
              :disabled="count === 0"
              @click="clickHandler"
            >
              <span v-if="merchandiseData.remaining === 0">售完</span>
              <span v-else>總計 $ {{ total }} 元 / 加入購物車</span>
            </button>
          </section>
        </div>
      </div>
    </div>

    <div class="container-xl">
      <Footer />
    </div>
  </div>
</template>

<script>
// 商品詳細頁面.

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
// path 路徑.
import Breadcrumb from "../components/Breadcrumb.vue";
// 判斷路徑.
import checkRoute from "../modules/checkRoute";

export default {
  name: "Merchandise",

  data() {
    return {
      count: 0,
    };
  },

  computed: {
    // 首頁 link.
    homeLink() {
      return "/home";
    },

    // 商品分類頁面 link.
    categoryLink() {
      return "/categories/" + this.$route.params.category;
    },

    // 商品分類物件.
    category() {
      return this.$store.getters.calcData[this.$route.params.category];
    },

    // 商品物件.
    merchandiseData() {
      return this.category.merchandises.find((item) => {
        return item.id === this.$route.params.id;
      });
    },

    // 商品總額.
    total() {
      const price = this.merchandiseData.specialPrice
        ? this.merchandiseData.specialPrice
        : this.merchandiseData.originalPrice;

      return Math.floor(price * this.count);
    },
  },

  methods: {
    async clickHandler() {
      if (this.count === 0) return false;

      // 縮短屬性長度.
      const item = this.merchandiseData;

      const result = await this.$store.dispatch("ADD_SHOPPING_CART_ACTIONS", {
        id: item.id,
        category: item.category,
        categoryName: item.categoryName,
        name: item.name,
        price: item.specialPrice ? item.specialPrice : item.originalPrice,
        count: this.count,
      });

      // 更新購買數量.
      this.count = 0;
    },
  },

  components: { Header, Footer, Breadcrumb },

  // 這個頁面修改 route 參數時觸發.
  beforeRouteUpdate(to, from, next) {
    // 檢查 route category 參數是否正確.
    checkRoute.category(to.params.category) ? next() : next("/home");
    // 檢查 route id 參數是否正確.
    checkRoute.merchandise({
      category: to.params.category,
      id: this.$route.params.id,
    })
      ? next()
      : next("/categories/" + to.params.category);
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.self-merchandise {
  .self-image-container {
    height: 12rem;
  }

  .self-special {
    color: $green;
  }

  .self-buy {
    color: $white;
    background-color: $red-alpha;

    &.self-close {
      background-color: $black-alpha;
    }
  }
}
</style>
