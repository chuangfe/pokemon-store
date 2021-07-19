<template>
  <!-- 分頁. -->
  <div class="pagination">
    <ul>
      <!-- 上一頁. -->
      <li>
        <button @click="$emit('setIndex', index - 1)" :disabled="index === 0">
          <span> <i class="bi bi-chevron-double-left"></i></span>
        </button>
      </li>

      <!-- 依照索引跳轉頁數. -->
      <li v-for="(num, i) of pages" :key="i">
        <button @click="$emit('setIndex', i)">
          <span :class="{ active: index === i }">{{ num }}</span>
        </button>
      </li>

      <!-- 下一頁 -->
      <li>
        <button
          @click="$emit('setIndex', index + 1)"
          :disabled="index === pages - 1"
        >
          <span> <i class="bi bi-chevron-double-right"></i></span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",

  props: {
    index: {
      type: Number,
      required: true,
    },

    length: {
      type: Number,
      required: true,
    },

    pages: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";

.pagination {
  display: flex;
  justify-content: start;
  align-items: center;

  ul {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  li {
    margin-right: 0.625rem;

    &:last-child {
      margin-right: 0px;
    }
  }

  // 按鈕不可點擊時的樣式.
  button[disabled] {
    span {
      border-color: $black-alpha;

      i::before {
        color: $black-alpha;
      }
    }
  }

  span {
    padding: 0.25rem 0.625rem;
    height: 100%;
    @include font-style($font-size: 1.2rem);
    text-align: center;
    border: 1px solid $gray;
    border-radius: 6px;
    display: block;

    &.active {
      color: $white;
      background-color: $green;
      border-color: $green;
    }

    &,
    i::before {
      @include font-style($font-size: 1.2rem);
    }
  }
}
</style>
