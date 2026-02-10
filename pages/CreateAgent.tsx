
import React, { useState } from 'react';
import { 
  X, 
  Wand2, 
  Plus, 
  ArrowLeft,
  Bot,
  Grid3X3,
  Award,
  CircleX,
  Sparkles,
  UserCheck,
  CreditCard,
  Smartphone,
  CheckCircle2,
  Camera,
  Loader2,
  ChevronRight,
  Fingerprint,
  Zap
} from 'lucide-react';

interface CreateAgentProps {
  onComplete: () => void;
  onBack: () => void;
}

const SERVICE_TYPES = [
  {
    id: 'travel',
    name: '在地旅行服务',
    sub: [
      {
        id: 'guide',
        name: '行程向导',
        tags: ['导游', '地陪', '研学导师', '探险向导', '徒步领队', '骑行队长']
      },
      { id: 'plan', name: '规划组织' },
      { id: 'accompany', name: '专属陪同' },
      { id: 'recommend', name: '内容推荐官' }
    ]
  },
  { id: 'craft', name: '能工巧匠', sub: [] },
  { id: 'housekeep', name: '家政保洁', sub: [] },
  { id: 'repair', name: '维修疏通', sub: [] },
  { id: 'renovate', name: '装修翻新', sub: [] },
  { id: 'runner', name: '跑腿代办', sub: [] }
];

