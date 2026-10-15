import React from 'react';
import { HeartPulse, Factory, Leaf, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const ThreePillars: React.FC = () => {
  return (
    <section id="pillars" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold tracking-widest text-sky-700 uppercase">Sustainability & Synergy</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">生活 • 生產 • 生態 三生共融</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            新龍社區不僅追求產業升級，更將展售收益反哺銀髮長照與海洋永續，打造永續幸福漁村。
          </p>
        </div>

        {/* Development Plan Diagram */}
        <div className="mb-12 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white">
          <div className="h-64 sm:h-72 w-full overflow-hidden bg-slate-100 flex items-center justify-center">
            <ImageWithFallback
              src="3life_coop.jpg"
              alt="生活、生產、生態發展計畫圖"
              className="w-full h-full object-contain p-2"
              category="story"
            />
          </div>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: 生活照顧 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200/90 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">生活照顧 • 樂齡長照</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                將產業展售盈餘提撥回饋社區，設立日間關懷據點、愛心志工食堂與樂齡學堂，天天提供新鮮石斑魚共餐營養補充，實現老有所養的溫暖家園。
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-rose-700 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
              <span>樂齡共餐 · 健康日照 · 在地安老</span>
            </div>
          </div>

          {/* Pillar 2: 生產高值 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200/90 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-xl">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">生產高值 • 全魚經濟</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                建立自有品牌「新三漁」，導入真空急凍技術與生技萃取研發。魚肉做成生鮮排切與魚粥、魚骨燉高湯、魚鱗提煉化妝品，創造百倍附加價值。
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-sky-700 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
              <span>產銷班直營 · 生技認證 · 自有展售</span>
            </div>
          </div>

          {/* Pillar 3: 生態循環 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200/90 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">生態循環 • 友善海洋</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                推廣綠能光電共生與無毒友善養殖池，復育紅樹林河口濕地與潮間帶生態多樣性，推廣食魚教育與生態旅遊，讓海洋資源生生不息。
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>濕地守護 · 食魚教育 · 低碳創生</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
