// 計算商品售價的函式.
export default function({ price, specialOffer = false }) {
  return specialOffer ? Math.floor(price * specialOffer) : price;
}
