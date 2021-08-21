<template>
  <div class="self-back-side-orders ">
    <div class="container-xl p-3 ">
      <h2 class="h2 m-0 fw-bold">訂單列表</h2>
    </div>

    <div class="container-xl" v-if="orders.length">
      <div class="row">
        <div
          class="col-12 col-sm-6 text-center mb-4"
          v-for="order of orders"
          :key="order.id"
        >
          <div class="border">
            <h4 class="m-0 fw-bold py-3">商品列表</h4>

            <MerchandiseTable
              :merchandises="order.merchandises"
              :total="order.total"
              :isRemove="false"
            />

            <h4 class="m-0 fw-bold pb-3 pt-4">收件人資訊</h4>

            <RecipientList :order="order" :backSide="true" />
          </div>
        </div>
      </div>
    </div>
    <div class="container-xl" v-else>
      <Empty :text="'目前沒有訂單!'" />
    </div>
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

.self-back-side-orders {
}
</style>
