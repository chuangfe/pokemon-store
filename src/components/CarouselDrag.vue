<template>
  <div class="self-carousel-drag position-relative overflow-hidden">
    <!-- 拖放目標, position-relative 是為了保存高度. -->
    <div
      class="self-items self-font-size-delete w-100 position-relative row flex-nowrap m-0"
      :class="{ 'is-transition': isTransition }"
      :style="{ left: left }"
      @mousedown="itemsMousedownHandler($event)"
      @touchstart="itemsTouchstartHandler($event)"
    >
      <!-- item-container 使用 v-for, 並針對 RWD 修改寬度. -->
      <div
        class="self-item-container self-border-box d-inline-block px-2 col-12 col-md-6 col-lg-4 col-xl-3"
        v-for="(item, i) of items"
        :key="i"
      >
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
    <div class="self-list pb-2">
      <ul class="list-unstyled list-inline text-center mb-0">
        <li
          class="list-inline-item mt-2"
          v-for="(n, i) of circleLength"
          :key="i"
        >
          <button class="btn btn-sm" @click="listClickHandler(i)">
            <i
              class="bi text-muted small"
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
      return (1 / this.itemCount) * 100;
    },
  },

  methods: {
    // 商品頁面 link.
    getMerchandiseLink({ category, id }) {
      return "/merchandise/" + category + "/" + id;
    },

    // 電腦拖放.
    itemsMousedownHandler(e) {
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
      if (e.clientX === this.startX) return false;
      this.movex = e.clientX - this.startX;
      this.left = this.offsetLeft + this.movex + "px";
    },
    windowMouseupHandler() {
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
      this.movex = e.changedTouches[0].clientX - this.startX;
      this.left = this.offsetLeft + this.movex + "px";
    },
    windowTouchendHandler() {
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
      items = this.$el.querySelector(".self-items");
      itemContainer = items.querySelector(".self-item-container");

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
    debounceResizeHandler = debounce(this.resizeHandler, { wait: 500 });

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

.self-carousel-drag {
  // 拖放目標.
  .self-items {
    // 不換行.
    white-space: nowrap;
    // 預設值.
    left: 0px;

    // 需要動畫時才有的樣式.
    &.is-transition {
      transition: left 0.4s ease-out 0s;
    }
  }
}
</style>