const CreateAgent: React.FC<CreateAgentProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState<'splash' | 'identity' | 'persona'>('splash');
  
  // Step 1 Data (Identity + Service)
  const [realName, setRealName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);
  const [selectedMainCat, setSelectedMainCat] = useState('travel');
  const [selectedSubCat, setSelectedSubCat] = useState('guide');
  const [selectedServiceTags, setSelectedServiceTags] = useState<string[]>(['地陪']);

  // Step 2 Data (Persona Details)
  const [agentName, setAgentName] = useState('');
  const [desc, setDesc] = useState('');
  const [opening, setOpening] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');
  const [isPerfecting, setIsPerfecting] = useState(false);

  const toggleTag = (tag: string, list: string[], setter: (val: string[]) => void) => {
    if (list.includes(tag)) {
      setter(list.filter(t => t !== tag));
    } else {
      setter([...list, tag]);
    }
  };

  const handleAddCustomSkill = () => {
    const trimmed = customSkill.trim();
    if (trimmed && !selectedSkills.includes(trimmed)) {
      setSelectedSkills([...selectedSkills, trimmed]);
      setCustomSkill('');
    }
  };

  const handleIdUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIdUploaded(true);
      setIdNumber('520101199001012410');
      if (!realName) setRealName('王小明');
    }, 1200);
  };

  const handleWechatAuth = () => {
    setPhone('13800138000');
  };

  const handleAIPerfect = () => {
    setIsPerfecting(true);
    // AI generation logic based on service tags selected in Step 1
    setTimeout(() => {
      setIsPerfecting(false);
      const tagStr = selectedServiceTags.join('、') || '专业服务人员';
      setAgentName(`金牌${selectedServiceTags[0] || '助理'}-小明`);
      setDesc(`作为一名专注于【${tagStr}】的资深专业人士，我致力于为每位客户提供深度定制化的高质量服务。凭借多年的行业经验和对细节的极致追求，我熟悉该领域的各项标准与流程。我的目标是成为您最信赖的合作伙伴，为您解决实际问题。`);
      setOpening(`您好！我是您的专属数字分身。很高兴为您提供关于【${tagStr}】的专业咨询与服务。有什么我可以帮您的吗？`);
      setSelectedSkills(['专业技能认证', '资深服务经验', '7*24h在线响应', '深度需求挖掘', '金牌服务口碑']);
    }, 1800);
  };

  if (step === 'splash') {
    return (
      <div className="fixed inset-0 bg-slate-950 z-[70] flex flex-col items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-purple-900/20"></div>

        <button onClick={onBack} className="absolute top-12 left-6 text-slate-400 p-2">
          <ArrowLeft size={24} />
        </button>
        <div className="absolute top-12 text-slate-100 font-bold text-lg tracking-widest">数字分身</div>

        <div className="relative mb-12">
          <div className="w-48 h-48 rounded-full border border-blue-500/30 flex items-center justify-center animate-pulse">
            <div className="w-36 h-36 rounded-full border border-blue-400/50 flex items-center justify-center">
              <div className="w-24 h-24 bg-blue-600/20 rounded-2xl border border-blue-400 flex items-center justify-center backdrop-blur-sm shadow-2xl shadow-blue-500/20">
                <Bot size={48} className="text-blue-400" />
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 w-4 h-4 bg-blue-400 rounded-full blur-sm"></div>
          <div className="absolute -bottom-8 -left-4 w-6 h-6 bg-purple-500/50 rounded-full blur-md"></div>
        </div>

        <div className="text-center z-10 space-y-4">
          <h1 className="text-3xl font-black text-white tracking-wider">开启 AI 数字分身时代</h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
            通过 AI 深度学习你的社交习惯和名片信息，生成专属数字形象。实现 24 小时在线社交。
          </p>
        </div>

        <div className="mt-20 w-full max-w-xs space-y-6 z-10">
          <button 
            onClick={() => setStep('identity')}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-full font-black text-lg shadow-2xl shadow-blue-500/40 active:scale-95 transition-all"
          >
            立即开启生成
          </button>
          <p className="text-slate-600 text-[10px] font-mono tracking-widest text-center uppercase">AI Digital Persona System Beta</p>
        </div>
      </div>
    );
  }

  const currentMain = SERVICE_TYPES.find(c => c.id === selectedMainCat);
  const currentSub = currentMain?.sub?.find(s => s.id === selectedSubCat);

  return (
    <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-in slide-in-from-right duration-300">
      <header className="px-4 py-4 flex items-center justify-between bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="w-1/4">
          <button onClick={() => setStep(step === 'identity' ? 'splash' : 'identity')} className="p-2 text-gray-400 active:bg-gray-50 rounded-full">
            {step === 'identity' ? <X size={24} /> : <ArrowLeft size={24} />}
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-base font-bold text-gray-800 tracking-tight whitespace-nowrap">
            {step === 'identity' ? '第一步：实名认证' : '第二步：完善分身信息'}
          </h2>
          <div className="flex space-x-1 mt-1">
            <div className={`h-1 w-8 rounded-full ${step === 'identity' ? 'bg-blue-600' : 'bg-green-500'}`}></div>
            <div className={`h-1 w-8 rounded-full ${step === 'persona' ? 'bg-blue-600' : 'bg-gray-100'}`}></div>
          </div>
        </div>
        <div className="w-1/4 flex justify-end">
          {step === 'persona' && (
            <button 
              onClick={handleAIPerfect}
              disabled={isPerfecting}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-blue-200 flex items-center active:scale-95 transition-all disabled:opacity-50"
            >
              {isPerfecting ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <>
                  <Zap size={10} className="mr-1 fill-current" />
                  AI一键完善
                </>
              )}
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
        {step === 'identity' ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 px-1">
                <UserCheck size={18} className="text-blue-600" />
                <h3 className="text-sm font-black text-slate-800">1. 身份核验</h3>
              </div>
              
              {/* Name Input */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center space-x-4">
                <CreditCard size={18} className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder="请输入您的真实姓名" 
                  value={realName}
                  onChange={e => setRealName(e.target.value)}
                  className="bg-transparent border-0 flex-1 text-sm font-bold focus:outline-none placeholder-gray-300"
                />
              </div>

              {/* ID Photo Upload */}
              <div className="space-y-2">
                <p className="text-[11px] font-black text-slate-400 px-1">身份证照片</p>
                <div 
                  onClick={handleIdUpload}
                  className={`w-full h-36 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${
                    idUploaded ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200 active:bg-slate-100'
                  }`}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center space-y-2">
                      <Loader2 size={24} className="text-blue-500 animate-spin" />
                      <span className="text-[10px] font-bold text-blue-500">正在上传...</span>
                    </div>
                  ) : idUploaded ? (
                    <div className="flex flex-col items-center space-y-2 text-center px-4">
                      <CheckCircle2 size={32} className="text-green-500" />
                      <span className="text-[10px] font-bold text-green-600">身份证照片已上传</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2 text-slate-400">
                      <Camera size={28} />
                      <span className="text-[10px] font-bold">点击拍摄/上传身份证人像面</span>
                    </div>
                  )}
                </div>
              </div>

              {/* ID Number Input */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center space-x-4">
                <Fingerprint size={18} className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder="可自动识别身份证号码" 
                  value={idNumber}
                  onChange={e => setIdNumber(e.target.value)}
                  className="bg-transparent border-0 flex-1 text-sm font-bold focus:outline-none placeholder-gray-300"
                />
              </div>

              {/* Phone Input */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center space-x-4">
                <Smartphone size={18} className="text-slate-400" />
                <input 
                  type="tel" 
                  placeholder="联系电话" 
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="bg-transparent border-0 flex-1 text-sm font-bold focus:outline-none placeholder-gray-300"
                />
                <button 
                  onClick={handleWechatAuth}
                  className="bg-green-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg active:scale-95 transition-transform flex items-center"
                >
                  微信授权
                </button>
              </div>
            </div>

            {/* Service Type - MOVED HERE */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 px-1">
                <Grid3X3 size={18} className="text-blue-600" />
                <h3 className="text-sm font-black text-slate-800">2. 服务领域</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedServiceTags.map(tag => (
                  <span key={tag} className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center shadow-md animate-in zoom-in-50">
                    {tag}
                    <button onClick={() => setSelectedServiceTags(selectedServiceTags.filter(t => t !== tag))} className="ml-1.5 hover:text-red-200">
                      <CircleX size={14} />
                    </button>
                  </span>
                ))}
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm flex h-60">
                <div className="w-1/3 border-r border-gray-50 overflow-y-auto bg-slate-50/50">
                  {SERVICE_TYPES.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => setSelectedMainCat(cat.id)}
                      className={`w-full px-3 py-4 text-left text-[11px] font-bold transition-all ${selectedMainCat === cat.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
                <div className="w-1/3 border-r border-gray-50 overflow-y-auto">
                  {currentMain?.sub?.map(sub => (
                    <button 
                      key={sub.id}
                      onClick={() => setSelectedSubCat(sub.id)}
                      className={`w-full px-3 py-4 text-left text-[11px] font-bold transition-all ${selectedSubCat === sub.id ? 'bg-blue-50/50 text-indigo-600' : 'text-gray-400'}`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
                <div className="w-1/3 overflow-y-auto p-2 space-y-2">
                  {currentSub?.tags?.map(tag => (
                    <button 
                      key={tag}
                      onClick={() => toggleTag(tag, selectedServiceTags, setSelectedServiceTags)}
                      className={`w-full p-2.5 rounded-xl text-[10px] font-bold border transition-all text-center ${selectedServiceTags.includes(tag) ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-gray-50 text-gray-400 border-transparent active:bg-gray-100'}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setStep('persona')}
              disabled={!realName || !phone || !idNumber || !idUploaded || selectedServiceTags.length === 0}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-base shadow-xl shadow-blue-100 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center"
            >
              下一步：设置分身 <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col items-center relative">
              <div className="relative">
                <div className="w-24 h-24 bg-blue-50 rounded-[2rem] flex items-center justify-center border-4 border-white shadow-xl">
                   <Bot size={40} className="text-blue-400" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white shadow-md">
                  <Plus size={18} />
                </button>
              </div>
              
              <div className="mt-4">
                <button className="text-[11px] font-bold text-blue-600 px-4 py-2 rounded-full border border-blue-100 flex items-center space-x-1 active:bg-blue-50 shadow-sm bg-white">
                   <Sparkles size={12} className="mr-1" /> AI 生成形象
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-sm font-black text-gray-800 w-24">数字分身名称</span>
                <input 
                  type="text" 
                  placeholder="起个好听的名字" 
                  value={agentName}
                  onChange={e => setAgentName(e.target.value)}
                  className="bg-transparent border-0 flex-1 text-sm font-bold focus:outline-none placeholder-gray-300"
                />
              </div>

              <div className="space-y-3">
                 <label className="text-sm font-black text-gray-800 flex items-center">
                    <Award size={16} className="mr-2 text-yellow-500" /> 个人技能 (AI 自动填充)
                  </label>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedSkills.map(skill => (
                      <span key={skill} className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center shadow-sm border border-yellow-200">
                        {skill}
                        <button onClick={() => setSelectedSkills(selectedSkills.filter(s => s !== skill))} className="ml-1.5 hover:text-red-500">
                          <CircleX size={12} />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <input 
                      type="text"
                      placeholder="手动输入技能..."
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddCustomSkill()}
                      className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-200"
                    />
                    <button 
                      onClick={handleAddCustomSkill}
                      className="bg-yellow-400 text-yellow-900 p-2 rounded-xl active:scale-95 transition-transform"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-3xl space-y-3 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-black text-gray-800">设定描述 (AI 自动完善)</label>
                  <button className="text-[10px] font-bold text-blue-600 flex items-center bg-white px-3 py-1.5 rounded-xl shadow-sm border border-blue-50 active:scale-95">
                    <Sparkles size={12} className="mr-1" /> AI 润色
                  </button>
                </div>
                <textarea 
                  rows={4}
                  placeholder="点击右上角 AI 一键完善，或在此输入描述..."
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  className="bg-transparent border-0 w-full text-xs focus:outline-none placeholder-gray-300 resize-none leading-relaxed font-medium"
                />
              </div>

              <div className="bg-slate-50 p-5 rounded-3xl space-y-3 border border-slate-100 shadow-sm">
                <label className="text-sm font-black text-gray-800">开场白 (AI 自动完善)</label>
                <textarea 
                  rows={2}
                  placeholder="我是您的数字分身，很高兴为您服务！"
                  value={opening}
                  onChange={e => setOpening(e.target.value)}
                  className="bg-transparent border-0 w-full text-xs focus:outline-none placeholder-gray-300 resize-none font-medium"
                />
              </div>
            </div>

            <button 
              onClick={onComplete}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-5 rounded-[2rem] font-black text-base shadow-2xl shadow-blue-500/20 transition-all active:scale-[0.98]"
            >
              完成并创建我的数字分身
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAgent;
