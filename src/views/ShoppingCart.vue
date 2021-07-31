<template>
  <div class="shopping-cart">
    <Header />

    <!-- 購物車區域. -->
    <div class="container table-container">
      <div class="title-container">
        <div class="image-container">
          <img src="../../public/images/poke-ball-00.png" alt="poke-ball-00" />
        </div>

        <p class="title">購物車</p>
      </div>

      <MerchandiseTable
        :merchandises="shoppingCart"
        :isRemove="true"
        @remove="removeHandler"
        v-if="shoppingCart.length !== 0"
      />
      <!-- 沒有商品. -->
      <Empty :text="'購物車沒有東西喔!'" v-else />
    </div>

    <!-- 訂單購買者資料. -->
    <div class="container order-container">
      <div class="title-container">
        <div class="image-container">
          <img src="../../public/images/gold-00.png" alt="poke-ball-00" />
        </div>

        <p class="title">訂購人</p>
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

    <Footer />
  </div>
</template>

<script>
// 購物車頁面.

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

// 商品表格.
import MerchandiseTable from "../components/MerchandiseTable.vue";
// 空內容.
import Empty from "../components/Empty.vue";
// 假的讀取進度.
import loadHandler from "../modules/loadHandler";

export default {
  name: "ShoppingCart",

  data() {
    return {
      fromData: {
        email: "aaa@aaa.aa",
        name: "Tired",
        phone: "0912345678",
        address: "不可以輸入英文",
        text: "沒有備註",
      },
    };
  },

  computed: {
    shoppingCart() {
      return this.$store.state.shoppingCart;
    },
  },

  methods: {
    // 購物車刪除商品.
    removeHandler(id) {
      // 假的讀取進度.
      loadHandler.isLoading();

      this.$store.commit("REMOVE_SHOPPING_CART", id);
    },

    // 購買商品.
    submitHandler() {
      // 購物車內沒有商品.
      if (!this.shoppingCart.length) {
        alert("請先購買商品.");

        this.$router.push({
          path: "/home",
        });
      }
      // 訂單完成.
      else {
        alert("訂單完成.");

        this.$store.commit("CREATE_ORDER", {
          email: this.fromData.email,
          name: this.fromData.name,
          phone: this.fromData.phone,
          address: this.fromData.address,
          text: this.fromData.text,
          total: this.getTotal,
        });

        this.$router.push({
          path: "/orders",
        });
      }
    },
  },

  components: { Header, Footer, MerchandiseTable, Empty },
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
