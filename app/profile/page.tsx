'use client';

import StatusBar from '@/components/StatusBar';
import TabBar from '@/components/TabBar';
import { useFavorites } from '@/hooks/useFavorites';
import { useRouter } from 'next/navigation';
import {
  Settings,
  History,
  ShoppingBag,
  Bookmark,
  Heart,
  Utensils,
  Wallet,
  Bell,
  Info,
  CircleHelp,
  Shield,
  ChevronRight
} from 'lucide-react';

export default function ProfilePage() {
  const { favorites } = useFavorites();
  const router = useRouter();

  // Get history count from localStorage
  const getHistoryCount = () => {
    try {
      const history = JSON.parse(localStorage.getItem('recipe_history') || '[]');
      return history.length;
    } catch {
      return 0;
    }
  };

  const historyCount = getHistoryCount();

  const menuItems = [
    {
      id: 'history',
      icon: History,
      label: '历史记录',
      bgColor: 'bg-[#C8F0D8]',
      iconColor: 'text-[#3D8A5A]',
      onClick: () => router.push('/history')
    },
    {
      id: 'shopping',
      icon: ShoppingBag,
      label: '购物清单',
      bgColor: 'bg-[#FFECD1]',
      iconColor: 'text-[#D89575]',
      onClick: () => router.push('/shopping-list')
    },
    {
      id: 'combinations',
      icon: Bookmark,
      label: '常用组合',
      bgColor: 'bg-[#E8E8FF]',
      iconColor: 'text-[#7B68EE]',
      onClick: () => alert('常用组合功能开发中')
    },
    {
      id: 'tried',
      icon: Heart,
      label: '我的尝试',
      bgColor: 'bg-[#FFE8E8]',
      iconColor: 'text-[#D08068]',
      onClick: () => alert('我的尝试功能开发中')
    }
  ];

  const preferenceItems = [
    {
      id: 'diet',
      icon: Utensils,
      label: '饮食偏好',
      onClick: () => alert('饮食偏好设置开发中')
    },
    {
      id: 'budget',
      icon: Wallet,
      label: '预算范围',
      value: '¥50-100',
      onClick: () => alert('预算范围设置开发中')
    },
    {
      id: 'notifications',
      icon: Bell,
      label: '通知设置',
      onClick: () => alert('通知设置开发中')
    }
  ];

  const aboutItems = [
    {
      id: 'about',
      icon: Info,
      label: '关于我们',
      onClick: () => alert('关于我们')
    },
    {
      id: 'help',
      icon: CircleHelp,
      label: '帮助与反馈',
      onClick: () => alert('帮助与反馈')
    },
    {
      id: 'privacy',
      icon: Shield,
      label: '隐私政策',
      onClick: () => alert('隐私政策')
    }
  ];

  return (
    <div className="flex flex-col h-full w-full bg-[var(--color-bg)] overflow-hidden">
      <StatusBar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-4 pb-3">
          <h1 className="text-xl font-semibold text-[var(--color-text)]">
            我的
          </h1>
          <button
            onClick={() => alert('设置功能开发中')}
            className="flex items-center justify-center w-11 h-11 bg-white rounded-full"
          >
            <Settings className="w-5 h-5 text-[var(--color-text)]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="flex flex-col gap-6">
            {/* Profile Card */}
            <div className="flex items-center gap-4 bg-white rounded-2xl p-5">
              <div className="flex items-center justify-center w-16 h-16 bg-[var(--color-primary)] rounded-full text-3xl">
                👨‍🍳
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-[var(--color-text)]">
                  美食爱好者
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  已使用 30 天 · 生成 {historyCount} 道菜谱
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4">
                <span className="text-3xl font-bold text-[var(--color-text)] tracking-tight">
                  {historyCount}
                </span>
                <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                  生成菜谱
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4">
                <span className="text-3xl font-bold text-[var(--color-text)] tracking-tight">
                  {favorites.length}
                </span>
                <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                  收藏菜谱
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4">
                <span className="text-3xl font-bold text-[var(--color-text)] tracking-tight">
                  5
                </span>
                <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                  已尝试
                </span>
              </div>
            </div>

            {/* Menu Section */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">
                功能
              </h3>
              <div className="bg-white rounded-2xl overflow-hidden">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.onClick}
                      className={`flex items-center justify-between w-full px-4 py-4 ${
                        index < menuItems.length - 1 ? 'border-b border-[#E5E4E1]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center w-10 h-10 ${item.bgColor} rounded-full`}>
                          <Icon className={`w-5 h-5 ${item.iconColor}`} />
                        </div>
                        <span className="text-base font-medium text-[var(--color-text)]">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#9C9B99]" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preferences Section */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">
                偏好设置
              </h3>
              <div className="bg-white rounded-2xl overflow-hidden">
                {preferenceItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.onClick}
                      className={`flex items-center justify-between w-full px-4 py-4 ${
                        index < preferenceItems.length - 1 ? 'border-b border-[#E5E4E1]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-[#6D6C6A]" />
                        <span className="text-base font-medium text-[var(--color-text)]">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {item.value && (
                          <span className="text-sm font-medium text-[#9C9B99]">
                            {item.value}
                          </span>
                        )}
                        <ChevronRight className="w-5 h-5 text-[#9C9B99]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-2xl overflow-hidden">
              {aboutItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.onClick}
                    className={`flex items-center justify-between w-full px-4 py-4 ${
                      index < aboutItems.length - 1 ? 'border-b border-[#E5E4E1]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-[#6D6C6A]" />
                      <span className="text-base font-medium text-[var(--color-text)]">
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#9C9B99]" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <TabBar activeTab="profile" />
    </div>
  );
}
