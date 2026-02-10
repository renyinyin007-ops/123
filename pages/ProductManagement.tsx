
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Package, 
  MoreVertical, 
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ShoppingBag,
  ListOrdered,
  Layers,
  Filter
} from 'lucide-react';
import { Product, SKU } from '../types';

const MOCK_PRODUCTS: Product[] = [
  { 
    id: '1', 
    code: 'P-829101',
    name: '全真皮商务公文包', 
    price: 1299, 
    stock: 15, 
    status: 'active', 
    image: 'https://picsum.photos/200/200?random=1', 
    commission: 15, 
    isSupplyChain: true,
    sortOrder: 1,
    skus: [
      { id: 's1', name: '经典黑', price: 1299, stock: 10 },
      { id: 's2', name: '咖啡棕', price: 1299, stock: 5 },
    ]
  },
  { 
    id: '2', 
    code: 'P-829102',
    name: '智能降噪蓝牙耳机 Pro', 
    price: 899, 
    stock: 4, 
    status: 'active', 
    image: 'https://picsum.photos/200/200?random=2', 
    commission: 20, 
    isSupplyChain: false,
    sortOrder: 2,
    skus: [
      { id: 's3', name: '深空灰', price: 899, stock: 2 },
      { id: 's4', name: '珍珠白', price: 899, stock: 2 },
    ]
  },
  { 
    id: '3', 
    code: 'P-829103',
    name: '极简北欧风保温杯', 
    price: 159, 
    stock: 120, 
    status: 'reviewing', 
    image: 'https://picsum.photos/200/200?random=3', 
    commission: 10, 
    isSupplyChain: true,
    sortOrder: 3
  },
  { 
    id: '4', 
    code: 'P-829104',
    name: '手作真丝领带', 
    price: 499, 
    stock: 0, 
    status: 'inactive', 
    image: 'https://picsum.photos/200/200?random=4', 
    commission: 12, 
    isSupplyChain: false,
    sortOrder: 4
  },
  { 
    id: '5', 
    code: 'P-829105',
    name: '违规测试商品', 
    price: 99, 
    stock: 100, 
    status: 'violation', 
    image: 'https://picsum.photos/200/200?random=5', 
    commission: 5, 
    isSupplyChain: false,
    sortOrder: 5
  },
];

type ProductStatus = 'all' | 'active' | 'reviewing' | 'inactive' | 'violation';

