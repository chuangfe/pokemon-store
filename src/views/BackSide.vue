<template>
  <div class="back-side">
    <header class="header">
      <div class="between-container">
        <div class="content-container">
          <router-link to="javascript:;">產品</router-link>
          <router-link to="javascript:;">訂單</router-link>
        </div>
      </div>
      <div class="between-container">
        <div class="content-container">
          <router-link to="javascript:;">首頁</router-link>
          <router-link to="javascript:;">登出</router-link>
        </div>
      </div>
    </header>

    <div class="table-container">
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
              <button class="update" @click="setEditingIdHandler(item.id)">
                編輯
              </button>
              <button class="remove">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="editing-container" :class="{ active: editingId }">
      <BackSideEditing
        @setIsEditing="setEditingIdHandler"
        :outsideId="editingId"
        :editingItem="editingItem"
        :reviseId="reviseId"
      />
    </div>
  </div>
</template>

<script>
// 產品編輯組件.
import BackSideEditing from "../components/BackSideEditing.vue";

export default {
  name: "BackSide",

  data() {
    return {
      editingId: "",
      reviseId: false,
    };
  },

  computed: {
    merchandises() {
      return this.$store.getters.calcData.all.merchandises;
    },

    editingItem() {
      const check = this.merchandises.find(
        (item) => item.id === this.editingId
      );

      return check ? check : {};
    },
  },

  methods: {
    setEditingIdHandler(id) {
      this.editingId = id;
    },
  },

  components: { BackSideEditing },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";

.back-side {
  padding-bottom: 1rem;
  height: 100%;
  position: relative;

  .header {
    margin-bottom: 1rem;
    width: 100%;
    background-color: rgba($blue, 0.8);
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;

    .between-container {
      display: flex;
      flex-wrap: nowrap;

      .content-container {
        display: flex;
        flex-wrap: nowrap;

        a {
          padding: 1rem;
          @include font-style($font-size: 1rem, $color: $white);
          display: block;
          cursor: pointer;

          &:first-child {
            margin-right: 1rem;
          }
        }
      }
    }
  }

  .table-container {
    padding: 0 0.625rem;

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
            background-color: #dee2e6;
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

  .editing-container {
    padding: 0.625rem;
    width: 100%;
    min-height: 100%;
    background-color: rgba($gray, 0.6);
    box-sizing: border-box;
    position: absolute;
    left: 0px;
    top: 0px;

    opacity: 0;
    transform: translateY(-100%);
    transition: transform 0.4s ease-out 0s, opacity 0.4s ease-out 0s;

    &.active {
      opacity: 1;
      transform: translateY(0%);
    }
  }
}
</style>
