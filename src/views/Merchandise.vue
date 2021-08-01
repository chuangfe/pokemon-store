<template>
  <div class="merchandise">
    <Header />

    <!-- path 路徑. -->
    <div class="breadcrumb-container">
      <Breadcrumb
        :homeLink="homeLink"
        :category="$route.params.category"
        :categoryName="category.name"
        :categoryLink="categoryLink"
        :merchandiseName="merchandiseData.name"
      />
    </div>

    <section class="container introduce">
      <div class="image-container">
        <img :src="merchandiseData.imageSrc" :alt="merchandiseData.alt" />
      </div>

      <div class="content-container">
        <p class="title">商品介紹</p>
        <p class="text">{{ merchandiseData.text }}</p>
      </div>

      <div class="content-container">
        <p class="title">運費資訊</p>
        <p class="text">無</p>
      </div>
    </section>

    <section
      class="container expense"
      :class="{ 'special-offer': merchandiseData.specialOffer }"
    >
      <p class="title">{{ merchandiseData.name }}</p>

      <p class="price original">原價 NT${{ merchandiseData.originalPrice }}</p>

      <p class="price special" v-if="merchandiseData.specialOffer">
        特價 NT$
        {{ merchandiseData.specialPrice }}
      </p>

      <!-- 選擇購買數量. -->
      <select
        class="count"
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
        class="buy"
        :class="{ close: count === 0 }"
        :disabled="merchandiseData.remaining === 0"
        @click="clickHandler"
      >
        <span v-if="merchandiseData.remaining === 0">售完</span>
        <span v-else>總計 $ {{ total }} 元 / 加入購物車</span>
      </button>
    </section>

    <Footer />
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
      const price = this.merchandiseData.specialOffer
        ? this.merchandiseData.specialPrice
        : this.merchandiseData.originalPrice;

      return price * this.count;
    },
  },

  methods: {
    clickHandler() {
      if (this.count === 0) return false;

      const item = this.merchandiseData;

      this.$store.commit("ADD_SHOPPING_CART", {
        id: item.id,
        category: item.category,
        categoryName: item.categoryName,
        name: item.name,
        price: item.specialPrice ? item.specialPrice : item.originalPrice,
        count: this.count,
      });
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

.merchandise {
  .breadcrumb-container {
    padding: 0 0 0.625rem 0.625rem;
  }

  // 兩個有邊框的容器.
  .container {
    margin: 0 0.375rem;
    padding: 1.25rem;
    border: 1px solid $black-alpha;
  }

  // 商品圖片與說明文字.
  .introduce {
    margin-bottom: 0.625rem;

    .image-container {
      padding-bottom: 0.625rem;
      height: 12rem;

      img {
        margin: 0 auto;
        height: 100%;
        object-fit: contain;
      }
    }

    .content-container {
      &:last-child {
        margin-top: 0.625rem;
      }

      .title {
        padding: 0.625rem 0;
        @include font-style($font-size: 1.2rem, $font-weight: 900);
        border-bottom: 1px solid $black-alpha;
      }

      .text {
        padding-top: 0.625rem;
      }
    }
  }

  // 商品運費相關.
  .expense {
    .title {
      margin-bottom: 0.625rem;
      padding-bottom: 0.625rem;
      @include font-style($font-size: 1.5rem, $font-weight: 900);
      border-bottom: 1px solid $black-alpha;
    }

    .price {
      @include font-style($font-size: 1.2rem, $font-weight: 900);
    }

    .special {
      color: $green;
    }

    &.special-offer {
      .original {
        @include font-style($font-size: 1rem);
        text-decoration-line: line-through;
      }
    }

    .count {
      margin-top: 0.625rem;
      padding: 0.625rem;
      width: 100%;
      @include font-style($font-size: 1rem);
    }
  }

  // 購買按鈕.
  .buy {
    margin-top: 0.625rem;
    padding: 0.625rem 0;
    width: 100%;
    @include font-style($font-size: 1rem, $font-weight: 900, $color: $white);
    text-align: center;
    background-color: $red-alpha;

    &.close,
    &[disabled] {
      background-color: $black-alpha;
      color: $black;
    }
  }
}
</style>
