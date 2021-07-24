<template>
  <div class="shopping-cart">
    <div class="container table-container">
      <div class="title-container">
        <div class="image-container">
          <img src="../../public/images/poke-ball-00.png" alt="poke-ball-00" />
        </div>

        <p class="title">購物車</p>
      </div>

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

    <div class="container order-container">
      <div class="title-container">
        <div class="image-container">
          <img src="../../public/images/gold-00.png" alt="poke-ball-00" />
        </div>

        <p class="title">訂單資訊</p>
      </div>

      <label for="email">Email</label>
      <input type="email" name="email" placeholder="請輸入 Email" id="email" />

      <label for="name">姓名</label>
      <input type="text" name="name" placeholder="請輸入姓名" id="name" />

      <label for="phone">電話</label>
      <input type="number" name="phone" placeholder="請輸入電話" id="phone" />

      <label for="address">地址</label>
      <input type="text" name="address" placeholder="請輸入地址" id="address" />

      <label for="explain">補充說明</label>
      <textarea name="explain" rows="4" id="explain"></textarea>

      <button>確認訂單</button>
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
  .container {
    margin: 0 1rem;

    .title-container {
      padding-bottom: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .image-container {
        width: 3.75rem;
        height: 3.75rem;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .title {
        padding-left: 0.625rem;
        @include font-style($font-size: 2rem, $font-weight: 900);
      }
    }
  }

  .table-container {
    padding-bottom: 2rem;

    table {
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
        padding-left: 1rem;
        vertical-align: middle;
      }

      i {
        @include font-style($font-size: 1rem);
      }

      .title {
        width: 30%;
      }

      .price {
        width: 30%;
      }
    }
  }

  .order-container {
    label,
    input,
    textarea {
      width: 100%;
      display: block;
      box-sizing: border-box;
    }

    input {
      margin: 0.375rem 0 1rem 0;
      padding: 0.375rem;
      letter-spacing: 2px;
      transition: padding 0.2s ease-out;

      &:focus {
        padding: 0.625rem;
        transform: scaley(120%);
      }
    }

    textarea {
      margin: 0.375rem 0 1rem 0;
      padding: 0.375rem;
      line-height: 1.5em;
    }

    button {
      padding: 0.625rem 0;
      width: 100%;
      @include font-style($font-size: 1.2rem);
      border: 1px solid $black-alpha;
      box-sizing: border-box;

      &:focus {
        background-color: $green;
        color: $white;
      }
    }
  }
}
</style>
