<template>
  <div class="self-merchandise-item border position-relative p-3">
    <!-- 圖片 -->
    <div class="self-image-container">
      <img
        class="image-object-fit-contain"
        :src="imageSrc"
        :alt="alt"
        draggable="false"
      />
    </div>

    <!-- 類別. -->
    <div
      class="badge bg-danger fs-6 fw-bold text-white p-1 rounded-3 position-absolute top-0 end-0 m-1"
    >
      {{ categoryName }}
    </div>

    <!-- 商品名稱 -->
    <p class="fs-5 fw-bold text-black m-0 py-2">{{ name }}</p>

    <!-- 商品敘述 -->
    <p class="self-text fs-6 w-100 text-secondary m-0 border-bottom py-2">
      {{ text }}
    </p>

    <!-- 售價容器. -->
    <div
      class="self-price py-2 fs-5 fw-bold d-flex justify-content-between align-items-center"
      :class="{ 'special-offer': specialPrice }"
    >
      <!-- 特價. -->
      <p class="self-special screen-hidden m-0" v-if="specialPrice">
        NT${{ specialPrice }}元
      </p>

      <!-- 原價. -->
      <p class="self-original screen-hidden m-0">NT${{ originalPrice }}元</p>
    </div>

    <!-- 按鈕 -->
    <div class="self-link-container row">
      <!-- 詳細介紹 link 跳轉. -->
      <div class="col-6 pe-1">
        <router-link
          class="d-block border fs-6 fw-bold px-2 py-1 rounded-3 text-reset text-decoration-none text-center"
          :to="merchandiseLink"
          >詳細介紹</router-link
        >
      </div>

      <!-- 加入購物車, 固定新增 1 個商品. -->
      <div class="col-6 ps-1">
        <button
          class="btn border fs-6 fw-bold w-100 px-2 py-1 rounded-3"
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
        </button>
      </div>
    </div>

    <!-- 售完 -->
    <div
      class="self-sold-out w-100 h-100 position-absolute top-0 start-0 d-flex justify-content-center align-items-center"
      v-if="remaining < 1"
    >
      <p class="m-0 fs-1 fw-bold text-white text-center">售完</p>
    </div>
  </div>
</template>

<script>
// 單項商品展示.

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
      // 商品售完.
      if (this.remaining < 1) return false;

      this.$store.dispatch("ADD_SHOPPING_CART_ACTIONS", {
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

.self-merchandise-item {
  // 商品圖片容器.
  .self-image-container {
    height: 10rem;
  }

  // 商品說明.
  .self-text {
    // 將超過容器的文字壓縮為 ... 符號.
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  // 價格.
  .self-price {
    letter-spacing: 1px;

    // 特價.
    .self-special {
      color: $green;
    }

    // 有特價的時候, 原價加上刪除線.
    &.special-offer .self-original {
      text-decoration-line: line-through;
    }
  }

  // 按鈕
  .self-link-container {
    a:active,
    button:active {
      color: $white !important;
      background-color: $green !important;
    }
  }

  // 售完.
  .self-sold-out {
    background-color: $black-alpha;

    p {
      letter-spacing: 1rem;
    }
  }
}

@media only screen and (min-width: $screen-width-xl) {
  .self-merchandise-item .self-price.special-offer .self-original {
    display: none;
  }
}
</style>
