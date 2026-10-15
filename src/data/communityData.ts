import { ProductReview, LoyaltyReward, MemberProfile } from '../types/loyalty';

export interface Product {
  id: string;
  name: string;
  category: 'frozen' | 'skincare' | 'ambient';
  temp: 'frozen' | 'ambient';
  price: number;
  originalPrice?: number;
  spec: string;
  img: string;
  desc: string;
  tags?: string[];
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
}

export interface TourItem {
  id: string;
  name: string;
  price: number;
  minPeople: number;
  duration: string;
  img: string;
  desc: string;
  features: string[];
}

export interface DiningItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  img: string;
  tag: string;
  desc: string;
  highlights: string[];
}

// 預設會員示範帳號
export const defaultMemberProfile: MemberProfile = {
  phone: '0912-345-678',
  name: '林美惠',
  points: 280,
  tier: '銀鱗會員',
  joinDate: '2025/11/08',
  lifetimeSpent: 5680,
  redeemedRewards: ['rew_coupon_50'],
  pointHistory: [
    {
      id: 'pt-1',
      date: '2026/03/12',
      title: '消費回饋 (訂單 XL-831920)',
      pointsChange: +140,
      type: 'earn'
    },
    {
      id: 'pt-2',
      date: '2026/02/18',
      title: '兌換 NT$50 購物折價券',
      pointsChange: -50,
      type: 'redeem'
    },
    {
      id: 'pt-3',
      date: '2026/01/05',
      title: '消費回饋 (訂單 XL-519203)',
      pointsChange: +90,
      type: 'earn'
    },
    {
      id: 'pt-4',
      date: '2025/11/08',
      title: '新加入會員專屬見面禮',
      pointsChange: +100,
      type: 'earn'
    }
  ]
};

// 積分獨家兌換好禮清單
export const loyaltyRewards: LoyaltyReward[] = [
  {
    id: 'rew_coupon_50',
    title: 'NT$ 50 線上購物無門檻折價券',
    pointsCost: 50,
    category: 'coupon',
    img: 'logo2.jpg',
    desc: '結帳時現折 NT$ 50，全館生鮮、美妝與常溫伴手禮皆適用。',
    stock: 99
  },
  {
    id: 'rew_soap',
    title: '石斑魚鱗胜肽冷製美妍皂 (體驗裝 40g)',
    pointsCost: 150,
    category: 'gift',
    img: 'facial-mask.png',
    desc: '富含新龍社區專利膠原胜肽，綿密細緻泡沫，溫和洗淨不乾澀。',
    stock: 25
  },
  {
    id: 'rew_bag',
    title: '新三漁專屬 環保保冷加厚帆布提袋',
    pointsCost: 200,
    category: 'gift',
    img: 'fishing-net-making.jpg',
    desc: '高磅數防潑水帆布，內層加厚鋁箔保溫保冷，採買石斑生鮮必備。',
    stock: 18
  },
  {
    id: 'rew_jelly',
    title: '膠原蛋白海味凍飲 (常態兌換一瓶)',
    pointsCost: 100,
    category: 'gift',
    img: 'collagen-jelly-drink.jpg',
    desc: '純天然慢熬魚鱗膠原，加入紅棗與枸杞，清甜低卡美妍良品。',
    stock: 40
  },
  {
    id: 'rew_tour_vip',
    title: '漁村小旅行 NT$ 100 體驗折抵券',
    pointsCost: 80,
    category: 'experience',
    img: 'feeding-giant-grouper.jpg',
    desc: '預約「餵食石斑魚」或「午仔魚一夜干手作」即可折抵 100 元。',
    stock: 50
  }
];

