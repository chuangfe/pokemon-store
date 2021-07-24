<template>
  <div class="shopping-cart">
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <td class="title">商品名稱</td>
            <td class="count">數量</td>
            <td class="price">價格</td>
            <td class="delete">刪除</td>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, i) of shoppingCart" :key="i">
            <td>{{ item.name }}</td>
            <td>{{ item.count }}</td>
            <td>{{ item.total }}</td>
            <td>
              <button @click="remove(item.id)">
                <i class="bi bi-archive"></i>
              </button>
            </td>
          </tr>
        </tbody>

        <tfoot></tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoppingCart",

  computed: {
    shoppingCart() {
      return this.$store.state.shoppingCart;
    },
  },

  methods: {
    getPrice(origina, special) {
      const price = special ? special : origina;
      return;
    },

    remove(id) {
      this.$store.commit("REMOVE_SHOPPING_CART", id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.shopping-cart {
  .table-container {
    margin: 0 0.625rem;

    table {
      width: 100%;
      @include font-style($font-size: 1.2rem);
      // vertical-align: middle;
      box-sizing: border-box;

      thead {
        background-color: rgba($gray, 0.2);
      }

      tr {
        padding: 10px 0;
        height: 3rem;
        border-top: 1px solid $black-alpha;
      }

      td {
        padding-left: 0.625rem;
        vertical-align: middle;
      }

      i {
        @include font-style($font-size: 1.2rem);
      }

      .title {
        width: 30%;
      }

      .price {
        width: 30%;
      }
    }
  }
}
</style>
