<template>
  <div class="sign-in">
    <div class="log-container">
      <img src="../../public/images/pokemon-store.png" alt="pokemon-store" />
    </div>

    <!-- 卡車. -->
    <Truck />

    <div class="form-container">
      <ValidationObserver v-slot="{ handleSubmit, invalid }">
        <form @submit.prevent="handleSubmit(submitHandler)">
          <!-- Email 驗證. -->
          <!-- mode="lazy", 驗證的反應模式, 該屬性要寫在第一個. -->
          <!-- required 必需有值. -->
          <!-- email email 格式. -->
          <ValidationProvider
            name="email"
            rules="required|email"
            v-slot="{ errors }"
          >
            <label for="email">
              <p>
                <span class="title">Email</span>
                <span class="message">{{ message || errors[0] }}</span>
              </p>
            </label>
            <input
              v-model="email"
              type="text"
              id="email"
              placeholder="abc@gmail.com"
              @input="message = ''"
            />
          </ValidationProvider>

          <ValidationProvider
            name="password"
            rules="required|alpha_num"
            v-slot="{ errors }"
          >
            <label for="password">
              <p>
                <span class="title">Password</span>
                <span class="message">{{ message || errors[0] }}</span>
              </p>
            </label>
            <input
              v-model="password"
              type="password"
              id="password"
              placeholder="abc123"
            />
          </ValidationProvider>

          <button type="submit" :disabled="invalid">登入</button>
          <router-link to="/home">首頁</router-link>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
// 登入頁面.
// 卡車.
import Truck from "../components/Truck.vue";

export default {
  name: "SignIn",

  data() {
    return {
      email: "abc@gmail.comcc",
      password: "abc123",
      message: "",
    };
  },

  methods: {
    // 沒想到 async await 還能這樣寫.
    async submitHandler() {
      const check = await this.$store
        .dispatch("CHECK_USER_ACTIONS", {
          email: this.email,
          password: this.password,
        })
        .then((result) => {
          if (result) {
            // 跳轉.
            console.log("OK");
          } else {
            this.message = "帳號或密碼錯誤.";
          }

          return result;
        });

      console.log(check, "---");
    },
  },

  components: { Truck },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";

.sign-in {
  margin: 0 auto;
  width: 18.75rem;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;

  .log-container {
    padding-bottom: 1.25rem;
    width: 100%;

    img {
      width: 100%;
      object-fit: contain;
    }
  }

  .form-container {
    @include font-style($font-size: 1rem);

    p {
      padding: 0.625rem 0 0.3125rem 0;
      display: flex;

      span {
        flex-grow: 1;
        flex-shrink: 1;
      }

      .message {
        color: $red;
        text-align: right;
      }
    }

    input,
    button,
    a {
      width: 100%;
      box-sizing: border-box;
      @include font-style($font-size: 1.2rem);
      display: block;
    }

    button,
    a {
      margin-top: 1rem;
      padding: 0.3125rem 0;
      color: $white;
      background-color: rgba($green, 0.4);
      text-align: center;
      border-radius: 10px;
    }
  }
}
</style>
