// 測試 vuex 的 actions function.
// 引入 Store.
import Store from "../../src/store/index";

// 也許我需要開關來選擇測試的目標.
const flag = {
  SEARCH_DATA_ACTIONS: false,
  UPDATE_SHOPPING_CART_ACTIONS: false,
  REMOVE_SHOPPING_CART_ACTIONS: false,
  UPDATE_MERCHANDISE_ACTIONS: false,
  REMOVE_MERCHANDISE_ACTIONS: false,
};

// describe 用於分類測試的區域, 目前還看不出好用的地方.
describe("Vuex Actions", () => {
  // 測試 SEARCH_DATA_ACTIONS, 搜尋商品.
  if (flag.SEARCH_DATA_ACTIONS) {
    test("SEARCH_DATA_ACTIONS", async () => {
      // 手動引入的資料.
      const merchandiseData = Store.state.data.ball.merchandises[0];
      const shoppingCartData = Store.state.shoppingCart.merchandises[0];
      // SEARCH_DATA_ACTIONS 的返回值.
      const result = (
        await Store.dispatch("SEARCH_DATA_ACTIONS", [shoppingCartData])
      )[0];

      expect(result.merchandiseData).toEqual(merchandiseData);
      expect(result.shoppingCartData).toEqual(shoppingCartData);
    });
  }

  // 測試 SEARCH_DATA_ACTIONS, 新增商品至購物車.
  // 尚未測試, 商品改分類.
  // 尚未測試, 新增商品.
  if (flag.UPDATE_SHOPPING_CART_ACTIONS) {
    test("UPDATE_SHOPPING_CART_ACTIONS", async () => {
      /**
       * 測試目標, UPDATE_SHOPPING_CART_ACTIONS 函式執行完的結果, 是否會跟手動修改的資料相同.
       *
       * 該區域測試主要順序.
       * 預先設計好資料, 用於模擬 component input 事件.
       * 將資料傳入 UPDATE_SHOPPING_CART_ACTIONS, 並等帶其異步結束.
       * 在異步結束後, 手動獲取完成結果的 result 資料.
       * 預先設計好應該完成的 data 資料, 用於比較.
       */
      // 首先, 選好我們要測試的資料, 該資料應該是由 input 發出.
      const // 這是購物車內有的商品.
        payloadOne = {
          id: "poke-ball-00",
          category: "ball",
          categoryName: "精靈球",
          name: "精靈球",
          price: 200,
          count: 6,
          total: 1200,
        },
        // 購物車內沒有的商品.
        payloadTwo = {
          id: "poke-ball-02",
          category: "ball",
          categoryName: "精靈球",
          name: "精靈球X5",
          price: 900,
          count: 10,
          total: 9000,
        };

      // 獲取修改前的 data 資料.
      const resultArr = await Store.dispatch("SEARCH_DATA_ACTIONS", [
        payloadOne,
        payloadTwo,
      ]);

      // 複製兩件商品的 data 資料.
      const dataOne = Object.assign({}, resultArr[0].merchandiseData),
        dataTwo = Object.assign({}, resultArr[1].merchandiseData);

      // 手動修改兩件商品舊資料的庫存.
      dataOne.remaining -= payloadOne.count;
      dataTwo.remaining -= payloadTwo.count;

      // 執行 UPDATE_SHOPPING_CART_ACTIONS 修改 data 資料.
      await Store.dispatch("UPDATE_SHOPPING_CART_ACTIONS", payloadOne);
      await Store.dispatch("UPDATE_SHOPPING_CART_ACTIONS", payloadTwo);

      // 獲取修改完成的 data 資料.
      const resultUpdateArr = await Store.dispatch("SEARCH_DATA_ACTIONS", [
        payloadOne,
        payloadTwo,
      ]);

      // 對兩件商品進行比較.
      expect(resultUpdateArr[0].merchandiseData).toEqual(dataOne);
      expect(resultUpdateArr[1].merchandiseData).toEqual(dataTwo);
    });
  }

  // 測試 REMOVE_SHOPPING_CART_ACTIONS, 刪除購物車的商品.
  if (flag.REMOVE_SHOPPING_CART_ACTIONS) {
    test("REMOVE_SHOPPING_CART_ACTIONS", async () => {
      /**
       * 選好要刪除的購物車商品.
       * 手動計算刪除後的商品 data 資料應該為何.
       * 使用 REMOVE_SHOPPING_CART_ACTIONS 異步實際刪除商品.
       * 異步後獲取 data 資料, 並進行斷句.
       */

      // 選擇好要刪除的資料.
      const removeData = {
        id: "backpack",
        category: "props",
        categoryName: "道具",
        name: "背包",
        price: 140,
        count: 1,
        total: 140,
      };

      // 修改前的資料.
      const resultData = (
          await Store.dispatch("SEARCH_DATA_ACTIONS", [removeData])
        )[0],
        // 複製資料.
        data = Object.assign({}, resultData.merchandiseData);

      // 資料手動修改.
      data.remaining += removeData.count;

      // 執行 REMOVE_SHOPPING_CART_ACTIONS, 刪除購物車的商品.
      await Store.dispatch("REMOVE_SHOPPING_CART_ACTIONS", removeData);

      // 獲取 REMOVE_SHOPPING_CART_ACTIONS 執行完成的結果.
      const resultUpdateData = (
        await Store.dispatch("SEARCH_DATA_ACTIONS", [removeData])
      )[0];

      // 對 data 進行比較.
      expect(resultUpdateData.shoppingCartIndex).toBe(-1);
      expect(resultUpdateData.merchandiseData).toEqual(data);
    });
  }

  // 測試 UPDATE_MERCHANDISE_ACTIONS, 後台新增商品.
  if (flag.UPDATE_MERCHANDISE_ACTIONS) {
    test("UPDATE_MERCHANDISE_ACTIONS", async () => {
      // 需要新增的商品, 新商品新增至商城.
      const pokemonGOData = {
          id: "1630854442043",
          imageSrc:
            "https://p2.bahamut.com.tw/B/2KU/80/3a77e4e24df0289d8fcfb90f5715q805.JPG?w=1000",
          alt: "B2KU",
          name: "Pokemon GO",
          category: "mall",
          categoryName: "商城",
          remaining: 10,
          originalPrice: 1000,
          specialPrice: 900,
          text: "寶可夢當地 Acts〜地區的力量真厲害！",
        },
        // 現有商品, 修改庫存, 藥品改庫存.
        drugData = {
          id: "potion",
          category: "drug",
          categoryName: "藥品",
          name: "傷藥",
          text: "噴霧式傷藥。能讓寶可夢回復２０ＨＰ。",
          imageSrc: "./images/potion.png",
          alt: "potion",
          remaining: 2,
          originalPrice: 50,
          specialPrice: 0,
        },
        // 現有商品, 修改資料, 背包修改庫存與分類.
        backpackData = {
          id: "backpack",
          category: "drug",
          categoryName: "藥品",
          name: "背包",
          text: "每 200 元寶可夢幣(約新台幣 60 元)可讓道具背包上限增加 50 個。",
          imageSrc: "./images/backpack.png",
          alt: "backpack",
          remaining: 2,
          originalPrice: 200,
          specialPrice: 140,
        };

      // 更新商品資料.
      await Store.dispatch("UPDATE_MERCHANDISE_ACTIONS", pokemonGOData);
      await Store.dispatch("UPDATE_MERCHANDISE_ACTIONS", drugData);
      await Store.dispatch("UPDATE_MERCHANDISE_ACTIONS", backpackData);

      // 搜索 data 內的資料.
      const resultArr = await Store.dispatch("SEARCH_DATA_ACTIONS", [
        pokemonGOData,
        drugData,
        backpackData,
      ]);

      // 判斷 data 的資料是否跟手動修改的資料相同.
      expect(resultArr[0].merchandiseData).toEqual(pokemonGOData);
      expect(resultArr[1].merchandiseData).toEqual(drugData);
      expect(resultArr[2].merchandiseData).toEqual(backpackData);

      // 目前看起來沒問題.
      console.log(
        // 該品在分類中的索引.
        resultArr[0].merchandiseIndex,
        // 該品的分類.
        resultArr[0].merchandiseData.category,
        // 該品的庫存.
        resultArr[0].merchandiseData.remaining
      );
      console.log(
        resultArr[1].merchandiseIndex,
        resultArr[1].merchandiseData.category,
        resultArr[1].merchandiseData.remaining
      );
      console.log(
        resultArr[2].merchandiseIndex,
        resultArr[2].merchandiseData.category,
        resultArr[2].merchandiseData.remaining
      );
    });
  }

  // 測試 REMOVE_MERCHANDISE_ACTIONS, 後台刪除商品.
  if (flag.REMOVE_MERCHANDISE_ACTIONS) {
    test("REMOVE_MERCHANDISE_ACTIONS", async () => {
      // 需要刪除的商品.
      const removeData = {
        id: "poke-ball-00",
        // 商品分類英文.
        category: "ball",
        // 商品分類中文.
        categoryName: "精靈球",
        // 商品名稱.
        name: "精靈球",
        // 商品說明.
        text:
          "是精靈寶可夢世界中隨處可見的一種道具。精靈球的作用是捕捉或者攜帶寶可夢，不同種類的精靈球擁有不同的特殊效果。",
        // 商品圖片.
        imageSrc: "./images/poke-ball-00.png",
        // 圖片屬性.
        alt: "poke-ball-00",
        // 商品庫存.
        remaining: 10,
        // 商品售價.
        originalPrice: 200,
        // 商品特價.
        specialPrice: 0,
        // 商品特價的折扣.
      };

      // 刪除商品.
      await Store.dispatch("REMOVE_MERCHANDISE_ACTIONS", removeData);

      // 搜尋商品.
      const result = (
        await Store.dispatch("SEARCH_DATA_ACTIONS", [removeData])
      )[0];

      // 刪除後找不到商品索引, 故返回 -1 值.
      expect(result.merchandiseIndex).toBe(-1);
    });
  }
});
