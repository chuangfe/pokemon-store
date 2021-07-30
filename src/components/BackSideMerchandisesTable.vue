<template>
  <div class="merchandises-table">
    <table>
      <thead>
        <tr>
          <td>分類</td>
          <td>名稱</td>
          <td>原價</td>
          <td>特價</td>
          <td>數量</td>
          <td>編輯</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) of merchandises"
          :key="i"
          :class="{ close: !item.remaining }"
        >
          <td>{{ item.categoryName }}</td>
          <td class="name">{{ item.name }}</td>
          <td>{{ item.originalPrice }}</td>
          <td>
            <span v-if="item.specialPrice">{{ item.specialPrice }}</span>
            <span v-else>無特價</span>
          </td>
          <td>
            <span v-if="item.remaining">{{ item.remaining }}</span>
            <span v-else>售完</span>
          </td>
          <td>
            <button
              class="update"
              @click="$emit('setEditing', { onOff: true, id: item.id })"
            >
              編輯
            </button>
            <button
              class="remove"
              @click="
                removeHandler({
                  id: item.id,
                  category: item.category,
                })
              "
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// 後台商品表格組件, 後台商品頁面使用.

// 讀取進度物件.
import loadHandler from "../modules/loadHandler";

export default {
  name: "BackSideMerchandisesTable",

  computed: {
    merchandises() {
      return this.$store.getters.calcData.all.merchandises;
    },
  },

  methods: {
    async removeHandler({ id, category }) {
      // 讀取中.
      loadHandler.isLoading();

      const oldItem = await this.$store
        .dispatch("REMOVE_MERCHANDISE_ACTIONS", {
          id,
          category,
        })
        .then((result) => {
          // 讀取結束.
          loadHandler.isLoaded();
          return result;
        });

      console.log("remove", oldItem);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";

.merchandises-table {
  table {
    width: 100%;
    @include font-style($font-size: 1rem);
    table-layout: fixed;

    td {
      word-wrap: break-word;
      text-align: center;
      vertical-align: middle;
    }

    thead {
      background-color: #dee2e6;

      td {
        padding: 0.625rem 0;
      }
    }

    tbody {
      tr {
        &.close {
          background-color: rgba(#dee2e6, 0.2);
        }

        td {
          border-bottom: 1px solid #dee2e6;

          button {
            margin: 0.3125rem 0;
            padding: 0.3125rem 0;
            width: 100%;
            border-radius: 10px;
            display: block;

            &.update {
              background-color: rgba($green, 0.6);
              color: $white;
            }

            &.remove {
              background-color: rgba($red, 0.6);
              color: $white;
            }
          }
        }
      }
    }
  }
}
</style>
