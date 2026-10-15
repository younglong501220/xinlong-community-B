# 屏東枋寮新龍社區 | 新三漁產業展售中心

> 龍膽石斑魚的故鄉 · 全魚利用循環經濟 · 金牌農村楷模官方品牌暨線上商城

本專案採用 **React 19 + TypeScript + Vite + Tailwind CSS** 建置，具備完整 RWD 響應式排版、雙溫層運費計算購物車（冷凍滿 $5,000 免運 / 常溫滿 $3,500 免運）、購物車智慧關聯加購推薦（買石斑推薦伴手禮湯底）、全功能會員積分系統（消費每百元回饋 5 點 / 1點折1元現金）、顧客心得評論系統（發表贈 20 點）搭配 **Recharts 互動式評價星等分布長條圖**、漁村體驗小旅行成團門檻即時試算機、在地海鮮風味餐訂席預約與土地銀行一鍵複製匯款帳號等功能。

---

## 📁 32 張圖片檔案放置位置說明（傳到 GitHub 部屬發布）

為了讓專案能直接推送到 GitHub 並透過 **GitHub Pages** 或其他平台（如 Vercel、Netlify、Cloud Run）自動打包發布，請將您手上的 **32 個圖檔直接放入 `public/` 資料夾**：

```text
/ (專案根目錄)
├── public/                 <--- ⭐️ 請將 32 張圖檔放置於此資料夾！
│   ├── logo2.jpg
│   ├── giant-grouper-photo.png
│   ├── xinlong-community-story.jpg
│   ├── 3life_coop.jpg
│   ├── feeding-giant-grouper.jpg
│   ├── making-dried-flounder.jpg
│   ├── squeezing-out-fish-balls.jpg
│   ├── slacking-off.jpg
│   ├── fishing-net-making.jpg
│   ├── shayao.jpg
│   ├── ancient-trail.jpg
│   ├── historic-house.jpg
│   ├── soup-with-rice.jpg
│   ├── seafood-flavored-meal.jpg
│   ├── exquisite-ocean-individual-set.jpg
│   ├── giant-grouper-fillet.jpg
│   ├── dragon-tiger-grouper.jpg
│   ├── giant-grouper-pot-hot-slices.jpg
│   ├── giant-grouper-head.jpg
│   ├── one-night-dried.jpg
│   ├── threadfin-with-gills-removed.jpg
│   ├── fish-balls.jpg
│   ├── giant-grouper-congee.jpg
│   ├── collagen-jelly-drink.jpg
│   ├── facial-mask.png
│   ├── hydrating-essence-lotion.jpg
│   ├── repairing-lotion.png
│   ├── moisturizing-serum.png
│   ├── eye-cream.png
│   ├── essence-cream.png
│   ├── fish-soup.png
│   └── crispy-giantg-grouper.jpg
├── src/                    <--- React 元件與商業邏輯
├── .github/workflows/      <--- ⭐️ 內建 GitHub Actions 自動部屬腳本
│   └── deploy.yml
├── index.html
├── package.json
└── vite.config.ts          <--- 已設定 base: './'，支援 GitHub Pages 子路徑
```

> 💡 **為什麼放在 `public/`？**
> 1. Vite 在執行 `npm run build` 打包時，會自動將 `public/` 內的所有 32 張圖片原封不動複製到 `dist/` 輸出目錄。
> 2. `public/` 包含在 Git 版本控制中，執行 `git add .` 時能和所有程式碼一起同步 push 到 GitHub 儲存庫。
> 3. 本專案元件已內建多路徑容錯機制，無論圖檔放在 `public/` 根目錄或 `public/images/`，網頁皆能自動解析顯示，絕無破圖！

---

## 🚀 部署至 GitHub Pages 步驟（完全自動化）

專案已為您預先配置好 `.github/workflows/deploy.yml`，部屬步驟極為簡便：

1. **上傳至 GitHub**：
   ```bash
   git init
   git add .
   git commit -m "feat: 屏東枋寮新龍社區新三漁產業展售中心完整上線"
   git branch -M main
   git remote add origin https://github.com/您的帳號/您的倉庫名稱.git
   git push -u origin main
   ```

2. **啟用 GitHub Pages**：
   - 進入您在 GitHub 上的專案儲存庫頁面。
   - 點擊上方導覽列的 **Settings**（設定）。
   - 在左側選單點選 **Pages**。
   - 在 **Build and deployment** 下方的 **Source** 下拉選單中，選擇 **GitHub Actions**。
   - GitHub Actions 就會自動觸發打包建置，約 1~2 分鐘後即可在 `https://<您的帳號>.github.io/<您的倉庫名稱>/` 看到完整正式發布的網站！

---

## 📋 32 張真實圖檔完整核對清單

