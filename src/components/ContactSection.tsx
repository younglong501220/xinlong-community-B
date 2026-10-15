import React, { useState } from 'react';
import { MapPin, Phone, Clock, Landmark, Copy, Check, Send, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  onToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onToast }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    type: '一般諮詢',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bankAccount = '115-001-018899';
  const rawBankAccount = '115001018899';

  const copyBankAccount = async () => {
    try {
      await navigator.clipboard.writeText(rawBankAccount);
      setCopied(true);
      onToast('已複製匯款帳號（115001018899）至剪貼簿！');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      onToast('複製失敗，請手動複製帳號：115001018899');
    }
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onToast(`已收到您的「${formData.type}」訊息！我們將於門市營業時間盡快與您聯繫。`);
      setFormData({ name: '', contact: '', type: '一般諮詢', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold tracking-widest text-sky-700 uppercase">Visit & Inquire</span>
            <h2 className="text-3xl font-black text-slate-900 leading-tight">
              歡迎蒞臨新三漁展售中心<br />
              預約產地參訪小旅行
            </h2>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              新三漁展售中心具備舒適冷氣門市、在地農漁伴手禮展示區、低溫冷鏈取貨點與手作食魚教室。無論是自駕散客、遊覽車旅行團或學校戶外教學，皆熱情歡迎！
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">展售中心地址</h4>
                  <p className="text-sm text-slate-600">940 屏東縣枋寮鄉新龍村義民路209之3號</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">服務與預約專線</h4>
                  <p className="text-sm text-slate-600">(08) 878-0185 ｜ 0933-288-751</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">門市營運時間</h4>
                  <p className="text-sm text-slate-600">週一至週日 08:30 – 17:30 (體驗與風味餐請預約)</p>
                </div>
              </div>

              {/* Bank Transfer Card */}
              <div className="flex items-start gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Landmark className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900">銀行匯款專戶資訊</h4>
                  <p className="text-xs text-slate-600 mt-0.5">土地銀行 枋寮分行 (代碼: 005)</p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-mono font-bold text-slate-900 bg-white border border-slate-300 px-2.5 py-1 rounded-lg text-sm select-all">
                      {bankAccount}
                    </span>
                    <button
                      type="button"
                      onClick={copyBankAccount}
                      className="text-xs text-sky-700 hover:text-sky-900 font-bold px-2 py-1 rounded hover:bg-sky-50 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">已複製</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>複製帳號</span>
                        </>
                      )}
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1">戶名：屏東縣枋寮鄉新龍社區發展協會</span>
                </div>
              </div>
            </div>

            {/* Quick Online Inquiry Form */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mt-6">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-sky-700" />
                <span>線上諮詢留言</span>
              </h4>
              <form onSubmit={handleSubmitInquiry} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="聯絡人姓名 *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="電話或 LINE ID *"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="體驗行程預約">體驗行程預約洽詢</option>
                  <option value="海鮮風味餐訂席">海鮮風味餐訂席</option>
                  <option value="大宗團購水產">大宗團購水產 / 企業採購</option>
                  <option value="學校食魚戶外教學">學校食魚戶外教學</option>
                  <option value="一般諮詢">一般諮詢</option>
                </select>
                <textarea
                  rows={2}
                  required
                  placeholder="請簡述您的需求或預計造訪日期..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 bg-sky-800 hover:bg-sky-900 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? '傳送中...' : '送出洽詢留言'}</span>
                </button>
              </form>
            </div>

          </div>

          {/* Right: Embedded Interactive Map */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 h-[500px] bg-slate-100 relative">
              <iframe
                title="新三漁展售中心 Google 地圖位置"
                src="https://maps.google.com/maps?q=%E5%B1%8F%E6%9D%B1%E7%B8%A3%E6%9E%8B%E5%AF%AE%E9%84%89%E7%BE%A9%E6%B0%91%E8%B7%AF209%E4%B9%8B3%E8%99%9F&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-700 shrink-0" />
                <span>交通指引：國道 3 號南州交流道下，沿台 1 線南下至枋寮轉台 17 線抵達義民路</span>
              </div>
              <a
                href="https://maps.google.com/?q=屏東縣枋寮鄉義民路209之3號"
                target="_blank"
                rel="noreferrer"
                className="text-sky-700 font-bold hover:underline shrink-0"
              >
                在 Google 地圖中開啟 ↗
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
