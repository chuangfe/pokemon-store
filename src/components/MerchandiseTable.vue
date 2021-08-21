<template>
  <table
    class="self-merchandise-table w-100 table table-hover text-center m-0 align-middle"
  >
    <thead>
      <tr class="fs-5">
        <th>商品名稱</th>
        <th>數量</th>
        <th>單價</th>
        <th v-if="isRemove">刪除</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, i) of merchandises" :key="i">
        <td>{{ item.name }}</td>
        <td>{{ item.count }}</td>
        <td>NT $ {{ item.price }} 元</td>
        <td v-if="isRemove">
          <button class="btn" @click="$emit('remove', item)">
            <i class="bi bi-archive"></i>
          </button>
        </td>
      </tr>
    </tbody>

    <tfoot>
      <tr>
        <!-- colspan 表格欄位橫跨的列數. -->
        <td :colspan="isRemove ? 2 : 1">總計</td>
        <td colspan="2">NT$ {{ total }} 元</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
// 商品表格組件, 在購物車頁面和訂單頁面使用.

export default {
  name: "MerchandiseTable",

  props: {
    // 商品陣列.
    merchandises: {
      type: Array,
      required: true,
    },

    // 訂單金額.
    total: {
      type: Number,
      required: true,
    },

    // 是否要刪除欄位.
    isRemove: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.self-merchandise-table {
  box-sizing: border-box;
}
</style>