| # | 圖片檔名 | 顯示區塊 / 對應項目名稱 | 格式 |
|---|---|---|---|
| 1 | `logo2.jpg` | 導覽列與頁尾 新三漁品牌 Logo | JPG |
| 2 | `giant-grouper-photo.png` | 主視覺 Hero 首頁大圖（龍膽石斑魚的故鄉） | PNG |
| 3 | `xinlong-community-story.jpg` | 新龍轉型耀漁光社區歷史故事照 | JPG |
| 4 | `3life_coop.jpg` | 三生共榮（生活、生產、生態）發展架構圖 | JPG |
| 5 | `feeding-giant-grouper.jpg` | 體驗行程 1：餵食龍膽石斑魚 + 導覽 | JPG |
| 6 | `making-dried-flounder.jpg` | 體驗行程 2：製作午仔魚一夜干 | JPG |
| 7 | `squeezing-out-fish-balls.jpg` | 體驗行程 3：手作龍膽石斑魚丸 | JPG |
| 8 | `slacking-off.jpg` | 體驗行程 4：砢堀摸魚 / 龍的船人 | JPG |
| 9 | `fishing-net-making.jpg` | 體驗行程 5：手編漁網工藝水壺袋 | JPG |
| 10 | `shayao.jpg` | 體驗行程 6：海灘沙窯 / 鹹鴨蛋體驗 | JPG |
| 11 | `ancient-trail.jpg` | 體驗行程 7：浸水營古道生態探幽 | JPG |
| 12 | `historic-house.jpg` | 體驗行程 8：地利古厝百年風華 | JPG |
| 13 | `soup-with-rice.jpg` | 美食風味餐 1：海鮮龍膽石斑湯飯 | JPG |
| 14 | `seafood-flavored-meal.jpg` | 美食風味餐 2：在地海鮮風味合菜（10人桌菜） | JPG |
| 15 | `exquisite-ocean-individual-set.jpg` | 美食風味餐 3：精緻海洋個人套餐 | JPG |
| 16 | `giant-grouper-fillet.jpg` | ❄️ 冷凍商城 1：產地直送 龍膽石斑清肉 | JPG |
| 17 | `dragon-tiger-grouper.jpg` | ❄️ 冷凍商城 2：極選整尾鮮凍 龍虎斑 | JPG |
| 18 | `giant-grouper-pot-hot-slices.jpg` | ❄️ 冷凍商城 3：頂級 龍膽石斑火鍋魚片 | JPG |
| 19 | `giant-grouper-head.jpg` | ❄️ 冷凍商城 4：高膠質精燉 龍膽石斑魚頭丁 | JPG |
| 20 | `one-night-dried.jpg` | ❄️ 冷凍商城 5：海風熟成 午仔魚一夜干 | JPG |
| 21 | `threadfin-with-gills-removed.jpg` | ❄️ 冷凍商城 6：鮮度滿分 午仔魚 (三去冰鮮) | JPG |
| 22 | `fish-balls.jpg` | ❄️ 冷凍商城 7：手作純肉 龍膽石斑魚丸 | JPG |
| 23 | `giant-grouper-congee.jpg` | ❄️ 冷凍商城 8：元氣慢燉 龍膽石斑魚粥 | JPG |
| 24 | `collagen-jelly-drink.jpg` | ❄️ 冷凍商城 9：膠原蛋白凍飲 (海味精粹) | JPG |
| 25 | `facial-mask.png` | ✨ LN 美妝 1：LN 嫩白極潤魚鱗膠原蛋白面膜 | PNG |
| 26 | `hydrating-essence-lotion.jpg` | ✨ LN 美妝 2：LN 膠原蛋白高效保濕化妝精露 | JPG |
| 27 | `repairing-lotion.png` | ✨ LN 美妝 3：LN 嫩白高效保濕修護乳液 | PNG |
| 28 | `moisturizing-serum.png` | ✨ LN 美妝 4：LN 嫩白高效保濕精華液 | PNG |
| 29 | `eye-cream.png` | ✨ LN 美妝 5：LN 煥顏緊緻膠原眼霜 | PNG |
| 30 | `essence-cream.png` | ✨ LN 美妝 6：LN 全效煥顏活膚精華霜 | PNG |
| 31 | `fish-soup.png` | ☀️ 常溫伴手禮 1：漢方養生 龍膽石斑魚湯底(常溫包) | PNG |
| 32 | `crispy-giantg-grouper.jpg` | ☀️ 常溫伴手禮 2：酥脆香濃 龍膽石斑魚酥 | JPG |

---

## 🛠 本地開發與手動打包指令

```bash
# 安裝依賴
npm install

# 啟動本地開發伺服器
npm run dev

# 檢查 TypeScript 語法
npm run lint

# 打包生產發布版本（產出至 dist/ 目錄）
npm run build
```
