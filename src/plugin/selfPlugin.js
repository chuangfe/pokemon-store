import consoleLogMixin from "./consoleLogMixin";
import toCurrencyDirective from "./toCurrencyDirective";

export default {
  install(Vue, options) {
    // 全局自訂 mixin.

    // 由 options.consoleLog 判斷是否真的需要 consoleLog 列印資料.
    const getConsoleLogMixin = options.consoleLog
      ? consoleLogMixin
      : function() {};

    Vue.mixin({
      methods: {
        /**
         * log 資料.
         * 使用位置.
         * views Merchandise.vue
         * component MerchandiseItem.vue
         * component BackSideMerchandisesEditing.vue
         */
        consoleLogMixin: getConsoleLogMixin,
      },
    });

    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------

    // 全局自訂指令.

    /**
     * 數值加上千分位.
     * 使用位置.
     * component MerchandiseItem.vue
     * component BackSideMerchandisesEditing.vue
     */
    Vue.directive(toCurrencyDirective.name, toCurrencyDirective.options);
  },
};
