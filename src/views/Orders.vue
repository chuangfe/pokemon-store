<template>
  <div class="confirm">
    <div class="container">
      <div class="title-container">
        <h1 class="title">訂單列表</h1>

        <div class="image-container-home">
          <img src="../../public/images/home.png" alt="home" />
        </div>

        <div class="image-container-truck">
          <img src="../../public/images/truck.png" alt="truck" />
        </div>
      </div>

      <div class="if-container" v-if="orders.length">
        <div class="order-container" v-for="order of orders" :key="order.id">
          <h2>商品列表</h2>

          <MerchandiseTable
            :merchandises="order.merchandises"
            :isRemove="false"
          />

          <h2>收件人資訊</h2>

          <RecipientList :order="order" />
        </div>
      </div>
      <Empty :text="'目前沒有訂單!'" v-else />
    </div>
  </div>
</template>

<script>
// 訂單頁面.

// 商品表格.
import MerchandiseTable from "../components/MerchandiseTable.vue";
// 訂單收件人列表.
import RecipientList from "../components/RecipientList.vue";
// 空內容.
import Empty from "../components/Empty.vue";

export default {
  name: "Confirm",

  computed: {
    orders() {
      return this.$store.state.orders;
    },
  },

  components: { MerchandiseTable, RecipientList, Empty },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";

.confirm {
  .container {
    padding: 0px 2rem;

    .title-container {
      padding-bottom: 40px;
      position: relative;
      overflow: hidden;

      .title {
        padding-bottom: 1rem;
        @include font-style($font-size: 1.5rem, $font-weight: 900);
        text-align: center;
      }

      .image-container-home {
        img {
          margin: 0 auto;
        }
      }

      .image-container-truck {
        width: 80px;
        transform: translateX(-80%);
        position: absolute;
        left: 100%;
        bottom: 0px;
        animation: shake 0.6s steps(1) 0s infinite normal running,
          walk 10s linear 0s infinite normal running;

        img {
          width: 100%;
          object-fit: contain;
        }
      }
    }

    .order-container {
      margin-bottom: 1rem;
      border: 1px solid $black-alpha;

      &:last-child {
        margin-bottom: 0px;
      }

      h2 {
        padding: 1rem 0;
        @include font-style($font-size: 1.2rem, $font-weight: 900);
        text-align: center;
      }
    }
  }
}

@keyframes shake {
  50% {
    bottom: 1px;
  }
}

@keyframes walk {
  0% {
    left: calc(100% + 80px);
  }
  40% {
    left: 50%;
  }
  60% {
    left: 50%;
  }
  100% {
    left: -80px;
  }
}
</style>
