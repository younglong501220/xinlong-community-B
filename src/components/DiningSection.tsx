import React from 'react';
import { Utensils, CheckCircle2 } from 'lucide-react';
import { diningOptions, DiningItem } from '../data/communityData';
import { ImageWithFallback } from './ImageWithFallback';

interface DiningSectionProps {
  onOpenDiningBooking: (item: DiningItem) => void;
}

export const DiningSection: React.FC<DiningSectionProps> = ({ onOpenDiningBooking }) => {
  return (
    <section id="dining" className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">Fisherman's Gourmet</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">產地直達 • 在地海鮮風味餐</h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full" />
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            堅持使用新龍社區每日清晨起池的極鮮石斑與午仔魚，每一口都是台灣海峽的鮮甜甘醇。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {diningOptions.map((item, idx) => {
            const isFeatured = idx === 1; // 合菜
            return (
              <div
                key={item.id}
                className={`bg-slate-800/90 rounded-2xl overflow-hidden border shadow-xl flex flex-col justify-between group transition-all ${
                  isFeatured
                    ? 'border-amber-400 ring-1 ring-amber-400/50 md:-translate-y-2'
                    : 'border-slate-700 hover:border-slate-500'
                }`}
              >
                <div>
                  <div className="h-64 overflow-hidden relative bg-slate-950">
                    <ImageWithFallback
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      category="dining"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-md shadow-md">
                      {item.tag}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">{item.name}</h3>
                      <span className="text-amber-400 text-xl font-black tabular-nums">
                        NT$ {item.price.toLocaleString()}
                        <span className="text-xs text-slate-400 font-normal ml-1">{item.unit}</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-700/60">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onOpenDiningBooking(item)}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isFeatured
                        ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-lg shadow-amber-400/20'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    <Utensils className="w-4 h-4" />
                    <span>預約此風味餐</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
