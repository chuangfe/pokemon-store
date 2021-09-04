import toCurrency from "../modules/toCurrency";

export default {
  name: "to-currency-directive",
  options: {
    inserted(el, binding) {
      el.innerText = toCurrency(binding.value);
    },

    update(el, binding) {
      el.innerText = toCurrency(binding.value);
    },
  },
};
