<template>
  <div class="breadcrumb">
    <p>
      <router-link to="/home">首頁</router-link>
      /
      <span class="path">{{ getPath }}</span>
      /
    </p>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",

  computed: {
    getPath() {
      return this.$store.getters.calcData[this.$route.params.category].name;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";

.breadcrumb {
  padding: 0.375rem 0 0.375rem 0.625rem;

  p {
    @include font-style($font-size: 1rem);
    word-spacing: 0.375rem;
  }

  .path {
    @include font-style($font-size: 1rem, $font-weight: 900, $color: $blue);
  }
}
</style>
