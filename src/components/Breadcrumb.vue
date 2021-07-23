<template>
  <div class="breadcrumb">
    <p>
      <span>
        <router-link :to="homeLink" class="path">首頁</router-link>
      </span>

      <span class="slash">/</span>

      <!-- 如果是進入商品頁面, 才有商品分類的 link. -->
      <span v-if="commodityName">
        <router-link :to="categoryLink" class="path">
          {{ categoryName }}
        </router-link>

        <!-- 商品的 path. -->
        <span class="slash">/</span>
        <span>{{ commodityName }}</span>
      </span>
      <!-- 如果是進入分類頁面, 則不需要 link, 分類頁面有按鈕可以切換分類. -->
      <span v-else>{{ categoryName }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",

  props: {
    // home link.
    homeLink: {
      type: String,
      required: true,
    },

    // 商品分類頁面的 link.
    categoryLink: {
      type: String,
      required: true,
    },

    // 商品分類的名稱.
    categoryName: {
      type: String,
      required: true,
    },

    // 商品名稱.
    commodityName: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";

.breadcrumb {
  span {
    @include font-style($font-size: 1rem);
  }

  .path {
    @include font-style($font-size: 1rem, $font-weight: 900, $color: $blue);
  }

  .slash {
    padding: 0 0.625rem;
  }
}
</style>
