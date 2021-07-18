<template>
  <footer class="footer">
    <div class="shop">
      <img src="../../public/images/shop.png" alt="shop" />
    </div>

    <div class="container">
      <div class="logo-container">
        <img src="../../public/images/pokemon-store.png" alt="pokemon-store" />
      </div>

      <p class="store-address">實體地址：真新鎮大木路一段6號</p>

      <p>營業時間：24H</p>

      <p>
        原創作者：icguanyu
        <a href="https://github.com/icguanyu" target="_blank">Github</a>
        ｜
        <a href="https://codepen.io/icguanyu/" target="_blank">Codepen</a>
      </p>

      <p>
        原創作品｜
        <a href="https://www.pokemon.com/us/" target="_blank">
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

.footer {
  padding-bottom: 1rem;
  @include font-style($font-size: 1rem, $color: $gray);

  .shop {
    padding: 1rem 0 0.625rem 0;
    width: 100%;
    border-bottom: 1px solid $black-alpha;

    img {
      width: 100%;
    }
  }

  .logo-container {
    padding: 1rem 0 0.625rem 1rem;
    height: 2.5rem;

    img {
      height: 100%;
      object-fit: contain;
    }
  }

  p {
    padding: 0 0 0.375rem 1rem;
    letter-spacing: 1px;

    a {
      @include font-style($font-size: 1rem, $font-weight: 900);
    }
  }
}
</style>
