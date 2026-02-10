
import React from 'react';
import { 
  Ticket, 
  Zap, 
  Tags, 
  Users, 
  ChevronRight, 
  Plus,
  BarChart2
} from 'lucide-react';

const MarketingCenter: React.FC = () => {
  const tools = [
    { title: '优惠券', desc: '满减、折扣、直降券', icon: Ticket, color: 'bg-orange-50 text-orange-600' },
    { title: '秒杀活动', desc: '限时抢购，快速爆单', icon: Zap, color: 'bg-red-50 text-red-600' },
    { title: '折扣活动', desc: '商品直降促销', icon: Tags, color: 'bg-blue-50 text-blue-600' },
    { title: '会员特权', desc: '专属折扣，提高复购', icon: Users, color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Promotion Stats */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 flex items-center">
            <BarChart2 size={18} className="mr-2 text-blue-600" />
            营销数据概览
          </h3>
          <span className="text-xs text-gray-400">近 7 天</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-[10px] text-gray-400 mb-1">营销带来成交额</p>
            <p className="text-lg font-bold text-blue-600">¥3,420.00</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-[10px] text-gray-400 mb-1">优惠券领取量</p>
            <p className="text-lg font-bold text-gray-800">128</p>
          </div>
        </div>
      </div>

      {/* Marketing Tools Grid */}
      <div className="space-y-3">
        <h3 className="font-bold text-gray-800">常用工具</h3>
        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool, i) => (
            <button key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center group active:scale-95 transition-transform">
              <div className={`p-3 rounded-xl mb-3 ${tool.color}`}>
                <tool.icon size={24} />
              </div>
              <p className="font-bold text-sm text-gray-800">{tool.title}</p>
              <p className="text-[10px] text-gray-400 mt-1">{tool.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Active Promotions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800">正在进行中</h3>
          <button className="text-xs text-blue-600 flex items-center">
             查看全部 <ChevronRight size={14} />
          </button>
        </div>
        
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50 shadow-sm">
           <div className="p-4 flex items-center justify-between">
             <div className="flex items-center">
               <div className="w-12 h-12 bg-orange-100 rounded-lg flex flex-col items-center justify-center text-orange-600 leading-none">
                 <span className="text-[10px] font-bold">¥</span>
                 <span className="text-lg font-bold">20</span>
               </div>
               <div className="ml-3">
                 <p className="text-sm font-bold text-gray-800">满 100 减 20 粉丝专享</p>
                 <p className="text-[10px] text-green-500 font-bold mt-1">发放中 (24/100)</p>
               </div>
             </div>
             <button className="text-xs text-gray-400"><Plus size={18} /></button>
           </div>
           
           <div className="p-4 flex items-center justify-between">
             <div className="flex items-center">
               <div className="w-12 h-12 bg-red-100 rounded-lg flex flex-col items-center justify-center text-red-600 leading-none">
                 <Zap size={20} />
               </div>
               <div className="ml-3">
                 <p className="text-sm font-bold text-gray-800">双 11 早鸟秒杀</p>
                 <p className="text-[10px] text-blue-500 font-bold mt-1">即将开始 (11.01 00:00)</p>
               </div>
             </div>
             <button className="text-xs text-gray-400"><Plus size={18} /></button>
           </div>
        </div>
      </div>

      <div className="bg-indigo-600 p-5 rounded-2xl text-white flex items-center justify-between shadow-lg shadow-indigo-100">
        <div>
          <h4 className="font-bold">平台补贴活动</h4>
          <p className="text-xs text-indigo-100 mt-1">报名供应链百亿补贴，获百万流量</p>
        </div>
        <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-xs font-bold">去报名</button>
      </div>
    </div>
  );
};

export default MarketingCenter;
