<template>
  <router-link
    :to="categoryLink"
    tag="a"
    class="self-category-item btn text-reset text-decoration-none border rounded-3
    d-flex flex-column py-2 px-0"
    :class="{
      active: isActive,
    }"
  >
    <div class="self-image-container mx-auto">
      <img class="image-object-fit-contain" :src="src" :alt="alt" />
    </div>

    <p class="self-text fw-bold small text-center m-0 pt-2">{{ name }}</p>
  </router-link>
</template>

<script>
// 商品分類組件.

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

.self-category-item {
  .self-image-container {
    width: 3rem;
    height: 3rem;
  }

  &.active,
  &:active {
    border-color: transparent;
    background-color: $green-alpha;

    .self-text {
      color: $white;
    }
  }
}
</style>
