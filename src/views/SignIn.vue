<template>
  <div class="self-sign-in position-absolute top-50 start-50 translate-middle ">
    <!-- logo. -->
    <div class="self-container mx-auto">
      <div class="self-image-container w-100">
        <img
          class="image-object-fit-width-contain"
          src="../../public/images/pokemon-store.png"
          alt="pokemon-store"
        />
      </div>
    </div>

    <!-- 卡車. -->
    <div class="self-container mx-auto">
      <Truck />
    </div>

    <div class="self-container mx-auto">
      <ValidationObserver v-slot="{ handleSubmit, invalid }">
        <form @submit.prevent="handleSubmit(submitHandler)">
          <!-- Email 驗證. -->
          <!-- mode="lazy", 驗證的反應模式, 該屬性要寫在第一個. -->
          <!-- required 必需有值. -->
          <!-- email email 格式. -->
          <ValidationProvider
            class="d-block mb-3 input-group"
            name="email"
            rules="required|email"
            v-slot="{ errors }"
          >
            <label class="d-block" for="email">
              <p class="fs-5 m-0 pb-2">
                Email
                <span class="ps-2 text-danger">{{ message || errors[0] }}</span>
              </p>
            </label>

            <input
              class="letter-spacing-px fs-5 w-100 self-focus form-control"
              v-model="email"
              type="text"
              id="email"
              placeholder="abc@gmail.com"
              @input="message = ''"
            />
          </ValidationProvider>

          <ValidationProvider
            class="d-block mb-3 input-group"
            name="password"
            rules="required|alpha_num"
            v-slot="{ errors }"
          >
            <label for="password">
              <p class="fs-5 m-0 pb-2">
                Password
                <span class="ps-2 text-danger">{{ message || errors[0] }}</span>
              </p>
            </label>

            <input
              class="letter-spacing-px fs-5 w-100 self-focus form-control"
              v-model="password"
              type="password"
              id="password"
              placeholder="abc123"
              autocomplete="on"
            />
          </ValidationProvider>

          <div class="row">
            <div class="col-12 pb-3">
              <button
                class="self-button btn text-white fs-5 fw-bold w-100"
                type="submit"
                :disabled="invalid"
              >
                登入
              </button>
            </div>

            <div class="col-12">
              <router-link
                class="self-button btn text-white fs-5 fw-bold w-100"
                to="/home"
                >首頁</router-link
              >
            </div>
          </div>
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
      email: "abc@gmail.com",
      password: "abc123",
      message: "",
    };
  },

  methods: {
    async submitHandler() {
      const check = await this.$store.dispatch("CHECK_USER_ACTIONS", {
        email: this.email,
        password: this.password,
      });

      if (check) {
        this.message = "";
        this.$router.push({ path: "/back-side/back-side-merchandises" });
      } else {
        this.message = "帳號或密碼錯誤";
      }
    },
  },

  components: { Truck },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.self-sign-in {
  width: 80%;

  .self-container {
    max-width: 25rem;

    .self-button {
      background-color: $green-alpha;
    }
  }
}
</style>
