<template>
  <div class="merchandise-item">
    <!-- 圖片 -->
    <div class="image-container">
      <img :src="imageSrc" :alt="alt" />
    </div>

    <!-- 類別. -->
    <div class="category emergency">
      {{ categoryName }}
    </div>

    <!-- 商品名稱 -->
    <p class="name">{{ name }}</p>

    <!-- 商品敘述 -->
    <p class="text">
      {{ text }}
    </p>

    <!-- 價格 -->
    <div class="price" :class="{ 'special-offer': specialPrice }">
      <p class="special" v-if="specialPrice">NT${{ specialPrice }}元</p>
      <p class="original">NT${{ originalPrice }}元</p>
    </div>

    <!-- 按鈕 -->
    <div class="link-container">
      <router-link :to="merchandiseLink">詳細介紹</router-link>
      <a
        href="javascript:;"
        @click="
          clickHandler({
            id,
            category,
            categoryName,
            name,
            price: getCartprice(originalPrice, specialPrice),
          })
        "
      >
        加入購物車
      </a>
    </div>

    <!-- 售完 -->
    <div class="sold-out" v-if="remaining < 1">
      <p>售完</p>
    </div>
  </div>
</template>

<script>
// 單項商品展示.

// 讀取進度.
import loadHandler from "../modules/loadHandler";

export default {
  name: "Merchandise",

  props: {
    // 商品 id.
    id: {
      type: String,
      required: true,
    },

    // 商品分類英文.
    category: {
      type: String,
      required: true,
    },

    // 商品分類中文.
    categoryName: {
      type: String,
      required: true,
    },

    // 商品名稱中文.
    name: {
      type: String,
      required: true,
    },

    // 商品說明中文.
    text: {
      type: String,
      required: true,
    },

    // 商品圖片網址.
    imageSrc: {
      type: String,
      required: true,
    },

    // 商品圖片文字.
    alt: {
      type: String,
      required: true,
    },

    // 商品剩餘數量.
    remaining: {
      type: Number,
      required: true,
    },

    // 商品原價.
    originalPrice: {
      type: Number,
      required: true,
    },

    // 商品特價.
    specialPrice: {
      type: [Boolean, Number],
      required: true,
    },

    // 跳轉至商品頁面.
    merchandiseLink: { type: String, required: true },
  },

  methods: {
    // 判斷商品價格.
    getCartprice(original, special) {
      return special ? special : original;
    },

    // 加入購物車.
    clickHandler({ id, category, categoryName, name, price, count = 1 }) {
      loadHandler.isLoading();

      // 商品售完.
      if (this.remaining < 1) return false;

      this.$store.commit("ADD_SHOPPING_CART", {
        id,
        category,
        categoryName,
        name,
        price,
        count,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.merchandise-item {
  padding: 1rem;
  border: 1px solid $black-alpha;
  position: relative;

  .image-container {
    height: 10rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  // 商品類別.
  .category {
    padding: 4px;
    @include font-style($font-size: 1rem, $font-weight: 900);
    border-radius: 6px;
    position: absolute;
    right: 0.625rem;
    top: 0.625rem;
  }

  // 商品名稱.
  .name {
    @include font-style($font-size: 1.2rem, $font-weight: 900);
  }

  // 商品說明.
  .text {
    padding: 0.625rem 0;
    @include font-style($font-size: 1rem, $color: $gray);
    border-bottom: 1px solid $black-alpha;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  // 價格.
  .price {
    padding: 0.625rem 0;
    @include font-style($font-size: 1.2rem, $font-weight: 900);
    letter-spacing: 1px;

    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;

    .special {
      color: $green;
    }

    .line-through {
      @include font-style($font-size: 1rem, $font-weight: 400);
      text-decoration-line: line-through;
    }

    &.special-offer {
      .original {
        @include font-style($font-size: 1rem, $font-weight: 400);
        text-decoration-line: line-through;
      }
    }
  }

  // 按鈕
  .link-container {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;

    a {
      padding: 0.3125rem 0;
      display: block;
      border: 1px solid $black-alpha;
      @include font-style($font-size: 1.2rem, $font-weight: 700);
      text-align: center;
      flex-basis: 50%;
      user-select: none;

      &:first-child {
        margin-right: 0.625rem;
      }
    }

    a:active {
      color: $white !important;
      background-color: $green !important;
    }
  }

  .sold-out {
    width: 100%;
    height: 100%;
    background-color: $black-alpha;
    position: absolute;
    left: 0px;
    top: 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    p {
      @include font-style($font-size: 2rem, $font-weight: 900, $color: $white);
      letter-spacing: 1rem;
      text-align: center;
    }
  }
}
</style>
