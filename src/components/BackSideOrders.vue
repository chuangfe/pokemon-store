<template>
  <div class="back-side-orders">
    <div class="path-container">
      <p class="title">訂單列表</p>
    </div>

    <div class="if-container" v-if="orders.length">
      <div class="order-container" v-for="order of orders" :key="order.id">
        <h2>商品列表</h2>

        <MerchandiseTable
          :merchandises="order.merchandises"
          :isRemove="false"
        />

        <h2>收件人資訊</h2>

        <RecipientList :order="order" :backSide="true" />
      </div>
    </div>
    <Empty :text="'目前沒有訂單!'" v-else />
  </div>
</template>

<script>
// 後台訂單頁面, 給後台 router-view 切換使用.

// 訂單商品表格.
import MerchandiseTable from "../components/MerchandiseTable.vue";
// 訂單收件人資訊.
import RecipientList from "../components/RecipientList.vue";
// 沒訂單時顯示的內容.
import Empty from "../components/Empty.vue";

export default {
  name: "BackSideOrders",

  computed: {
    orders() {
      return this.$store.state.orders;
    },
  },

  components: {
    MerchandiseTable,
    RecipientList,
    Empty,
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";

.back-side-orders {
  padding-bottom: 1rem;

  .path-container {
    padding: 1rem;

    p {
      @include font-style($font-size: 1.2rem);
    }
  }

  .if-container {
    padding: 0 1rem;

    .order-container {
      margin-bottom: 2rem;
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
</style>
