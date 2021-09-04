// 測試 vuex 的 actions function.
// 引入 Store.
import Store from "../../src/store/index";

// describe 用於分類測試的區域, 目前還看不出好用的地方.
describe("Vuex Actions Test", () => {
  // 測試 SEARCH_MERCHANDISE_ACTIONS.
  test("Test SEARCH_MERCHANDISE_ACTIONS", async () => {
    const data = {
      id: "poke-ball-01",
      category: "ball",
      categoryName: "精靈球",
      name: "精靈球X3",
      text:
        "是精靈寶可夢世界中隨處可見的一種道具。精靈球的作用是捕捉或者攜帶寶可夢，不同種類的精靈球擁有不同的特殊效果。",
      imageSrc: "./images/poke-ball-01.png",
      alt: "poke-ball-01",
      remaining: 0,
      originalPrice: 600,
      specialPrice: 0,
    };

    // 獲取 SEARCH_MERCHANDISE_ACTIONS 的返回值.
    let result = await Store.dispatch("SEARCH_MERCHANDISE_ACTIONS", [data]);

    result = result[0].oldItem;

    // toHaveProperty, 判斷返回值是否有 id 屬性.
    // expect(result).toHaveProperty("id");
    // expect(result).toEqual(data);
  });
});
