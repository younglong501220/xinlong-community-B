import React, { useState } from 'react';
import { Fish, Sparkles, Utensils, Compass, Waves } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  category?: 'frozen' | 'skincare' | 'ambient' | 'tour' | 'dining' | 'hero' | 'story' | 'logo';
  fallbackSrc?: string;
}

// 預先對應高品質備用影像路徑
const GENERATED_FALLBACKS: Record<string, string> = {
  hero: '/src/assets/images/xinlong_hero_grouper_1791992885116.jpg',
  story: '/src/assets/images/xinlong_community_story_1791992886284.jpg',
  dining: '/src/assets/images/xinlong_grouper_dish_1791992887123.jpg',
  skincare: '/src/assets/images/xinlong_collagen_skincare_1791992887871.jpg',
};

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  category = 'frozen',
  fallbackSrc
}) => {
  const [candidateIndex, setCandidateIndex] = useState(0);

  // 清理檔案名稱，消除多餘的前置路徑
  const cleanName = src
    .replace(/^(\.\/|\/)+/, '')
    .replace(/^images\//, '')
    .trim();

  const baseUrl = import.meta.env.BASE_URL || './';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  // 支援多種常見 GitHub Pages / Vite / 本地預覽路徑自動嘗試
  const rawCandidates: string[] = [
    `${normalizedBase}images/${cleanName}`, // Vite BaseUrl + images/
    `${normalizedBase}${cleanName}`,        // Vite BaseUrl + 檔名
    `./images/${cleanName}`,                // 相對 images 目錄
    `./${cleanName}`,                       // 相對同層目錄
    `/images/${cleanName}`,                 // 絕對 images 目錄
    `/${cleanName}`,                        // 絕對根目錄
    cleanName,                              // 直接相對參照
  ];

  if (src && !rawCandidates.includes(src)) {
    rawCandidates.unshift(src);
  }

  const generatedFallback = fallbackSrc || GENERATED_FALLBACKS[category || ''];
  if (generatedFallback) {
    rawCandidates.push(generatedFallback);
  }

  // 去重路徑
  const candidateUrls = Array.from(new Set(rawCandidates));

  const handleError = () => {
    setCandidateIndex((prev) => prev + 1);
  };

  // 當所有候選路徑皆嘗試過且失敗時，顯示優雅品牌風格卡片
  if (candidateIndex >= candidateUrls.length) {
    const isSkincare = category === 'skincare';
    const isTour = category === 'tour';
    const isDining = category === 'dining';
    const isAmbient = category === 'ambient';

    return (
      <div className={`relative flex flex-col items-center justify-center p-4 text-center overflow-hidden ${className} ${
        isSkincare ? 'bg-gradient-to-br from-amber-50 to-orange-100 text-amber-900' :
        isTour ? 'bg-gradient-to-br from-teal-50 to-emerald-100 text-teal-900' :
        isDining ? 'bg-gradient-to-br from-slate-800 to-sky-950 text-amber-200' :
        isAmbient ? 'bg-gradient-to-br from-amber-50 to-yellow-100 text-amber-900' :
        'bg-gradient-to-br from-sky-900 via-sky-800 to-cyan-900 text-sky-100'
      }`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 bg-white/20 backdrop-blur-sm shadow-sm">
            {isSkincare ? <Sparkles className="w-6 h-6 text-amber-500" /> :
             isTour ? <Compass className="w-6 h-6 text-teal-600" /> :
             isDining ? <Utensils className="w-6 h-6 text-amber-400" /> :
             isAmbient ? <Waves className="w-6 h-6 text-amber-600" /> :
             <Fish className="w-6 h-6 text-sky-300" />}
          </div>
          <span className="text-xs font-bold line-clamp-1 opacity-90 px-2">{alt}</span>
          <span className="text-[10px] opacity-60 tracking-wider uppercase mt-0.5">新三漁 · 屏東枋寮</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={candidateUrls[candidateIndex]}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
};
