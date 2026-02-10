
import React from 'react';
import { 
  User, 
  Shield, 
  Users, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Camera,
  Store
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Profile Info */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
        <div className="relative">
          <img src="https://picsum.photos/200/200?random=5" className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover" alt="Profile" />
          <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 text-white rounded-full border-2 border-white shadow-sm">
            <Camera size={14} />
          </button>
        </div>
        <h3 className="mt-4 text-lg font-bold text-gray-800">王小明的智能体</h3>
        <p className="text-xs text-gray-400 mt-1">ID: AGENT_9527 | 认证商家</p>
        <div className="mt-4 flex space-x-2">
          <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold border border-blue-100">AI 客服已开启</span>
          <span className="text-[10px] bg-green-50 text-green-600 px-3 py-1 rounded-full font-bold border border-green-100">结算账户已验证</span>
        </div>
      </div>

      {/* Menu Groups */}
      <div className="space-y-4">
        <section className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <SettingItem icon={Store} label="个人智能体信息" desc="修改店铺名、简介、LOGO" />
          <SettingItem icon={Users} label="员工管理" desc="添加与管理协作者账号" />
          <SettingItem icon={Shield} label="安全中心" desc="修改密码、二次校验" />
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <SettingItem icon={Bell} label="推送通知设置" />
          <SettingItem icon={HelpCircle} label="帮助与反馈" />
        </section>

        <button className="w-full bg-white text-red-500 py-4 rounded-2xl border border-red-50 font-bold flex items-center justify-center space-x-2 active:bg-red-50 transition-colors">
          <LogOut size={20} />
          <span>退出登录</span>
        </button>
      </div>

      <div className="text-center pb-8">
        <p className="text-[10px] text-gray-300 font-medium tracking-widest uppercase">Version 2.5.0-Preview</p>
      </div>
    </div>
  );
};

const SettingItem = ({ icon: Icon, label, desc }: { icon: any, label: string, desc?: string }) => (
  <button className="w-full p-4 flex items-center justify-between active:bg-gray-50 transition-colors">
    <div className="flex items-center">
      <div className="p-2 bg-gray-50 rounded-xl text-gray-500 mr-4">
        <Icon size={20} />
      </div>
      <div className="text-left">
        <p className="text-sm font-bold text-gray-800">{label}</p>
        {desc && <p className="text-[10px] text-gray-400 mt-0.5">{desc}</p>}
      </div>
    </div>
    <ChevronRight size={18} className="text-gray-300" />
  </button>
);

export default SettingsPage;
