<template>
  <div class="self-empty bg-secondary py-5">
    <p class="letter-spacing-rem fs-4 text-white text-center fw-bold m-0">
      {{ text }}
    </p>
  </div>
</template>

<script>
// 沒有資料時代替的元件.

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
@import "../assets/style/class.scss";

.self-empty {
  border-radius: 1rem;
}
</style>
