'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StatusBar from '@/components/StatusBar';
import TabBar from '@/components/TabBar';
import Header from '@/components/Header';
import SmartRecommendations from '@/components/SmartRecommendations';
import EmptyState from '@/components/EmptyState';
import { ChevronLeft } from 'lucide-react';

export default function RecommendationsPage() {
  const router = useRouter();
  const [remainingIngredients, setRemainingIngredients] = useState<any[]>([]);

  useEffect(() => {
    const savedRemaining = localStorage.getItem('remaining_ingredients');
    if (savedRemaining) {
      setRemainingIngredients(JSON.parse(savedRemaining));
    }
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-[var(--color-bg)] overflow-hidden">
      {/* Status Bar */}
      <StatusBar />

      {/* Content Wrapper */}
      <div className="flex flex-col flex-1 gap-5 px-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2"
          >
            <ChevronLeft className="w-6 h-6 text-[var(--color-text)]" />
          </button>
          <h1 className="text-xl font-semibold text-[var(--color-text)]">
            智能推荐
          </h1>
        </div>

        {/* Scroll Content */}
        <div className="flex flex-col flex-1 gap-6 overflow-y-auto pb-6">
          {remainingIngredients.length > 0 ? (
            <SmartRecommendations
              remainingIngredients={remainingIngredients}
              onClickRecommendation={(recipeId) => {
                router.push(`/recipe/${recipeId}`);
              }}
            />
          ) : (
            <EmptyState
              title="暂无推荐"
              description="记录剩余食材后，我们将为您推荐相关菜谱"
            />
          )}
        </div>
      </div>

      {/* Tab Bar */}
      <TabBar activeTab="recommendations" />
    </div>
  );
}