const ProductManagement: React.FC<{ navigateTo: (p: any) => void }> = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState<ProductStatus>('all');

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    if (activeTab === 'all') return true;
    return p.status === activeTab;
  });

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* 1. Supply Chain Banner - Click to navigate */}
      <div className="p-4 pb-2">
        <button 
          onClick={() => navigateTo('supply_chain')}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-5 text-white flex items-center justify-between shadow-lg shadow-blue-100 relative overflow-hidden group active:scale-95 transition-transform"
        >
          <div className="relative z-10 text-left">
            <h3 className="text-base font-bold flex items-center">
              <ShoppingBag size={18} className="mr-2" /> 供应链平台商品
            </h3>
            <p className="text-[11px] text-blue-100 mt-1">精选百万货源，一键加购赚佣金</p>
            <div className="mt-3 inline-flex items-center text-xs font-bold bg-white text-blue-600 px-3 py-1.5 rounded-xl">
              进入市场 <ChevronRight size={14} className="ml-1" />
            </div>
          </div>
          <Package size={80} className="absolute -right-4 -bottom-4 text-white/10 rotate-12 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white px-2 pt-2 border-b border-gray-100 flex overflow-x-auto sticky top-0 z-30">
        <TabItem label="全部" active={activeTab === 'all'} onClick={() => setActiveTab('all')} />
        <TabItem label="架上" active={activeTab === 'active'} onClick={() => setActiveTab('active')} />
        <TabItem label="审查中" active={activeTab === 'reviewing'} onClick={() => setActiveTab('reviewing')} />
        <TabItem label="未上架" active={activeTab === 'inactive'} onClick={() => setActiveTab('inactive')} />
        <TabItem label="违规/删除" active={activeTab === 'violation'} onClick={() => setActiveTab('violation')} />
      </div>

      <div className="p-4 space-y-4">
        {/* Search & Actions */}
        <div className="flex gap-2">
          <div className="flex-1 bg-white rounded-2xl px-3 flex items-center border border-gray-100 shadow-sm">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="搜索商品名称" 
              className="bg-transparent border-0 w-full p-2.5 text-sm focus:outline-none"
            />
          </div>
          <button className="bg-white border border-gray-100 text-gray-500 p-2.5 rounded-2xl flex items-center justify-center shadow-sm active:bg-gray-50">
            <Filter size={20} />
          </button>
          <button className="bg-blue-600 text-white p-2 px-4 rounded-2xl flex items-center text-sm font-bold shadow-sm shadow-blue-200">
            <Plus size={18} className="mr-1" /> 新增
          </button>
        </div>

        {/* Product List */}
        <div className="space-y-3 pb-20">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TabItem = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2.5 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
      active ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
    }`}
  >
    {label}
  </button>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
      <div className="p-3.5 flex">
        <img src={product.image} className="w-20 h-20 rounded-2xl object-cover bg-gray-50 flex-shrink-0" alt={product.name} />
        <div className="ml-3.5 flex-1 flex flex-col justify-between min-w-0">
          <div className="flex justify-between items-start">
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-gray-800 line-clamp-1 leading-tight">{product.name}</h4>
              <p className="text-[10px] text-gray-400 mt-1 font-mono">编码: {product.code}</p>
            </div>
            <button className="p-1 text-gray-300"><MoreVertical size={16} /></button>
          </div>
          <div className="mt-1 flex items-center space-x-2">
            {product.isSupplyChain && (
              <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-lg font-bold border border-indigo-100 flex items-center">
                <ExternalLink size={10} className="mr-0.5" /> 供应链
              </span>
            )}
            <StatusBadge status={product.status} />
            {product.status === 'active' && (
              <span className="text-[10px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded-lg font-bold border border-slate-100">
                排序: {product.sortOrder}
              </span>
            )}
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-blue-600 font-bold">¥{product.price}</span>
            <span className="text-[10px] text-gray-400">总库存: {product.stock}</span>
          </div>
        </div>
      </div>
      
      {/* Bottom Actions Row */}
      <div className="px-3.5 py-3 border-t border-gray-50 flex items-center justify-between bg-white">
        <div className="flex items-center space-x-2">
          {product.skus && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[10px] text-slate-500 font-bold flex items-center bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100 active:bg-slate-100 transition-colors"
            >
              <Layers size={12} className="mr-1" />
              {product.skus.length}个SKU
              {isExpanded ? <ChevronDown size={12} className="ml-1 rotate-180 transition-transform" /> : <ChevronDown size={12} className="ml-1 transition-transform" />}
            </button>
          )}
        </div>
        <div className="flex space-x-2">
          {(product.status === 'active' || product.status === 'inactive') && (
            <button className="text-[11px] text-indigo-600 font-bold px-3 py-1.5 bg-indigo-50 rounded-xl active:bg-indigo-100 border border-indigo-100 flex items-center">
              <Package size={12} className="mr-1" /> 库存
            </button>
          )}
          {product.status === 'active' && (
            <button className="text-[11px] text-slate-600 font-bold px-3 py-1.5 bg-slate-50 rounded-xl active:bg-slate-100 border border-slate-100 flex items-center">
              <ListOrdered size={12} className="mr-1" /> 排序
            </button>
          )}
          <button className="text-[11px] text-gray-600 font-bold px-3 py-1.5 border border-gray-200 rounded-xl active:bg-gray-50">编辑</button>
        </div>
      </div>

      {/* Expandable SKU List */}
      {isExpanded && product.skus && (
        <div className="px-3.5 pb-3 bg-slate-50/50 animate-in slide-in-from-top-2">
          <div className="space-y-1 mt-2">
            {product.skus.map(sku => (
              <div key={sku.id} className="flex justify-between items-center bg-white p-2 rounded-xl border border-gray-100 text-[10px]">
                <span className="font-medium text-gray-600">{sku.name}</span>
                <div className="flex space-x-4">
                  <span className="text-gray-400">库存: <span className="text-gray-800 font-bold">{sku.stock}</span></span>
                  <span className="text-blue-600 font-bold">¥{sku.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alert Messaging */}
      {product.stock < 5 && product.stock > 0 && product.status === 'active' && (
        <div className="mx-3.5 mb-3 flex items-center text-yellow-600 text-[10px] bg-yellow-50 p-2 rounded-xl border border-yellow-100">
          <AlertTriangle size={12} className="mr-1.5 flex-shrink-0" /> 库存紧张，请及时补货
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }: { status: ProductStatus }) => {
  const config = {
    active: { label: '销售中', style: 'bg-green-50 text-green-600 border-green-100' },
    reviewing: { label: '审核中', style: 'bg-yellow-50 text-yellow-600 border-yellow-100' },
    inactive: { label: '未上架', style: 'bg-slate-100 text-slate-500 border-slate-200' },
    violation: { label: '违规/删除', style: 'bg-red-50 text-red-600 border-red-100' },
    all: { label: '', style: '' }
  };

  if (status === 'all') return null;

  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-lg font-bold border ${config[status].style}`}>
      {config[status].label}
    </span>
  );
};

export default ProductManagement;
