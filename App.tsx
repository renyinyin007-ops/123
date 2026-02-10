
import React, { useState } from 'react';
import { 
  Home, 
  Package, 
  ClipboardList, 
  Wallet, 
  MoreHorizontal, 
  MessageSquare, 
  Settings, 
  ChevronRight,
  Camera,
  Bot,
  Sparkles,
  Bell
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import ProductManagement from './pages/ProductManagement';
import OrderManagement from './pages/OrderManagement';
import FinanceManagement from './pages/FinanceManagement';
import AIService from './pages/AIService';
import SettingsPage from './pages/SettingsPage';
import SupplyChainMarket from './pages/SupplyChainMarket';
import CreateAgent from './pages/CreateAgent';
import AgentMainPage from './pages/AgentMainPage';

export type Page = 'home' | 'products' | 'orders' | 'wallet' | 'more' | 'ai_service' | 'settings' | 'supply_chain' | 'create_agent' | 'agent_main';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showNotifications, setShowNotifications] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Dashboard navigateTo={setCurrentPage} />;
      case 'products': return <ProductManagement navigateTo={setCurrentPage} />;
      case 'orders': return <OrderManagement />;
      case 'wallet': return <FinanceManagement />;
      case 'ai_service': return <AIService />;
      case 'settings': return <SettingsPage />;
      case 'supply_chain': return <SupplyChainMarket navigateTo={setCurrentPage} />;
      case 'create_agent': return <CreateAgent onComplete={() => setCurrentPage('agent_main')} onBack={() => setCurrentPage('more')} />;
      case 'agent_main': return <AgentMainPage navigateTo={setCurrentPage} />;
      case 'more': return <MoreMenu navigateTo={setCurrentPage} />;
      default: return <Dashboard navigateTo={setCurrentPage} />;
    }
  };

  const NavItem = ({ icon: Icon, label, id }: { icon: any, label: string, id: Page }) => (
    <button 
      onClick={() => setCurrentPage(id)}
      className={`flex flex-col items-center justify-center w-full py-2 transition-colors ${
        currentPage === id || (currentPage === 'agent_main' && id === 'more')
          ? 'text-blue-600' 
          : 'text-gray-500'
      }`}
    >
      <Icon size={22} />
      <span className="text-[10px] mt-1 font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-xl relative overflow-hidden">
      {(currentPage !== 'create_agent' && currentPage !== 'agent_main') && (
        <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800">
            {currentPage === 'home' && '工作台'}
            {currentPage === 'products' && '商品管理'}
            {currentPage === 'orders' && '我的订单'}
            {currentPage === 'wallet' && '资金管理'}
            {currentPage === 'ai_service' && '客服管理'}
            {currentPage === 'settings' && '基本设置'}
            {currentPage === 'supply_chain' && '供应链加购'}
            {currentPage === 'more' && '更多工具'}
          </h1>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 bg-gray-50 rounded-full text-gray-600 relative"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>
      )}

      <main className={`flex-1 overflow-y-auto ${currentPage === 'create_agent' || currentPage === 'agent_main' ? '' : 'pb-24'}`}>
        {renderPage()}
      </main>

      {currentPage !== 'create_agent' && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 flex items-center justify-around safe-area-bottom z-50">
          <NavItem icon={Home} label="首页" id="home" />
          <NavItem icon={Package} label="商品" id="products" />
          <NavItem icon={ClipboardList} label="订单" id="orders" />
          <NavItem icon={MessageSquare} label="客服" id="ai_service" />
          <NavItem icon={MoreHorizontal} label="更多" id="more" />
        </nav>
      )}

      {showNotifications && (
        <div className="absolute top-14 right-4 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 p-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800">最新通知</h3>
            <button className="text-xs text-blue-600" onClick={() => setShowNotifications(false)}>全部忽略</button>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-2 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                <ClipboardList size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">新订单提醒</p>
                <p className="text-xs text-gray-500 mt-0.5">您有一个待处理订单 #8921</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MoreMenu: React.FC<{ navigateTo: (p: Page) => void }> = ({ navigateTo }) => {
  const menuItems = [
    { id: 'wallet' as Page, icon: Wallet, label: '资金管理', desc: '查看收入与提现' },
    { id: 'settings' as Page, icon: Settings, label: '基本设置', desc: '账户与安全设置' },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Profile Header */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center mb-2">
        <div className="relative">
          <img src="https://picsum.photos/200/200?random=5" className="w-14 h-14 rounded-full border border-gray-100 object-cover" alt="Profile" />
          <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1 text-white border-2 border-white">
            <Camera size={10} />
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-base font-bold text-gray-800">王小明的账号</h3>
          <p className="text-[10px] text-gray-400">ID: USER_9527 | 认证商家</p>
        </div>
        <button 
          onClick={() => navigateTo('settings')}
          className="p-2 text-gray-400 hover:text-blue-600"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Special AI Entry Button */}
      <button
        onClick={() => navigateTo('create_agent')}
        className="w-full relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-5 rounded-3xl shadow-xl shadow-blue-200 group active:scale-[0.98] transition-all"
      >
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
        <div className="relative z-10 flex items-center">
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white border border-white/30">
            <Bot size={28} />
          </div>
          <div className="ml-4 text-left">
            <p className="text-white font-black text-lg tracking-wide flex items-center">
              创建我的数字分身 <Sparkles size={16} className="ml-2 text-yellow-300 animate-pulse" />
            </p>
            <p className="text-blue-100 text-[11px] font-medium opacity-80">开启您的 24/7 AI 智能社交时代</p>
          </div>
          <ChevronRight size={20} className="ml-auto text-white/50" />
        </div>
      </button>

      {/* Other Menu Items */}
      <div className="space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigateTo(item.id)}
            className="w-full flex items-center p-4 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 transition-all group shadow-sm"
          >
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <item.icon size={22} />
            </div>
            <div className="ml-4 text-left flex-1">
              <p className="font-bold text-sm text-gray-800">{item.label}</p>
              <p className="text-[10px] text-gray-400">{item.desc}</p>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
