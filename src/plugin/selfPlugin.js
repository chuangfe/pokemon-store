import consoleLogMixin from "./consoleLogMixin";
import toCurrencyDirective from "./toCurrencyDirective";

/**
 * 目前的 selfPlugin 使用在.
 * views Merchandise.vue
 * component MerchandiseItem.vue
 * component BackSideMerchandisesEditing.vue
 */
export default {
  install(Vue, options) {
    // 全局自訂 mixin.

    // 由 options.consoleLog 判斷是否真的需要 consoleLog 列印資料.
    const getConsoleLogMixin = options.consoleLog
      ? consoleLogMixin
      : function() {};

    Vue.mixin({
      methods: {
        consoleLogMixin: getConsoleLogMixin,
      },
    });

    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------

    // 全局自訂指令.
    Vue.directive(toCurrencyDirective.name, toCurrencyDirective.options);
  },
};
