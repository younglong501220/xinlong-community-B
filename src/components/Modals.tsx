import React, { useState } from 'react';
import { X, Calendar, Users, Phone, User, CheckCircle, Clock, ShoppingCart, Landmark, AlertCircle, Copy, Check, Star, ThumbsUp, Award, Coins, Sparkles, MessageSquarePlus, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { TourItem, DiningItem, Product } from '../data/communityData';
import { ProductReview, MemberProfile } from '../types/loyalty';
import { OrderDetails } from './CartModal';
import { ImageWithFallback } from './ImageWithFallback';

// ----------------------------------------------------
// 1. 漁村體驗預約 Modal
// ----------------------------------------------------
interface TourBookingModalProps {
  tour: TourItem | null;
  headcount: number;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { tourName: string; headcount: number; date: string; name: string; phone: string; note: string }) => void;
}

export const TourBookingModal: React.FC<TourBookingModalProps> = ({
  tour,
  headcount: initialHeadcount,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [headcount, setHeadcount] = useState(initialHeadcount);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  if (!isOpen || !tour) return null;

  const totalPrice = tour.price * headcount;
  const meetsMin = headcount >= tour.minPeople;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      tourName: tour.name,
      headcount,
      date,
      name,
      phone,
      note,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 relative border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          aria-label="關閉"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">體驗小旅行預約</span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">{tour.name}</h3>
          <p className="text-xs text-slate-500 mt-1">{tour.desc}</p>
        </div>

        <div className="bg-sky-50 p-3.5 rounded-xl border border-sky-100 mb-4 text-xs text-slate-700 flex justify-between items-center">
          <div>
            <span className="text-slate-500 block">單人費用</span>
            <span className="text-base font-black text-sky-900">NT$ {tour.price}</span>
          </div>
          <div>
            <span className="text-slate-500 block">成團門檻</span>
            <span className="font-bold text-slate-800">{tour.minPeople} 人以上</span>
          </div>
          <div>
            <span className="text-slate-500 block">預估總額</span>
            <span className="text-base font-black text-amber-700">NT$ {totalPrice.toLocaleString()}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">參加人數 *</label>
              <input
                type="number"
                min="1"
                required
                value={headcount}
                onChange={(e) => setHeadcount(parseInt(e.target.value, 10) || 1)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">預計體驗日期 *</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          {!meetsMin && (
            <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
              ⚠️ 本體驗成團門檻為 {tour.minPeople} 人，您填寫的 {headcount} 人若未達標，我們可為您安排散客併團梯次！
            </p>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">主要聯絡人姓名 *</label>
            <input
              type="text"
              required
              placeholder="請輸入姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">聯絡行動電話 *</label>
            <input
              type="tel"
              required
              placeholder="例：0912-345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">其他需求備註</label>
            <textarea
              rows={2}
              placeholder="例：有行動不便長輩、需代訂遊覽車停車位等..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-100"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-sky-800 hover:bg-sky-900 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
            >
              確認送出體驗預約
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 2. 風味餐預約 Modal
// ----------------------------------------------------
interface DiningBookingModalProps {
  dining: DiningItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { diningName: string; quantity: number; date: string; timeSlot: string; name: string; phone: string; note: string }) => void;
}

export const DiningBookingModal: React.FC<DiningBookingModalProps> = ({
  dining,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('中午 11:30 - 13:00');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  if (!isOpen || !dining) return null;

  const total = dining.price * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      diningName: dining.name,
      quantity,
      date,
      timeSlot,
      name,
      phone,
      note,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 relative border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          aria-label="關閉"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">產地海鮮風味餐訂席</span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">{dining.name}</h3>
          <p className="text-xs text-slate-500 mt-1">{dining.desc}</p>
        </div>

        <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 mb-4 text-xs text-slate-700 flex justify-between items-center">
          <div>
            <span className="text-slate-500 block">單價</span>
            <span className="text-base font-black text-amber-900">NT$ {dining.price.toLocaleString()} {dining.unit}</span>
          </div>
          <div>
            <span className="text-slate-500 block">訂購數量</span>
            <span className="font-bold text-slate-800">{quantity} 份/桌</span>
          </div>
          <div>
            <span className="text-slate-500 block">預估餐費總額</span>
            <span className="text-base font-black text-sky-900">NT$ {total.toLocaleString()}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                預訂數量 ({dining.unit}) *
              </label>
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">用餐時段 *</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="中午 11:30 - 13:00">午餐 (11:30 - 13:00)</option>
                <option value="中午 12:30 - 14:00">午餐 (12:30 - 14:00)</option>
                <option value="晚餐 17:00 - 18:30">晚餐 (17:00 - 18:30)</option>
                <option value="晚餐 18:30 - 20:00">晚餐 (18:30 - 20:00)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">預計用餐日期 *</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">聯絡人姓名 *</label>
              <input
                type="text"
                required
                placeholder="姓名"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">聯絡電話 *</label>
              <input
                type="tel"
                required
                placeholder="手機號碼"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">飲食偏好 / 備註</label>
            <textarea
              rows={2}
              placeholder="例：是否有不吃甲殼海鮮或不吃辣需求..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-100"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold shadow-md cursor-pointer"
            >
              確認送出餐席預約
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 3. 商品快速檢視與顧客評論 Modal
// ----------------------------------------------------
interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onAddReview: (productId: string, review: Omit<ProductReview, 'id' | 'date' | 'likes'>) => void;
  member: MemberProfile;
  initialTab?: 'info' | 'reviews';
  onOpenMemberModal?: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onAddReview,
  member,
  initialTab = 'info',
  onOpenMemberModal,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'reviews'>(initialTab);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [authorName, setAuthorName] = useState(member?.name || '');
  const [authorCity, setAuthorCity] = useState('');
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [likedUserMap, setLikedUserMap] = useState<Record<string, boolean>>({});

  // Reset tab when product changes or opens
  React.useEffect(() => {
    setActiveTab(initialTab);
    setShowReviewForm(false);
    if (member?.name) setAuthorName(member.name);
  }, [product?.id, initialTab, isOpen, member?.name]);

  if (!isOpen || !product) return null;

  const isFrozen = product.temp === 'frozen';
  const reviews = product.reviews || [];

  // 標籤建議清單
  const suggestedTags = product.category === 'frozen'
    ? ['肉質彈牙', '無土腥味', '長輩最愛', '清蒸鮮甜', '回購多次', '急凍鎖鮮']
    : product.category === 'skincare'
    ? ['保濕不油膩', '吸收超快', '修護很有感', '天然無香精', '送禮體面']
    : ['口感Q彈', '大人小孩都愛', '真材實料', '枋寮特色伴手禮'];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleLikeReview = (reviewId: string, currentLikes: number) => {
    if (likedUserMap[reviewId]) return;
    setLikesMap((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] ?? currentLikes) + 1,
    }));
    setLikedUserMap((prev) => ({ ...prev, [reviewId]: true }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onAddReview(product.id, {
      productId: product.id,
      authorName: authorName.trim() || '新三漁顧客',
      authorCity: authorCity.trim() || '台灣在地',
      rating,
      comment: comment.trim(),
      verifiedPurchase: true,
      tags: selectedTags.length > 0 ? selectedTags : ['產地支持'],
    });

    setComment('');
    setSelectedTags([]);
    setShowReviewForm(false);
  };

  const ratingDescMap: Record<number, string> = {
    5: '非常滿意！產地直送，極致鮮甜',
    4: '滿意！包裝嚴實，品質優良',
    3: '符合預期，料理方便',
    2: '尚可接受，希望能再改善',
    1: '不符合期待',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 text-left">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 sm:p-7 relative border border-slate-100 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer z-10"
          aria-label="關閉"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 pr-10 shrink-0">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'info'
                ? 'bg-sky-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            商品詳情與規格
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'bg-sky-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>顧客真實評價 ({product.reviewCount || reviews.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 py-4 pr-1">
          {activeTab === 'info' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="h-64 sm:h-72 rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center p-4 relative border border-slate-200/80">
                <ImageWithFallback
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  category={product.category}
                />
                <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full border shadow-xs ${
                  isFrozen ? 'bg-sky-50 text-sky-800 border-sky-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  {isFrozen ? '❄️ 低溫冷凍配送' : '☀️ 常溫保存配送'}
                </span>

                <button
                  onClick={() => setActiveTab('reviews')}
                  className="absolute bottom-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-xs rounded-full border border-slate-200 text-xs font-bold text-slate-800 hover:text-sky-800 shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating?.toFixed(1) || '5.0'} ★ ({product.reviewCount || reviews.length} 則評價)</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">{product.spec}</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">{product.name}</h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-black text-sky-900 tabular-nums">NT$ {product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through tabular-nums">NT$ {product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.desc}
                </p>

                {/* Member loyalty earning hint */}
                <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>購買本品累積 <strong className="font-bold">+{Math.floor(product.price * 0.05)} 點</strong> 會員回饋</span>
                  </div>
                  {onOpenMemberModal && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenMemberModal();
                      }}
                      className="text-amber-800 underline font-bold cursor-pointer text-[11px]"
                    >
                      會員俱樂部
                    </button>
                  )}
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div><strong>保存方式：</strong>{isFrozen ? '-18°C 以下急凍真空保存 12 個月' : '常溫陰涼乾燥處保存 18 個月'}</div>
                  <div><strong>產地證明：</strong>屏東縣枋寮鄉新龍社區產銷班 · 國產冷鏈直銷</div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="flex-1 py-3 bg-sky-800 hover:bg-sky-900 text-white rounded-xl text-sm font-bold shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>加入購物車 (NT$ {product.price})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className="px-4 py-3 border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-sky-800 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <MessageSquarePlus className="w-4 h-4" />
                    <span className="hidden sm:inline">查看/寫評論</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Tab 2: Reviews & Feedback Form with Recharts Rating Distribution */
            <div className="space-y-6">
              {/* Rating Summary & Recharts Bar Chart Dashboard */}
              {(() => {
                const totalReviewsCount = product.reviewCount || reviews.length || 1;
                const starCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
                reviews.forEach((r) => {
                  const s = Math.min(5, Math.max(1, Math.round(r.rating || 5)));
                  starCounts[s] = (starCounts[s] || 0) + 1;
                });

                const listCount = reviews.length;
                const distributionData = [
                  { star: 5, label: '5 ★', color: '#f59e0b' },
                  { star: 4, label: '4 ★', color: '#fbbf24' },
                  { star: 3, label: '3 ★', color: '#fcd34d' },
                  { star: 2, label: '2 ★', color: '#94a3b8' },
                  { star: 1, label: '1 ★', color: '#cbd5e1' },
                ].map((item) => {
                  let count = starCounts[item.star] || 0;
                  if (listCount > 0 && totalReviewsCount > listCount) {
                    const ratio = totalReviewsCount / listCount;
                    count = Math.max(count, Math.round(count * ratio));
                  } else if (listCount === 0) {
                    if (item.star === 5) count = Math.round(totalReviewsCount * 0.82);
                    else if (item.star === 4) count = Math.round(totalReviewsCount * 0.14);
                    else if (item.star === 3) count = Math.round(totalReviewsCount * 0.04);
                    else count = 0;
                  }
                  const percent = Math.min(100, Math.round((count / totalReviewsCount) * 100));
                  return {
                    ...item,
                    count,
                    percent,
                  };
                });

                return (
                  <div className="bg-gradient-to-br from-sky-50/70 via-slate-50 to-amber-50/70 p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                      
                      {/* Left: Score & Star overview */}
                      <div className="lg:col-span-4 text-center lg:text-left flex flex-col justify-center space-y-2 border-b lg:border-b-0 lg:border-r border-slate-200 pb-4 lg:pb-0 lg:pr-4">
                        <div className="flex items-baseline justify-center lg:justify-start gap-2">
                          <span className="text-4xl sm:text-5xl font-black text-slate-900 tabular-nums">
                            {product.rating?.toFixed(1) || '5.0'}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">/ 5.0 滿分</span>
                        </div>
                        
                        <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= Math.round(product.rating || 5)
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>

                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-slate-800 block">
                            共 {totalReviewsCount} 位饕客真實購買評價
                          </span>
                          <span className="text-[11px] text-emerald-700 font-semibold block">
                            ✓ 98% 顧客極力推薦回購
                          </span>
                        </div>

                        <button
                          onClick={() => setShowReviewForm(!showReviewForm)}
                          className="mt-2 w-full px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <MessageSquarePlus className="w-4 h-4" />
                          <span>{showReviewForm ? '取消填寫' : '我要發表評論（送 20 點）'}</span>
                        </button>
                      </div>

                      {/* Right: Recharts Rating Distribution Bar Chart */}
                      <div className="lg:col-span-8 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <BarChart3 className="w-4 h-4 text-amber-600" />
                            <span>評分星等分布長條圖</span>
                          </span>
                          <span className="text-[11px] text-slate-500">
                            依據實名顧客評價即時統計
                          </span>
                        </div>

                        {/* Recharts Horizontal Bar Chart */}
                        <div className="h-36 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              layout="vertical"
                              data={distributionData}
                              margin={{ top: 2, right: 45, left: -10, bottom: 2 }}
                            >
                              <XAxis type="number" hide domain={[0, 'dataMax + 2']} />
                              <YAxis
                                type="category"
                                dataKey="label"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#334155', fontWeight: 700 }}
                                width={38}
                              />
                              <Tooltip
                                cursor={{ fill: 'rgba(226, 232, 240, 0.4)' }}
                                formatter={(val: any) => [`${val} 則 (${Math.round((Number(val) / totalReviewsCount) * 100)}%)`, '評論數']}
                                labelFormatter={(label: any) => `${label} 星等評鑑`}
                                contentStyle={{
                                  backgroundColor: '#0f172a',
                                  border: 'none',
                                  borderRadius: '8px',
                                  color: '#fff',
                                  fontSize: '11px',
                                  padding: '4px 8px',
                                }}
                              />
                              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={12}>
                                {distributionData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Textual percentage breakdown below chart */}
                        <div className="grid grid-cols-5 gap-1 pt-1 border-t border-slate-200/80 text-center">
                          {distributionData.map((d) => (
                            <div key={d.star} className="text-[10px] text-slate-500">
                              <span className="font-bold text-slate-800">{d.label}</span>
                              <span className="block text-slate-400 tabular-nums">{d.percent}% ({d.count})</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })()}

              {/* Review Form Drawer / Box */}
              {showReviewForm && (
                <form
                  onSubmit={handleSubmitReview}
                  className="p-5 rounded-2xl bg-amber-50/60 border border-amber-300 space-y-4 animate-fadeIn"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                    <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>發表商品心得評價</span>
                    </div>
                    <span className="text-[11px] bg-amber-200/90 text-amber-900 px-2.5 py-0.5 rounded-full font-bold">
                      獎勵：送 +20 會員積分
                    </span>
                  </div>

                  {/* Star Rating Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">商品評分 *</label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            className="p-1 text-amber-400 hover:scale-125 transition-transform cursor-pointer"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-amber-900 bg-white px-3 py-1 rounded-lg border border-amber-200">
                        {rating} 顆星 · {ratingDescMap[rating]}
                      </span>
                    </div>
                  </div>

                  {/* Name and City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">您的姓名或稱呼 *</label>
                      <input
                        type="text"
                        required
                        placeholder="例：陳小姐"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full border border-slate-300 bg-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">所在縣市區 (選填)</label>
                      <input
                        type="text"
                        placeholder="例：高雄市鼓山區 / 台北大安"
                        value={authorCity}
                        onChange={(e) => setAuthorCity(e.target.value)}
                        className="w-full border border-slate-300 bg-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Tag quick selection */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">快速心得標籤（點擊選取）：</label>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestedTags.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                          <button
                            type="button"
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer border ${
                              isSelected
                                ? 'bg-amber-500 border-amber-600 text-slate-950 font-bold'
                                : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            #{tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">詳細心得或料理體驗 *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="分享您烹飪、品嚐或使用的真實感受，您的評價將幫助更多支持在地漁村的朋友！"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full border border-slate-300 bg-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-4 py-2 border border-slate-300 text-slate-600 rounded-xl text-xs font-semibold hover:bg-white"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>確認發布（獲取 20 點積分）</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-semibold">目前尚無評論，成為第一個留下評價的饕客！</p>
                    <button
                      onClick={() => setShowReviewForm(true)}
                      className="mt-3 text-xs text-sky-800 font-bold underline"
                    >
                      撰寫第一則評論並獲得 20 點
                    </button>
                  </div>
                ) : (
                  reviews.map((rev) => {
                    const currentLikes = likesMap[rev.id] ?? rev.likes ?? 0;
                    const isLiked = likedUserMap[rev.id];

                    return (
                      <div
                        key={rev.id}
                        className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 transition-all space-y-2.5 shadow-xs"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-xs shrink-0">
                              {rev.authorName.slice(0, 1)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 text-xs sm:text-sm">
                                  {rev.authorName}
                                </span>
                                {rev.verifiedPurchase && (
                                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded-md font-bold">
                                    ✓ 已購認證
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-400 block">
                                {rev.authorCity ? `${rev.authorCity} · ` : ''}{rev.date}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-0.5 text-amber-400">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3.5 h-3.5 ${
                                  star <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {rev.comment}
                        </p>

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex flex-wrap gap-1">
                            {rev.tags?.map((tag, i) => (
                              <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleLikeReview(rev.id, rev.likes || 0)}
                            className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded-md transition-colors cursor-pointer ${
                              isLiked
                                ? 'bg-sky-50 text-sky-700 font-bold'
                                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <ThumbsUp className={`w-3 h-3 ${isLiked ? 'fill-sky-700' : ''}`} />
                            <span>有幫助 ({currentLikes})</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 4. 訂單完成收款指示與會員獎勵 Modal
// ----------------------------------------------------
interface OrderSuccessModalProps {
  order: OrderDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
  onOpenMemberModal?: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  isOpen,
  onClose,
  onToast,
  onOpenMemberModal,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !order) return null;

  const copyAcc = () => {
    navigator.clipboard.writeText('115001018899').then(() => {
      setCopied(true);
      onToast('已複製匯款帳號（115001018899）！');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 text-left">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          aria-label="關閉"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">感謝您的訂購！</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            訂單編號：<span className="font-mono font-bold text-sky-800">{order.orderId}</span>
          </p>
        </div>

        {/* Member Loyalty Rewards Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-4 mb-5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0">
                <Coins className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-amber-950">
                  🎉 會員點數已成功累計入帳！
                </h4>
                <p className="text-xs text-amber-800">
                  本次消費獲贈 <strong className="text-slate-950 font-black">+{order.pointsEarned || Math.floor(order.grandTotal * 0.05)} 點</strong> 新三漁積分！
                </p>
              </div>
            </div>
            {onOpenMemberModal && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenMemberModal();
                }}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-bold cursor-pointer shrink-0 shadow-xs"
              >
                查看點數明細
              </button>
            )}
          </div>
          {order.pointsUsed > 0 && (
            <div className="text-[11px] text-emerald-700 font-semibold pt-1 border-t border-amber-200">
              ✓ 本次訂單已折抵 {order.pointsUsed} 點積分（節省 NT$ {order.pointsUsed} 元）
            </div>
          )}
        </div>

        {/* Bank transfer instruction box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-5 space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Landmark className="w-4 h-4 text-sky-700" />
            <span>請於 24 小時內完成銀行轉帳</span>
          </div>
          <div className="text-xs text-slate-700 space-y-1.5 pt-1">
            <div className="flex justify-between">
              <span className="text-slate-500">收款銀行：</span>
              <span className="font-semibold">土地銀行 枋寮分行 (代碼: 005)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">轉帳帳號：</span>
              <div className="flex items-center gap-1.5 font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                <span>115-001-018899</span>
                <button
                  type="button"
                  onClick={copyAcc}
                  className="text-[11px] text-sky-700 font-semibold hover:underline cursor-pointer"
                >
                  {copied ? '已複製' : '複製'}
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">戶名：</span>
              <span className="font-semibold">屏東縣枋寮鄉新龍社區發展協會</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-200">
              <span className="text-slate-500">應匯款總額：</span>
              <span className="font-black text-sky-900 text-base">NT$ {order.grandTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">您填寫的末五碼：</span>
              <span className="font-mono font-bold text-slate-900">{order.bank5}</span>
            </div>
          </div>
        </div>

        {/* Order Items Summary */}
        <div className="border border-slate-200 rounded-xl p-3.5 space-y-2 mb-5 text-xs text-slate-600">
          <div className="font-bold text-slate-900 pb-1 border-b border-slate-100 flex justify-between">
            <span>訂單明細 (共 {order.items.reduce((s, i) => s + i.qty, 0)} 件商品)</span>
            <span className="text-slate-400 font-normal">{order.createdAt}</span>
          </div>
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-0.5">
              <span className="truncate max-w-[240px]">{item.name} × {item.qty}</span>
              <span className="font-semibold text-slate-900">NT$ {(item.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-slate-100 space-y-1">
            <div className="flex justify-between">
              <span>收件人：{order.name} ({order.phone})</span>
            </div>
            <div className="flex justify-between">
              <span>地址：{order.address}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-sky-800 hover:bg-sky-900 text-white font-bold rounded-xl text-sm shadow-md transition-colors cursor-pointer text-center"
        >
          我知道了，完成下單
        </button>
      </div>
    </div>
  );
};
