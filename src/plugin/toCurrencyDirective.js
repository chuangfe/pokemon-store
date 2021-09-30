import toCurrency from "../modules/toCurrency";

export default {
  name: "to-currency-directive",
  options: {
    inserted(el, binding) {
      el.textContent = toCurrency(binding.value);
    },

    update(el, binding) {
      el.textContent = toCurrency(binding.value);
    },
  },
};
