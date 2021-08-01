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

    <li class="back-side" v-if="backSide">
      <div class="around-container">
        <span class="status confirm" v-if="order.payment">已付款</span>
        <span class="status" v-else>尚未付款</span>
      </div>
      <div class="around-container">
        <button class="remove-order" @click="removeOrder(order.id)">
          <span>刪除訂單</span>
        </button>
      </div>
    </li>

    <li v-if="!backSide">
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
    clickHandler(id) {
      // 假的讀取進度.
      loadHandler.isLoading();

      // 付款完成.
      this.$store.commit("SET_PAYMENT", id);
    },

    removeOrder(id) {
      // 假的讀取進度.
      loadHandler.isLoading();

      // 刪除訂單.
      this.$store.commit("REMOVE_ORDER", id);
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
      background-color: $red-alpha;
      border-radius: 10px;

      span {
        @include font-style($font-size: 1.2rem, $color: $white);
        letter-spacing: 2px;
      }

      &.confirm {
        background-color: $green-alpha;

        span {
          color: $white;
        }
      }
    }

    &.back-side {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-around;

      .around-container {
        flex-basis: 45%;
        text-align: center;

        .status,
        .remove-order span {
          padding: 0.625rem 0;
          width: 100%;
          box-sizing: border-box;
          @include font-style($font-size: 1.2rem, $color: $white);
          background-color: $red-alpha;
          border-radius: 10px;
          display: block;
        }

        .confirm {
          background-color: $green-alpha;
        }

        .remove-order {
          width: 100%;
          display: block;
        }
      }
    }
  }
}
</style>
