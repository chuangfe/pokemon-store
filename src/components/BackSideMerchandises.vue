<template>
  <div class="self-back-side-merchandises">
    <div
      class="container-xl p-3 d-flex justify-content-between align-items-center"
    >
      <div>
        <h2 class="h2 m-0 fw-bold">產品列表</h2>
      </div>
      <div>
        <button
          class="slef-create btn fs-4 text-white fw-bold"
          @click="createHandler"
        >
          新增產品
        </button>
      </div>
    </div>

    <!-- 產品表格. -->
    <div class="container-xl">
      <BackSideMerchandisesTable @setEditing="setEditingHandler" />
    </div>

    <!-- 產品編輯. -->
    <div
      class="self-editing-container w-100 position-absolute left-0 top-0 py-3"
      :class="{ 'is-editing': isEditing }"
    >
      <div class="container-xl">
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

.self-back-side-merchandises {
  .slef-create {
    background-color: $green-alpha;
  }

  .self-editing-container {
    min-height: 100%;
    background-color: $black-alpha;

    opacity: 0;
    transform: translateY(-100%);
    transition: transform 0.3s ease-out 0s, opacity 0.4s ease-out 0s;

    &.is-editing {
      opacity: 1;
      transform: translateY(0%);
    }
  }
}
</style>
