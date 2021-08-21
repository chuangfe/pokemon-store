<template>
  <div class="slef-confirm py-3">
    <div class="container-xl">
      <Header />
    </div>

    <div class="container-xl mb-3">
      <div class="text-center">
        <h1 class="h1 fw-bold m-0 py-3">訂單列表</h1>
        <!-- 卡車. -->
        <Truck />
      </div>
    </div>

    <div class="container-xl">
      <div v-if="orders.length">
        <div
          class="border border-dark text-center mb-5"
          v-for="order of orders"
          :key="order.id"
        >
          <h3 class="h3 fw-bold m-0 pt-3">商品列表</h3>
          <!-- 商品表格. -->
          <MerchandiseTable
            :merchandises="order.merchandises"
            :total="order.total"
            :isRemove="false"
          />

          <h3 class="h3 fw-bold m-0 pt-4 pb-3">收件人資訊</h3>
          <!-- 收件人列表. -->
          <RecipientList :order="order" :backSide="false" />
        </div>
      </div>
      <!-- 沒有訂單時的內容. -->
      <Empty :text="'目前沒有訂單!'" v-else />
    </div>

    <div class="container-xl">
      <Footer />
    </div>
  </div>
</template>

<script>
// 訂單頁面.

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

// 卡車.
import Truck from "../components/Truck.vue";
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

  components: { Header, Footer, Truck, MerchandiseTable, RecipientList, Empty },
};
</script>

<style lang="scss" scoped></style>
