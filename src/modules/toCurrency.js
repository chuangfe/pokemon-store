/**
 * 將數值加上千分位逗號, 目前是三位數加逗號.
 * @param {num} num 數值.
 */
export default function toCurrency(num) {
  let reverseStr = String(num)
    .split("")
    .reverse()
    .join("");
  let returnStr = reverseStr.replace(/\d{3}\B/g, (str) => {
    return str + ",";
  });

  return returnStr
    .split("")
    .reverse()
    .join("");
}
