<template>
  <table class="merchandise-table">
    <thead>
      <tr>
        <td class="title">商品名稱</td>
        <td class="count">數量</td>
        <td class="price">單價</td>
        <td class="delete" v-if="isRemove">刪除</td>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, i) of merchandises" :key="i">
        <td>{{ item.name }}</td>
        <td>{{ item.count }}</td>
        <td>NT $ {{ item.price }} 元</td>
        <td v-if="isRemove">
          <button @click="$emit('remove', item.id)">
            <i class="bi bi-archive"></i>
          </button>
        </td>
      </tr>
    </tbody>

    <tfoot>
      <tr>
        <td :colspan="isRemove ? 2 : 1">總計</td>
        <td colspan="2">NT$ {{ getTotal }} 元</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
// 商品表格組件.

export default {
  name: "MerchandiseTable",

  props: {
    // 商品陣列.
    merchandises: {
      type: Array,
      required: true,
    },

    // 是否要刪除欄位.
    isRemove: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    getTotal() {
      return this.merchandises.reduce((sum, item, index) => {
        return (sum = sum + item.total);
      }, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";

.merchandise-table {
  width: 100%;
  box-sizing: border-box;

  thead {
    @include font-style($font-size: 1.2rem);
    background-color: rgba($gray, 0.2);
  }

  tr {
    padding: 10px 0;
    // height: 3rem;
    border-top: 1px solid $black-alpha;
    line-height: 3rem;

    &:last-child {
      border-bottom: 1px solid $black-alpha;
    }
  }

  td {
    // padding-left: 0.625rem;
    text-align: center;
    vertical-align: middle;
    box-sizing: border-box;
  }

  i {
    @include font-style($font-size: 1rem);
  }

  .title {
    width: 30%;
  }

  .price {
    width: 35%;
  }

  .empty {
    padding: 3rem 0;
    background-color: $black-alpha;
    border-radius: 10px;

    p {
      @include font-style($font-size: 1.5rem, $font-weight: 900);
      text-align: center;
    }
  }
}
</style>
