<template>
  <div class="breadcrumb">
    <p>
      <span>
        <router-link :to="homeLink" class="path">首頁</router-link>
      </span>

      <span class="slash">/</span>

      <!-- 如果是進入商品頁面, 才有商品分類的 link. -->
      <span v-if="merchandiseName">
        <router-link :to="categoryLink" class="path">
          {{ categoryName }}
        </router-link>

        <!-- 商品的 path. -->
        <span class="slash">/</span>
        <span>{{ merchandiseName }}</span>
      </span>
      <!-- 如果是進入分類頁面, 則不需要 link, 分類頁面有按鈕可以切換分類. -->
      <span v-else>{{ categoryName }}</span>
    </p>
  </div>
</template>

<script>
// 路徑連結組件.

export default {
  name: "Breadcrumb",

  props: {
    // home link, 必定會有.
    homeLink: {
      type: String,
      required: true,
    },
    // 商品分類英文, 必定會有.
    category: {
      type: String,
      required: true,
    },
    // 商品分類中文, 必定會有.
    categoryName: {
      type: String,
      required: true,
    },

    // 商品分類頁面的 link, 只有進入商品頁面才會有.
    categoryLink: {
      type: String,
    },
    // 商品名稱, 只有進入商品頁面才會有.
    merchandiseName: {
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
