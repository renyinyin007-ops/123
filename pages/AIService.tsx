
import React, { useState } from 'react';
import { 
  Zap, 
  Sparkles,
  Search,
  Activity,
  MessageCircle,
  Cpu,
  User,
  Users,
  Plus,
  ArrowLeft,
  ChevronRight,
  Send,
  History,
  Clock,
  Loader2,
  X,
  Bot,
  Star,
  Award,
  Camera,
  Map,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { FAQ } from '../types';

const INITIAL_FAQS: FAQ[] = [
  { id: '1', question: '支持无理由退货吗？', answer: '支持7天无理由退货，但需保证商品不影响二次销售。' },
  { id: '2', question: '什么时候发货？', answer: '下单后48小时内安排发货，具体视供应链库存情况而定。' },
];

interface PendingFAQ {
  id: string;
  question: string;
}

const MOCK_PENDING_FAQS: PendingFAQ[] = [
  { id: 'p1', question: '你们家最晚几点闭店？' },
  { id: 'p2', question: '如果尺码不合适，换货邮费谁出？' },
];

interface Session {
  id: string;
  user: string;
  rounds: number;
  product: string;
  lastMessage: string;
  time: string;
  isHistory?: boolean;
}

interface Message {
  id: string;
  role: 'user' | 'ai' | 'system';
  content: string;
  type?: 'text' | 'connecting';
}

const AIService: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'performance' | 'settings'>('performance');
  const [faqs, setFaqs] = useState<FAQ[]>(INITIAL_FAQS);
  const [pendingFaqs, setPendingFaqs] = useState<PendingFAQ[]>(MOCK_PENDING_FAQS);
  const [aiInput, setAiInput] = useState('');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  if (selectedSession) {
    return <ConversationDetailView session={selectedSession} onBack={() => setSelectedSession(null)} />;
  }

  return (
    <div className="min-h-full bg-slate-50 flex flex-col p-4 space-y-4">
      {/* Tab Switcher */}
      <div className="bg-white p-1 rounded-2xl flex items-center shadow-sm border border-gray-100">
        <button 
          onClick={() => setActiveTab('performance')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center transition-all ${
            activeTab === 'performance' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-gray-400'
          }`}
        >
          <Activity size={16} className="mr-2" /> 表现情况
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center transition-all ${
            activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-gray-400'
          }`}
        >
          <MessageCircle size={16} className="mr-2" /> 回复设置
        </button>
      </div>

      {activeTab === 'performance' ? (
        <PerformanceView onSelectSession={setSelectedSession} />
      ) : (
        <SettingsView 
          faqs={faqs} 
          pendingFaqs={pendingFaqs}
          aiInput={aiInput} 
          setAiInput={setAiInput} 
        />
      )}
    </div>
  );
};

