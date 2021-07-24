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

      <ValidationObserver v-slot="{ handleSubmit, invalid }">
        <form @submit.prevent="handleSubmit(submitHandler)">
          <!-- Email 驗證. -->
          <!-- mode="lazy", 驗證的反應模式, 該屬性要寫在第一個. -->
          <!-- required 必需有值. -->
          <!-- email email 格式. -->
          <ValidationProvider
            mode="lazy"
            name="email"
            rules="required|email"
            v-slot="{ errors }"
          >
            <label for="email">
              <p>
                Email<span class="message">{{ errors[0] }}</span>
              </p>
            </label>
            <input v-model="fromData.email" type="text" id="email" />
          </ValidationProvider>

          <!-- 姓名. -->
          <ValidationProvider
            mode="lazy"
            name="name"
            rules="required|notNumber"
            v-slot="{ errors }"
          >
            <label for="name">
              <p>
                姓名<span class="message">{{ errors[0] }}</span>
              </p>
            </label>
            <input v-model="fromData.name" type="text" id="name" />
          </ValidationProvider>

          <!-- 手機. -->
          <ValidationProvider
            mode="lazy"
            name="phone"
            rules="required|length:10|phone"
            v-slot="{ errors }"
          >
            <label for="phone">
              <p>
                手機號碼<span class="message">{{ errors[0] }}</span>
              </p>
            </label>
            <input v-model="fromData.phone" type="number" id="phone" />
          </ValidationProvider>

          <!-- 地址. -->
          <ValidationProvider
            mode="lazy"
            name="address"
            rules="required|address"
            v-slot="{ errors }"
          >
            <label for="address">
              <p>
                送件地址<span class="message">{{ errors[0] }}</span>
              </p>
            </label>
            <input v-model="fromData.address" type="text" id="address" />
          </ValidationProvider>

          <label for="explain">補充說明</label>
          <textarea
            name="explain"
            rows="4"
            id="explain"
            v-model="fromData.text"
          ></textarea>

          <button type="submit" :disabled="invalid">確認訂單</button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoppingCart",

  data() {
    return {
      fromData: {
        email: undefined,
        name: undefined,
        phone: undefined,
        address: undefined,
        text: undefined,
      },
    };
  },

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

    submitHandler() {
      alert("驗證成功");
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
        padding-left: 1rem;
        @include font-style($font-size: 2rem, $font-weight: 900);
        letter-spacing: 0.625rem;
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

    .message {
      padding-left: 1rem;
      color: $red;
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
      color: $white;
      border: 1px solid $black-alpha;
      background-color: $green;
      box-sizing: border-box;

      &[disabled] {
        color: $black;
        background-color: $black-alpha;
      }
    }
  }
}
</style>
