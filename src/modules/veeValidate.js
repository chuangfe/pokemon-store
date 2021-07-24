import Vue from "vue";
// vee-validate, 引入框架的組件.
// ValidationProvider 針對單個 input 的組件.
// ValidationObserver 針對 from 表單的組件.
import { ValidationProvider, ValidationObserver } from "vee-validate";

// 註冊全局組件.
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

// 引入 vee-validate 添加驗證規則的方法.
import { extend } from "vee-validate";
// 引入指定的規則.
// required 必需輸入內容.
// email 格式驗證.
// alpha_num 只能是英文字母和數字.
// between 限制內容的最小和最大字元長度.
// digits 只能是數字, 可以要求位數.
// length 根據指令的參數, 強制要求 value 的長度.
import { required, email, length } from "vee-validate/dist/rules";

// 驗證表單空白.
extend("required", {
  ...required,
  message: "請輸入內容.",
});

// 驗證信箱.
extend("email", {
  ...email,
  message: "請輸入正確的 Email 格式.",
});

// 驗證姓名.
extend("notNumber", {
  validate: (value) => {
    return !value.match(/[0-9]/);
  },
  message: "請勿輸入數字.",
});

// 驗證手機號碼.
extend("length", {
  ...length,
  message: "手機格式錯誤.",
});

extend("phone", {
  validate: (value) => {
    return value.match(/^09/);
  },
  message: "手機格式錯誤.",
});

// 驗證地址.
extend("address", {
  validate: (value) => {
    return !value.match(/[a-zA-Z]+/);
  },
  message: "請勿輸入英文.",
});
