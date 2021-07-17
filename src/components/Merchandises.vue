<template>
  <div class="merchandises">
    <!-- 拖放目標. -->
    <div
      class="items"
      :class="{ transition: isTransition }"
      :style="{ left: left }"
      @touchstart="itemsTouchstartHandler($event)"
    >
      <!-- item-container 使用 v-for, 並針對 RWD 修改寬度. -->
      <div class="item-container" v-for="(item, i) of items" :key="i">
        <div class="item">
          <!-- 圖片 -->
          <div class="image-container">
            <img :src="item.imageSrc" alt="poke-ball" />
          </div>

          <!-- 類別. -->
          <div class="category emergency">
            {{ item.category }}
          </div>

          <!-- 商品名稱 -->
          <p class="name">{{ item.name }}</p>

          <!-- 商品敘述 -->
          <p class="text">
            {{ item.text }}
          </p>

          <!-- 價格 -->
          <div class="price" :class="{ 'special-offer': item.specialOffer }">
            <p class="special" v-if="item.specialOffer">
              NT${{ getSpecialOffer(item.price, item.specialOffer) }}元
            </p>
            <p class="original">NT${{ item.price }}元</p>
          </div>

          <!-- 按鈕 -->
          <div class="link-container">
            <a href="javascript:;">詳細介紹</a>
            <a href="javascript:;">加入購物車</a>
          </div>

          <!-- 售完 -->
          <div class="sold-out" v-if="item.remaining < 1">
            <p>缺貨</p>
          </div>
        </div>
      </div>
    </div>

    <div class="list">
      <ul>
        <li v-for="(item, i) of items" :key="i" @click="listClickHandler(i)">
          <i
            class="bi"
            :class="{
              'bi-circle': active !== i,
              'bi-circle-fill': active === i,
            }"
          ></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
let items;

export default {
  name: "Merchandises",
  data() {
    return {
      // 當前索引.
      active: 2,
      // 是否為手機版.
      isMobile: true,
      // 手機按下 X 座標.
      startX: 0,
      // 手機拖放距離.
      movex: 0,
      // items 當前 left.
      offsetLeft: 0,
      // items 拖放後的 left 目標.
      left: 0,
      // items 是否開啟動畫.
      isTransition: false,
    };
  },
  computed: {
    items() {
      const data = this.$store.state.data;
      let total = [];

      for (let key in data) {
        total = total.concat(data[key].merchandises);
      }

      return total;
      // return this.$store.state.data["ball"].merchandises;
    },
  },
  methods: {
    getSpecialOffer(price, specialOffer) {
      return Math.ceil(price * specialOffer);
    },
    itemsTouchstartHandler(e) {
      if (!this.isMobile) return false;
      // 按下的 X 座標.
      this.startX = e.changedTouches[0].clientX;
      // 紀錄 offsetLeft.
      this.offsetLeft = items.offsetLeft;
      // 鎖定當前 left.
      this.left = items.offsetLeft + "px";
      // 取消動畫.
      this.isTransition = false;

      window.addEventListener("touchmove", this.windowTouchmoveHandler);
      window.addEventListener("touchend", this.windowTouchendHandler);
    },
    windowTouchmoveHandler(e) {
      if (!this.isMobile) return false;
      this.movex = e.changedTouches[0].clientX - this.startX;
      this.left = this.offsetLeft + this.movex + "px";
    },
    windowTouchendHandler() {
      if (!this.isMobile) return false;
      window.removeEventListener("touchmove", this.windowTouchmoveHandler);
      window.removeEventListener("touchend", this.windowTouchendHandler);

      // 沒有拖放.
      if (this.movex === 0) return false;

      // 判斷 active.
      this.active =
        this.movex < -50
          ? this.active + 1
          : this.movex > 50
          ? this.active - 1
          : this.active;

      // 限制 active 上下限.
      this.active =
        this.active < 0
          ? 0
          : this.active > this.items.length - 1
          ? this.items.length - 1
          : this.active;

      // 計算 left.
      this.left = this.active * -100 + "%";
      // 變數重置.
      this.startX = this.movex = 0;
      // 開啟動畫
      this.isTransition = true;
    },

    // 按鈕事件函式.
    listClickHandler(i) {
      this.active = i;
      this.left = this.active * 100 * -1 + "%";
      this.isTransition = true;
    },
  },

  mounted() {
    items = this.$el.querySelector(".items");
    this.left = this.active * -100 + "%";
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.merchandises {
  position: relative;

  // 拖放目標.
  .items {
    width: 100%;
    // 配合 inline-block;
    font-size: 0px;
    white-space: nowrap;
    // 為了高度, 使用 relative 定位來拖放.
    position: relative;
    left: 0px;

    &.transition {
      transition: left 0.4s ease-out 0s;
    }

    // rwd 目標.
    .item-container {
      padding: 0 0.375rem;
      width: 100%;
      box-sizing: border-box;
      display: inline-block;

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
        .category {
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
          @include font-style($font-size: 1rem, $color: #666);
          // color: #666;
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

          .special {
            color: $green;
          }

          .line-through {
            @include font-style($font-size: 1rem, $font-weight: 400);
            text-decoration-line: line-through;
          }

          &.special-offer {
            .original {
              @include font-style($font-size: 1rem, $font-weight: 400);
              text-decoration-line: line-through;
            }
          }
        }

        // 按鈕
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

        .sold-out {
          width: 100%;
          height: 100%;
          background-color: rgba($color: $black, $alpha: 0.5);
          position: absolute;
          left: 0px;
          top: 0px;

          display: flex;
          justify-content: center;
          align-items: center;

          p {
            @include font-style(
              $font-size: 2rem,
              $font-weight: 900,
              $color: $white
            );
            letter-spacing: 1rem;
            text-align: center;
          }
        }
      }
    }
  }

  .list {
    padding-top: 0.5rem;
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    i {
      @include font-style(
        $font-size: 0.75rem,
        $color: rgba($color: $black, $alpha: 0.3)
      );
    }
  }
}
</style>
