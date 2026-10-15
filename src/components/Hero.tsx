import React from 'react';
import { Award, ShoppingCart, Compass, ShieldCheck } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 text-white overflow-hidden py-20 lg:py-28">
      {/* Subtle maritime grid background */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-200 text-xs font-semibold tracking-wide backdrop-blur-sm">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>榮獲行政院農委會金牌農村典範肯定</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-balance">
              番仔崙新龍社區<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300">
                龍膽石斑魚的故鄉
              </span>
            </h1>
            
            <p className="text-base text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              源自台灣海峽與大漢山麓的純淨湧泉，我們以「全魚利用、三生共榮」締造漁村循環經濟奇蹟。品嚐產地直送極鮮石斑、體驗潮間漁人手作文化、享受專利魚鱗胜肽膠原純萃呵護。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#shop"
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>線上選購產地生鮮</span>
              </a>
              <a
                href="#tours"
                className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl backdrop-blur-sm transition-all text-center flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-cyan-300" />
                <span>探索漁村體驗行程</span>
              </a>
            </div>

            {/* Quantitative features strip */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-black text-cyan-300 tabular-nums">No.1</p>
                <p className="text-xs text-slate-400 mt-0.5">石斑魚苗育苗重鎮</p>
              </div>
              <div>
                <p className="text-2xl font-black text-amber-300 tabular-nums">100%</p>
                <p className="text-xs text-slate-400 mt-0.5">全魚高值化應用</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-400 tabular-nums">金牌</p>
                <p className="text-xs text-slate-400 mt-0.5">農村再生全國楷模</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-2xl blur opacity-25" />
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-white/15 shadow-2xl group">
                <div className="h-80 w-full overflow-hidden bg-slate-950">
                  <ImageWithFallback
                    src="giant-grouper-photo.png"
                    alt="番仔崙 新龍社區 龍膽石斑魚的故鄉"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    category="hero"
                  />
                </div>
                <div className="p-5 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">枋寮番仔崙</span>
                      <h3 className="text-lg font-bold text-white">台灣石斑養殖活化石</h3>
                    </div>
                    <span className="px-3 py-1 bg-sky-600/60 rounded-full text-xs font-semibold text-cyan-200 border border-sky-400/30 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      新三漁首選
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
