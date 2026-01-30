'use client';

import StatusBar from '@/components/StatusBar';
import TabBar from '@/components/TabBar';
import { ArrowLeft, ChefHat, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface HistoryItem {
  id: string;
  timestamp: number;
  ingredients: string[];
  recipes: Array<{
    name: string;
    time: string;
    difficulty: string;
  }>;
}

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // Load history from localStorage
    try {
      const savedHistory = JSON.parse(localStorage.getItem('recipe_history') || '[]');
      setHistory(savedHistory);
    } catch (error) {
      console.error('Failed to load history:', error);
      setHistory([]);
    }
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return '今天';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return '昨天';
    } else {
      return date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  // Group history by date
  const groupedHistory = history.reduce((acc, item) => {
    const dateKey = formatDate(item.timestamp);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(item);
    return acc;
  }, {} as Record<string, HistoryItem[]>);

  return (
    <div className="flex flex-col h-full w-full bg-[var(--color-bg)] overflow-hidden">
      <StatusBar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-4 pb-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-[28px] font-bold text-[var(--color-text)] tracking-tight">
              历史记录
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)]">
              查看过往生成的菜谱
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-11 h-11 bg-white rounded-full"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--color-text)]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="text-6xl">📝</div>
              <p className="text-base text-[var(--color-text-secondary)]">
                暂无历史记录
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {Object.entries(groupedHistory).map(([date, items]) => (
                <div key={date} className="flex flex-col gap-3">
                  <h2 className="text-base font-semibold text-[var(--color-text)]">
                    {date}
                  </h2>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-3 bg-white rounded-2xl p-4"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-medium text-[var(--color-text-secondary)]">
                          {formatTime(item.timestamp)}
                        </span>
                        <div className="px-3 py-1.5 bg-[#E8F5EC] rounded-full">
                          <span className="text-xs font-semibold text-[var(--color-primary)]">
                            {item.recipes.length}道菜谱
                          </span>
                        </div>
                      </div>

                      {/* Ingredients */}
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium text-[#9C9B99]">
                          使用食材:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.ingredients.map((ingredient, idx) => (
                            <div
                              key={idx}
                              className="px-3 py-1.5 bg-[var(--color-bg)] rounded-full"
                            >
                              <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                                {ingredient}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-[#E5E4E1]" />

                      {/* Recipes */}
                      <div className="flex flex-col gap-2">
                        {item.recipes.map((recipe, idx) => (
                          <button
                            key={idx}
                            className="flex items-center gap-3 w-full"
                          >
                            <div className="flex items-center justify-center w-10 h-10 bg-[#E8F5EC] rounded-lg">
                              <ChefHat className="w-5 h-5 text-[var(--color-primary)]" />
                            </div>
                            <div className="flex flex-col gap-0.5 flex-1 text-left">
                              <span className="text-sm font-semibold text-[var(--color-text)]">
                                {recipe.name}
                              </span>
                              <span className="text-xs text-[#9C9B99]">
                                {recipe.time} · {recipe.difficulty}
                              </span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#9C9B99]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <TabBar activeTab="profile" />
    </div>
  );
}