// 17 種展售商城精選商品（含初始真實評價庫）
export const products: Product[] = [
  // ❄️ 冷凍生鮮區 (Frozen)
  {
    id: 'f1',
    name: '產地直送 龍膽石斑清肉',
    category: 'frozen',
    temp: 'frozen',
    price: 480,
    originalPrice: 550,
    spec: '300g ± 10% / 真空急凍包',
    img: 'giant-grouper-fillet.jpg',
    desc: '取自大漢山湧泉養殖龍膽石斑，肉質厚實彈牙、富含豐富天然膠質，無細刺安心品嚐。',
    tags: ['超人氣', '無刺清肉', '急凍鎖鮮'],
    rating: 4.9,
    reviewCount: 48,
    reviews: [
      {
        id: 'rev-f1-1',
        productId: 'f1',
        authorName: '陳雅筑',
        authorCity: '高雄市左營區',
        rating: 5,
        date: '2026/04/02',
        comment: '肉質真的非常緊實，完全沒有任何土腥味！切片清蒸給家裡長輩吃，魚皮厚度跟膠質讓人驚艷，已經回購第三次。',
        verifiedPurchase: true,
        likes: 12,
        tags: ['肉質緊實', '無腥味', '長輩最愛']
      },
      {
        id: 'rev-f1-2',
        productId: 'f1',
        authorName: '黃國銘 主廚',
        authorCity: '台北市大安區',
        rating: 5,
        date: '2026/03/15',
        comment: '真空急凍技術做得很好，解凍後魚肉完全不泛水，油煎時香味濃郁，大推！',
        verifiedPurchase: true,
        likes: 8,
        tags: ['包裝嚴實', '急凍鎖鮮']
      },
      {
        id: 'rev-f1-3',
        productId: 'f1',
        authorName: 'Peggy Liu',
        authorCity: '新竹縣竹北市',
        rating: 4,
        date: '2026/02/20',
        comment: '份量適合兩大一小的一餐，無刺處理得非常乾淨，煮薑絲豆腐湯非常鮮美。',
        verifiedPurchase: true,
        likes: 5,
        tags: ['料理方便', '無刺清肉']
      }
    ]
  },
  {
    id: 'f2',
    name: '極選整尾鮮凍 龍虎斑',
    category: 'frozen',
    temp: 'frozen',
    price: 520,
    originalPrice: 600,
    spec: '約 500g~600g / 三去真空',
    img: 'dragon-tiger-grouper.jpg',
    desc: '結合龍膽魚皮之Q彈與老虎斑之細緻嫩甜，清蒸即可品嚐滿滿膠原蛋白與甘美鮮度。',
    tags: ['產地限定', '宴席必備', '三去真空'],
    rating: 5.0,
    reviewCount: 36,
    reviews: [
      {
        id: 'rev-f2-1',
        productId: 'f2',
        authorName: '張建志',
        authorCity: '台南市東區',
        rating: 5,
        date: '2026/03/28',
        comment: '過年過節餐桌上的王牌！去鱗去腮去內臟處理得很乾淨，抹點鹽加蔥薑樹子蒸12分鐘，魚肉細嫩像豆腐，滿滿膠質。',
        verifiedPurchase: true,
        likes: 15,
        tags: ['三去乾淨', '宴席必備', '肉嫩多汁']
      },
      {
        id: 'rev-f2-2',
        productId: 'f2',
        authorName: '林小姐',
        authorCity: '台中市南屯區',
        rating: 5,
        date: '2026/03/10',
        comment: '產地直送的鮮度就是不一樣，眼睛很清澈，龍虎斑皮厚肉甜，全家都很讚賞。',
        verifiedPurchase: true,
        likes: 6,
        tags: ['產地直達', '鮮度極佳']
      }
    ]
  },
  {
    id: 'f3',
    name: '頂級 龍膽石斑火鍋魚片',
    category: 'frozen',
    temp: 'frozen',
    price: 450,
    originalPrice: 500,
    spec: '250g / 盒裝',
    img: 'giant-grouper-pot-hot-slices.jpg',
    desc: '職人黃金厚度斜切，涮入高湯數秒微捲即熟，魚皮爽脆、肉質緊緻鮮甜。',
    tags: ['火鍋首選', '晶瑩透光', '鮮脆爽口'],
    rating: 4.8,
    reviewCount: 42,
    reviews: [
      {
        id: 'rev-f3-1',
        productId: 'f3',
        authorName: '郭瑋倫',
        authorCity: '新北市板橋區',
        rating: 5,
        date: '2026/04/05',
        comment: '涮火鍋太過癮了！魚皮一燙就捲起來，咬下去脆度破表，完全不軟爛。',
        verifiedPurchase: true,
        likes: 9,
        tags: ['火鍋首選', '魚皮爽脆']
      }
    ]
  },
  {
    id: 'f4',
    name: '高膠質精燉 龍膽石斑魚頭丁',
    category: 'frozen',
    temp: 'frozen',
    price: 360,
    spec: '500g / 包',
    img: 'giant-grouper-head.jpg',
    desc: '煲湯熬粥首選！富含豐厚魚唇與軟骨膠質，熬煮後湯頭呈現乳白濃醇色澤。',
    tags: ['煲湯精華', '濃郁膠質', '養生食補'],
    rating: 4.9,
    reviewCount: 31,
    reviews: [
      {
        id: 'rev-f4-1',
        productId: 'f4',
        authorName: '蘇阿嬤',
        authorCity: '屏東縣潮州鎮',
        rating: 5,
        date: '2026/03/20',
        comment: '熬出來的湯白如牛奶，魚唇厚厚的都是膠質，喝完嘴唇都黏黏的，非常補身！',
        verifiedPurchase: true,
        likes: 11,
        tags: ['膠質滿滿', '奶白高湯']
      }
    ]
  },
  {
    id: 'f5',
    name: '海風熟成 午仔魚一夜干',
    category: 'frozen',
    temp: 'frozen',
    price: 220,
    originalPrice: 260,
    spec: '220g~250g / 尾',
    img: 'one-night-dried.jpg',
    desc: '產地黃金比例鹽水浸漬，迎著台灣海峽微風冷冽陰乾，魚肉油脂爆汁豐潤。',
    tags: ['油脂豐富', '職人手作', '香煎下酒'],
    rating: 4.9,
    reviewCount: 56,
    reviews: [
      {
        id: 'rev-f5-1',
        productId: 'f5',
        authorName: 'Kevin Chen',
        authorCity: '台北市信義區',
        rating: 5,
        date: '2026/04/01',
        comment: '居酒屋等級！下鍋乾煎完全不用放油，午仔魚本身的天然魚油就滋滋作響，鹹度適中，配啤酒絕配。',
        verifiedPurchase: true,
        likes: 14,
        tags: ['油脂爆汁', '下酒神器']
      }
    ]
  },
  {
    id: 'f6',
    name: '鮮度滿分 午仔魚 (三去冰鮮)',
    category: 'frozen',
    temp: 'frozen',
    price: 180,
    spec: '250g / 尾',
    img: 'threadfin-with-gills-removed.jpg',
    desc: '專業三去（去鱗、去腮、去內臟），起池後活水急凍封存，煎烤蒸煮皆極品。',
    tags: ['三去潔淨', '鮮嫩細緻', '家常必備'],
    rating: 4.8,
    reviewCount: 29,
    reviews: [
      {
        id: 'rev-f6-1',
        productId: 'f6',
        authorName: '徐太太',
        authorCity: '桃園市中壢區',
        rating: 5,
        date: '2026/03/12',
        comment: '小孩非常喜歡，肉質幼嫩細緻，處理得很乾淨沒有血水，煎給小孩吃很放心。',
        verifiedPurchase: true,
        likes: 7,
        tags: ['肉質細嫩', '小孩喜愛']
      }
    ]
  },
  {
    id: 'f7',
    name: '手作純肉 龍膽石斑魚丸',
    category: 'frozen',
    temp: 'frozen',
    price: 250,
    spec: '300g / 包 (約12顆)',
    img: 'fish-balls.jpg',
    desc: '無混雜魚漿，純粹以新鮮龍膽石斑魚肉揉捏打漿，口感脆彈無粉感。',
    tags: ['純石斑肉', '無防腐劑', '極致Q彈'],
    rating: 5.0,
    reviewCount: 44,
    reviews: [
      {
        id: 'rev-f7-1',
        productId: 'f7',
        authorName: '周家華',
        authorCity: '台中市西區',
        rating: 5,
        date: '2026/04/08',
        comment: '吃得到真正的魚肉纖維，咬下去會噴汁！跟市售都是澱粉粉感的魚丸完全不同檔次。',
        verifiedPurchase: true,
        likes: 16,
        tags: ['爆汁彈牙', '真材實料']
      }
    ]
  },
  {
    id: 'f8',
    name: '元氣慢燉 龍膽石斑魚粥',
    category: 'frozen',
    temp: 'frozen',
    price: 160,
    spec: '450g / 加熱即食包',
    img: 'giant-grouper-congee.jpg',
    desc: '濃郁魚骨湯底精燉台灣優質米，滿滿石斑魚片與野蔬，銀髮樂齡與孩童最愛。',
    tags: ['即食美味', '樂齡友善', '暖心元氣'],
    rating: 4.8,
    reviewCount: 38,
    reviews: [
      {
        id: 'rev-f8-1',
        productId: 'f8',
        authorName: '曾小姐',
        authorCity: '高雄市三民區',
        rating: 5,
        date: '2026/03/25',
        comment: '買給術後家人補身體，加熱五分鐘就能吃，粥體吸滿魚湯甘甜，魚片給得很有誠意！',
        verifiedPurchase: true,
        likes: 10,
        tags: ['營養暖胃', '加熱即食']
      }
    ]
  },
  {
    id: 'f9',
    name: '膠原蛋白凍飲 (海味精粹)',
    category: 'frozen',
    temp: 'frozen',
    price: 120,
    spec: '200ml / 瓶',
    img: 'collagen-jelly-drink.jpg',
    desc: '純天然魚鱗膠原萃取，加入紅棗與枸杞慢熬，口感清爽滑順，無腥味低卡美妍。',
    tags: ['低卡美妍', '古法熬煮', '清甜順口'],
    rating: 4.7,
    reviewCount: 35,
    reviews: [
      {
        id: 'rev-f9-1',
        productId: 'f9',
        authorName: 'Eva Wu',
        authorCity: '台北市中山區',
        rating: 5,
        date: '2026/03/18',
        comment: '原本很擔心魚鱗熬的會有腥味，結果完全不會！有淡淡的紅棗清甜，冰冰喝像燕窩一樣滑順。',
        verifiedPurchase: true,
        likes: 13,
        tags: ['無腥味', '像燕窩口感']
      }
    ]
  },

  // ✨ LN 魚鱗膠原美妝 (Skincare / Ambient)
  {
    id: 's1',
    name: 'LN 嫩白極潤魚鱗膠原蛋白面膜',
    category: 'skincare',
    temp: 'ambient',
    price: 680,
    originalPrice: 850,
    spec: '5片入 / 盒',
    img: 'facial-mask.png',
    desc: '專利石斑魚鱗小分子胜肽萃取，深層瞬效補水，撫平乾燥細紋，肌膚彈嫩發光。',
    tags: ['專利胜肽', '小分子好吸收', '深度補水'],
    rating: 5.0,
    reviewCount: 62,
    reviews: [
      {
        id: 'rev-s1-1',
        productId: 's1',
        authorName: '鍾佩妤',
        authorCity: '台南市安平區',
        rating: 5,
        date: '2026/04/03',
        comment: '去枋寮參訪時買了一盒，敷完隔天臉超亮而且上妝極貼！精華液很多可以連脖子手臂一起抹，立馬回購三盒！',
        verifiedPurchase: true,
        likes: 21,
        tags: ['透亮保濕', '妝感服貼', '專利胜肽']
      },
      {
        id: 'rev-s1-2',
        productId: 's1',
        authorName: 'Annie Huang',
        authorCity: '台北市松山區',
        rating: 5,
        date: '2026/03/22',
        comment: '敏弱肌完全沒有泛紅刺痛，保濕度很持久，魚鱗胜肽真的太神奇了。',
        verifiedPurchase: true,
        likes: 12,
        tags: ['溫和不刺激', '長效保濕']
      }
    ]
  },
  {
    id: 's2',
    name: 'LN 膠原蛋白高效保濕化妝精露',
    category: 'skincare',
    temp: 'ambient',
    price: 980,
    originalPrice: 1200,
    spec: '120ml / 瓶',
    img: 'hydrating-essence-lotion.jpg',
    desc: '清爽高滲透質地，為肌膚注入海洋膠原能量，加強後續保養吸收力。',
    tags: ['滲透肌底', '油水平衡', '喚醒澎潤'],
    rating: 4.8,
    reviewCount: 27,
    reviews: [
      {
        id: 'rev-s2-1',
        productId: 's2',
        authorName: '王怡君',
        authorCity: '屏東市',
        rating: 5,
        date: '2026/03/14',
        comment: '質地輕透好拍開，吸收速度非常快，南部夏天用也不會有負擔。',
        verifiedPurchase: true,
        likes: 8,
        tags: ['清爽好吸收', '油水平衡']
      }
    ]
  },
  {
    id: 's3',
    name: 'LN 嫩白高效保濕修護乳液',
    category: 'skincare',
    temp: 'ambient',
    price: 1180,
    originalPrice: 1450,
    spec: '50ml / 瓶',
    img: 'repairing-lotion.png',
    desc: '鎖水修護屏障，添加魚鱗膠原胜肽與天然植物萃取，維持全天候澎潤柔滑。',
    tags: ['鎖水屏障', '長效保濕', '絲滑親膚'],
    rating: 4.9,
    reviewCount: 33,
    reviews: [
      {
        id: 'rev-s3-1',
        productId: 's3',
        authorName: '李雅芳',
        authorCity: '高雄市苓雅區',
        rating: 5,
        date: '2026/03/29',
        comment: '擦完有一層柔嫩的保水膜，乾肌脫皮改善非常多，淡淡香氣很舒服。',
        verifiedPurchase: true,
        likes: 9,
        tags: ['滋潤度高', '脫皮救星']
      }
    ]
  },
  {
    id: 's4',
    name: 'LN 嫩白高效保濕精華液',
    category: 'skincare',
    temp: 'ambient',
    price: 1380,
    originalPrice: 1680,
    spec: '30ml / 滴管瓶',
    img: 'moisturizing-serum.png',
    desc: '高濃度活性膠原微分子，直達肌底深度修護彈力網絡，展現逆齡光澤。',
    tags: ['高濃度胜肽', '逆齡彈嫩', '極致修護'],
    rating: 4.9,
    reviewCount: 41,
    reviews: [
      {
        id: 'rev-s4-1',
        productId: 's4',
        authorName: 'Claire Chang',
        authorCity: '台中市北區',
        rating: 5,
        date: '2026/04/04',
        comment: '滴管設計很衛生，質地濃郁但延展性極佳，連續用兩週肌膚細緻度肉眼可見提升！',
        verifiedPurchase: true,
        likes: 17,
        tags: ['細緻有感', '彈嫩澎潤']
      }
    ]
  },
  {
    id: 's5',
    name: 'LN 煥顏緊緻膠原眼霜',
    category: 'skincare',
    temp: 'ambient',
    price: 1280,
    originalPrice: 1550,
    spec: '20ml / 支',
    img: 'eye-cream.png',
    desc: '針對眼周嬌嫩肌膚打造，細緻輕盈不長肉芽，有效淡化暗沉細紋。',
    tags: ['眼周緊緻', '清爽不黏膩', '淡化暗沉'],
    rating: 4.8,
    reviewCount: 22,
    reviews: [
      {
        id: 'rev-s5-1',
        productId: 's5',
        authorName: '施美玲',
        authorCity: '新北市中和區',
        rating: 5,
        date: '2026/03/19',
        comment: '最怕眼霜太油長肉芽，這款完全不會，按摩頭冰冰涼涼很消腫。',
        verifiedPurchase: true,
        likes: 6,
        tags: ['清爽不黏膩', '淡化乾紋']
      }
    ]
  },
  {
    id: 's6',
    name: 'LN 全效煥顏活膚精華霜',
    category: 'skincare',
    temp: 'ambient',
    price: 1580,
    originalPrice: 1980,
    spec: '50ml / 罐',
    img: 'essence-cream.png',
    desc: '絲絨奢華質地，深層滋養夜間修護，打造如絲緞般細緻緊實的逆齡好氣色。',
    tags: ['全效撫紋', '頂級封存', '奢華滋養'],
    rating: 5.0,
    reviewCount: 38,
    reviews: [
      {
        id: 'rev-s6-1',
        productId: 's6',
        authorName: '簡郁芳',
        authorCity: '台北市大同區',
        rating: 5,
        date: '2026/04/07',
        comment: '質地像絲絨奶霜，晚上薄擦一層，早上起床臉龐軟嫩又緊實，完全不輸國際專櫃幾千元的乳霜。',
        verifiedPurchase: true,
        likes: 19,
        tags: ['專櫃水準', '逆齡緊緻']
      }
    ]
  },

  // ☀️ 在地常溫伴手禮 (Ambient)
  {
    id: 'a1',
    name: '漢方養生 龍膽石斑魚湯底(常溫包)',
    category: 'ambient',
    temp: 'ambient',
    price: 220,
    originalPrice: 280,
    spec: '500g / 包',
    img: 'fish-soup.png',
    desc: '高壓商業滅菌真空包，常溫輕鬆保存！石斑骨精燉湯底，加入喜愛食材即可開鍋。',
    tags: ['常溫保存', '免熬高湯', '漢方溫補'],
    rating: 4.9,
    reviewCount: 30,
    reviews: [
      {
        id: 'rev-a1-1',
        productId: 'a1',
        authorName: '趙子豪',
        authorCity: '新竹市',
        rating: 5,
        date: '2026/03/27',
        comment: '露營帶這個太方便了！常溫好攜帶，加水滾開後丟點火鍋料青菜，湯頭濃香甘甜，朋友都誇獎！',
        verifiedPurchase: true,
        likes: 10,
        tags: ['露營神器', '常溫便利']
      }
    ]
  },
  {
    id: 'a2',
    name: '酥脆香濃 龍膽石斑魚酥',
    category: 'ambient',
    temp: 'ambient',
    price: 180,
    originalPrice: 220,
    spec: '150g / 罐',
    img: 'crispy-giantg-grouper.jpg',
    desc: '金黃酥脆的古法炒焙，保留石斑魚純粹鮮香，配飯下酒的追劇必備伴手禮。',
    tags: ['古法炒焙', '下飯良伴', '香脆爽口'],
    rating: 4.9,
    reviewCount: 51,
    reviews: [
      {
        id: 'rev-a2-1',
        productId: 'a2',
        authorName: '廖冠廷',
        authorCity: '彰化縣員林市',
        rating: 5,
        date: '2026/04/09',
        comment: '酥酥脆脆很香，配白飯或夾土司都超美味，越吃越涮嘴，一次買了六罐送親戚！',
        verifiedPurchase: true,
        likes: 13,
        tags: ['酥脆噴香', '送禮體面']
      }
    ]
  }
];

