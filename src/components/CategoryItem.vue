<template>
  <router-link
    :to="categoryLink"
    tag="a"
    class="category-item"
    :class="{
      active: isActive,
    }"
  >
    <div class="image-container">
      <img :src="src" :alt="alt" />
    </div>
    <p class="text">{{ name }}</p>
  </router-link>
</template>

<script>
// 單項商品組件.

export default {
  name: "CategoryItem",

  props: {
    src: {
      // 型別限制.
      type: String,
      // 限制必需要傳值進來.
      required: true,
    },

    alt: {
      // 型別限制.
      type: String,
      // 限制必需要傳值進來.
      required: true,
    },

    name: {
      // 型別限制.
      type: String,
      // 限制必需要傳值進來.
      required: true,
    },

    // 跳轉的網址.
    categoryLink: {
      // 型別限制.
      type: String,
      // 限制必需要傳值進來.
      required: true,
    },

    // 當前在這個頁面.
    isActive: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.category-item {
  padding: 0.625rem 0;
  border: 1px solid $black-alpha;
  border-radius: 8px;
  box-sizing: border-box;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .image-container {
    margin: 0 auto;
    width: 50px;
    height: 50px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .text {
    padding-top: 0.625rem;
    width: 100%;
    text-align: center;
    @include font-style($font-size: 0.75rem);
    overflow-wrap: break-word;
  }

  &.active {
    border-color: transparent;
    background-color: rgba($green, 0.4);

    .text {
      @include font-style(
        $font-size: 0.75rem,
        $font-weight: 900,
        $color: $white
      );
    }
  }
}
</style>
