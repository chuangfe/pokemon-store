<template>
  <footer class="self-footer fs-6 text-muted">
    <!-- 寶可夢商店. -->
    <div class="self-shop-container text-center border-bottom">
      <img
        class="image-object-fit-width-contain"
        src="../../public/images/shop.png"
        alt="shop"
      />
    </div>

    <!-- logo. -->
    <div class="ps-2">
      <div class="self-logo-container my-3">
        <img
          class="image-object-fit-height-contain"
          src="../../public/images/pokemon-store.png"
          alt="pokemon-store"
        />
      </div>

      <p class="ps-2">實體地址：真新鎮大木路一段6號</p>

      <p class="ps-2">營業時間：24H</p>

      <p class="ps-2">
        原創作者：icguanyu
        <a class="text-reset" href="https://github.com/icguanyu" target="_blank"
          >Github</a
        >
        ｜
        <a
          class="text-reset"
          href="https://codepen.io/icguanyu/"
          target="_blank"
          >Codepen</a
        >
      </p>

      <p class="ps-2">
        練習作品｜
        <a
          class="text-reset"
          href="https://www.pokemon.com/us/"
          target="_blank"
        >
          圖片來源：https://www.pokemon.com/us/
        </a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.self-footer {
  .self-logo-container {
    height: 3rem;
  }
}
</style>
