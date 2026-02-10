
import React from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  PlusCircle, 
  Star,
  ChevronRight,
  TrendingUp,
  Tag
} from 'lucide-react';

const MOCK_MARKET_PRODUCTS = [
  { id: 'm1', name: '极速发热羽绒服', price: 499, supplier: '远东制衣', rating: 4.9, sales: '2.3w', commission: 45, image: 'https://picsum.photos/400/400?random=11' },
  { id: 'm2', name: '全自动咖啡机 Pro', price: 1299, supplier: '德隆科技', rating: 4.8, sales: '1.2w', commission: 120, image: 'https://picsum.photos/400/400?random=12' },
  { id: 'm3', name: '人体工学办公椅', price: 688, supplier: '永和家具', rating: 4.7, sales: '5k', commission: 68, image: 'https://picsum.photos/400/400?random=13' },
  { id: 'm4', name: '无线筋膜枪 S2', price: 299, supplier: '迈胜运动', rating: 4.9, sales: '8k', commission: 30, image: 'https://picsum.photos/400/400?random=14' },
];

const SupplyChainMarket: React.FC<{ navigateTo: (p: any) => void }> = ({ navigateTo }) => {
  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Search Header */}
      <div className="bg-white px-4 py-3 flex items-center space-x-3 sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <button onClick={() => navigateTo('products')} className="p-1 text-gray-500">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 bg-gray-100 rounded-2xl px-3 flex items-center border border-transparent focus-within:border-blue-200 transition-all">
          <Search size={16} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="搜全网货源" 
            className="bg-transparent border-0 w-full p-2 text-sm focus:outline-none"
          />
        </div>
        <button className="text-gray-500">
          <Filter size={20} />
        </button>
      </div>

      {/* Trending Categories */}
      <div className="p-4 flex space-x-4 overflow-x-auto bg-white border-b border-gray-50">
        <CategoryItem label="精选" active />
        <CategoryItem label="服饰" />
        <CategoryItem label="数码" />
        <CategoryItem label="美妆" />
        <CategoryItem label="家居" />
        <CategoryItem label="户外" />
      </div>

      {/* Hero Banner */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-5 text-white flex items-center justify-between shadow-lg shadow-indigo-100">
          <div>
            <h4 className="text-lg font-black italic">TOP SELLERS</h4>
            <p className="text-[10px] text-indigo-100 mt-1 uppercase tracking-widest">本周热推爆品榜</p>
            <button className="mt-4 bg-white text-indigo-600 text-[10px] font-black px-4 py-2 rounded-xl">
              立即查看
            </button>
          </div>
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
            <TrendingUp size={48} />
          </div>
        </div>
      </div>

      {/* Marketplace Grid */}
      <div className="p-4 grid grid-cols-2 gap-4 pb-24">
        {MOCK_MARKET_PRODUCTS.map(product => (
          <div key={product.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group active:scale-95 transition-transform">
            <div className="relative aspect-square">
              <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
              <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-1 rounded-lg">
                销量 {product.sales}
              </div>
              <div className="absolute bottom-2 right-2 bg-yellow-400 text-yellow-900 text-[9px] font-black px-2 py-1 rounded-lg flex items-center">
                <Star size={8} fill="currentColor" className="mr-0.5" /> {product.rating}
              </div>
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h5 className="text-xs font-bold text-gray-800 line-clamp-2 leading-tight">{product.name}</h5>
                <p className="text-[9px] text-gray-400 mt-1 flex items-center">
                  <Tag size={10} className="mr-1" /> {product.supplier}
                </p>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                   <span className="text-blue-600 font-black">¥{product.price}</span>
                   <span className="text-[9px] bg-blue-50 text-blue-600 font-bold px-1.5 py-0.5 rounded border border-blue-100">
                     赚 ¥{product.commission}
                   </span>
                </div>
                <button className="w-full bg-blue-600 text-white text-[10px] font-black py-2 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <PlusCircle size={14} className="mr-1.5" /> 一键加购
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CategoryItem = ({ label, active }: { label: string, active?: boolean }) => (
  <button className={`whitespace-nowrap text-sm font-bold px-4 py-1.5 rounded-full transition-colors ${
    active ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'
  }`}>
    {label}
  </button>
);

export default SupplyChainMarket;
