<template>
  <div class="empty">
    <p>{{ text }}</p>
  </div>
</template>

<script>
// 沒有資料時代替的組件.

export default {
  name: "Empty",
  props: {
    text: { type: String, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";

.empty {
  padding: 3rem 0;
  background-color: $title-color-alpha;
  border-radius: 10px;

  p {
    @include font-style($font-size: 1.5rem, $font-weight: 900);
    text-align: center;
  }
}
</style>
