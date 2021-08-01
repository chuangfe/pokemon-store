<template>
  <div class="back-side-merchandises">
    <div class="path-container">
      <div class="between-container">
        <p class="title">產品列表</p>
      </div>
      <div class="between-container">
        <button class="create" @click="createHandler">新增產品</button>
      </div>
    </div>

    <!-- 產品表格. -->
    <div class="table-container">
      <BackSideMerchandisesTable @setEditing="setEditingHandler" />
    </div>

    <!-- 產品編輯. -->
    <div class="editing-container" :class="{ 'is-editing': isEditing }">
      <BackSideMerchandisesEditing
        :id="editingId"
        :imageSrc="editingItem.imageSrc"
        :alt="editingItem.alt"
        :name="editingItem.name"
        :category="editingItem.category"
        :categoryName="editingItem.categoryName"
        :remaining="editingItem.remaining"
        :originalPrice="editingItem.originalPrice"
        :specialPrice="editingItem.specialPrice"
        :text="editingItem.text"
        @setEditing="setEditingHandler"
      />
    </div>
  </div>
</template>

<script>
// 後台商品頁面, 給後台 router-view 切換使用.

import BackSideMerchandisesTable from "../components/BackSideMerchandisesTable.vue";
import BackSideMerchandisesEditing from "../components/BackSideMerchandisesEditing.vue";

export default {
  name: "BackSideMerchandises",

  data() {
    return {
      // 編輯狀態.
      isEditing: false,
      // 編輯的 id.
      editingId: "",
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
    setEditingHandler({ onOff, id }) {
      this.isEditing = onOff;
      this.editingId = id;
    },

    createHandler() {
      this.isEditing = true;
      this.editingId = String(new Date().getTime());
    },
  },

  components: { BackSideMerchandisesTable, BackSideMerchandisesEditing },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";

.back-side-merchandises {
  padding-bottom: 1rem;

  .path-container {
    padding: 1rem 1rem 0 1rem;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;

    p,
    button {
      @include font-style($font-size: 1.2rem);
    }

    .create {
      padding: 0.3125rem 1rem;
      color: $white;
      background-color: $green-alpha;
      border-radius: 10px;
    }
  }

  .table-container {
    margin-top: 1rem;
    padding: 0 0.625rem;
  }

  .editing-container {
    padding: 0.625rem;
    width: 100%;
    min-height: 100%;
    background-color: $black-alpha;
    box-sizing: border-box;
    position: absolute;
    left: 0px;
    top: 0px;

    opacity: 0;
    transform: translateY(-100%);
    transition: transform 0.4s ease-out 0s, opacity 0.4s ease-out 0s;

    &.is-editing {
      opacity: 1;
      transform: translateY(0%);
    }
  }
}
</style>
