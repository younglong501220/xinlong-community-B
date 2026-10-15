import React from 'react';
import { Quote, Sparkles, Trophy, Calendar, Recycle } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const CommunityStory: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-sky-700 uppercase">Our Heritage & Story</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">新龍轉型 • 耀漁光</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            從莫拉克風災的重創走向國際創生典範，新龍人用堅毅與科技創新寫下台灣沿海漁村的傳奇篇章。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Story Image */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-100 group">
              <div className="h-96 w-full overflow-hidden bg-slate-100">
                <ImageWithFallback
                  src="xinlong-community-story.jpg"
                  alt="新龍轉型耀漁光故事與社區地圖"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  category="story"
                />
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-6 text-white">
                <p className="text-xs text-amber-300 font-semibold mb-1">金牌農村榮耀傳承</p>
                <h3 className="text-lg font-bold">新龍社區執行長林春來帶領團隊翻轉漁村</h3>
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="prose prose-slate max-w-none text-slate-600 space-y-4 text-sm sm:text-base">
              <p className="leading-relaxed">
                枋寮鄉新龍社區（舊稱「番仔崙」）座落於屏東海岸線，是孕育全台頂級龍膽石斑與龍虎斑的核心搖籃。然而，2009年的莫拉克颱風引發世紀水患，養殖池幾遭沖毀，產業陷入前所未有的危機。
              </p>
              <p className="leading-relaxed">
                在社區執行長<strong>林春來</strong>與社區發展協會的帶領下，居民決定不再受制於傳統生鮮收購的剝削與天然風險。他們以<strong>農村再生</strong>計畫為基石，展開「產銷垂直整合」與「全魚循環高值化」之革命。
              </p>
              
              <div className="p-4 bg-sky-50 rounded-xl border border-sky-200 text-sm text-sky-950 font-medium relative">
                <Quote className="w-5 h-5 text-sky-600 mb-1 inline mr-2" />
                「除了肉身可以做頂級生鮮與調理粥包，丟棄的魚鱗更能萃取醫療級海洋膠原蛋白！」新龍社區研發出享譽各界的「LN 龍之美」全系列胜肽保養品，真正落實「零浪費循環漁業」。
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-center">
                <Calendar className="w-5 h-5 text-sky-600 mx-auto mb-1" />
                <span className="block text-2xl font-black text-slate-900 tabular-nums">10+ 年</span>
                <span className="text-xs text-slate-500 font-medium">農村再生淬鍊</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-center">
                <Recycle className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <span className="block text-2xl font-black text-amber-700 tabular-nums">100%</span>
                <span className="text-xs text-slate-500 font-medium">全魚零廢棄</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-center">
                <Trophy className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <span className="block text-2xl font-black text-emerald-700">金牌獎</span>
                <span className="text-xs text-slate-500 font-medium">全國金牌農村楷模</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