// 8 項漁村體驗小旅行
export const tours: TourItem[] = [
  {
    id: 't1',
    name: '餵食龍膽石斑魚 + 導覽',
    price: 300,
    minPeople: 6,
    duration: '約 60 分鐘',
    img: 'feeding-giant-grouper.jpg',
    desc: '零距離觀賞巨型龍膽石斑翻騰躍起搶食的震撼水花，專人解說枋寮養殖智慧與生態池運作。',
    features: ['近距離震撼投餵', '專業養殖生態解說', '親子教育最夯']
  },
  {
    id: 't2',
    name: '製作午仔魚一夜干',
    price: 450,
    minPeople: 6,
    duration: '約 90 分鐘',
    img: 'making-dried-flounder.jpg',
    desc: '學習職人三去刀工、黃金比例鹽滷浸漬與海風吊掛手法，成品可真空打包帶回家！',
    features: ['職人刀工教學', '真空包裝外帶', '鮮甜海味伴手禮']
  },
  {
    id: 't3',
    name: '手作龍膽石斑魚丸',
    price: 350,
    minPeople: 6,
    duration: '約 60 分鐘',
    img: 'squeezing-out-fish-balls.jpg',
    desc: '使用純龍膽石斑打漿，親手以虎口擠出 Q 彈爆汁的美味魚丸，現煮現吃滋味無窮。',
    features: ['純石斑純漿手作', '現場現煮熱騰現吃', '零添加無防腐劑']
  },
  {
    id: 't4',
    name: '砢堀摸魚 / 龍的船人',
    price: 500,
    minPeople: 20,
    duration: '約 120 分鐘',
    img: 'slacking-off.jpg',
    desc: '穿青蛙裝下池感受傳統「砢堀」捕撈智慧，親身體驗與魚群共舞的水中拔河與收成喜悅。',
    features: ['青蛙裝池底涉水', '傳統砢堀拉網捕魚', '團體破冰凝聚首選']
  },
  {
    id: 't5',
    name: '手編漁網工藝水壺袋',
    price: 300,
    minPeople: 6,
    duration: '約 60 分鐘',
    img: 'fishing-net-making.jpg',
    desc: '跟著老漁夫梭子穿引，編織屬於自己的復古環保網袋，體悟一針一線的堅韌與漁人智慧。',
    features: ['老漁民傳統工藝', '環保隨身手作帶回', '文青療癒慢活體驗']
  },
  {
    id: 't6',
    name: '海灘沙窯 / 鹹鴨蛋體驗',
    price: 350,
    minPeople: 6,
    duration: '約 90 分鐘',
    img: 'shayao.jpg',
    desc: '在天然沙灘悶烤古早味鮮魚與番薯，體驗紅土鹹鴨蛋古法醃漬工藝，回味童年野趣。',
    features: ['沙灘柴火慢火悶烤', '紅土古法醃製鹹蛋', '枋寮夕陽海風野餐']
  },
  {
    id: 't7',
    name: '浸水營古道生態探幽',
    price: 300,
    minPeople: 6,
    duration: '約 120 分鐘',
    img: 'ancient-trail.jpg',
    desc: '台灣歷史最悠久的越嶺古道，隨在地文史導覽踏尋原民歷史、大漢山水源與珍稀林相。',
    features: ['百年越嶺人文史蹟', '大漢山林相芬多精', '在地文史耆老帶路']
  },
  {
    id: 't8',
    name: '地利古厝百年風華',
    price: 300,
    minPeople: 6,
    duration: '約 60 分鐘',
    img: 'historic-house.jpg',
    desc: '漫步紅磚閩南合院，聆聽番仔崙開拓史與宗族聚落的古老故事，感受沉靜歲月之美。',
    features: ['百年紅磚閩南合院', '番仔崙拓荒歲月解說', '老宅光影漫遊拍照']
  }
];

