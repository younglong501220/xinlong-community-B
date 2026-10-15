import React, { useState } from 'react';
import { X, Award, Gift, History, User, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, ChevronRight, Coins } from 'lucide-react';
import { MemberProfile, LoyaltyReward } from '../types/loyalty';
import { loyaltyRewards } from '../data/communityData';
import { ImageWithFallback } from './ImageWithFallback';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: MemberProfile;
  onUpdateMember: (newMember: MemberProfile) => void;
  onToast: (msg: string) => void;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  isOpen,
  onClose,
  member,
  onUpdateMember,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<'benefits' | 'rewards' | 'history' | 'account'>('benefits');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginName, setLoginName] = useState('');

  if (!isOpen) return null;

  // 計算升級金斑VIP進度 (VIP 門檻累計滿 10,000 元)
  const vipThreshold = 10000;
  const progressPercent = Math.min(100, Math.round((member.lifetimeSpent / vipThreshold) * 100));
  const diffToVip = Math.max(0, vipThreshold - member.lifetimeSpent);

  // 兌換好禮處理
  const handleRedeemReward = (reward: LoyaltyReward) => {
    if (member.points < reward.pointsCost) {
      onToast(`積分不足！您目前有 ${member.points} 點，兌換「${reward.title}」還差 ${reward.pointsCost - member.points} 點。`);
      return;
    }

    const updatedProfile: MemberProfile = {
      ...member,
      points: member.points - reward.pointsCost,
      redeemedRewards: [...member.redeemedRewards, reward.id],
      pointHistory: [
        {
          id: 'pt-' + Date.now(),
          date: new Date().toLocaleDateString('zh-TW'),
          title: `兌換好禮：${reward.title}`,
          pointsChange: -reward.pointsCost,
          type: 'redeem',
        },
        ...member.pointHistory,
      ],
    };

    onUpdateMember(updatedProfile);
    onToast(`🎉 成功兌換「${reward.title}」！已扣除 ${reward.pointsCost} 點積分。`);
  };

  // 登入或切換帳號
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone.trim()) return;

    const updatedProfile: MemberProfile = {
      ...member,
      phone: loginPhone,
      name: loginName.trim() || '新三漁貴賓',
      points: member.phone === loginPhone ? member.points : 280, // 若新登入給予體驗點數
    };
    onUpdateMember(updatedProfile);
    onToast(`歡迎回來，${updatedProfile.name}！現有積分 ${updatedProfile.points} 點。`);
    setActiveTab('benefits');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative border border-slate-100 max-h-[90vh] flex flex-col text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Coins className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">新三漁會員積分俱樂部</h3>
              <p className="text-xs text-slate-500">消費累積點數 · 折抵無上限 · 享專屬產地尊榮</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member Digital Card */}
        <div className="mt-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-800 text-white shadow-lg relative overflow-hidden shrink-0">
          <div className="absolute right-0 top-0 bottom-0 w-48 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />
          
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-[11px] font-bold">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{member.tier}</span>
              </div>
              <h4 className="text-lg font-bold text-white mt-1.5">{member.name}</h4>
              <p className="text-xs text-slate-400 font-mono tracking-wider">{member.phone}</p>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-400 block uppercase tracking-wider">目前可用積分</span>
              <span className="text-3xl font-black text-amber-400 tabular-nums">
                {member.points.toLocaleString()}
                <span className="text-xs font-normal text-slate-300 ml-1">點</span>
              </span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">
                可現抵 NT$ {member.points.toLocaleString()} 元
              </span>
            </div>
          </div>

          {/* Tier progression */}
          <div className="mt-4 pt-3 border-t border-slate-700/70 text-xs">
            <div className="flex justify-between text-slate-300 text-[11px] mb-1">
              <span>累計消費：NT$ {member.lifetimeSpent.toLocaleString()}</span>
              <span>
                {diffToVip > 0 ? `再消費 NT$ ${diffToVip.toLocaleString()} 晉升金斑尊榮VIP` : '已達最高金斑尊榮VIP！'}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-sky-400 to-amber-400 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-1.5 border-b border-slate-200 mt-5 shrink-0">
          <button
            onClick={() => setActiveTab('benefits')}
            className={`px-4 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'benefits'
                ? 'border-sky-800 text-sky-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>積分權益</span>
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-4 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'rewards'
                ? 'border-sky-800 text-sky-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>點數兌換 ({loyaltyRewards.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-sky-800 text-sky-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>積分明細</span>
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`px-4 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'account'
                ? 'border-sky-800 text-sky-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>會員資料</span>
          </button>
        </div>

        {/* Scrollable Tab Content */}
        <div className="overflow-y-auto flex-1 py-4 pr-1">
          
          {/* Tab 1: Benefits */}
          {activeTab === 'benefits' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-sky-900 font-bold text-sm mb-1.5">
                    <Coins className="w-4 h-4 text-sky-700" />
                    <span>消費即時集點</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    全館生鮮水產與保養品，每消費滿 <strong className="text-slate-900">NT$ 100</strong> 自動獲贈 <strong className="text-amber-700 font-bold">5 點</strong> 積分，買越多回饋越豐厚！
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-sky-900 font-bold text-sm mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>結帳現金折抵</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    購物車結帳時，<strong className="text-slate-900">1 點 = NT$ 1</strong>，可直接於購物車自由折抵訂單金額（最高可折抵訂單 30%）。
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-sky-900 font-bold text-sm mb-1.5">
                    <Gift className="w-4 h-4 text-purple-600" />
                    <span>獨家周邊兌換</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    積分不僅可折現，還能免費兌換「專利魚鱗冷製皂」、「新三漁保冷袋」與「小旅行折抵券」等會員獨家好禮！
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-sky-900 font-bold text-sm mb-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>產地專屬 VIP 禮遇</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    金斑VIP享年節石斑排切優先配額保留、生日當月雙倍積分贈送與在地無菜單料理訂席優惠席位。
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                <span>💡 現在於購物車結帳，就能立即累積此筆訂單的積分！</span>
                <button
                  onClick={() => setActiveTab('rewards')}
                  className="text-amber-800 font-bold hover:underline shrink-0 flex items-center gap-0.5 ml-2"
                >
                  <span>看兌換好禮</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Rewards Catalog */}
          {activeTab === 'rewards' && (
            <div className="space-y-3">
              {loyaltyRewards.map((reward) => {
                const canAfford = member.points >= reward.pointsCost;
                const isRedeemed = member.redeemedRewards.includes(reward.id);

                return (
                  <div
                    key={reward.id}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row items-center justify-between gap-3 bg-white"
                  >
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                        <ImageWithFallback
                          src={reward.img}
                          alt={reward.title}
                          className="w-full h-full object-cover"
                          category="ambient"
                        />
                      </div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900">{reward.title}</h5>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{reward.desc}</p>
                        <span className="text-[11px] text-amber-700 font-black mt-1 block tabular-nums">
                          {reward.pointsCost} 點
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRedeemReward(reward)}
                      disabled={!canAfford}
                      className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        canAfford
                          ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {isRedeemed ? '再次兌換' : '立即兌換'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 3: History */}
          {activeTab === 'history' && (
            <div className="divide-y divide-slate-100">
              {member.pointHistory.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-800 block">{item.title}</span>
                    <span className="text-slate-400 text-[11px]">{item.date}</span>
                  </div>
                  <span className={`text-sm font-black tabular-nums ${
                    item.pointsChange > 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {item.pointsChange > 0 ? `+${item.pointsChange}` : item.pointsChange} 點
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: Account Switch / Edit */}
          {activeTab === 'account' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 max-w-md mx-auto py-2">
              <div className="text-center mb-4">
                <h4 className="text-sm font-bold text-slate-900">會員帳號管理</h4>
                <p className="text-xs text-slate-500 mt-0.5">輸入手機號碼即可同步積分紀錄與專屬優惠</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">行動電話 (會員帳號) *</label>
                <input
                  type="tel"
                  required
                  placeholder="例：0912-345-678"
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">姓名或暱稱</label>
                <input
                  type="text"
                  placeholder="例：王小明"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-sky-800 hover:bg-sky-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
              >
                儲存 / 切換會員身分
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
