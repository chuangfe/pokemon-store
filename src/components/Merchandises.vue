<template>
  <div class="merchandises">
    <div class="items">
      <div class="item">
        <!-- 圖片 -->
        <div class="image-container">
          <img src="../../public/images/poke-ball-00.png" alt="poke-ball" />
        </div>

        <!-- 類別. -->
        <div class="categories emergency">
          精靈球
        </div>

        <!-- 商品名稱 -->
        <p class="name">精靈球</p>

        <!-- 商品敘述 -->
        <p class="text">
          是精靈寶可夢世界中隨處可見的一種道具。精靈球的作用是捕捉或者攜帶寶可夢，不同種類的精靈球擁有不同的特殊效果。
        </p>

        <div class="price">
          <p class="special-offer">NT$200元</p>
          <p class="line-through">NT$200元</p>
        </div>

        <div class="link-container">
          <a href="javascript:;">詳細介紹</a>
          <a href="javascript:;">加入購物車</a>
        </div>
      </div>
    </div>

    <!-- <div class="list">
      <ul>
        <li></li>
      </ul>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Merchandises",
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.items {
  .item {
    padding: 1rem;
    border: 1px solid $gray;
    position: relative;

    .image-container {
      height: 10rem;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    // 商品類別.
    .categories {
      padding: 4px;
      @include font-style($font-size: 1rem, $font-weight: 900);
      border-radius: 6px;
      position: absolute;
      right: 0.625rem;
      top: 0.625rem;
    }

    // 商品名稱.
    .name {
      @include font-style($font-size: 1.2rem, $font-weight: 900);
    }

    // 商品說明.
    .text {
      padding: 0.625rem 0;
      color: #666;
      border-bottom: 1px solid #666;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    // 價格.
    .price {
      padding: 0.625rem 0;
      @include font-style($font-size: 1.2rem, $font-weight: 900);
      letter-spacing: 1px;

      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;

      .special-offer {
        color: $green;
      }

      .line-through {
        @include font-style($font-size: 1rem, $font-weight: 400);
        text-decoration-line: line-through;
      }
    }

    .link-container {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;

      a {
        padding: 0.3125rem 0;
        display: block;
        border: 1px solid $gray;
        @include font-style($font-size: 1.2rem, $font-weight: 700);
        text-align: center;
        flex-basis: 50%;

        &:first-child {
          margin-right: 0.625rem;
        }
      }
    }
  }
}
</style>
