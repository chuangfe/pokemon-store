<template>
  <ul class="self-recipient list-unstyled m-0 p-0">
    <li class="border-bottom pb-2">
      <div class="row">
        <div class="col-6">
          <p class="text-center fs-5 m-0 fw-bold">Email</p>
        </div>
        <div class="col-6">
          <p class="text-center fs-5 m-0">{{ order.email }}</p>
        </div>
      </div>
    </li>

    <li class="border-bottom pb-2 pt-3">
      <div class="row">
        <div class="col-6">
          <p class="text-center fs-5 m-0 fw-bold">姓名</p>
        </div>
        <div class="col-6">
          <p class="text-center fs-5 m-0">{{ order.name }}</p>
        </div>
      </div>
    </li>

    <li class="border-bottom pb-2 pt-3">
      <div class="row">
        <div class="col-6">
          <p class="text-center fs-5 m-0 fw-bold">電話</p>
        </div>
        <div class="col-6">
          <p class="text-center fs-5 m-0">{{ order.phone }}</p>
        </div>
      </div>
    </li>

    <li class="border-bottom pb-2 pt-3">
      <div class="row">
        <div class="col-6">
          <p class="text-center fs-5 m-0 fw-bold">地址</p>
        </div>
        <div class="col-6">
          <p class="text-center fs-5 m-0">{{ order.address }}</p>
        </div>
      </div>
    </li>

    <li class="border-bottom pb-2 pt-3">
      <div class="row">
        <div class="col-6">
          <p class="text-center fs-5 m-0 fw-bold">補充</p>
        </div>
        <div class="col-6">
          <p class="text-center fs-5 m-0">{{ order.text }}</p>
        </div>
      </div>
    </li>

    <li class="row py-2" v-if="backSide">
      <div class="col-6 text-center">
        <span class="self-span self-payment text-white btn" v-if="order.payment"
          >已付款</span
        >
        <span class="self-span self-outstanding-payment text-white btn" v-else
          >尚未付款</span
        >
      </div>

      <div class="col-6">
        <button
          class="self-remove-order btn self-outstanding-payment text-white"
          @click="removeOrderHandler(order)"
        >
          <span>刪除訂單</span>
        </button>
      </div>
    </li>

    <li class="py-2" v-else>
      <button
        class="self-payment btn text-white fs-5 fw-bold"
        :class="{ 'self-outstanding-payment': order.payment }"
        :disabled="order.payment"
        @click="paymentHandler(order.id)"
      >
        <span v-if="order.payment">已付款</span>
        <span v-else>確認付款</span>
      </button>
    </li>
  </ul>
</template>

<script>
// 訂單收件人列表, 訂單頁面使用.

// 假的讀取進度.
import loadHandler from "../modules/loadHandler";

export default {
  name: "RecipientList",

  props: {
    // 訂單物件.
    order: {
      type: Object,
      required: true,
    },

    // 是否開啟後台功能.
    backSide: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    // 訂單付款.
    paymentHandler(id) {
      // 假的讀取進度.
      loadHandler.isLoading();

      // 付款完成.
      this.$store.commit("SET_PAYMENT_MUTATIONS", id);
    },

    removeOrderHandler(order) {
      // 刪除訂單.
      this.$store.dispatch("REMOVE_ORDER_ACTIONS", order);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.self-recipient {
  .self-span {
    cursor: auto;
  }

  .self-payment,
  .self-outstanding-payment {
    width: 80%;
    border-radius: 10px;
  }

  // 已付款.
  .self-payment {
    background-color: $green-alpha;
  }

  // 未付款.
  .self-outstanding-payment {
    background-color: $red-alpha;
  }
}
</style>
