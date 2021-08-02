<template>
  <div class="editing">
    <div class="title-container">
      <p class="title">
        編輯商品
      </p>
    </div>

    <div class="content-container">
      <div class="container image-container" v-if="calcData.imageSrc">
        <img :src="calcData.imageSrc" :alt="calcData.alt" @load="LoadHandler" />
      </div>

      <div class="container src-container">
        <label for="src">
          <p class="between-container src">圖片網址</p>
          <p class="between-container">
            <span class="text download" v-show="imageSrcError"
              >圖片下載成功</span
            >
            <span class="text error" v-show="!imageSrcError">圖片下載失敗</span>
          </p>
        </label>
        <input
          type="text"
          id="src"
          v-model.trim="calcData.imageSrc"
          @input="imageSrcError = false"
        />
      </div>

      <div class="container">
        <label for="alt">
          圖片 Alt
        </label>
        <input type="text" id="alt" v-model.trim="calcData.alt" />
      </div>

      <div class="container">
        <label for="name">
          商品名稱
        </label>
        <input type="text" id="name" v-model.trim="calcData.name" />
      </div>

      <div class="container">
        <label for="category">
          商品分類
        </label>
        <select name="category" id="category" v-model="getCategory">
          <option v-for="(value, key) of data" :key="key" :value="key">{{
            value.name
          }}</option>
        </select>
      </div>

      <div class="container">
        <label for="remaining">
          庫存
        </label>
        <input
          type="number"
          id="remaining"
          v-model.number="calcData.remaining"
        />
      </div>

      <div class="container">
        <label for="original-price">
          售價
        </label>
        <input
          type="number"
          id="original-price"
          v-model.number="calcData.originalPrice"
        />
      </div>

      <div class="container">
        <label for="special-price">
          特價
        </label>
        <input
          type="number"
          id="special-price"
          v-model.number="calcData.specialPrice"
        />
      </div>

      <div class="container">
        <label for="text">
          商品說明
        </label>
        <textarea
          name="text"
          id="text"
          rows="10"
          v-model.trim="calcData.text"
        ></textarea>
      </div>

      <div class="container button-container">
        <button
          class="close"
          @click="$emit('setEditing', { onOff: false, id: '' })"
        >
          取消
        </button>
        <button class="save" @click="saveHandler">確認</button>
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
      // 在這理判斷, 是要更新商品, 還是新增商品.
      // SEARCH_MERCHANDISE_ACTIONS 有返回 new Promise, 所以不用寫 then.
      const result = await this.$store.dispatch("SEARCH_MERCHANDISE_ACTIONS", {
        id: this.id,
      });

      // 保存 console.log 需要的變數.
      let item;

      // 更新商品資料.
      if (result.oldItem) {
        item = await this.$store.dispatch(
          "UPDATE_MERCHANDISE_ACTIONS",
          this.calcData
        );
      }
      // 新增商品.
      else {
        item = await this.$store.dispatch(
          "CREATE_MERCHANDISE_ACTIONS",
          this.calcData
        );
      }

      // 關閉編輯.
      this.$emit("setEditing", { onOff: false });

      // 返回商品.
      console.log("update", item);
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

.editing {
  width: 100%;

  .title-container {
    padding: 1rem;
    background-color: $title-color;
    @include font-style($font-size: 1.5rem, $font-weight: 900, $color: $white);
  }

  .content-container {
    background-color: $white;

    .container {
      padding: 1rem;
      @include font-style($font-size: 1.2rem);

      label {
        margin-bottom: 0.625rem;
        display: block;
      }

      input {
        padding: 0.3125rem;
        width: 100%;
        letter-spacing: 1px;
        box-sizing: border-box;
      }

      select {
        padding: 0.3125rem;
        @include font-style($font-size: 1.2rem);
      }

      textarea {
        padding: 0.3125rem;
        width: 100%;
        letter-spacing: 1px;
        box-sizing: border-box;
      }
    }

    .image-container {
      margin: 0 auto;
      height: 200px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .src-container {
      label {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;

        .download {
          color: $green;
        }

        .error {
          color: $red;
        }
      }
    }

    .button-container {
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-end;

      button {
        padding: 0.3125rem 1rem;
        border-radius: 10px;
        @include font-style($font-size: 1.2rem, $color: $white);

        &.close {
          margin-right: 1rem;
          background-color: $red-alpha;
        }

        &.save {
          background-color: $green-alpha;
        }
      }
    }
  }
}
</style>
