
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MessageSquare, 
  ChevronRight, 
  Star, 
  Calendar, 
  Zap, 
  ShoppingBag,
  Share2,
  FileText,
  Gem,
  Layout,
  Clock,
  Send,
  HelpCircle,
  Plus,
  Bot,
  Camera,
  Compass,
  Map,
  Coffee,
  Heart,
  ShieldCheck,
  Award,
  Users,
  Image as ImageIcon,
  Car,
  Quote,
  Phone
} from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'bot';
  content: string | React.ReactNode;
}

const MOCK_REVIEWS = [
  { id: 1, name: '王女士', avatar: 'https://picsum.photos/100/100?random=51', rating: 5, comment: '小王拍照技术真的绝了！不仅行程安排得合理，还帮我们拍了好多大片，非常有耐心。' },
  { id: 2, name: '陈先生', avatar: 'https://picsum.photos/100/100?random=52', rating: 5, comment: '车子很新很干净，一路上小王讲解得非常深度，比自己瞎逛有意思多了。推荐！' },
  { id: 3, name: '张同学', avatar: 'https://picsum.photos/100/100?random=53', rating: 5, comment: '带父母出来的，小王很照顾老人家，体力活都抢着干，非常有礼貌的小伙子。' },
  { id: 4, name: 'Lucy', avatar: 'https://picsum.photos/100/100?random=54', rating: 5, comment: 'Professional guide and amazing photographer. Highly recommend for international travelers!' },
];

