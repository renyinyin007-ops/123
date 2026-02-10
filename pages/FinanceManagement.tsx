
import React from 'react';
import { 
  Wallet, 
  CreditCard, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  ChevronRight,
  PieChart,
  FileText
} from 'lucide-react';

const FinanceManagement: React.FC = () => {
  const transactions = [
    { id: '1', title: '订单收入 ORD-8291', amount: '+¥1,104.15', date: '今天 14:20', type: 'in' },
    { id: '2', title: '提现到银行卡', amount: '-¥5,000.00', date: '昨天 09:15', type: 'out' },
    { id: '3', title: '订单收入 ORD-8288', amount: '+¥135.20', date: '2023-10-23', type: 'in' },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-white/10 rounded-lg">
              <Wallet size={18} />
            </div>
            <span className="text-sm font-medium text-slate-300">总可提现金额</span>
          </div>
          <button className="text-xs bg-white/10 px-3 py-1 rounded-full border border-white/5">账单详情</button>
        </div>
        <div className="mb-8">
          <h2 className="text-4xl font-bold">¥12,850.40</h2>
          <p className="text-xs text-slate-400 mt-2 flex items-center">
            <Clock className="w-3 h-3 mr-1" /> 预计下次拨付时间: 10月28日
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 py-3 rounded-2xl font-bold flex items-center justify-center transition-colors">
            申请提现
          </button>
          <button className="bg-white/10 hover:bg-white/20 py-3 rounded-2xl font-bold flex items-center justify-center border border-white/5 transition-colors">
            收款账户
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center">
          <PieChart size={18} className="mr-2 text-blue-600" />
          收支概况
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-400 mb-1">未完成订单金额</p>
            <p className="text-lg font-bold text-gray-800">¥2,480.00</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-400 mb-1">商家保证金</p>
            <p className="text-lg font-bold text-gray-800">¥500.00</p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800">最近收支</h3>
          <button className="text-xs text-blue-600 font-medium flex items-center">
            全部明细 <ChevronRight size={14} />
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 shadow-sm">
          {transactions.map(item => (
            <div key={item.id} className="p-4 flex items-center justify-between active:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className={`p-2 rounded-xl mr-3 ${item.type === 'in' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {item.type === 'in' ? <ArrowDownCircle size={20} /> : <ArrowUpCircle size={20} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                </div>
              </div>
              <p className={`text-sm font-bold ${item.type === 'in' ? 'text-green-600' : 'text-gray-800'}`}>
                {item.amount}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center">
        <div className="p-3 bg-white rounded-xl text-blue-600 mr-4 shadow-sm">
          <FileText size={24} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-blue-800">财务报表导出</p>
          <p className="text-xs text-blue-600 mt-0.5">支持导出 Excel 格式对账单</p>
        </div>
        <ChevronRight size={18} className="text-blue-300" />
      </div>
    </div>
  );
};

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

export default FinanceManagement;
