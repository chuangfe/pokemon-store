<template>
  <div class="carousel">
    <transition-group class="container" tag="div" :name="direction">
      <div
        class="carousel-item"
        v-for="(item, i) of items"
        :key="i"
        v-show="i === active"
      >
        <img :src="item.src" :alt="item.alt" />
      </div>
    </transition-group>

    <div class="button-container" v-if="directionButton">
      <button
        class="prev"
        v-show="active !== 0"
        @click="clickHandler(active - 1)"
      >
        <i class="bi bi-arrow-left-square"></i>
      </button>

      <button
        class="next"
        v-show="active !== items.length - 1"
        @click="clickHandler(active + 1)"
      >
        <i class="bi bi-arrow-right-square"></i>
      </button>
    </div>

    <div class="list-container" v-if="listButton">
      <ul>
        <li v-for="(item, i) of items" :key="i">
          <button @click="clickHandler(i)">
            <i class="bi bi-circle" v-show="active !== i"></i>
            <i class="bi bi-circle-fill" v-show="active === i"></i>
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

// 可以設置 RWD.
.carousel {
  height: 17.5rem;
  position: relative;
  z-index: 0;

  // transition-group 轉出來的 element.
  .container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .carousel-item {
    width: 100%;
    height: 100%;
    position: absolute;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
  }

  .button-container {
    width: 100%;
    transform: translateY(-1rem);
    position: absolute;
    top: 50%;

    button {
      position: absolute;
      top: 50%;

      &.prev {
        left: 0.625rem;
      }

      &.next {
        right: 0.625rem;
      }
    }

    i {
      @include font-style($font-size: 2rem, $color: $black-alpha);
    }
  }

  .list-container {
    width: 100%;
    position: absolute;
    left: 0px;
    bottom: 0px;

    ul {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;

      li {
        margin-right: 0.625rem;

        &:last-child {
          margin-right: 0px;
        }

        button {
          i {
            @include font-style($font-size: 0.75rem, $color: $black-alpha);
          }
        }
      }
    }
  }
}

// 進場和退場過程中的動畫.
.next-enter-active,
.next-leave-active,
.prev-enter-active,
.prev-leave-active {
  transition: left 0.4s cubic-bezier(0, 0.8, 0.9, 1) 0s;
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