const AgentMainPage: React.FC<{ navigateTo: (p: any) => void }> = ({ navigateTo }) => {
  const [bookingCode, setBookingCode] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  const handleSuggestionClick = (question: string) => {
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: question }];
    setMessages(newMessages);

    // Mock response logic with enhanced visual components
    setTimeout(() => {
      let response: ChatMessage['content'] = '';
      if (question === '拨打咨询电话') {
        response = (
          <div className="space-y-3">
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white animate-pulse shadow-lg">
                <Phone size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[12px] font-black text-blue-900">正在为您呼叫小王...</p>
                <p className="text-[10px] text-blue-600 mt-0.5">响应时间通常小于 15 秒</p>
              </div>
              <button 
                onClick={() => window.location.href = 'tel:123456789'}
                className="bg-white text-blue-600 text-[10px] font-black px-4 py-2 rounded-xl shadow-sm border border-blue-50"
              >
                立即拨打
              </button>
            </div>
            <p className="text-[11px] text-slate-500 italic">或者您可以继续在这里留言，我会尽快回复。</p>
          </div>
        );
      } else if (question === '贵阳3日地陪行程') {
        response = (
          <div className="space-y-3">
            <p className="text-[12px] font-bold text-slate-700">这是为您精心规划的贵阳经典行程，包含专车服务与金牌讲解：</p>
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md">
              <img src="https://picsum.photos/600/300?random=201" className="w-full h-32 object-cover" />
              <div className="p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <h5 className="text-sm font-black text-slate-900">贵阳山水人文深度3日游</h5>
                  <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full">热门推荐</span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-50">
                  <div className="text-center border-r border-slate-50">
                    <p className="text-[9px] text-slate-400">天数</p>
                    <p className="text-[11px] font-black">3天2晚</p>
                  </div>
                  <div className="text-center border-r border-slate-50">
                    <p className="text-[9px] text-slate-400">成团</p>
                    <p className="text-[11px] font-black">私家团</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] text-slate-400">满意度</p>
                    <p className="text-[11px] font-black">100%</p>
                  </div>
                </div>
                <ul className="text-[10px] text-slate-500 space-y-1">
                  <li>• D1: 黔灵山漫步，甲秀楼赏贵阳夜色</li>
                  <li>• D2: 黄果树大瀑布，VIP通道直达景区</li>
                  <li>• D3: 青岩古镇寻味，沉浸式明清体验</li>
                </ul>
                <button className="w-full bg-blue-600 text-white py-2 rounded-xl text-[11px] font-black mt-2">立即咨询细节</button>
              </div>
            </div>
            <p className="text-[11px] text-blue-600 font-bold">您对这套行程感兴趣吗？或者需要我为您针对性调整？</p>
          </div>
        );
      } else if (question === '看看摄影作品') {
        response = (
          <div className="space-y-3">
            <p className="text-[12px] font-bold text-slate-700">这是我近期为客人们拍摄的部分作品，全部为实地取景：</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative group">
                <img src="https://picsum.photos/300/400?random=301" className="rounded-xl h-40 w-full object-cover shadow-sm" />
                <span className="absolute bottom-2 left-2 text-[9px] text-white bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">万峰林日落</span>
              </div>
              <div className="grid grid-rows-2 gap-2">
                <img src="https://picsum.photos/300/200?random=302" className="rounded-xl h-[76px] w-full object-cover shadow-sm" />
                <img src="https://picsum.photos/300/200?random=303" className="rounded-xl h-[76px] w-full object-cover shadow-sm" />
              </div>
            </div>
            <div className="bg-indigo-50 p-2.5 rounded-xl border border-indigo-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-indigo-700">查看完整高清客片集 (48张)</span>
              <ChevronRight size={14} className="text-indigo-400" />
            </div>
            <p className="text-[11px] text-blue-600 font-bold">我不仅是您的导游，更是您的首席摄影师。您喜欢哪种风格？</p>
          </div>
        );
      } else if (question === '看看车型图片') {
        response = (
          <div className="space-y-3">
            <p className="text-[12px] font-bold text-slate-700">我们的自营车队提供最高标准的商务与越野体验：</p>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
               <div className="flex items-center p-3 space-x-3">
                  <img src="https://picsum.photos/200/200?random=401" className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <h6 className="text-[11px] font-black">奔驰商务 V260L (尊享版)</h6>
                    <p className="text-[9px] text-slate-400 mt-0.5">7座 | 零重力座椅 | 车载冰箱</p>
                    <div className="flex mt-1 space-x-1">
                      <span className="text-[8px] bg-slate-50 px-1.5 py-0.5 rounded text-slate-500">超大空间</span>
                      <span className="text-[8px] bg-slate-50 px-1.5 py-0.5 rounded text-slate-500">五星安全</span>
                    </div>
                  </div>
               </div>
               <div className="bg-slate-50 p-2 flex justify-between items-center px-4">
                  <span className="text-[10px] text-slate-400 italic">2年内准新车，保险齐全</span>
                  <button className="text-[10px] font-bold text-blue-600">更多车型</button>
               </div>
            </div>
            <p className="text-[11px] text-blue-600 font-bold">所有车辆每日全车消毒，配备饮用水与零食包。您想体验哪款？</p>
          </div>
        );
      }
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
    }, 600);
  };

  return (
    <div className="min-h-full bg-white flex flex-col relative pb-52">
      {/* Header - Landscape Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
          className="w-full h-full object-cover" 
          alt="Landscape Background" 
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10"></div>
      </div>

      {/* Profile Card - Overlapping */}
      <div className="px-4 -mt-16 relative z-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-[24px] p-5 shadow-xl border border-white/60 relative overflow-visible">
          {/* Floating Avatar */}
          <div className="absolute -top-6 left-5">
            <div className="w-16 h-16 rounded-full border-[3px] border-white shadow-lg overflow-hidden bg-white ring-1 ring-blue-50">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=200&h=200" 
                className="w-full h-full object-cover" 
                alt="王小明" 
              />
            </div>
            {/* Status Dot */}
            <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 border-[2px] border-white rounded-full shadow-sm"></div>
          </div>

          {/* Info Content - Horizontal Layout */}
          <div className="pl-20 pt-1"> 
             <div className="flex items-center space-x-2">
               <h2 className="text-lg font-black text-slate-900 tracking-tight">王小明</h2>
               <div className="text-blue-500 bg-blue-50 p-1 rounded-md">
                 <Gem size={14} fill="currentColor" className="text-blue-500" />
               </div>
             </div>
             <p className="text-[10px] text-slate-500 mt-1 font-bold">金牌地陪 | 贵州旅游行程助手</p>
          </div>
        </div>
      </div>

      {/* Welcome Bubble */}
      <div className="px-4 mt-3 relative z-10">
        <div className="bg-blue-50/80 backdrop-blur-sm p-4 rounded-[20px] rounded-tl-none border border-blue-100/50 shadow-sm relative ml-2">
           {/* Little triangle for bubble effect */}
           <div className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-blue-50/80 border-t border-l border-blue-100/50 transform -rotate-45"></div>
           <p className="text-[13px] text-slate-700 leading-relaxed font-bold">
            "你好！我是金牌地陪小王。欢迎来到多彩贵州！关于旅行规划的任何小疑问，我都超乐意帮您解答呢！(๑•̀ㅂ•́)و✧"
          </p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="px-6 space-y-6 mt-4">
        {/* Professional Skills */}
        <div className="space-y-3">
           <h4 className="text-[12px] font-black text-slate-800 flex items-center px-1">
             <Award size={14} className="mr-1.5 text-yellow-500" /> 我的服务优势
           </h4>
           <div className="grid grid-cols-4 gap-3">
             {[
               { name: '定制摄影', icon: Camera },
               { name: '深度讲解', icon: FileText },
               { name: '越野领队', icon: Compass },
               { name: '美食品鉴', icon: Coffee }
             ].map(skill => (
               <div key={skill.name} className="flex flex-col items-center group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 mb-1.5 transition-all group-hover:bg-blue-600 group-hover:text-white">
                     <skill.icon size={20} strokeWidth={2.5} />
                  </div>
                  <span className="text-[9px] font-black text-slate-500 text-center leading-tight">{skill.name}</span>
               </div>
             ))}
           </div>
        </div>

        {/* Recommended Items */}
        <div className="space-y-3">
          <h4 className="text-[12px] font-black text-slate-800 flex items-center justify-between px-1">
            <div className="flex items-center">
              <ShoppingBag size={16} className="mr-1.5 text-pink-500" /> 精选服务
            </div>
            <button className="text-[10px] text-blue-600 font-black">查看更多</button>
          </h4>
          <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-1">
            <ServiceCard title="梵净山私享2日游" price="1,299" image="https://picsum.photos/400/300?random=21" />
            <ServiceCard title="肇兴侗寨全景摄影包" price="899" image="https://picsum.photos/400/300?random=22" />
          </div>
        </div>

        {/* Client Reviews - NEW SCROLLABLE SECTION */}
        <div className="space-y-3">
          <h4 className="text-[12px] font-black text-slate-800 flex items-center justify-between px-1">
            <div className="flex items-center">
              <Users size={16} className="mr-1.5 text-blue-500" /> 他人的评价
            </div>
            <span className="text-[10px] text-gray-400 font-medium">128+ 好评</span>
          </h4>
          <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-1">
            {MOCK_REVIEWS.map(review => (
              <div key={review.id} className="w-64 flex-shrink-0 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col space-y-2 relative">
                <Quote size={20} className="absolute top-2 right-2 text-blue-50 opacity-20" />
                <div className="flex items-center space-x-2">
                  <img src={review.avatar} className="w-8 h-8 rounded-full object-cover border border-gray-100" />
                  <div>
                    <p className="text-[11px] font-black text-slate-800">{review.name}</p>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={8} fill="#EAB308" stroke="#EAB308" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-600 leading-relaxed line-clamp-2 italic">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* History Messages Area */}
        {messages.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-dashed border-gray-100 animate-in fade-in slide-in-from-bottom-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'bot' && (
                  <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 mr-2 shadow-md">
                    <Bot size={16} />
                  </div>
                )}
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-[12px] font-medium shadow-md ${
                  msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-slate-50 rounded-tl-none text-slate-800'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FLOATING ACTION AREA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-xl border-t border-gray-100 safe-area-bottom z-[60] p-4 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1)]">
        
        {/* PROGRESS BAR BANNER */}
        <div className="mb-4">
          <button 
            onClick={() => navigateTo('home')}
            className="w-full bg-white border border-blue-100 p-4 rounded-3xl shadow-xl shadow-blue-500/5 relative overflow-hidden group active:scale-[0.98] transition-all"
          >
            <div className="absolute top-0 left-0 h-full bg-blue-50/50 w-1/2 transition-all group-hover:w-[55%]"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-200">
                   <Layout size={18} />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-black text-slate-900">主页搭建进度已完成 50%</p>
                  <p className="text-[10px] text-blue-500 font-bold">完善信息获得 3倍曝光加成</p>
                </div>
              </div>
              <div className="flex items-center text-blue-600 font-black text-[11px] bg-white/80 px-3 py-1.5 rounded-full shadow-sm">
                继续搭建 <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100/50">
               <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 w-1/2 rounded-r-full"></div>
            </div>
          </button>
        </div>

        {/* QUICK ACTION BUTTONS - DOWNSZIED TO CHIPS */}
        <div className="flex space-x-2 mb-4 overflow-x-auto no-scrollbar">
           {[
             { label: '拨打咨询电话', icon: Phone },
             { label: '贵阳3日地陪行程', icon: Map },
             { label: '看看摄影作品', icon: ImageIcon },
             { label: '看看车型图片', icon: Car }
           ].map(item => (
             <button 
               key={item.label} 
               onClick={() => handleSuggestionClick(item.label)}
               className={`flex-shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap shadow-sm ${
                 item.label === '拨打咨询电话' 
                 ? 'bg-blue-600 text-white active:bg-blue-700' 
                 : 'bg-slate-50 border border-slate-200 text-slate-600 active:bg-blue-50 active:text-blue-600 active:border-blue-200'
               }`}
             >
               <item.icon size={12} className={item.label === '拨打咨询电话' ? '' : 'opacity-70'} />
               <span>{item.label}</span>
             </button>
           ))}
        </div>

        {/* INPUT AREA */}
        <div className="flex items-center space-x-3">
           <div className="flex-1 bg-slate-100/80 rounded-[1.5rem] px-5 py-3 flex items-center group focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all border border-transparent focus-within:border-blue-200 shadow-inner">
              <input type="text" placeholder="向金牌地陪提问..." className="bg-transparent border-0 w-full text-sm focus:outline-none font-bold text-slate-800 h-6" />
              <button className="ml-2 text-blue-600 active:scale-110 transition-transform"><Send size={20} /></button>
           </div>
           <button className="p-3 bg-slate-100 rounded-2xl text-slate-400 active:bg-slate-200 transition-colors">
              <Plus size={22} strokeWidth={3} />
           </button>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ title, price, image }: { title: string, price: string, image: string }) => (
  <div className="w-40 flex-shrink-0 bg-white rounded-3xl border border-slate-50 shadow-md overflow-hidden flex flex-col active:scale-95 transition-transform group">
    <div className="relative overflow-hidden">
      <img src={image} className="h-28 w-full object-cover group-hover:scale-110 transition-transform duration-500" alt={title} />
      <div className="absolute top-2 right-2 bg-black/30 backdrop-blur-md text-white text-[8px] px-2 py-0.5 rounded-full">高评分</div>
    </div>
    <div className="p-3.5 space-y-1.5">
      <p className="text-[11px] font-black text-slate-800 line-clamp-1">{title}</p>
      <p className="text-[12px] font-black text-blue-600">¥{price}</p>
    </div>
  </div>
);

const GuideButton = ({ icon: Icon, label, color }: { icon: any, label: string, color: string }) => (
  <button className={`flex items-center justify-center space-x-2 py-3.5 rounded-2xl border shadow-sm active:scale-[0.98] transition-all group ${color}`}>
    <Icon size={18} className="group-hover:rotate-12 transition-transform" />
    <span className="text-[11px] font-black tracking-tight">{label}</span>
  </button>
);

export default AgentMainPage;
