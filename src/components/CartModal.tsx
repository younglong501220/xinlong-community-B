import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Snowflake, Sun, AlertCircle, CheckCircle, ArrowRight, Coins, Award, Sparkles, Plus, ChefHat, Check } from 'lucide-react';
import { products as allProducts, Product } from '../data/communityData';
import { ImageWithFallback } from './ImageWithFallback';
import { MemberProfile } from '../types/loyalty';

export interface CartItem extends Product {
  qty: number;
}

export interface OrderDetails {
  orderId: string;
  name: string;
  phone: string;
  address: string;
  bank5: string;
  note: string;
  items: CartItem[];
  frozenSubtotal: number;
  frozenShipping: number;
  ambientSubtotal: number;
  ambientShipping: number;
  rawTotal: number;
  pointsUsed: number;
  pointsEarned: number;
  grandTotal: number;
  createdAt: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (id: string, change: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (order: OrderDetails) => void;
  member: MemberProfile;
  onOpenMemberModal?: () => void;
  onAddToCart?: (product: Product) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
  member,
  onOpenMemberModal,
  onAddToCart,
}) => {
  const [name, setName] = useState(member?.name || '');
  const [phone, setPhone] = useState(member?.phone || '');
  const [address, setAddress] = useState('');
  const [bank5, setBank5] = useState('');
  const [note, setNote] = useState('');
  const [usePoints, setUsePoints] = useState(false);
  const [customPoints, setCustomPoints] = useState(0);

  if (!isOpen) return null;

  // 雙溫層金額計算
  let frozenSubtotal = 0;
  let frozenCount = 0;
  let ambientSubtotal = 0;
  let ambientCount = 0;

  cart.forEach((item) => {
    if (item.temp === 'frozen') {
      frozenSubtotal += item.price * item.qty;
      frozenCount += item.qty;
    } else {
      ambientSubtotal += item.price * item.qty;
      ambientCount += item.qty;
    }
  });

  // 運費規則：
  // 冷凍滿 5,000 免運，否則 290 (若無冷凍品則 0)
  const frozenShipping = frozenCount === 0 || frozenSubtotal >= 5000 ? 0 : 290;
  // 常溫滿 3,500 免運，否則 180 (若無常溫品則 0)
  const ambientShipping = ambientCount === 0 || ambientSubtotal >= 3500 ? 0 : 180;
  const rawTotal = frozenSubtotal + frozenShipping + ambientSubtotal + ambientShipping;

  // 積分折抵計算 (最高折抵商品總額 50%，1 點 = NT$ 1)
  const maxRedeemablePoints = Math.min(member.points, Math.floor((frozenSubtotal + ambientSubtotal) * 0.5));
  const effectivePointsUsed = usePoints ? Math.min(maxRedeemablePoints, customPoints > 0 ? customPoints : maxRedeemablePoints) : 0;
  const grandTotal = Math.max(0, rawTotal - effectivePointsUsed);
  // 每滿 100 元回饋 5 點積分 (5% 回饋率)
  const pointsEarned = Math.floor(grandTotal * 0.05);

  // 進度條換算
  const frozenDiff = Math.max(0, 5000 - frozenSubtotal);
  const frozenPct = Math.min(100, (frozenSubtotal / 5000) * 100);

  const ambientDiff = Math.max(0, 3500 - ambientSubtotal);
  const ambientPct = Math.min(100, (ambientSubtotal / 3500) * 100);

  // 智慧加購與伴手禮推薦邏輯 (Cross-sell / Upsell recommendations)
  const cartIds = new Set(cart.map((i) => i.id));
  const hasFish = cart.some(
    (i) => i.temp === 'frozen' || i.name.includes('石斑') || i.name.includes('斑') || i.name.includes('魚')
  );
  const hasSkincare = cart.some((i) => i.category === 'skincare');
  const hasAmbient = cart.some((i) => i.category === 'ambient');

  interface RecommendedItem {
    product: Product;
    tag: string;
    reason: string;
  }

  let recommendations: RecommendedItem[] = [];

  if (hasFish) {
    // 買石斑魚/生鮮推薦搭配：漢方高湯底(調味料)、石斑魚酥(伴手禮)、純肉魚丸、膠原凍飲
    const soupProduct = allProducts.find((p) => p.id === 'a1');
    const snackProduct = allProducts.find((p) => p.id === 'a2');
    const fishBallProduct = allProducts.find((p) => p.id === 'f6');
    const jellyProduct = allProducts.find((p) => p.id === 'f8');

    if (soupProduct && !cartIds.has(soupProduct.id)) {
      recommendations.push({
        product: soupProduct,
        tag: '🍲 煮魚推薦必備高湯底',
        reason: '石斑魚骨與漢方溫補慢火精燉，煮石斑清湯/火鍋免熬高湯，甘甜倍增！',
      });
    }
    if (snackProduct && !cartIds.has(snackProduct.id)) {
      recommendations.push({
        product: snackProduct,
        tag: '🐟 枋寮人氣伴手禮',
        reason: '純石斑魚肉古法金黃炒酥，餐桌下飯配菜首選，伴手禮人手一罐！',
      });
    }
    if (fishBallProduct && !cartIds.has(fishBallProduct.id)) {
      recommendations.push({
        product: fishBallProduct,
        tag: '🥟 煮魚料理雙重鮮味',
        reason: '純石斑魚漿手工捏製，與石斑魚切片同煮，彈牙多汁雙重滿足！',
      });
    }
    if (jellyProduct && !cartIds.has(jellyProduct.id)) {
      recommendations.push({
        product: jellyProduct,
        tag: '🥤 解膩美顏天然飲',
        reason: '純天然石斑魚鱗膠原熬煮，清甜低卡，大啖海鮮後的天然解膩良品。',
      });
    }
  } else if (hasSkincare) {
    // 買美妝保養推薦：膠原胜肽面膜、口服魚鱗凍飲、微分子修護乳液
    const maskProduct = allProducts.find((p) => p.id === 's2');
    const jellyProduct = allProducts.find((p) => p.id === 'f8');
    const lotionProduct = allProducts.find((p) => p.id === 's1');
    const snackProduct = allProducts.find((p) => p.id === 'a2');

    if (maskProduct && !cartIds.has(maskProduct.id)) {
      recommendations.push({
        product: maskProduct,
        tag: '💎 密集水光修護面膜',
        reason: '每片滿載 25ml 魚鱗胜肽精華，搭配保養使用，修護吸收事半功倍！',
      });
    }
    if (jellyProduct && !cartIds.has(jellyProduct.id)) {
      recommendations.push({
        product: jellyProduct,
        tag: '✨ 體內體外雙重胜肽',
        reason: '外擦膠原胜肽，口服純天然魚鱗凍飲，由內而外散發澎潤水光好氣色。',
      });
    }
    if (lotionProduct && !cartIds.has(lotionProduct.id)) {
      recommendations.push({
        product: lotionProduct,
        tag: '💧 柔嫩長效鎖水',
        reason: '微分子胜肽迅速滲透，舒緩乾荒，形成長效隱形保水屏障。',
      });
    }
    if (snackProduct && !cartIds.has(snackProduct.id)) {
      recommendations.push({
        product: snackProduct,
        tag: '🎁 伴手禮加購',
        reason: '枋寮在地純魚肉烘焙，無防腐劑的低負擔美味點心。',
      });
    }
  } else if (hasAmbient) {
    // 買伴手禮推薦加購：產地直送龍膽石斑清肉或一夜干
    const filletProduct = allProducts.find((p) => p.id === 'f1');
    const soupProduct = allProducts.find((p) => p.id === 'a1');
    const driedProduct = allProducts.find((p) => p.id === 'f3');

    if (filletProduct && !cartIds.has(filletProduct.id)) {
      recommendations.push({
        product: filletProduct,
        tag: '👑 產地招牌熱銷 No.1',
        reason: '去刺厚切龍膽清肉，肉質Q彈膠質豐厚，金牌產地急凍直送！',
      });
    }
    if (soupProduct && !cartIds.has(soupProduct.id)) {
      recommendations.push({
        product: soupProduct,
        tag: '🍲 漢方精燉湯底',
        reason: '常溫好攜帶，加水滾開即可開鍋，露營聚餐省時美味。',
      });
    }
    if (driedProduct && !cartIds.has(driedProduct.id)) {
      recommendations.push({
        product: driedProduct,
        tag: '🍶 居酒屋頂級鮮味',
        reason: '枋寮大漢山純淨海水養殖午仔魚，油脂豐厚細嫩香氣十足。',
      });
    }
  } else {
    // 預設精選推薦
    const soupProduct = allProducts.find((p) => p.id === 'a1');
    const snackProduct = allProducts.find((p) => p.id === 'a2');
    const filletProduct = allProducts.find((p) => p.id === 'f1');
    [soupProduct, snackProduct, filletProduct].forEach((p) => {
      if (p && !cartIds.has(p.id)) {
        recommendations.push({
          product: p,
          tag: '🔥 產地熱銷加購推薦',
          reason: '新龍社區明星特產，顧客滿意度 98% 以上！',
        });
      }
    });
  }

  // 取前 3 項推薦
  recommendations = recommendations.slice(0, 3);

  const handleAddRecommended = (prod: Product) => {
    if (onAddToCart) {
      onAddToCart(prod);
    } else {
      onUpdateQty(prod.id, 1);
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder: OrderDetails = {
      orderId: 'XL-' + Math.floor(100000 + Math.random() * 900000),
      name,
      phone,
      address,
      bank5,
      note,
      items: [...cart],
      frozenSubtotal,
      frozenShipping,
      ambientSubtotal,
      ambientShipping,
      rawTotal,
      pointsUsed: effectivePointsUsed,
      pointsEarned,
      grandTotal,
      createdAt: new Date().toLocaleString('zh-TW'),
    };

    onOrderSuccess(newOrder);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all border border-slate-100 p-6 sm:p-8 my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-sky-800" />
            <h3 className="text-xl font-bold text-slate-900">新三漁購物車結帳</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-6 py-4">
          
          {/* Dual-Temperature Free Shipping Progress Bars */}
          <div className="p-4 bg-slate-50 rounded-xl space-y-3.5 border border-slate-200">
            {/* Frozen Progress */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-sky-900 flex items-center gap-1">
                  <Snowflake className="w-3.5 h-3.5 text-sky-600" />
                  <span>❄️ 冷凍生鮮 (滿 NT$ 5,000 免運)</span>
                </span>
                <span className={`text-xs font-bold ${frozenSubtotal >= 5000 ? 'text-emerald-700' : 'text-slate-600'}`}>
                  {frozenSubtotal >= 5000 ? '🎉 已達低溫免運門檻！' : `還差 NT$ ${frozenDiff.toLocaleString()}`}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-sky-600 h-full transition-all duration-300"
                  style={{ width: `${frozenPct}%` }}
                />
              </div>
            </div>

            {/* Ambient Progress */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-900 flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  <span>☀️ 常溫/美妝 (滿 NT$ 3,500 免運)</span>
                </span>
                <span className={`text-xs font-bold ${ambientSubtotal >= 3500 ? 'text-emerald-700' : 'text-slate-600'}`}>
                  {ambientSubtotal >= 3500 ? '🎉 已達常溫免運門檻！' : `還差 NT$ ${ambientDiff.toLocaleString()}`}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{ width: `${ambientPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          {cart.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium">您的購物車目前是空的</p>
              <p className="text-xs text-slate-400 mt-1">快去展售商城挑選屏東枋寮極鮮水產吧！</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {cart.map((item) => {
                const isFrozen = item.temp === 'frozen';
                return (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                        <ImageWithFallback
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          category={item.category}
                        />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                            isFrozen ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {isFrozen ? '冷凍' : '常溫'}
                          </span>
                          <span className="text-xs text-slate-500 tabular-nums">NT$ {item.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="px-2 py-1 text-xs text-slate-600 hover:bg-slate-200 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-bold text-slate-800 bg-white tabular-nums">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="px-2 py-1 text-xs text-slate-600 hover:bg-slate-200 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-bold text-slate-900 w-20 text-right tabular-nums">
                        NT$ {(item.price * item.qty).toLocaleString()}
                      </span>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                        title="移除商品"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Smart Cross-Sell & Pairing Add-on Recommendations */}
          {recommendations.length > 0 && (
            <div className="bg-gradient-to-r from-sky-50/90 via-indigo-50/40 to-slate-50 border border-sky-200/90 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-sky-700 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    <ChefHat className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span>主廚搭配好物推薦 · 加購特惠伴手禮</span>
                      <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full">
                        智能搭配
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      {hasFish
                        ? '🔥 購買石斑魚/鮮魚，推薦搭配慢熬漢方高湯底與古法魚酥，料理更省時鮮甜！'
                        : hasSkincare
                        ? '✨ 選購美妝保養，推薦搭配水光胜肽面膜與膠原凍飲，由內而外雙效水潤！'
                        : '🎁 屏東枋寮在地人氣特產伴手禮，一次帶走產地純粹鮮美！'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendation cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {recommendations.map(({ product, tag, reason }) => {
                  const isRecFrozen = product.temp === 'frozen';
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl p-3 border border-slate-200/90 hover:border-sky-300 transition-all flex flex-col justify-between shadow-2xs group"
                    >
                      <div>
                        <div className="flex items-start gap-2.5 mb-2">
                          <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0 relative">
                            <ImageWithFallback
                              src={product.img}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              category={product.category}
                            />
                            <span className={`absolute bottom-0 inset-x-0 text-[8px] text-center font-bold text-white py-0.2 ${
                              isRecFrozen ? 'bg-sky-700' : 'bg-amber-600'
                            }`}>
                              {isRecFrozen ? '冷凍' : '常溫'}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-bold text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded block truncate">
                              {tag}
                            </span>
                            <h5 className="text-xs font-bold text-slate-900 truncate mt-0.5" title={product.name}>
                              {product.name}
                            </h5>
                            <span className="text-[10px] text-slate-400 block">{product.spec}</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight mb-2">
                          {reason}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          {product.originalPrice && (
                            <span className="text-[10px] text-slate-400 line-through block tabular-nums">
                              NT$ {product.originalPrice}
                            </span>
                          )}
                          <span className="text-sm font-black text-sky-950 tabular-nums">
                            NT$ {product.price}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddRecommended(product)}
                          className="px-2.5 py-1.5 bg-sky-800 hover:bg-sky-900 text-white rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center gap-1 cursor-pointer shadow-2xs"
                          title="加入購物車"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>一鍵加購</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Loyalty Points Redemption Box */}
          {cart.length > 0 && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-1.5">
                      <span>新三漁會員積分折抵</span>
                      <span className="text-[10px] bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full font-bold">1點抵NT$ 1</span>
                    </h5>
                    <p className="text-[11px] text-amber-800">
                      目前可用點數：<strong className="text-slate-950 font-black">{member.points}</strong> 點（最多可折抵 NT$ {maxRedeemablePoints}）
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={usePoints}
                    disabled={member.points === 0}
                    onChange={(e) => {
                      setUsePoints(e.target.checked);
                      if (e.target.checked && customPoints === 0) {
                        setCustomPoints(maxRedeemablePoints);
                      }
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              {usePoints && (
                <div className="pt-2 border-t border-amber-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-xs font-semibold text-amber-900 shrink-0">折抵點數：</span>
                    <input
                      type="number"
                      min={1}
                      max={maxRedeemablePoints}
                      value={effectivePointsUsed}
                      onChange={(e) => setCustomPoints(Math.min(maxRedeemablePoints, Math.max(0, parseInt(e.target.value, 10) || 0)))}
                      className="w-24 px-2.5 py-1 text-xs font-bold border border-amber-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => setCustomPoints(maxRedeemablePoints)}
                      className="text-[11px] text-amber-800 underline font-semibold cursor-pointer hover:text-amber-950"
                    >
                      使用最高折抵 ({maxRedeemablePoints}點)
                    </button>
                  </div>
                  <div className="text-xs font-bold text-amber-900 text-right w-full sm:w-auto">
                    現折 <span className="text-sm font-black text-rose-600">- NT$ {effectivePointsUsed}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pricing breakdown */}
          {cart.length > 0 && (
            <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>冷凍商品小計 ({frozenCount} 件)：</span>
                <span className="tabular-nums font-semibold">NT$ {frozenSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>冷凍低溫運費：</span>
                <span className="tabular-nums font-semibold">
                  {frozenCount === 0 ? 'NT$ 0' : (frozenShipping === 0 ? '免運費 (NT$ 0)' : `NT$ ${frozenShipping}`)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-200">
                <span>常溫/保養小計 ({ambientCount} 件)：</span>
                <span className="tabular-nums font-semibold">NT$ {ambientSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>常溫運費：</span>
                <span className="tabular-nums font-semibold">
                  {ambientCount === 0 ? 'NT$ 0' : (ambientShipping === 0 ? '免運費 (NT$ 0)' : `NT$ ${ambientShipping}`)}
                </span>
              </div>

              {effectivePointsUsed > 0 && (
                <div className="flex justify-between text-rose-600 font-semibold pt-1 border-t border-slate-200">
                  <span className="flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5" />
                    <span>會員積分折抵（扣除 {effectivePointsUsed} 點）：</span>
                  </span>
                  <span className="tabular-nums font-bold">- NT$ {effectivePointsUsed.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-3 border-t-2 border-slate-300">
                <div>
                  <span>訂單總應付金額：</span>
                  <div className="text-[11px] font-normal text-emerald-700 flex items-center gap-1 mt-0.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>下單完成將賺取 +{pointsEarned} 點會員回饋積分</span>
                  </div>
                </div>
                <div className="text-right">
                  {effectivePointsUsed > 0 && (
                    <span className="text-xs text-slate-400 line-through block tabular-nums">
                      NT$ {rawTotal.toLocaleString()}
                    </span>
                  )}
                  <span className="text-sky-900 text-xl font-black tabular-nums">
                    NT$ {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Checkout Form */}
          {cart.length > 0 && (
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-3.5 pt-2">
              <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                收件與匯款核對資料
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="收件人真實姓名 *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="收件人行動電話 *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <input
                type="text"
                required
                placeholder="完整收件地址（含縣市區街巷門牌） *"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  maxLength={5}
                  placeholder="匯款帳號末 5 碼（對帳用） *"
                  value={bank5}
                  onChange={(e) => setBank5(e.target.value)}
                  className="border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono"
                />
                <input
                  type="text"
                  placeholder="備註需求（如指定到貨時段等）"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="text-xs text-amber-900 bg-amber-50 p-3 rounded-xl border border-amber-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  本展售中心由新龍社區產銷班直營。下單後請於 24 小時內匯款至協會專戶（土地銀行 005 - 帳號 115001018899），核帳後立即安排冷鏈急凍發貨。
                </span>
              </div>

              <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-semibold hover:bg-slate-100 text-sm cursor-pointer"
                >
                  繼續選購
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-sky-800 hover:bg-sky-900 text-white font-bold text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>確認送出訂單 (NT$ {grandTotal.toLocaleString()})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
