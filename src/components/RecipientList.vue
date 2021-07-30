<template>
  <ul class="recipient">
    <li>
      <p class="title">Email</p>
      <p class="content">{{ order.email }}</p>
    </li>

    <li>
      <p class="title">姓名</p>
      <p class="content">{{ order.name }}</p>
    </li>

    <li>
      <p class="title">電話</p>
      <p class="content">{{ order.phone }}</p>
    </li>

    <li>
      <p class="title">地址</p>
      <p class="content">{{ order.address }}</p>
    </li>

    <li>
      <p class="title">補充</p>
      <p class="content">{{ order.text }}</p>
    </li>

    <li>
      <button
        class="payment"
        :class="{ confirm: order.payment }"
        :disabled="order.payment"
        @click="clickHandler(order.id)"
      >
        <span v-if="order.payment">已付款</span>
        <span v-else>確認付款</span>
      </button>
    </li>
  </ul>
</template>

<script>
// 訂單收件人列表, 訂單頁面使用.

// 讀取.
import loadHandler from "../modules/loadHandler";

export default {
  name: "RecipientList",

  props: {
    // 訂單物件.
    order: {
      type: Object,
      required: true,
    },
  },

  methods: {
    clickHandler(id) {
      // 讀取中.
      loadHandler.isLoading();
      // 付款完成.
      this.$store.commit("SET_PAYMENT", id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";

.recipient {
  li {
    padding: 10px 0;
    border-top: 1px solid $black-alpha;
    display: flex;
    justify-content: center;

    .title,
    .content {
      @include font-style($font-size: 1.2rem);
      text-align: center;
    }

    .title {
      flex-basis: 30%;
    }

    .content {
      flex-basis: 70%;
    }

    .payment {
      padding: 0.625rem 0;
      width: 80%;
      background-color: rgba($red, 0.4);
      border-radius: 10px;

      span {
        @include font-style($font-size: 1.2rem, $color: $white);
        letter-spacing: 2px;
      }

      &.confirm {
        background-color: rgba($green, 0.4);

        span {
          color: $white;
        }
      }
    }
  }
}
</style>
