'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Home, BookOpen, User } from 'lucide-react';

interface TabBarProps {
  activeTab?: string;
}

export default function TabBar({ activeTab }: TabBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { id: 'home', icon: Home, label: '首页', path: '/' },
    { id: 'recipes', icon: BookOpen, label: '菜谱', path: '/recipes-browse' },
    { id: 'profile', icon: User, label: '我的', path: '/profile' },
  ];

  // Auto-detect active tab from pathname if not provided
  const getActiveTab = () => {
    if (activeTab) return activeTab;
    if (pathname === '/favorites') return 'favorites';
    if (pathname === '/recipes-browse') return 'recipes';
    if (pathname === '/profile') return 'profile';
    return 'home';
  };

  const currentTab = getActiveTab();

  const handleTabClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex items-start justify-between h-[84px] px-0 pt-3 pb-[34px] bg-[var(--color-white)] w-full">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.path)}
            className="flex flex-col items-center gap-1 w-full"
          >
            <Icon
              className={`w-[22px] h-[22px] ${
                isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-inactive)]'
              }`}
            />
            <span
              className={`font-outfit text-[10px] ${
                isActive
                  ? 'font-semibold text-[var(--color-primary)]'
                  : 'font-medium text-[var(--color-text-inactive)]'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
