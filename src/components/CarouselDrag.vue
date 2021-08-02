<template>
  <div class="carousel-drag">
    <!-- 拖放目標. -->
    <div
      class="items"
      :class="{ transition: isTransition }"
      :style="{ left: left }"
      @mousedown="itemsMousedownHandler($event)"
      @touchstart="itemsTouchstartHandler($event)"
    >
      <!-- item-container 使用 v-for, 並針對 RWD 修改寬度. -->
      <div class="item-container" v-for="(item, i) of items" :key="i">
        <!-- 商品. -->
        <MerchandiseItem
          :id="item.id"
          :category="item.category"
          :categoryName="item.categoryName"
          :name="item.name"
          :text="item.text"
          :imageSrc="item.imageSrc"
          :alt="item.alt"
          :remaining="item.remaining"
          :originalPrice="item.originalPrice"
          :specialPrice="item.specialPrice"
          :merchandiseLink="
            getMerchandiseLink({ category: item.category, id: item.id })
          "
        />
      </div>
    </div>

    <!-- 按鈕列 -->
    <div class="list">
      <ul>
        <li v-for="(n, i) of circleLength" :key="i">
          <button @click="listClickHandler(i)">
            <i
              class="bi"
              :class="{
                'bi-circle': active !== i,
                'bi-circle-fill': active === i,
              }"
            >
            </i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 可拖放輪播圖.

// 商品.
import MerchandiseItem from "./MerchandiseItem.vue";

// 節流 resize event.
import debounce from "../modules/debounce";

let items, itemContainer, debounceResizeHandler;

export default {
  name: "CarouselDrag",
  data() {
    return {
      // 當前索引.
      active: 0,

      // 判斷裝置.
      isMobile: false,

      // .items 寬度.
      itemsWidth: 0,
      // .item-container 寬度.
      itemContainerWidth: 0,
      // .items 可以顯示幾個 .item-container.
      itemCount: 1,

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
    // 縮短屬性.
    items() {
      return this.$store.getters.calcData.all.merchandises;
    },

    // 按鈕的數量.
    circleLength() {
      return this.itemCount === 1
        ? this.items.length
        : // this.itemCount 也算 1 個按鈕, 所以要 + 1.
          this.items.length - this.itemCount + 1;
    },

    // 一個按鈕可以走多少 left.
    // 1 / 1 * 100 = 100;
    // 1 / 4 * 100 = 25;
    calcLeft() {
      return Math.floor((1 / this.itemCount) * 100);
    },
  },

  methods: {
    // 商品頁面 link.
    getMerchandiseLink({ category, id }) {
      return "/merchandise/" + category + "/" + id;
    },

    // 電腦拖放.
    itemsMousedownHandler(e) {
      if (this.isMobile) return false;
      // 按下的 X 座標.
      this.startX = e.clientX;
      // 紀錄 offsetLeft.
      this.offsetLeft = items.offsetLeft;
      // 鎖定當前 left.
      this.left = items.offsetLeft + "px";
      // 取消動畫.
      this.isTransition = false;

      window.addEventListener("mousemove", this.windowMousemoveHandler);
      window.addEventListener("mouseup", this.windowMouseupHandler);
    },
    windowMousemoveHandler(e) {
      if (this.isMobile || e.clientX === this.startX) return false;
      this.movex = e.clientX - this.startX;
      this.left = this.offsetLeft + this.movex + "px";
    },
    windowMouseupHandler() {
      if (this.isMobile) return false;
      window.removeEventListener("mousemove", this.windowMousemoveHandler);
      window.removeEventListener("mouseup", this.windowMouseupHandler);

      // 沒有拖放.
      if (this.movex === 0) return false;

      // 判斷向左走向右走.
      // items.offsetLeft 現在的位置.
      // this.offsetLeft 拖放前的位置.
      // move 滑鼠放開後, 拖放的距離, 可能有正負.
      const move = items.offsetLeft - this.offsetLeft;
      const remainder = move % this.itemContainerWidth;
      let count =
        move > 0
          ? Math.floor(move / this.itemContainerWidth)
          : Math.ceil(move / this.itemContainerWidth);

      if (Math.abs(remainder) > 50) {
        count = remainder > 0 ? count + 1 : count - 1;
      }

      this.active = this.active - count;
      this.active =
        this.active < 0
          ? 0
          : this.active > this.circleLength - 1
          ? this.circleLength - 1
          : this.active;

      // 計算 left.
      this.left = this.active * -this.calcLeft + "%";
      // 變數重置.
      this.startX = this.movex = 0;
      // 開啟動畫.
      this.isTransition = true;
    },

    // 手機拖放.
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
      this.left = this.active * -this.calcLeft + "%";
      // 變數重置.
      this.startX = this.movex = 0;
      // 開啟動畫
      this.isTransition = true;
    },

    // 按鈕事件函式.
    listClickHandler(i) {
      const percentage = (this.itemContainerWidth / this.itemsWidth) * 100;

      this.active = i;
      this.left = this.active * percentage * -1 + "%";
      this.isTransition = true;
    },

    // 視窗縮放事件.
    resizeHandler() {
      items = this.$el.querySelector(".items");
      itemContainer = items.querySelector(".item-container");

      this.isMobile = window.innerWidth > 768 ? false : true;
      this.active = 0;
      this.left = "0%";

      this.itemsWidth = items.offsetWidth;
      this.itemContainerWidth = itemContainer.offsetWidth;
      this.itemCount = Math.floor(this.itemsWidth / this.itemContainerWidth);

      // 刪除拖放事件.
      window.removeEventListener("mousemove", this.windowMousemoveHandler);
      window.removeEventListener("mouseup", this.windowMouseupHandler);
      window.removeEventListener("touchmove", this.windowTouchmoveHandler);
      window.removeEventListener("touchend", this.windowTouchendHandler);
    },
  },

  components: { MerchandiseItem },

  mounted() {
    // 刪除事件.
    window.removeEventListener("resize", debounceResizeHandler);

    // 重新保存變數.
    debounceResizeHandler = debounce(this.resizeHandler, { wait: 1000 });

    // 綁定 resize 事件.
    window.addEventListener("resize", debounceResizeHandler);

    // 執行 resize 事件.
    this.resizeHandler();
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
      justify-content: center;
      align-items: center;

      li {
        margin-right: 0.5rem;

        i {
          @include font-style($font-size: 0.75rem, $color: $black-alpha);
        }
      }
    }
  }
}

@media only screen and (min-width: $screen-width-md) {
  .carousel-drag {
    .items {
      .item-container {
        width: 25%;
      }
    }
  }
}
</style>
