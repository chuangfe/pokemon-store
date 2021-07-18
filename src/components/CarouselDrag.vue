<template>
  <div class="carousel-drag">
    <!-- 拖放目標. -->
    <div
      class="items"
      :class="{ transition: isTransition }"
      :style="{ left: left }"
      @touchstart="itemsTouchstartHandler($event)"
    >
      <!-- item-container 使用 v-for, 並針對 RWD 修改寬度. -->
      <div class="item-container" v-for="(item, i) of items" :key="i">
        <!-- 商品. -->
        <Merchandise
          :src="item.imageSrc"
          :alt="item.alt"
          :category="item.category"
          :name="item.name"
          :text="item.text"
          :specialOffer="item.specialOffer"
          :price="item.price"
          :remaining="item.remaining"
        />
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
// 可拖放輪播圖.

// 商品.
import Merchandise from "./Merchandise.vue";

let items;

export default {
  name: "Merchandises",
  data() {
    return {
      // 當前索引.
      active: 0,
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
      return this.$store.state.data.all.merchandises;
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

  components: { Merchandise },

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

.carousel-drag {
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
      @include font-style($font-size: 0.75rem, $color: $black-alpha);
    }
  }
}
</style>
