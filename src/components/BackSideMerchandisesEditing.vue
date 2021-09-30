<template>
  <div class="self-editing">
    <div class="self-title d-flex justify-content-between align-items-center">
      <h4 class="h4 m-0 text-white fw-bold p-3">
        編輯商品
      </h4>

      <button
        class="btn text-white fs-3 me-1"
        @click="$emit('setEditing', { onOff: false, id: '' })"
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <div class="bg-white py-3 px-2">
      <div class="self-image-container text-center" v-if="calcData.imageSrc">
        <img
          class="self-image-height-contain"
          :src="calcData.imageSrc"
          :alt="calcData.alt"
          @load="LoadHandler"
        />
      </div>

      <div class="mt-3 pb-3">
        <label
          class="d-flex flex-nowrap align-items-center justify-content-between pb-1"
          for="src"
        >
          <p class="m-0 fw-bold">圖片網址</p>

          <p class="m-0">
            <span class="self-download fw-bold" v-show="imageSrcError"
              >圖片下載成功</span
            >

            <span class="self-error fw-bold" v-show="!imageSrcError"
              >圖片下載失敗</span
            >
          </p>
        </label>

        <input
          type="text"
          id="src"
          class="form-control"
          v-model.trim="calcData.imageSrc"
          @input="imageSrcError = false"
        />
      </div>

      <div class="pb-3">
        <label class="d-block pb-1" for="alt">
          <p class="m-0 fw-bold">
            圖片 Alt
          </p>
        </label>

        <input
          class="form-control"
          type="text"
          id="alt"
          v-model.trim="calcData.alt"
        />
      </div>

      <div class="pb-3">
        <label class="d-block" for="name">
          <p class="m-0 fw-bold">商品名稱</p>
        </label>

        <input
          class="form-control"
          type="text"
          id="name"
          v-model.trim="calcData.name"
        />
      </div>

      <div class="pb-3">
        <label class="d-block" for="category">
          <p class="m-0 fw-bold">商品分類</p>
        </label>

        <select
          name="category"
          id="category"
          class="form-control"
          v-model="getCategory"
        >
          <option v-for="(value, key) of data" :key="key" :value="key">{{
            value.name
          }}</option>
        </select>
      </div>

      <div class="pb-3">
        <label class="d-block" for="remaining">
          <p class="m-0 fw-bold">商品庫存</p>
        </label>

        <input
          type="number"
          id="remaining"
          class="form-control"
          v-model.number="calcData.remaining"
        />
      </div>

      <div class="pb-3">
        <label class="d-block" for="original-price">
          <p class="m-0 fw-bold">原價</p>
        </label>

        <input
          type="number"
          id="original-price"
          class="form-control"
          v-model.number="calcData.originalPrice"
        />
      </div>

      <div class="pb-3">
        <label class="d-block" for="special-price">
          <p class="m-0 fw-bold">特價</p>
        </label>

        <input
          type="number"
          id="special-price"
          class="form-control"
          v-model.number="calcData.specialPrice"
        />
      </div>

      <div class="pb-3">
        <label class="d-block" for="text">
          <p class="m-0 fw-bold">商品介紹</p>
        </label>

        <textarea
          name="text"
          id="text"
          class="form-control"
          rows="10"
          v-model.trim="calcData.text"
        ></textarea>
      </div>

      <div class="text-end">
        <button
          class="self-close btn text-white fw-bold me-3 px-3"
          @click="$emit('setEditing', { onOff: false, id: '' })"
        >
          取消
        </button>

        <button
          class="self-save btn text-white fw-bold px-3"
          @click="saveHandler"
        >
          確認
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// 後台商品編輯組件, 後台商品頁面使用.

function getCalcData() {
  return {
    id: this.id,
    imageSrc: this.imageSrc,
    alt: this.alt,
    name: this.name,
    category: this.category,
    categoryName: this.categoryName,
    remaining: this.remaining,
    originalPrice: this.originalPrice,
    specialPrice: this.specialPrice,
    text: this.text,
  };
}

export default {
  name: "BackSideMerchandisesEditing",

  props: {
    // 當前修改的商品的 Id.
    id: {
      type: String,
    },

    imageSrc: {
      type: String,
      default: "",
    },

    alt: {
      type: String,
      default: "",
    },

    name: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "ball",
    },

    categoryName: {
      type: String,
      default: "精靈球",
    },

    remaining: {
      type: Number,
      default: 0,
    },

    originalPrice: {
      type: Number,
      default: 0,
    },

    specialPrice: {
      type: Number,
      default: 0,
    },

    text: {
      type: String,
      default: "沒有內容",
    },
  },

  data() {
    return {
      calcData: getCalcData.call(this),
      imageSrcError: false,
    };
  },

  computed: {
    data() {
      return this.$store.state.data;
    },

    // 當變數使用.
    getCategory: {
      // 綁定給 v-model, 設值時同時調整兩個資料.
      set(val) {
        this.calcData.category = val;
        this.calcData.categoryName = this.data[this.calcData.category].name;
      },
      // 取值時的資料.
      get() {
        return this.calcData.category;
      },
    },
  },

  methods: {
    async saveHandler() {
      // 更新商品資料.
      const result = await this.$store.dispatch(
        "UPDATE_MERCHANDISE_ACTIONS",
        this.calcData
      );

      // 關閉編輯.
      this.$emit("setEditing", { onOff: false });

      this.consoleLogMixin("商品資料更新", result);
    },

    LoadHandler() {
      this.imageSrcError = true;
    },
  },

  watch: {
    id() {
      this.calcData = getCalcData.call(this);
      this.imageSrcError = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.self-editing {
  // 標題.
  .self-title {
    background-color: $editing-color;
  }

  // 圖片容器.
  .self-image-container {
    height: 10rem;
  }

  // 圖片下載成功.
  .self-download {
    color: $green;
  }

  // 圖片下載失敗.
  .self-error {
    color: $red;
  }

  // 關閉編輯按鈕.
  .self-close {
    background-color: $red-alpha;
  }

  // 保存編輯按鈕.
  .self-save {
    background-color: $green-alpha;
  }
}
</style>
