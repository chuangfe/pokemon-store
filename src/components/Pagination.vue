<template>
  <!-- 分頁. -->
  <div class="self-pagination">
    <ul class="list-unstyled list-inline m-0">
      <!-- 上一頁. -->
      <li class="list-inline-item">
        <button
          class="btn btn-sm"
          @click="$emit('setIndex', index - 1)"
          :disabled="index === 0"
        >
          <span class="self-span border d-block py-2 px-3 rounded-3 fs-5">
            <i class="bi bi-chevron-double-left"></i
          ></span>
        </button>
      </li>

      <!-- 依照索引跳轉頁數. -->
      <li class="list-inline-item" v-for="(num, i) of pages" :key="i">
        <button class="btn btn-sm" @click="$emit('setIndex', i)">
          <span
            class="self-span border d-block py-2 px-3 rounded-3 fs-5"
            :class="{ active: index === i }"
            >{{ num }}</span
          >
        </button>
      </li>

      <!-- 下一頁 -->
      <li class="list-inline-item">
        <button
          class="btn btn-sm"
          @click="$emit('setIndex', index + 1)"
          :disabled="index === pages - 1"
        >
          <span class="self-span border d-block py-2 px-3 rounded-3 fs-5">
            <i class="bi bi-chevron-double-right"></i
          ></span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
// 分頁按鈕組件, 商品分類頁面使用.

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

.self-pagination {
  // 當前頁數時的樣式.
  .self-span.active {
    color: $white;
    background-color: $green;
    border-color: $green;
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
}
</style>
