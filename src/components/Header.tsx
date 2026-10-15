import React, { useState } from 'react';
import { ShoppingBag, Menu, X, MapPin, Award, Coins } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { MemberProfile } from '../types/loyalty';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  member: MemberProfile;
  onOpenMemberModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  member,
  onOpenMemberModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: '新龍故事', href: '#about' },
    { name: '三生共榮', href: '#pillars' },
    { name: '漁村體驗', href: '#tours' },
    { name: '在地風味餐', href: '#dining' },
    { name: '展售商城', href: '#shop' },
    { name: '聯絡預約', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">
          
          {/* Zone 1: Single text element wordmark with logo */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-sky-600 shadow-sm shrink-0 bg-white flex items-center justify-center">
              <ImageWithFallback
                src="logo2.jpg"
                alt="新三漁 Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                category="logo"
              />
            </div>
            <div>
              <span className="block text-[11px] font-semibold text-amber-700 tracking-wider">屏東縣枋寮鄉新龍社區</span>
              <span className="block text-lg font-bold text-slate-900 tracking-tight leading-none group-hover:text-sky-700 transition-colors whitespace-nowrap">
                新三漁產業展售中心
              </span>
            </div>
          </a>

          {/* Zone 2: 4-6 concise single-line text links */}
          <nav className="hidden lg:flex items-center gap-7 font-medium text-slate-600 text-[15px]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-sky-700 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Member loyalty button + Cart button + Mobile menu toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Member Loyalty Button */}
            <button
              onClick={onOpenMemberModal}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 transition-all text-xs font-bold cursor-pointer shadow-xs group"
              title="查看新三漁會員積分中心"
            >
              <Award className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline">{member.name || '會員俱樂部'}</span>
              <span className="inline-flex items-center gap-0.5 bg-amber-400/90 text-slate-950 px-2 py-0.5 rounded-full text-[11px] font-black tabular-nums">
                <Coins className="w-2.5 h-2.5" />
                {member.points}
              </span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label="查看購物車"
              className="relative p-2.5 rounded-full bg-sky-50 text-sky-800 hover:bg-sky-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-xs font-black rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-scale">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="切換選單"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 font-medium text-slate-700 shadow-xl animate-fadeIn">
          {/* Member Card in Mobile Menu */}
          <div
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenMemberModal();
            }}
            className="p-3 bg-gradient-to-r from-slate-900 to-sky-950 text-white rounded-xl flex items-center justify-between cursor-pointer mb-2"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block">{member.name} ({member.tier})</span>
                <span className="text-[11px] text-slate-300">現有可用積分：<strong className="text-amber-400">{member.points}</strong> 點</span>
              </div>
            </div>
            <span className="text-xs text-amber-300 font-bold bg-white/10 px-2 py-1 rounded-lg">
              管理積分 &gt;
            </span>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 px-3 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            屏東縣枋寮鄉義民路209之3號
          </div>
        </div>
      )}
    </header>
  );
};
