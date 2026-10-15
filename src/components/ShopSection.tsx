import React, { useState, useMemo } from 'react';
import { Truck, ShoppingCart, Search, Eye, Sparkles, Snowflake, Sun, Star, Award, Coins, ChevronRight, MessageSquare, Quote, Heart } from 'lucide-react';
import { Product } from '../data/communityData';
import { ImageWithFallback } from './ImageWithFallback';

interface ShopSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onOpenCart: () => void;
  onQuickView: (product: Product, tab?: 'info' | 'reviews') => void;
  cartCount: number;
  onOpenMemberModal?: () => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  products,
  onAddToCart,
  onOpenCart,
  onQuickView,
  cartCount,
  onOpenMemberModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frozen' | 'skincare' | 'ambient'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'price-asc' | 'price-desc'>('recommended');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (activeCategory !== 'all' && p.category !== activeCategory) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0; // recommended order
      });
  }, [products, activeCategory, searchQuery, sortBy]);

  // 全站精選顧客好評
  const featuredTestimonials = [
    {
      name: '林美惠',
      location: '高雄市左營區 · 銀鱗會員',
      role: '家庭料理愛好者',
      productName: '產地直送 龍膽石斑清肉',
      rating: 5,
      comment: '逢年過節一定回購新龍的石斑清肉！魚皮膠質超級厚Q，切片加薑絲清蒸，全家人吃得連湯汁都喝光，產地直送的鮮度完全騙不了人。',
      tags: ['無腥味', '膠質豐厚', '產地直達'],
    },
    {
      name: '黃國銘 主廚',
      location: '台北市大安區 · 金斑尊榮VIP',
      role: '私廚餐廳料理長',
      productName: '極選整尾鮮凍 龍虎斑',
      rating: 5,
      comment: '枋寮大漢山純淨海水養殖的魚肉纖維就是不一樣，三去真空急凍鎖水技術非常專業，退冰後肉質如同剛上岸般緊實甘甜，餐廳常客指名首選。',
      tags: ['肉質甘甜', '專業急凍', '私廚指定'],
    },
    {
      name: '張庭瑀',
      location: '台中市南屯區 · 新三漁之友',
      role: '上班族保養愛好者',
      productName: 'LN 龍之美 膠原胜肽賦活修護霜',
      rating: 5,
      comment: '本來以為魚鱗膠原蛋白會有味道，結果超級清香水潤！晚上薄塗一層隔天起床臉頰超保濕柔嫩，還能累積會員積分換冷製皂，超級划算！',
      tags: ['保濕有感', '吸收快速', '點數超好用'],
    },
  ];

  return (
    <section id="shop" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold tracking-widest text-sky-700 uppercase">Direct from Origin</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">新三漁產業展售商城</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            產地冷鏈直送真空水產，以及獲得國家專利技術的龍膽石斑魚鱗膠原蛋白「LN 龍之美」全系列。
          </p>
        </div>

        {/* Dual-Temperature Shipping Threshold Reminder Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 mb-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">產地專屬雙溫層配送說明</p>
              <p className="text-sm font-medium text-slate-800 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sky-700 font-bold inline-flex items-center gap-1">
                  <Snowflake className="w-3.5 h-3.5" /> 冷凍生鮮
                </span>
                <span>滿 <strong className="text-slate-900 font-black tabular-nums">NT$ 5,000</strong> 免運（未滿 $290）</span>
                <span className="text-slate-300">｜</span>
                <span className="text-amber-700 font-bold inline-flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5" /> 常溫/美妝
                </span>
                <span>滿 <strong className="text-slate-900 font-black tabular-nums">NT$ 3,500</strong> 免運（未滿 $180）</span>
              </p>
            </div>
          </div>
          <button
            onClick={onOpenCart}
            className="whitespace-nowrap px-4 py-2 bg-sky-50 text-sky-800 hover:bg-sky-100 text-xs font-bold rounded-xl transition-colors border border-sky-200 cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>查看購物車 ({cartCount})</span>
          </button>
        </div>

        {/* Member Loyalty Promotion Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-orange-400 rounded-2xl p-4 sm:p-5 mb-10 text-slate-950 shadow-md flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-white text-amber-700 flex items-center justify-center shrink-0 shadow-sm">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-slate-950 text-amber-300 px-2 py-0.5 rounded-full">
                  會員俱樂部
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-950">
                  消費累積新三漁積分 · 1點抵1元 · 折扣無上限！
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-900 font-medium mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>🎁 新會員享 100 點</span>
                <span>•</span>
                <span>💰 每消費 $100 回饋 5 點</span>
                <span>•</span>
                <span>✍️ 商品評價再送 20 點</span>
                <span>•</span>
                <span>🧼 可兌換專利魚鱗冷製皂與保冷袋</span>
              </p>
            </div>
          </div>

          {onOpenMemberModal && (
            <button
              onClick={onOpenMemberModal}
              className="whitespace-nowrap px-5 py-2.5 bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-transform active:scale-95 shadow-md cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <Coins className="w-4 h-4 text-amber-400" />
              <span>查看我的會員積分 / 兌換禮品</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters & Search Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              全部商品 ({products.length})
            </button>
            <button
              onClick={() => setActiveCategory('frozen')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'frozen'
                  ? 'bg-sky-800 text-white shadow-sm font-bold'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Snowflake className="w-3.5 h-3.5 text-cyan-400" />
              <span>❄️ 產地直送冷凍生鮮</span>
            </button>
            <button
              onClick={() => setActiveCategory('skincare')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'skincare'
                  ? 'bg-amber-600 text-white shadow-sm font-bold'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>✨ LN 魚鱗膠原美妝</span>
            </button>
            <button
              onClick={() => setActiveCategory('ambient')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'ambient'
                  ? 'bg-amber-800 text-white shadow-sm font-bold'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-yellow-400" />
              <span>☀️ 在地常溫伴手禮</span>
            </button>
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="搜尋商品關鍵字..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
            <select
              value={sortBy}
              aria-label="商品排序方式"
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none text-slate-700"
            >
              <option value="recommended">熱銷推薦</option>
              <option value="rating">顧客最高評分</option>
              <option value="price-asc">價格：由低到高</option>
              <option value="price-desc">價格：由高到低</option>
            </select>
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <p className="text-base font-semibold">查無符合條件的商品</p>
            <p className="text-xs text-slate-400 mt-1">請嘗試變更搜尋關鍵字或分類選項</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => {
              const isFrozen = p.temp === 'frozen';
              const reviewNum = p.reviewCount || p.reviews?.length || 0;
              const ratingScore = p.rating ? p.rating.toFixed(1) : '5.0';

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Image Area */}
                    <div className="h-52 overflow-hidden relative bg-slate-100 flex items-center justify-center p-3">
                      <ImageWithFallback
                        src={p.img}
                        alt={p.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        category={p.category}
                      />
                      {/* Temperature Badge */}
                      <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-xs ${
                        isFrozen
                          ? 'bg-sky-50 text-sky-800 border-sky-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        {isFrozen ? '❄️ 低溫冷凍' : '☀️ 常溫保存'}
                      </span>

                      {/* Quick view icon */}
                      <button
                        onClick={() => onQuickView(p, 'info')}
                        className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 text-slate-700 hover:text-sky-700 shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="快速檢視"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Info Area */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 font-medium">{p.spec}</span>
                        {/* Rating click triggers reviews tab */}
                        <button
                          type="button"
                          onClick={() => onQuickView(p, 'reviews')}
                          className="flex items-center gap-1 text-[11px] text-amber-600 font-bold hover:underline cursor-pointer"
                          title="查看顧客評價"
                        >
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{ratingScore}</span>
                          <span className="text-slate-400 font-normal">({reviewNum})</span>
                        </button>
                      </div>

                      <h3
                        onClick={() => onQuickView(p, 'info')}
                        className="font-bold text-slate-900 text-base group-hover:text-sky-700 transition-colors line-clamp-1 cursor-pointer"
                      >
                        {p.name}
                      </h3>
                      
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {p.desc}
                      </p>

                      {p.tags && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {p.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="p-4 pt-0 mt-2 flex items-center justify-between border-t border-slate-100">
                    <div>
                      {p.originalPrice && (
                        <span className="text-[11px] text-slate-400 line-through block tabular-nums">
                          NT$ {p.originalPrice}
                        </span>
                      )}
                      <span className="text-xl font-black text-sky-900 tabular-nums">
                        NT$ {p.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onQuickView(p, 'reviews')}
                        className="p-2 border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-sky-800 rounded-xl transition-colors cursor-pointer"
                        title="查看/寫評價"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onAddToCart(p)}
                        className="px-3.5 py-2 bg-sky-800 hover:bg-sky-900 text-white rounded-xl text-xs font-bold transition-transform active:scale-95 flex items-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>加入購物車</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Real Customer Reviews Showcase Grid */}
        <div className="mt-20 pt-16 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>饕客口碑真實見證</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              來自全台支持者的餐桌分享
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              新龍社區堅持全魚循環與友善養殖，每一口鮮美都是漁村與土地的承諾
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      ✓ 已購實名認證
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{t.comment}"
                  </p>

                  <div className="text-[11px] font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-lg inline-block">
                    評價商品：{t.productName}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{t.name}</span>
                    <span className="text-[11px] text-slate-400">{t.location}</span>
                  </div>
                  <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-md">
                    {t.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
