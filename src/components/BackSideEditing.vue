<template>
  <div class="editing">
    <div class="title-container">
      <p class="title">
        編輯商品
      </p>
    </div>

    <div class="content-container">
      <div class="container image-container" v-if="calcData.imageSrc">
        <img :src="calcData.imageSrc" :alt="calcData.alt" />
      </div>

      <div class="container src-container">
        <label for="src">
          <p class="between-container src">圖片網址</p>
          <p class="between-container">
            <!-- <span class="text download">圖片下載成功</span>
            <span class="text error">圖片下載失敗</span> -->
          </p>
        </label>
        <input type="text" id="src" v-model.trim="calcData.imageSrc" />
      </div>

      <div class="container">
        <label for="alt">
          圖片 Alt
        </label>
        <input type="text" id="alt" v-model.trim="calcData.alt" />
      </div>

      <div class="container" v-if="reviseId">
        <label for="merchandise-id">
          產品 Id
        </label>
        <input type="text" id="merchandise-id" v-model.trim="calcData.id" />
      </div>

      <div class="container">
        <label for="name">
          商品名稱
        </label>
        <input type="text" id="name" v-model.trim="calcData.name" />
      </div>

      <div class="container">
        <label for="category">
          商品分類-英文
        </label>
        <input type="text" id="category" v-model.trim="calcData.category" />
      </div>

      <div class="container">
        <label for="category-name">
          商品分類-中文
        </label>
        <input
          type="text"
          id="category-name"
          v-model.trim="calcData.categoryName"
        />
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
        <button class="close" @click="$emit('setIsEditing', '')">
          取消
        </button>
        <button class="save" @click="saveHandler">確認</button>
      </div>
    </div>
  </div>
</template>

<script>
const data = {
  imageSrc: "",
  alt: "",
  id: "",
  name: "",
  category: "",
  categoryName: "",
  remaining: "",
  originalPrice: "",
  specialPrice: "",
  text: "",
};

export default {
  name: "BackSideEditing",

  props: {
    // 當前修改的商品的 Id.
    outsideId: { type: String },
    // 當前修改的商品的 data.
    editingItem: { type: Object },
    // 是否可以修改商品 id.
    reviseId: { type: Boolean },
  },

  data() {
    return { calcData: Object.assign({}, data) };
  },

  methods: {
    saveHandler() {
      console.log(this.calcData);
    },
  },

  watch: {
    editingItem() {
      if (this.editingItem.id) {
        this.calcData = Object.assign({}, this.editingItem);
      } else {
        this.calcData = Object.assign({}, data);
      }
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
    background-color: #343a40;
    @include font-style($font-size: 1.5rem, $font-weight: 900, $color: $white);
  }

  .content-container {
    background-color: $white;

    .container {
      padding: 1rem;
      @include font-style($font-size: 1.2rem);

      label {
        display: block;
      }

      input {
        padding: 0.3125rem;
        width: 100%;
        letter-spacing: 1px;
        box-sizing: border-box;
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
        padding: 0.625rem 1rem;
        border-radius: 10px;
        @include font-style($font-size: 1.2rem, $color: $white);

        &.close {
          margin-right: 1rem;
          background-color: rgba($red, 0.6);
        }

        &.save {
          background-color: rgba($green, 0.6);
        }

        &:active {
          box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}
</style>
