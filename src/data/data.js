// 模擬資料.
export default {
  // 精靈球.
  ball: {
    name: "精靈球",
    imageSrc: "./images/poke-ball-00.png",
    alt: "poke-ball",
    merchandises: [
      {
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
      },
      {
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
      },
      {
        id: "poke-ball-02",
        category: "ball",
        categoryName: "精靈球",
        name: "精靈球X5",
        text:
          "是精靈寶可夢世界中隨處可見的一種道具。精靈球的作用是捕捉或者攜帶寶可夢，不同種類的精靈球擁有不同的特殊效果。",
        imageSrc: "./images/poke-ball-02.png",
        alt: "poke-ball-02",
        remaining: 20,
        originalPrice: 1000,
        specialPrice: 900,
      },
    ],
  },
  // 藥品.
  drug: {
    name: "藥品",
    imageSrc: "./images/potion.png",
    alt: "potion",
    merchandises: [
      {
        id: "potion",
        category: "drug",
        categoryName: "藥品",
        name: "傷藥",
        text: "噴霧式傷藥。能讓寶可夢回復２０ＨＰ。",
        imageSrc: "./images/potion.png",
        alt: "potion",
        remaining: 12,
        originalPrice: 50,
        specialPrice: 0,
      },
      {
        id: "max-revive",
        category: "drug",
        categoryName: "藥品",
        name: "復活石",
        text: "能讓陷入瀕死的寶可夢重獲生機，並回復所有ＨＰ。",
        imageSrc: "./images/max-revive.png",
        alt: "max-revive",
        remaining: 0,
        originalPrice: 200,
        specialPrice: 0,
      },
    ],
  },
  // 道具.
  props: {
    name: "道具",
    imageSrc: "./images/backpack.png",
    alt: "backpack",
    merchandises: [
      {
        id: "backpack",
        category: "props",
        categoryName: "道具",
        name: "背包",
        text: "每 200 元寶可夢幣(約新台幣 60 元)可讓道具背包上限增加 50 個。",
        imageSrc: "./images/backpack.png",
        alt: "backpack",
        remaining: 2,
        originalPrice: 200,
        specialPrice: 140,
      },
      {
        id: "lucky-egg",
        category: "props",
        categoryName: "道具",
        name: "幸運蛋",
        text:
          "使用幸運蛋後的 30 分鐘內，每當遇到寶可夢或進化都有雙倍經驗值，可以加快訓練師等級升等速度。",
        imageSrc: "./images/lucky-egg.png",
        alt: "lucky-egg",
        remaining: 12,
        originalPrice: 300,
        specialPrice: 0,
      },
    ],
  },
  // 商城.
  mall: {
    name: "商城",
    imageSrc: "./images/gift-box.png",
    alt: "gift-box",
    merchandises: [
      {
        id: "gold-00",
        category: "mall",
        categoryName: "商城",
        name: "皮卡丘紀念幣",
        text: "寶可夢通用貨幣。",
        imageSrc: "./images/gold-00.png",
        alt: "gold-00",
        remaining: 12,
        originalPrice: 100,
        specialPrice: 50,
      },
      {
        id: "gold-01",
        category: "mall",
        categoryName: "商城",
        name: "皮卡丘幣X100",
        text: "寶可夢通用貨幣。",
        imageSrc: "./images/gold-01.png",
        alt: "gold-01",
        remaining: 12,
        originalPrice: 10000,
        specialPrice: 5000,
      },
      {
        id: "gold-02",
        category: "mall",
        categoryName: "商城",
        name: "皮卡丘幣X500",
        text: "寶可夢通用貨幣。",
        imageSrc: "./images/gold-02.png",
        alt: "gold-02",
        remaining: 12,
        originalPrice: 50000,
        specialPrice: 25000,
      },
      {
        id: "gold-03",
        category: "mall",
        categoryName: "商城",
        name: "皮卡丘幣X1000",
        text: "寶可夢通用貨幣。",
        imageSrc: "./images/gold-03.png",
        alt: "gold-03",
        remaining: 12,
        originalPrice: 100000,
        specialPrice: 50000,
      },
      {
        id: "camera",
        category: "mall",
        categoryName: "商城",
        name: "相機",
        text: "當你遇到寶可夢時，可以透過 Camera 相機幫它拍照。",
        imageSrc: "./images/camera.png",
        alt: "camera",
        remaining: 1,
        originalPrice: 12000,
        specialPrice: 9600,
      },
      {
        id: "gift-box",
        category: "mall",
        categoryName: "商城",
        name: "綜合禮物",
        text: "不知道裡面有什麼。",
        imageSrc: "./images/gift-box.png",
        alt: "gift-box",
        remaining: 1,
        originalPrice: 999,
        specialPrice: 99,
      },
    ],
  },
};
