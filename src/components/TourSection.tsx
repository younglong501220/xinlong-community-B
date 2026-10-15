import React, { useState } from 'react';
import { Compass, Users, Clock, Calculator, Check, AlertTriangle, ArrowRight } from 'lucide-react';
import { tours, TourItem } from '../data/communityData';
import { ImageWithFallback } from './ImageWithFallback';

interface TourSectionProps {
  onOpenTourBooking: (tour: TourItem, headcount: number) => void;
  onToast: (msg: string) => void;
}

export const TourSection: React.FC<TourSectionProps> = ({ onOpenTourBooking, onToast }) => {
  const [selectedTourId, setSelectedTourId] = useState<string>(tours[0].id);
  const [headcount, setHeadcount] = useState<number>(6);

  const currentTour = tours.find(t => t.id === selectedTourId) || tours[0];
  const meetsThreshold = headcount >= currentTour.minPeople;
  const totalPrice = currentTour.price * headcount;

  const handleSelectTourFromCard = (tour: TourItem) => {
    setSelectedTourId(tour.id);
    setHeadcount(Math.max(headcount, tour.minPeople));
    onToast(`已載入「${tour.name}」至行程試算機！`);
    const calcEl = document.getElementById('tour-calculator');
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeadcountChange = (val: number) => {
    const cleanVal = Math.max(1, Math.min(200, val));
    setHeadcount(cleanVal);
  };

  return (
    <section id="tours" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-sky-700 uppercase">Eco & Hands-on Travel</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">新龍漁村體驗小旅行</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            脫下皮鞋踩進漁池！感受枋寮海風與職人溫度，最道地的漁村文化身心療癒之旅。
          </p>
        </div>

        {/* 8 Tour Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tours.map((tour) => {
            const isLargeGroup = tour.minPeople >= 20;
            return (
              <div
                key={tour.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="h-48 overflow-hidden relative bg-slate-100">
                    <ImageWithFallback
                      src={tour.img}
                      alt={tour.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      category="tour"
                    />
                    <span className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-bold shadow-sm ${
                      isLargeGroup ? 'bg-amber-600 text-white' : 'bg-slate-900/80 backdrop-blur-sm text-white'
                    }`}>
                      {tour.minPeople}人成團
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{tour.duration}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-700 transition-colors line-clamp-1">
                      {tour.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {tour.desc}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <div>
                    <span className="text-xs text-slate-400 block">費用</span>
                    <span className="text-sky-800 font-black text-lg tabular-nums">
                      NT$ {tour.price} <span className="text-xs text-slate-400 font-normal">/ 人</span>
                    </span>
                  </div>
                  <button
                    onClick={() => handleSelectTourFromCard(tour)}
                    className="text-xs bg-sky-50 text-sky-800 hover:bg-sky-700 hover:text-white font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>加入試算</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Tour Calculator Container */}
        <div id="tour-calculator" className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/90 max-w-4xl mx-auto shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">體驗行程試算與預約諮詢</h3>
              <p className="text-xs text-slate-500">選擇項目與參加人數，即時檢視成團門檻與預算</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            
            {/* Tour Selection */}
            <div className="md:col-span-5 space-y-1.5">
              <label htmlFor="tour-select" className="block text-xs font-semibold text-slate-700">選擇體驗項目</label>
              <select
                id="tour-select"
                value={selectedTourId}
                onChange={(e) => setSelectedTourId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
              >
                {tours.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} (NT$ {t.price}/人, 門檻: {t.minPeople}人)
                  </option>
                ))}
              </select>
            </div>

            {/* Headcount Input */}
            <div className="md:col-span-3 space-y-1.5">
              <label htmlFor="people-input" className="block text-xs font-semibold text-slate-700">預計參加人數</label>
              <div className="flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleHeadcountChange(headcount - 1)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold"
                >
                  -
                </button>
                <input
                  id="people-input"
                  type="number"
                  min="1"
                  max="200"
                  value={headcount}
                  onChange={(e) => handleHeadcountChange(parseInt(e.target.value, 10) || 1)}
                  className="w-full text-center py-2 text-sm font-bold text-slate-800 focus:outline-none tabular-nums"
                />
                <button
                  type="button"
                  onClick={() => handleHeadcountChange(headcount + 1)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total calculation & Status */}
            <div className="md:col-span-4 bg-white p-3.5 rounded-xl border border-slate-200">
              <span className="block text-xs text-slate-400">預估費用總額</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-sky-800 tabular-nums">
                  NT$ {totalPrice.toLocaleString()}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 ${
                  meetsThreshold ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {meetsThreshold ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>已達開團門檻</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>差 {currentTour.minPeople - headcount} 人成團</span>
                    </>
                  )}
                </span>
              </div>
            </div>

          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs text-slate-500">
            <span>
              <span className="font-semibold text-sky-700">貼心提醒：</span> 體驗行程皆需提前至少 7 天預約安排，依當日潮汐與魚池狀況調整最佳出團時間。
            </span>
            <button
              onClick={() => onOpenTourBooking(currentTour, headcount)}
              className="w-full sm:w-auto px-6 py-2.5 bg-sky-800 hover:bg-sky-900 text-white font-bold rounded-xl shadow-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              送出體驗預約諮詢
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
