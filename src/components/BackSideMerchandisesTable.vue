<template>
  <div class="self-back-sid-merchandises-table pb-3">
    <table class="table table-hover align-middle text-center m-0">
      <thead>
        <tr class="fs-5 bg-light">
          <th>分類</th>
          <th>名稱</th>
          <th>原價</th>
          <th>特價</th>
          <th>數量</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) of merchandises"
          :key="i"
          :class="{ 'bg-light': !item.remaining }"
        >
          <!-- 商品分類. -->
          <td>{{ item.categoryName }}</td>

          <!-- 商品名稱. -->
          <td class="name">{{ item.name }}</td>

          <!-- 商品原價. -->
          <td>{{ getCurrency(item.originalPrice) }}</td>

          <!-- 商品特價. -->
          <td>
            <span v-if="item.specialPrice">{{
              getCurrency(item.specialPrice)
            }}</span>
            <span v-else>無特價</span>
          </td>

          <!-- 商品庫存. -->
          <td>
            <span v-if="item.remaining">{{ item.remaining }}</span>

            <span v-else>售完</span>
          </td>

          <!-- 功能按鈕. -->
          <td>
            <div class="row">
              <div class="col-12 pb-3">
                <button
                  class="self-editing btn text-white fw-bold"
                  @click="$emit('setEditing', { onOff: true, id: item.id })"
                >
                  編輯
                </button>
              </div>

              <div class="col-12">
                <button
                  class="self-remove btn text-white fw-bold"
                  @click="removeHandler(item)"
                >
                  刪除
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// 後台商品表格組件, 後台商品頁面使用.

// 價格加上千分位符號.
import toCurrency from "../modules/toCurrency";

export default {
  name: "BackSideMerchandisesTable",

  computed: {
    merchandises() {
      return this.$store.getters.calcData.all.merchandises;
    },
  },

  methods: {
    getCurrency(num) {
      return toCurrency(num);
    },

    async removeHandler(item) {
      const oldItem = await this.$store.dispatch(
        "REMOVE_MERCHANDISE_ACTIONS",
        item
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.self-back-sid-merchandises-table {
  td {
    padding: 1rem 0;
  }

  .self-editing {
    width: 80%;
    background-color: $green-alpha;
  }

  .self-remove {
    width: 80%;
    background-color: $red-alpha;
  }
}
</style>
