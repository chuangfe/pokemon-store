<template>
  <div class="self-shopping-cart">
    <div class="container-xl">
      <Header />
    </div>

    <!-- 購物車區域. -->
    <div class="container-xl">
      <!-- 圖片與標題. -->
      <div class="d-flex justify-content-center align-items-center py-3">
        <div class="self-image-container me-4">
          <img
            class="image-object-fit-contain"
            src="../../public/images/poke-ball-00.png"
            alt="poke-ball-00"
          />
        </div>

        <h2 class="letter-spacing-rem h2 m-0 fw-bold">購物車</h2>
      </div>

      <MerchandiseTable
        :merchandises="shoppingCart"
        :total="getTotal"
        :isRemove="true"
        @remove="removeHandler"
        v-if="shoppingCart.length !== 0"
      />
      <!-- 沒有商品. -->
      <Empty :text="'購物車沒有東西喔!'" v-else />
    </div>

    <!-- 訂單購買者資料. -->
    <div class="container-xl">
      <!-- 圖片與標題. -->
      <div class="d-flex justify-content-center align-items-center py-3">
        <div class="self-image-container me-4">
          <img
            class="image-object-fit-contain"
            src="../../public/images/gold-00.png"
            alt="poke-ball-00"
          />
        </div>

        <h2 class="letter-spacing-rem h2 m-0 fw-bold">收件人</h2>
      </div>

      <ValidationObserver v-slot="{ handleSubmit, invalid }">
        <form @submit.prevent="handleSubmit(submitHandler)">
          <!-- Email 驗證. -->
          <!-- mode="lazy", 驗證的反應模式, 該屬性要寫在第一個. -->
          <!-- required 必需有值. -->
          <!-- email email 格式. -->
          <ValidationProvider
            class="d-block mb-3 input-group"
            mode="lazy"
            name="email"
            rules="required|email"
            v-slot="{ errors }"
          >
            <label class="d-block" for="email">
              <p class="fs-5 m-0 pb-2">
                Email<span class="ps-2 text-danger">{{ errors[0] }}</span>
              </p>
            </label>

            <input
              class="letter-spacing-px fs-5 w-100 self-focus form-control"
              v-model="fromData.email"
              type="text"
              id="email"
            />
          </ValidationProvider>

          <!-- 姓名. -->
          <ValidationProvider
            class="d-block mb-3 input-group"
            mode="lazy"
            name="name"
            rules="required|notNumber"
            v-slot="{ errors }"
          >
            <label class="d-block" for="name">
              <p class="fs-5 m-0 pb-2">
                姓名<span class="ps-2 text-danger">{{ errors[0] }}</span>
              </p>
            </label>

            <input
              class="letter-spacing-px fs-5 w-100 self-focus form-control"
              v-model="fromData.name"
              type="text"
              id="name"
            />
          </ValidationProvider>

          <!-- 手機. -->
          <ValidationProvider
            class="d-block mb-3 input-group"
            mode="lazy"
            name="phone"
            rules="required|length:10|phone"
            v-slot="{ errors }"
          >
            <label class="d-block" for="phone">
              <p class="fs-5 m-0 pb-2">
                手機號碼<span class="ps-2 text-danger">{{ errors[0] }}</span>
              </p>
            </label>

            <input
              class="letter-spacing-px fs-5 w-100 self-focus form-control"
              v-model="fromData.phone"
              type="number"
              id="phone"
            />
          </ValidationProvider>

          <!-- 地址. -->
          <ValidationProvider
            class="d-block mb-3 input-group"
            mode="lazy"
            name="address"
            rules="required|address"
            v-slot="{ errors }"
          >
            <label class="d-block" for="address">
              <p class="fs-5 m-0 pb-2">
                送件地址<span class="ps-2 text-danger">{{ errors[0] }}</span>
              </p>
            </label>

            <input
              class="letter-spacing-px fs-5 w-100 self-focus form-control"
              v-model="fromData.address"
              type="text"
              id="address"
            />
          </ValidationProvider>

          <!-- 補充說明. -->
          <div class="mb-3 input-group">
            <label class="d-block" for="explain">
              <p class="fs-5 m-0 pb-2">補充說明</p>
            </label>

            <textarea
              class="letter-spacing-px fs-5 w-100 self-focus form-control"
              name="explain"
              rows="4"
              id="explain"
              v-model="fromData.text"
            ></textarea>
          </div>

          <!-- 按鈕. -->
          <div class="mb-3" v-if="shoppingCart.length">
            <button
              class="self-buy btn w-100 text-white fs-5 fw-bold"
              type="submit"
              :disabled="invalid"
            >
              確認訂單
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>

    <div class="container-xl">
      <Footer />
    </div>
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
    // 縮短屬性.
    shoppingCart() {
      return this.$store.state.shoppingCart;
    },

    // 訂單金額.
    getTotal() {
      return this.shoppingCart.reduce((sum, item, index) => {
        return Math.floor((sum = sum + item.total));
      }, 0);
    },
  },

  methods: {
    // 購物車刪除商品.
    async removeHandler(item) {
      const result = await this.$store.dispatch(
        "REMOVE_SHOPPING_CART_ACTIONS",
        item
      );
    },

    // 購買商品.
    submitHandler() {
      // 假的讀取進度.
      loadHandler.isLoading();
      // 畫面回到最上方.
      window.scrollTo(0, 0);

      // 複製收件人資料.
      const data = Object.assign({}, this.fromData);
      // 訂單金額.
      data.total = this.getTotal;
      // 新增訂單.
      this.$store.dispatch("CREATE_ORDER_ACTIONS", data);
    },
  },

  components: { Header, Footer, MerchandiseTable, Empty },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.self-shopping-cart {
  .self-image-container {
    width: 4rem;
    height: 4rem;
  }

  .self-buy {
    background-color: $green-alpha;
  }

  .self-focus {
    padding: 0.4rem 0.3rem;
    transition: padding 0.1s ease-out 0s;

    &:focus {
      padding: 0.8rem 0.6rem;
    }
  }
}
</style>
