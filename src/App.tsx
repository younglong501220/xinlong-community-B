import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CommunityStory } from './components/CommunityStory';
import { ThreePillars } from './components/ThreePillars';
import { TourSection } from './components/TourSection';
import { DiningSection } from './components/DiningSection';
import { ShopSection } from './components/ShopSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartModal, CartItem, OrderDetails } from './components/CartModal';
import { MemberModal } from './components/MemberModal';
import {
  TourBookingModal,
  DiningBookingModal,
  ProductQuickViewModal,
  OrderSuccessModal,
} from './components/Modals';
import { Toast } from './components/Toast';
import {
  Product,
  TourItem,
  DiningItem,
  products as initialProducts,
  defaultMemberProfile,
} from './data/communityData';
import { MemberProfile, MemberTier, ProductReview } from './types/loyalty';

export default function App() {
  // 會員資料狀態 (支援 localStorage 保存)
  const [member, setMember] = useState<MemberProfile>(() => {
    try {
      const saved = localStorage.getItem('xinlong_member');
      return saved ? JSON.parse(saved) : defaultMemberProfile;
    } catch {
      return defaultMemberProfile;
    }
  });

  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  // 商品庫存與評論狀態 (支援 localStorage 保存，確保顧客提交評論立即生效且持久化)
  const [productList, setProductList] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('xinlong_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // 購物車狀態 (支援 localStorage 保存)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('xinlong_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 預約與檢視狀態
  const [selectedTour, setSelectedTour] = useState<TourItem | null>(null);
  const [tourHeadcount, setTourHeadcount] = useState(6);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  const [selectedDining, setSelectedDining] = useState<DiningItem | null>(null);
  const [isDiningModalOpen, setIsDiningModalOpen] = useState(false);

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewTab, setQuickViewTab] = useState<'info' | 'reviews'>('info');
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);

  // 持久化儲存購物車
  useEffect(() => {
    try {
      localStorage.setItem('xinlong_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // 持久化儲存會員資料
  useEffect(() => {
    try {
      localStorage.setItem('xinlong_member', JSON.stringify(member));
    } catch (e) {
      console.error(e);
    }
  }, [member]);

  // 持久化儲存商品評論
  useEffect(() => {
    try {
      localStorage.setItem('xinlong_products', JSON.stringify(productList));
    } catch (e) {
      console.error(e);
    }
  }, [productList]);

  // 購物車總件數
  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === product.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
    showToast(`已將「${product.name}」加入購物車！`);
  };

  const handleUpdateQty = (id: string, change: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + change;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    showToast('已從購物車移除該商品');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenTourBooking = (tour: TourItem, headcount: number) => {
    setSelectedTour(tour);
    setTourHeadcount(headcount);
    setIsTourModalOpen(true);
  };

  const handleSubmitTourBooking = (data: {
    tourName: string;
    headcount: number;
    date: string;
    name: string;
    phone: string;
  }) => {
    setIsTourModalOpen(false);
    showToast(`已收到【${data.tourName}】${data.headcount}人體驗預約意向！我們將儘速致電確認。`);
  };

  const handleOpenDiningBooking = (dining: DiningItem) => {
    setSelectedDining(dining);
    setIsDiningModalOpen(true);
  };

  const handleSubmitDiningBooking = (data: {
    diningName: string;
    quantity: number;
    date: string;
  }) => {
    setIsDiningModalOpen(false);
    showToast(`已收到【${data.diningName}】訂席預約！我們將儘速致電確認安排。`);
  };

  const handleQuickView = (product: Product, tab: 'info' | 'reviews' = 'info') => {
    // 獲取最新狀態中的商品物件
    const currentProduct = productList.find((p) => p.id === product.id) || product;
    setQuickViewProduct(currentProduct);
    setQuickViewTab(tab);
    setIsQuickViewOpen(true);
  };

  // 顧客新增商品評論處理 (獎勵會員 20 點積分)
  const handleAddReview = (
    productId: string,
    newReviewData: Omit<ProductReview, 'id' | 'date' | 'likes'>
  ) => {
    const newReview: ProductReview = {
      ...newReviewData,
      id: 'rev-' + Date.now(),
      date: new Date().toLocaleDateString('zh-TW'),
      likes: 0,
    };

    setProductList((prevList) => {
      return prevList.map((p) => {
        if (p.id === productId) {
          const currentReviews = p.reviews || [];
          const updatedReviews = [newReview, ...currentReviews];
          const totalStars = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
          const avgRating = Number((totalStars / updatedReviews.length).toFixed(1));
          return {
            ...p,
            rating: avgRating,
            reviewCount: updatedReviews.length,
            reviews: updatedReviews,
          };
        }
        return p;
      });
    });

    // 若正在開啟該商品的快速檢視視窗，同步更新視窗內商品
    setQuickViewProduct((prev) => {
      if (prev && prev.id === productId) {
        const currentReviews = prev.reviews || [];
        const updatedReviews = [newReview, ...currentReviews];
        const totalStars = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
        const avgRating = Number((totalStars / updatedReviews.length).toFixed(1));
        return {
          ...prev,
          rating: avgRating,
          reviewCount: updatedReviews.length,
          reviews: updatedReviews,
        };
      }
      return prev;
    });

    // 獎勵會員 20 點積分
    const rewardPoints = 20;
    setMember((prev) => {
      const newHistoryItem = {
        id: 'pt-' + Date.now(),
        date: new Date().toLocaleDateString('zh-TW'),
        title: `商品評價獎勵：${newReviewData.authorName} 的寶貴心得`,
        pointsChange: +rewardPoints,
        type: 'earn' as const,
      };
      return {
        ...prev,
        points: prev.points + rewardPoints,
        pointHistory: [newHistoryItem, ...prev.pointHistory],
      };
    });

    showToast(`🎉 評價已成功發布！感謝您的支持，已為您入帳 +20 點會員積分！`);
  };

  // 結帳成功處理 (扣除使用點數、累積消費與贈送 5% 回饋點數)
  const handleOrderSuccess = (order: OrderDetails) => {
    setCompletedOrder(order);
    setIsCartOpen(false);
    setIsOrderSuccessOpen(true);

    const pointsUsed = order.pointsUsed || 0;
    const pointsEarned = order.pointsEarned || Math.floor(order.grandTotal * 0.05);

    setMember((prev) => {
      const newLifetime = prev.lifetimeSpent + order.grandTotal;
      let newTier: MemberTier = prev.tier;
      if (newLifetime >= 10000) {
        newTier = '金斑尊榮VIP';
      } else if (newLifetime >= 3000) {
        newTier = '銀鱗會員';
      }

      const newHistory = [...prev.pointHistory];
      if (pointsUsed > 0) {
        newHistory.unshift({
          id: 'pt-use-' + Date.now(),
          date: new Date().toLocaleDateString('zh-TW'),
          title: `訂單折抵 (${order.orderId})`,
          pointsChange: -pointsUsed,
          type: 'redeem' as const,
        });
      }
      if (pointsEarned > 0) {
        newHistory.unshift({
          id: 'pt-earn-' + Date.now(),
          date: new Date().toLocaleDateString('zh-TW'),
          title: `消費回饋 (${order.orderId})`,
          pointsChange: +pointsEarned,
          type: 'earn' as const,
        });
      }

      return {
        ...prev,
        phone: order.phone || prev.phone,
        name: order.name || prev.name,
        lifetimeSpent: newLifetime,
        tier: newTier,
        points: Math.max(0, prev.points - pointsUsed + pointsEarned),
        pointHistory: newHistory,
      };
    });

    showToast(`訂單已送出！本次累積 +${pointsEarned} 點會員積分，感謝支持新龍社區！`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-sky-500 selection:text-white">
      {/* 1. Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        member={member}
        onOpenMemberModal={() => setIsMemberModalOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Community Story */}
        <CommunityStory />

        {/* 4. Three Pillars */}
        <ThreePillars />

        {/* 5. Tours & Calculator */}
        <TourSection
          onOpenTourBooking={handleOpenTourBooking}
          onToast={showToast}
        />

        {/* 6. Dining */}
        <DiningSection onOpenDiningBooking={handleOpenDiningBooking} />

        {/* 7. Shop & Reviews Showcase */}
        <ShopSection
          products={productList}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
          onQuickView={handleQuickView}
          cartCount={totalCartCount}
          onOpenMemberModal={() => setIsMemberModalOpen(true)}
        />

        {/* 8. Contact & Map */}
        <ContactSection onToast={showToast} />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* 10. Modals & Drawers */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSuccess={handleOrderSuccess}
        member={member}
        onOpenMemberModal={() => setIsMemberModalOpen(true)}
        onAddToCart={handleAddToCart}
      />

      <MemberModal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
        member={member}
        onUpdateMember={setMember}
        onToast={showToast}
      />

      <TourBookingModal
        tour={selectedTour}
        headcount={tourHeadcount}
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        onSubmit={handleSubmitTourBooking}
      />

      <DiningBookingModal
        dining={selectedDining}
        isOpen={isDiningModalOpen}
        onClose={() => setIsDiningModalOpen(false)}
        onSubmit={handleSubmitDiningBooking}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
        onAddReview={handleAddReview}
        member={member}
        initialTab={quickViewTab}
        onOpenMemberModal={() => setIsMemberModalOpen(true)}
      />

      <OrderSuccessModal
        order={completedOrder}
        isOpen={isOrderSuccessOpen}
        onClose={() => setIsOrderSuccessOpen(false)}
        onToast={showToast}
        onOpenMemberModal={() => setIsMemberModalOpen(true)}
      />

      {/* Floating Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
