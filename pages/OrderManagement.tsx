
import React, { useState } from 'react';
import { 
  Search, 
  Truck, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Copy,
  ChevronRight,
  Package,
  ChevronDown,
  Filter,
  X
} from 'lucide-react';
import { Order } from '../types';

const MOCK_ORDERS: Order[] = [
  { id: 'ORD-8291', customer: '张三', total: 1299, status: 'to_ship', date: '2023-10-24 14:20', items: 1 },
  { id: 'ORD-8292', customer: '李四', total: 499, status: 'pending_payment', date: '2023-10-24 15:10', items: 2 },
  { id: 'ORD-8290', customer: '王五', total: 899, status: 'shipping', date: '2023-10-24 10:45', items: 1 },
  { id: 'ORD-8288', customer: '陈女士', total: 159, status: 'completed', date: '2023-10-23 09:30', items: 1 },
];

type MainTab = 'all' | 'pending_payment' | 'to_ship' | 'shipping' | 'to_pickup' | 'completed' | 'refund_cancel';
type SearchCategory = 'id' | 'customer' | 'product' | 'tracking' | 'refund_id' | 'return_pkg';

const SEARCH_CATEGORIES: { value: SearchCategory, label: string }[] = [
  { value: 'id', label: '订单编号' },
  { value: 'customer', label: '买家名称' },
  { value: 'product', label: '商品' },
  { value: 'tracking', label: '运单号' },
  { value: 'refund_id', label: '退货申请编号' },
  { value: 'return_pkg', label: '退货包裹单号' },
];

const OrderManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MainTab>('all');
  const [searchCat, setSearchCat] = useState<SearchCategory>('id');
  const [showSearchCat, setShowSearchCat] = useState(false);

  // Sub-filters for "To Ship"
  const [shipSubTab, setShipSubTab] = useState<'all' | 'processing' | 'processed'>('all');

  // Multi-layer filters for "Return/Refund/Cancel"
  const [refundMainCat, setRefundMainCat] = useState<'all' | 'refund' | 'cancel' | 'delivery_failed'>('all');
  const [refundStatus, setRefundStatus] = useState('全部');
  const [refundPriority, setRefundPriority] = useState('全部');
  const [refundAction, setRefundAction] = useState('全部');

  const renderSearchArea = () => (
    <div className="px-4 py-3 bg-white sticky top-[48px] z-30 border-b border-gray-50">
      <div className="flex bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
        <div className="relative border-r border-gray-200">
          <button 
            onClick={() => setShowSearchCat(!showSearchCat)}
            className="h-full px-3 flex items-center space-x-1 text-[11px] font-bold text-gray-700 min-w-[90px] justify-between"
          >
            <span>{SEARCH_CATEGORIES.find(c => c.value === searchCat)?.label}</span>
            <ChevronDown size={14} className={showSearchCat ? 'rotate-180 transition-transform' : 'transition-transform'} />
          </button>
          
          {showSearchCat && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-50 py-1">
              {SEARCH_CATEGORIES.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => {
                    setSearchCat(cat.value);
                    setShowSearchCat(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs ${searchCat === cat.value ? 'text-blue-600 bg-blue-50 font-bold' : 'text-gray-600'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex-1 flex items-center px-3">
          <Search size={16} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="请输入搜索内容" 
            className="bg-transparent border-0 w-full py-2.5 text-sm focus:outline-none"
          />
        </div>
      </div>
    </div>
  );

  const renderRefundFilters = () => {
    if (activeTab !== 'refund_cancel') return null;

    // Explicitly define types to avoid issues with dynamic indexing
    const statuses: Record<string, string[]> = {
      refund: ['全部', '审核中', '退货中', '已退款', '已提出争议', '已拒绝/取消'],
      cancel: ['全部', '审核中', '已退款'],
      delivery_failed: ['全部', '正在退回中', '已送达', '无法送达', '丢失与损坏'],
      all: ['全部']
    };

    const priorities = ['全部', '1天内逾期', '2天内逾期'];
    
    // Explicitly define types to avoid issues with dynamic indexing
    const actions: Record<string, string[]> = {
      refund: ['全部', '回复买家', '提供证据', '安排取件', '验证商品'],
      cancel: ['全部', '回复买家'],
      all: ['全部'],
      delivery_failed: ['全部']
    };

    return (
      <div className="bg-white border-b border-gray-50 overflow-hidden">
        {/* Main Level */}
        <div className="flex space-x-3 px-4 py-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: '全部' },
            { id: 'refund', label: '退货/退款' },
            { id: 'cancel', label: '取消' },
            { id: 'delivery_failed', label: '配送失败' }
          ].map(cat => (
            <Pill 
              key={cat.id} 
              label={cat.label} 
              active={refundMainCat === cat.id} 
              onClick={() => {
                setRefundMainCat(cat.id as any);
                setRefundStatus('全部');
                setRefundPriority('全部');
                setRefundAction('全部');
              }} 
            />
          ))}
        </div>
        
        {refundMainCat !== 'all' && (
          <div className="bg-slate-50/50 space-y-2 py-2">
             {/* Status Level */}
            <div className="flex space-x-2 px-4 overflow-x-auto no-scrollbar items-center">
              <span className="text-[10px] text-gray-400 flex-shrink-0 font-bold mr-1">状态:</span>
              {(statuses[refundMainCat] || statuses.all).map(s => (
                <Pill key={s} label={s} active={refundStatus === s} size="sm" onClick={() => setRefundStatus(s)} />
              ))}
            </div>

            {/* Priority Level (Available for refund and cancel) */}
            {(refundMainCat === 'refund' || refundMainCat === 'cancel') && (
              <div className="flex space-x-2 px-4 overflow-x-auto no-scrollbar items-center">
                <span className="text-[10px] text-gray-400 flex-shrink-0 font-bold mr-1">优先级:</span>
                {priorities.map(p => (
                  <Pill key={p} label={p} active={refundPriority === p} size="sm" onClick={() => setRefundPriority(p)} />
                ))}
              </div>
            )}

            {/* Action Level */}
            <div className="flex space-x-2 px-4 overflow-x-auto no-scrollbar items-center">
              <span className="text-[10px] text-gray-400 flex-shrink-0 font-bold mr-1">操作:</span>
              {(actions[refundMainCat] || actions.all).map(a => (
                <Pill key={a} label={a} active={refundAction === a} size="sm" onClick={() => setRefundAction(a)} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Main Tabs - No top gap, sticky at top */}
      <div className="bg-white px-2 border-b border-gray-100 flex overflow-x-auto sticky top-0 z-40 no-scrollbar shadow-sm">
        <TabItem label="全部" active={activeTab === 'all'} onClick={() => setActiveTab('all')} />
        <TabItem label="待付款" active={activeTab === 'pending_payment'} onClick={() => setActiveTab('pending_payment')} />
        <TabItem label="待出货" active={activeTab === 'to_ship'} onClick={() => setActiveTab('to_ship')} />
        <TabItem label="运送中" active={activeTab === 'shipping'} onClick={() => setActiveTab('shipping')} />
        <TabItem label="待提货" active={activeTab === 'to_pickup'} onClick={() => setActiveTab('to_pickup')} />
        <TabItem label="已完成" active={activeTab === 'completed'} onClick={() => setActiveTab('completed')} />
        <TabItem label="退货/退款/取消" active={activeTab === 'refund_cancel'} onClick={() => setActiveTab('refund_cancel')} />
      </div>

      {renderSearchArea()}

      {/* Sub-tabs for "To Ship" */}
      {activeTab === 'to_ship' && (
        <div className="bg-white flex space-x-4 px-4 py-3 border-b border-gray-50">
          <Pill label="全部" active={shipSubTab === 'all'} onClick={() => setShipSubTab('all')} />
          <Pill label="处理中" active={shipSubTab === 'processing'} onClick={() => setShipSubTab('processing')} />
          <Pill label="已处理" active={shipSubTab === 'processed'} onClick={() => setShipSubTab('processed')} />
        </div>
      )}

      {renderRefundFilters()}

      <div className="p-4 space-y-4 flex-1">
        <div className="space-y-4 pb-20">
          {MOCK_ORDERS.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Use React.FC to ensure that 'key' and other standard props are correctly handled in TypeScript
const TabItem: React.FC<{ label: string, active: boolean, onClick: () => void }> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex-shrink-0 ${
      active ? 'border-blue-600 text-blue-600 bg-blue-50/20' : 'border-transparent text-gray-500'
    }`}
  >
    {label}
  </button>
);

// Use React.FC to ensure that 'key' and other standard props are correctly handled in TypeScript
const Pill: React.FC<{ label: string, active: boolean, onClick: () => void, size?: 'sm' | 'md' }> = ({ label, active, onClick, size = 'md' }) => (
  <button 
    onClick={onClick}
    className={`whitespace-nowrap rounded-full font-bold transition-all ${
      size === 'sm' ? 'px-2.5 py-1 text-[9px]' : 'px-4 py-1.5 text-[11px]'
    } ${
      active ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-500 active:bg-gray-200'
    }`}
  >
    {label}
  </button>
);

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const statusConfig = {
    to_ship: { label: '待出货', color: 'text-orange-600 bg-orange-50', icon: Clock },
    pending_payment: { label: '待付款', color: 'text-blue-600 bg-blue-50', icon: Clock },
    shipping: { label: '运送中', color: 'text-indigo-600 bg-indigo-50', icon: Truck },
    completed: { label: '已完成', color: 'text-green-600 bg-green-50', icon: CheckCircle },
    refunded: { label: '已退款', color: 'text-red-600 bg-red-50', icon: AlertCircle },
    to_pickup: { label: '待提货', color: 'text-purple-600 bg-purple-50', icon: Package },
  };

  const config = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.to_ship;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-white">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-lg">{order.id}</span>
          <button className="text-gray-300 hover:text-blue-500"><Copy size={12} /></button>
        </div>
        <div className={`text-[10px] font-black px-2.5 py-1 rounded-full flex items-center ${config.color} border border-current opacity-90`}>
          <config.icon size={12} className="mr-1" /> {config.label}
        </div>
      </div>

      <div className="p-4 flex items-center">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-gray-400 border border-gray-100">
           <Package size={24} strokeWidth={1.5} />
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-black text-gray-800">买家: {order.customer}</p>
          <p className="text-[10px] text-gray-400 mt-1">共 {order.items} 件商品</p>
          <p className="text-sm font-black text-blue-600 mt-1">合计: ¥{order.total}</p>
        </div>
        <ChevronRight size={18} className="text-gray-300" />
      </div>

      <div className="px-4 py-3 bg-slate-50/30 flex justify-between items-center border-t border-gray-50">
        <span className="text-[9px] font-medium text-gray-400 tracking-tight">{order.date}</span>
        <div className="flex space-x-2">
          {order.status === 'to_ship' && (
            <button className="bg-blue-600 text-white text-[11px] px-4 py-2 rounded-xl font-black shadow-sm active:scale-95 transition-transform">去发货</button>
          )}
          <button className="bg-white text-gray-700 text-[11px] px-4 py-2 rounded-xl border border-gray-200 font-bold active:bg-gray-50">详情</button>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