const PerformanceView: React.FC<{ onSelectSession: (s: Session) => void }> = ({ onSelectSession }) => {
  const realTimeSessions: Session[] = [
    { id: 's1', user: '用户_3829', rounds: 5, product: '全真皮商务公文包', lastMessage: '正在询问：物流状态...', time: '2分钟前' },
    { id: 's2', user: '用户_9521', rounds: 3, product: '智能降噪蓝牙耳机', lastMessage: '耳机支持连接几个设备？', time: '刚刚' },
  ];

  const historySessions: Session[] = [
    { id: 'h1', user: '陈先生', rounds: 12, product: '极简北欧风保温杯', lastMessage: '已购买，谢谢。', time: '昨天', isHistory: true },
    { id: 'h2', user: '王女士', rounds: 8, product: '手作真丝领带', lastMessage: '退款已收到。', time: '2023-10-23', isHistory: true },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. AI Status Card */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center relative overflow-hidden group">
        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center relative flex-shrink-0">
          <Cpu size={32} className="text-green-500" />
          <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-base font-black text-gray-800">AI 在线托管中</h3>
          <p className="text-[10px] text-gray-400 mt-0.5">已为您节省 1,240 分钟工作时间</p>
          <div className="flex items-center space-x-4 mt-2">
            <div>
              <p className="text-[10px] text-gray-400">响应率</p>
              <p className="text-xs font-black text-gray-800">98%</p>
            </div>
            <div className="w-px h-6 bg-gray-50"></div>
            <div>
              <p className="text-[10px] text-gray-400">满意度</p>
              <p className="text-xs font-black text-gray-800">4.9/5</p>
            </div>
          </div>
        </div>
        <div className="absolute -right-2 -bottom-2 opacity-5 text-indigo-500">
           <Zap size={64} fill="currentColor" />
        </div>
      </div>

      {/* 2. Real-time Conversations */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h4 className="font-bold text-gray-800 text-sm flex items-center">
            <Activity size={14} className="mr-1.5 text-blue-500" /> 实时会话
          </h4>
          <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg font-bold">2人正在咨询</span>
        </div>
        <div className="space-y-3">
          {realTimeSessions.map(session => (
            <SessionCard key={session.id} session={session} onSelect={onSelectSession} />
          ))}
        </div>
      </div>

      {/* 3. History Sessions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h4 className="font-bold text-gray-800 text-sm flex items-center">
            <History size={14} className="mr-1.5 text-slate-400" /> 历史会话
          </h4>
          <button className="text-[10px] text-gray-400 font-bold flex items-center">全部 <ChevronRight size={12} /></button>
        </div>
        <div className="space-y-3 opacity-80">
          {historySessions.map(session => (
            <SessionCard key={session.id} session={session} onSelect={onSelectSession} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SessionCard: React.FC<{ session: Session; onSelect: (s: Session) => void }> = ({ session, onSelect }) => (
  <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group active:bg-gray-50 transition-all">
    <div className="flex items-center min-w-0 flex-1 mr-4">
      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 flex-shrink-0 relative">
        <User size={24} />
        {!session.isHistory && (
           <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
      <div className="ml-3 min-w-0">
        <p className="text-sm font-bold text-gray-800 flex items-center">
          {session.user}
          <span className="ml-2 text-[9px] font-normal text-gray-400">{session.time}</span>
        </p>
        <p className="text-[10px] text-indigo-600 font-medium mt-0.5 flex items-center">
          已进行{session.rounds}轮对话 | 咨询：{session.product}
        </p>
        <p className="text-[11px] text-gray-400 mt-1 truncate">{session.lastMessage}</p>
      </div>
    </div>
    <button 
      onClick={() => onSelect(session)}
      className="bg-blue-50 text-blue-600 px-3.5 py-2 rounded-2xl text-[11px] font-black border border-blue-100 flex-shrink-0 active:scale-95 transition-transform"
    >
      查看会话
    </button>
  </div>
);

const ConversationDetailView: React.FC<{ session: Session; onBack: () => void }> = ({ session, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'user', content: `请问这件【${session.product}】什么时候能发货？` },
    { id: '2', role: 'ai', content: `亲亲，这款【${session.product}】下单后48小时内安排发货哦，我们会尽力为您加急处理。请问还有什么可以帮您？` },
    { id: '3', role: 'user', content: '好的，谢谢。大概多久到北京？' },
    { id: '4', role: 'ai', content: '北京地区通常在发货后 2-3 天左右送达。具体视顺丰/邮政物流时效而定。您可以关注订单动态进行查看。' },
  ]);

  const handleTransferToHuman = () => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'system',
      type: 'connecting',
      content: '正在接入人工客服小王...'
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-50 flex flex-col max-w-md mx-auto animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <button onClick={onBack} className="p-1 mr-3 text-gray-500 active:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h3 className="text-sm font-bold text-gray-800">{session.user}</h3>
            <p className="text-[10px] text-green-500 font-bold flex items-center">
              <Activity size={10} className="mr-1" /> AI 托管中
            </p>
          </div>
        </div>
        <div className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-3 py-1 rounded-lg border border-indigo-100 shadow-sm">
          {session.product}
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="flex justify-center">
          <span className="text-[10px] bg-gray-200/50 text-gray-500 px-3 py-1 rounded-full font-bold">14:20 会话开始</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {msg.role === 'system' && msg.type === 'connecting' ? (
              <div className="flex justify-center my-8">
                <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-2xl shadow-blue-500/10 flex flex-col items-center space-y-4 max-w-[280px] text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>
                  
                  <div className="relative pt-2">
                    <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden border-2 border-white shadow-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=200&h=200" 
                        className="w-full h-full object-cover"
                        alt="Agent" 
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-1.5">
                      <h4 className="text-sm font-black text-slate-900">小王 (金牌地陪)</h4>
                      <div className="bg-yellow-400 p-0.5 rounded shadow-sm">
                        <Star size={10} fill="white" stroke="white" />
                      </div>
                    </div>
                    <p className="text-[10px] text-blue-600 font-black">正在为您火速接入...</p>
                  </div>

                  {/* Skills Section */}
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {[
                      { icon: Camera, label: '专业摄影' },
                      { icon: Map, label: '深度定制' },
                      { icon: Award, label: '金牌资质' }
                    ].map((skill, i) => (
                      <div key={i} className="flex items-center space-x-1 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg">
                        <skill.icon size={10} className="text-slate-400" />
                        <span className="text-[9px] font-bold text-slate-500">{skill.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="w-full pt-2">
                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full animate-progress" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`flex items-start ${msg.role === 'ai' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0 text-slate-400 shadow-sm">
                    <User size={16} />
                  </div>
                )}
                
                <div className={`p-3.5 rounded-2xl shadow-sm text-xs leading-relaxed font-medium ${
                  msg.role === 'ai' 
                    ? 'mr-2 bg-indigo-600 text-white rounded-tr-none' 
                    : 'ml-2 bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                } max-w-[80%]`}>
                  {msg.content}
                </div>

                {msg.role === 'ai' && (
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 text-indigo-600 shadow-sm">
                    <Bot size={18} />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="bg-white border-t border-gray-100 p-4 space-y-4 pb-10 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.05)]">
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-slate-100/80 rounded-2xl px-5 py-3 flex items-center border border-transparent focus-within:bg-white focus-within:border-indigo-100 transition-all shadow-inner">
             <input type="text" placeholder="输入消息（AI 托管中）..." className="bg-transparent border-0 w-full text-xs focus:outline-none font-medium" />
             <Send size={18} className="text-indigo-400 active:scale-110 transition-transform" />
          </div>
          <button className="p-3 bg-slate-100 rounded-2xl text-slate-400 active:bg-slate-200 transition-colors">
            <Plus size={20} />
          </button>
        </div>
        
        <button 
          onClick={handleTransferToHuman}
          className="w-full bg-blue-600 text-white py-4 rounded-3xl font-black text-sm shadow-xl shadow-blue-500/20 flex items-center justify-center active:scale-[0.98] transition-all hover:bg-blue-700"
        >
          <Users size={18} className="mr-2" /> 转人工处理
        </button>
      </div>
      
      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const SettingsView = ({ 
  faqs, 
  pendingFaqs,
  aiInput, 
  setAiInput 
}: { 
  faqs: FAQ[], 
  pendingFaqs: PendingFAQ[],
  aiInput: string, 
  setAiInput: any 
}) => (
  <div className="space-y-6 animate-in fade-in duration-300 pb-20">
    {/* AI Generator Box */}
    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
      <div className="flex items-center space-x-2 text-indigo-600">
        <Sparkles size={18} />
        <h3 className="font-bold text-sm">AI 智能扩展知识库</h3>
      </div>
      <p className="text-[11px] text-gray-400 leading-relaxed">
        输入商品描述，AI 将为您自动生成常见问题解答。
      </p>
      
      <div className="relative">
        <textarea 
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          placeholder="例如：这款是一款智能降噪耳机，续航30小时，支持蓝牙5.3..."
          className="w-full min-h-[120px] bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-gray-300 resize-none font-medium"
        />
      </div>

      <button className="w-full bg-indigo-300 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center shadow-lg shadow-indigo-50 active:scale-95 transition-transform">
        <Sparkles size={18} className="mr-2" /> AI 智能生成 FAQ
      </button>
    </div>

    {/* AI Organized Pending Questions */}
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h4 className="font-bold text-gray-800 text-sm flex items-center">
          <HelpCircle size={16} className="mr-1.5 text-blue-500" /> AI 整理待处理问题
        </h4>
        <span className="text-[10px] text-gray-400 font-bold">由 AI 从会话中提取</span>
      </div>

      <div className="space-y-3">
        {pendingFaqs.map(item => (
          <div key={item.id} className="bg-white p-5 rounded-3xl border border-blue-50 shadow-sm space-y-3 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full -mr-12 -mt-12 group-hover:bg-blue-100/50 transition-colors"></div>
            <div className="flex items-start relative z-10">
              <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-black text-[10px] mr-3 mt-0.5 shadow-sm">Q</div>
              <p className="text-sm font-bold text-gray-800 flex-1">{item.question}</p>
            </div>
            <div className="space-y-2 relative z-10">
              <p className="text-[10px] text-slate-400 font-bold ml-9">您的回复：</p>
              <div className="ml-9">
                <textarea 
                  placeholder="填写标准答案后，AI 将其加入知识库"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder-gray-300 resize-none font-medium min-h-[80px]"
                />
              </div>
              <div className="flex justify-end ml-9">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[11px] font-black flex items-center active:scale-95 transition-transform shadow-md shadow-blue-100">
                  <CheckCircle2 size={12} className="mr-1.5" /> 保存至知识库
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Current FAQ List */}
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h4 className="font-bold text-gray-800 text-sm">当前知识库 ({faqs.length})</h4>
        <button className="text-indigo-600 text-xs font-bold flex items-center hover:bg-indigo-50 px-2 py-1 rounded-lg transition-colors">
          <Plus size={14} className="mr-1" /> 手动添加
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map(faq => (
          <div key={faq.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-3 hover:border-indigo-100 transition-colors opacity-80">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 font-black text-[10px] mr-3 mt-0.5 shadow-sm">Q</div>
              <p className="text-sm font-bold text-gray-800 flex-1">{faq.question}</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-green-50 rounded-lg flex items-center justify-center text-green-600 font-black text-[10px] mr-3 mt-0.5 shadow-sm">A</div>
              <p className="text-xs text-gray-500 leading-relaxed flex-1 font-medium">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AIService;
