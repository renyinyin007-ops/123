
import React from 'react';
import { 
  Trophy, 
  Target, 
  CheckCircle2, 
  ChevronRight,
  Gift,
  Star,
  Zap
} from 'lucide-react';
import { Task } from '../types';

const MOCK_TASKS: Task[] = [
  { id: '1', title: '完成个人信息编辑', description: '完善头像、店铺简介与联系方式', reward: '50 积分', completed: true, progress: 100 },
  { id: '2', title: '上架 5 件新商品', description: '丰富店铺商品种类', reward: '店铺勋章: 新人起步', completed: false, progress: 60 },
  { id: '3', title: '设置 10 条常见问题', description: '提升 AI 客服自动回复质量', reward: '首页置顶权重 1天', completed: false, progress: 30 },
  { id: '4', title: '完成首笔提现', description: '绑定收款账户并成功提现', reward: '服务费减免券', completed: false, progress: 0 },
];

const TasksPage: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Points Summary */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 shadow-inner">
             <Star size={24} fill="currentColor" />
          </div>
          <div className="ml-4">
            <p className="text-xs text-gray-400 font-medium">当前积分</p>
            <p className="text-2xl font-black text-gray-800">1,250</p>
          </div>
        </div>
        <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold border border-blue-100">
          积分商城
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-800 flex items-center">
          <Target size={18} className="mr-2 text-red-500" />
          成长任务
        </h3>
        <div className="space-y-3">
          {MOCK_TASKS.map(task => (
            <div key={task.id} className={`bg-white p-4 rounded-2xl border ${task.completed ? 'border-green-100 bg-green-50/20' : 'border-gray-100'} shadow-sm relative overflow-hidden`}>
              {task.completed && (
                <div className="absolute top-2 right-2 text-green-500">
                  <CheckCircle2 size={20} />
                </div>
              )}
              <div className="flex items-start">
                <div className={`p-2 rounded-xl mr-3 ${task.completed ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                  {task.completed ? <CheckCircle2 size={20} /> : <Zap size={20} />}
                </div>
                <div className="flex-1 pr-6">
                  <p className="text-sm font-bold text-gray-800">{task.title}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{task.description}</p>
                  
                  <div className="mt-3 flex items-center space-x-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                       <div className={`h-full rounded-full ${task.completed ? 'bg-green-500' : 'bg-blue-600'}`} style={{ width: `${task.progress}%` }}></div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold">{task.progress}%</span>
                  </div>

                  <div className="mt-3 flex items-center text-[10px] font-bold text-indigo-600">
                    <Gift size={12} className="mr-1" /> 奖励: {task.reward}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reward Highlights */}
      <div className="space-y-3">
        <h3 className="font-bold text-gray-800 flex items-center">
          <Trophy size={18} className="mr-2 text-yellow-500" />
          已解锁奖励
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center opacity-50 grayscale">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-2">
              <Trophy size={24} className="text-gray-400" />
            </div>
            <p className="text-[10px] font-bold text-gray-400">金牌个人代理</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
              <Star size={24} className="text-blue-600" />
            </div>
            <p className="text-[10px] font-bold text-gray-800">新星认证标识</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
