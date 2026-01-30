'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StatusBar from '@/components/StatusBar';
import TabBar from '@/components/TabBar';
import { ChevronLeft, Plus, Trash2, Clock, ChefHat } from 'lucide-react';

interface Combination {
  id: string;
  name: string;
  ingredients: Array<{
    id: string;
    name: string;
    emoji: string;
    quantity: string;
  }>;
  created_time: string;
}

export default function CombinationsPage() {
  const router = useRouter();
  const [combinations, setCombinations] = useState<Combination[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [combinationToDelete, setCombinationToDelete] = useState<string | null>(null);

  // 加载常用组合
  useEffect(() => {
    loadCombinations();
  }, []);

  const loadCombinations = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('saved_combinations') || '[]');
      setCombinations(saved);
    } catch {
      setCombinations([]);
    }
  };

  const handleDelete = (id: string) => {
    setCombinationToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (combinationToDelete) {
      const updated = combinations.filter(c => c.id !== combinationToDelete);
      setCombinations(updated);
      localStorage.setItem('saved_combinations', JSON.stringify(updated));
      setShowDeleteModal(false);
      setCombinationToDelete(null);
    }
  };

  const handleUseCombination = (combination: Combination) => {
    // 保存到 localStorage，供首页使用
    const combinationIngredients = combination.ingredients.map(ing => ({
      id: ing.id,
      name: ing.name,
      emoji: ing.emoji,
      category: '',
      quantity: ing.quantity
    }));
    localStorage.setItem('selected_combination', JSON.stringify(combinationIngredients));
    router.push('/');
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--color-bg)] overflow-hidden">
      <StatusBar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 pt-4 pb-3">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10 bg-white rounded-full"
          >
            <ChevronLeft className="w-5 h-5 text-[var(--color-text)]" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-[var(--color-text)]">
              常用组合
            </h1>
            {combinations.length > 0 && (
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                共 {combinations.length} 个组合
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {combinations.length > 0 ? (
            <div className="flex flex-col gap-4">
              {combinations.map((combination, index) => (
                <div
                  key={combination.id}
                  className="bg-white rounded-2xl p-4 shadow-sm animate-fadeIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-[var(--color-text)] mb-1">
                        {combination.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                        <div className="flex items-center gap-1">
                          <ChefHat className="w-3 h-3" />
                          <span>{combination.ingredients.length} 食材</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>
                            {new Date(combination.created_time).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(combination.id)}
                      className="p-2 rounded-full hover:bg-[#FFE8E8] transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-[var(--color-text-tertiary)]" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {combination.ingredients.map((ingredient, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-2 bg-[var(--color-bg)] rounded-xl"
                      >
                        <span className="text-lg">{ingredient.emoji}</span>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-[var(--color-text)]">
                            {ingredient.name}
                          </span>
                          {ingredient.quantity && (
                            <span className="text-xs text-[var(--color-text-secondary)]">
                              {ingredient.quantity}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleUseCombination(combination)}
                    className="mt-3 w-full py-3 bg-[var(--color-primary)] text-white rounded-xl font-medium active:scale-95 transition-transform"
                  >
                    使用此组合
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F4F1] flex items-center justify-center">
                <Bookmark className="w-8 h-8 text-[var(--color-text-tertiary)]" />
              </div>
              <p className="text-[var(--color-text-secondary)] text-center">
                还没有常用组合
              </p>
              <p className="text-sm text-[var(--color-text-tertiary)] text-center">
                保存常用的食材组合，下次快速选择
              </p>
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full font-medium"
              >
                去添加食材
              </button>
            </div>
          )}
        </div>
      </div>

      <TabBar activeTab="profile" />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white w-full max-w-sm mx-6 rounded-2xl p-6 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
              删除组合
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">
              确定要删除这个常用组合吗？此操作无法撤销。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 text-base font-medium text-[var(--color-text)] bg-[var(--color-bg)] rounded-xl active:scale-95 transition-transform"
              >
                取消
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 text-base font-medium text-white bg-[#FF4D4F] rounded-xl active:scale-95 transition-transform"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Bookmark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 21l-7-5-7 5V5a2 2 0 012-2h4a2 2 0 012 2v16z"
      />
    </svg>
  );
}
