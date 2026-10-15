import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-700 bg-white shrink-0">
                <ImageWithFallback
                  src="logo2.jpg"
                  alt="新三漁 Logo"
                  className="w-full h-full object-cover"
                  category="logo"
                />
              </div>
              <span className="text-white font-bold text-lg">新三漁產業展售中心</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-md">
              屏東縣枋寮鄉新龍社區發展協會推動在地「三生共榮」核心品牌。致力於提升漁產價值、友善循環經濟、照顧漁村長者與帶動青年返鄉就業。
            </p>
          </div>

          <div>
            <h5 className="text-white text-sm font-bold mb-3">網站導覽</h5>
            <ul className="text-xs space-y-2">
              <li><a href="#about" className="hover:text-white transition-colors">新龍故事與榮耀</a></li>
              <li><a href="#pillars" className="hover:text-white transition-colors">生活、生產、生態三生</a></li>
              <li><a href="#tours" className="hover:text-white transition-colors">漁村特色體驗預約</a></li>
              <li><a href="#dining" className="hover:text-white transition-colors">產地海鮮無菜單風味餐</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">新三漁官方線上展售館</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-sm font-bold mb-3">關注與諮詢</h5>
            <p className="text-xs mb-3 text-slate-400">掌握枋寮海風鮮訊與限定伴手禮活動：</p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>(08) 878-0185 ｜ 0933-288-751</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>info@xinlong.org</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>屏東縣枋寮鄉義民路209之3號</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 text-center text-xs text-slate-500">
          <p>© 2026 屏東縣枋寮鄉新龍社區發展協會 ｜ 新三漁產業展售中心. All Rights Reserved. 設計遵循友善農再與綠色循環理念。</p>
        </div>
      </div>
    </footer>
  );
};
