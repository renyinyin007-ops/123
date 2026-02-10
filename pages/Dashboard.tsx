
import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Clock, 
  ChevronRight,
  MessageSquare,
  HelpCircle,
  BookOpen,
  MousePointer2,
  Info
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', sales: 400 },
  { name: 'Tue', sales: 300 },
  { name: 'Wed', sales: 600 },
  { name: 'Thu', sales: 800 },
  { name: 'Fri', sales: 500 },
  { name: 'Sat', sales: 900 },
  { name: 'Sun', sales: 1200 },
];

const Dashboard: React.FC<{ navigateTo: (p: any) => void }> = ({ navigateTo }) => {
  const stats = [
    { label: '总销售额', value: '¥12,480', sub: '+12.5%', icon: TrendingUp, color: 'text-green-600' },
    { label: '总订单数', value: '156', sub: '+8%', icon: ShoppingBag, color: 'text-blue-600' },
    { label: '商品点击', value: '3,240', sub: '+15%', icon: Users, color: 'text-purple-600' },
    { label: '对话咨询', value: '48', sub: '-2%', icon: BarChart3, color: 'text-orange-600' },
  ];

  const orderTodos = [
    { label: '未付款', count: 12, color: 'text-blue-600' },
    { label: '待处理出货', count: 5, color: 'text-orange-600' },
    { label: '已处理出货', count: 8, color: 'text-green-600' },
    { label: '取消待处理', count: 1, color: 'text-red-600' },
    { label: '待退款/退货', count: 2, color: 'text-red-500' },
  ];

  const productTodos = [
    { label: '已售完', count: 1, color: 'text-gray-400' },
    { label: '库存预警', count: 3, color: 'text-orange-500' },
  ];

  return (
    <div className="p-4 space-y-6 pb-12">
      {/* 1. 待办清单 (Order & Product) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800 text-sm flex items-center">
            <Clock size={16} className="mr-1.5 text-blue-600" /> 待办清单 - 订单
          </h3>
          <span className="text-[10px] text-gray-400">实时更新</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {orderTodos.map((todo, i) => (
            <div key={i} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <span className={`text-lg font-black ${todo.color}`}>{todo.count}</span>
              <span className="text-[10px] text-gray-500 mt-1 font-medium">{todo.label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <h3 className="font-bold text-gray-800 text-sm flex items-center">
            <ShoppingBag size={16} className="mr-1.5 text-blue-600" /> 待办清单 - 商品
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {productTodos.map((todo, i) => (
            <div key={i} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <span className={`text-lg font-black ${todo.color}`}>{todo.count}</span>
              <span className="text-[10px] text-gray-500 mt-1 font-medium">{todo.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. 客服接入通知卡片 */}
      <section>
        <div className="bg-blue-600 rounded-2xl p-4 text-white shadow-lg shadow-blue-100 flex items-center justify-between group active:scale-95 transition-transform">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <MessageSquare size={20} />
            </div>
            <div>
              <p className="font-bold text-sm">客服接入通知</p>
              <p className="text-[10px] text-blue-100 mt-0.5">当前有 2 位客户正在咨询...</p>
            </div>
          </div>
          <button 
            onClick={() => navigateTo('ai_service')}
            className="bg-white text-blue-600 text-[10px] font-bold px-3 py-1.5 rounded-full"
          >
            立即处理
          </button>
        </div>
      </section>

      {/* 3. 数据分析 */}
      <section className="space-y-4">
        <h3 className="font-bold text-gray-800 text-sm flex items-center">
          <BarChart3 size={16} className="mr-1.5 text-blue-600" /> 数据分析
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] text-gray-400 font-medium">{stat.label}</span>
                <span className={`text-[9px] font-bold ${stat.sub.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.sub}
                </span>
              </div>
              <p className="text-lg font-black text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm h-48">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-gray-400">销售额趋势</span>
            <button className="text-[10px] text-blue-600 font-bold">详情</button>
          </div>
          <div className="h-full w-full pb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* 4. 平台操作指引 */}
      <section className="space-y-3">
        <h3 className="font-bold text-gray-800 text-sm flex items-center">
          <HelpCircle size={16} className="mr-1.5 text-blue-600" /> 平台操作指引
        </h3>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50 shadow-sm">
          <GuideItem icon={BookOpen} title="如何快速上架商品" />
          <GuideItem icon={MousePointer2} title="AI 客服自动回复设置教程" />
          <GuideItem icon={Info} title="供应链选品与佣金说明" />
        </div>
      </section>
    </div>
  );
};

const GuideItem = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <button className="w-full p-4 flex items-center justify-between active:bg-gray-50 transition-colors">
    <div className="flex items-center">
      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mr-3">
        <Icon size={16} />
      </div>
      <span className="text-xs font-medium text-gray-700">{title}</span>
    </div>
    <ChevronRight size={14} className="text-gray-300" />
  </button>
);

export default Dashboard;
