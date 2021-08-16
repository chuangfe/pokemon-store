<template>
  <div class="self-carousel position-relative overflow-hidden">
    <transition-group
      class="w-100 h-100 position-relative"
      tag="div"
      :name="direction"
    >
      <div
        class="w-100 h-100 position-absolute"
        v-for="(item, i) of items"
        :key="i"
        v-show="i === active"
      >
        <img class="image-object-fit-contain" :src="item.src" :alt="item.alt" />
      </div>
    </transition-group>

    <div
      class="self-arrow w-100 position-absolute top-50 translate-middle-y"
      v-if="directionButton"
    >
      <button
        class="btn position-absolute start-0 ms-2"
        v-show="active !== 0"
        @click="clickHandler(active - 1)"
      >
        <i class="bi bi-arrow-left-square fs-2 text-muted"></i>
      </button>

      <button
        class="btn position-absolute end-0 me-2"
        v-show="active !== items.length - 1"
        @click="clickHandler(active + 1)"
      >
        <i class="bi bi-arrow-right-square fs-2 text-muted"></i>
      </button>
    </div>

    <div
      class="self-list w-100 position-absolute bottom-0 mb-2"
      v-if="listButton"
    >
      <ul class="list-unstyled list-inline text-center mb-0 p-0">
        <li class="list-inline-item" v-for="(item, i) of items" :key="i">
          <button class="btn btn-sm" @click="clickHandler(i)">
            <i
              class="bi small text-muted"
              :class="{
                'bi-circle': active !== i,
                'bi-circle-fill': active === i,
              }"
            ></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 普通的輪播圖.

export default {
  name: "Carousel",

  props: {
    // 圖片資料.
    items: {
      // 型別限制.
      type: Array,
      // 限制必需要傳值進來.
      required: true,
    },
    // 是否開啟方向按鈕.
    directionButton: {
      // 型別限制.
      type: Boolean,
      // 預設值.
      default: true,
    },
    // 是否開啟圓形按鈕.
    listButton: {
      // 型別限制.
      type: Boolean,
      // 預設值.
      default: true,
    },
  },

  data() {
    return {
      active: 0,
      direction: "next",
    };
  },

  methods: {
    clickHandler(calcActive) {
      this.direction = calcActive > this.active ? "next" : "prev";
      this.active =
        calcActive < 0
          ? 0
          : calcActive > this.items.length - 1
          ? this.items.length - 1
          : calcActive;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.self-carousel {
  // 可以設置 RWD.
  height: 17.5rem;
}

// 進場和退場過程中的動畫.
.next-enter-active,
.next-leave-active,
.prev-enter-active,
.prev-leave-active {
  transition: left 0.4s ease-out 0s;
}

// 進場前的樣式.
.next-enter {
  left: 100%;
}

// 進場結束的樣式.
.next-enter-to {
  left: 0%;
}

// 離場前的樣式.
.next-leave {
  left: 0%;
}

// 離場結束的樣式.
.next-leave-to {
  left: -100%;
}

// 進場前的樣式.
.prev-enter {
  left: -100%;
}

// 進場結束的樣式.
.prev-enter-to {
  left: 0%;
}

// 離場前的樣式
.prev-leave {
  left: 0%;
}

// 離場結束的樣式
.prev-leave-to {
  left: 100%;
}
</style>