// 3 種在地海鮮風味餐
export const diningOptions: DiningItem[] = [
  {
    id: 'd1',
    name: '海鮮龍膽石斑湯飯',
    price: 350,
    unit: '/ 人',
    img: 'soup-with-rice.jpg',
    tag: '招牌首選',
    desc: '高湯以大量龍膽魚骨與昆布慢火煨燉4小時，搭配厚切石斑肉塊、鮮甜大蝦、蛤蜊與手工魚丸，米飯吸飽海洋精華！',
    highlights: ['4小時老母魚骨白湯', '鮮甜現燙厚切石斑', '現抓大蝦與純肉魚丸']
  },
  {
    id: 'd2',
    name: '在地海鮮風味合菜',
    price: 5500,
    unit: '/ 桌 (10人份)',
    img: 'seafood-flavored-meal.jpg',
    tag: '團體推薦',
    desc: '十道經典討海人手路菜：清蒸龍膽下巴、樹子蒸龍虎斑、香酥魚丸拼盤、澎湃魚骨鮮筍鍋、當季櫻花蝦米糕等，宴席級盛宴。',
    highlights: ['十道產地直出大菜', '整尾龍虎斑與龍膽下巴', '需提前一週預約']
  },
  {
    id: 'd3',
    name: '精緻海洋個人套餐',
    price: 760,
    unit: '/ 人',
    img: 'exquisite-ocean-individual-set.jpg',
    tag: '主廚特製',
    desc: '包含香煎嫩滑午仔魚排、龍膽魚片溫沙拉、膠原蛋白養生燉湯、當令野蔬與招牌魚鬆飯，兼具優雅質感與營養健康。',
    highlights: ['香煎午仔魚排雙拼', '魚鱗膠原胜肽燉盅', '精緻在地時蔬魚鬆飯']
  }
];
