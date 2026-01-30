'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StatusBar from '@/components/StatusBar';
import TabBar from '@/components/TabBar';
import RecipeCard from '@/components/RecipeCard';
import { recipesDatabase } from '@/lib/recipes-data';
import { MatchedRecipe } from '@/lib/recipe-matcher';
import { SlidersHorizontal } from 'lucide-react';

type SortOption = 'time' | 'difficulty' | 'calories';
type DifficultyFilter = '简单' | '中等' | '复杂' | 'all';

export default function RecipesBrowsePage() {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('time');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [maxTime, setMaxTime] = useState<number>(120);

  // Convert recipes to MatchedRecipe format (all 100% match since no ingredient filtering)
  const allRecipes: MatchedRecipe[] = recipesDatabase.map(recipe => ({
    ...recipe,
    match_percentage: 100,
    available_ingredients: recipe.required_ingredients,
    missing_ingredients: []
  }));

  // Apply filters and sorting
  let filteredRecipes = [...allRecipes];

  // Apply difficulty filter
  if (difficultyFilter !== 'all') {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.difficulty === difficultyFilter);
  }

  // Apply time filter
  filteredRecipes = filteredRecipes.filter(recipe => recipe.cooking_time <= maxTime);

  // Apply sorting
  filteredRecipes.sort((a, b) => {
    switch (sortBy) {
      case 'time':
        return a.cooking_time - b.cooking_time;
      case 'difficulty':
        const difficultyOrder = { '简单': 1, '中等': 2, '复杂': 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      case 'calories':
        return a.calories - b.calories;
      default:
        return 0;
    }
  });

  const handleRecipeClick = (recipeId: string) => {
    router.push(`/recipe/${recipeId}`);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--color-bg)] overflow-hidden">
      <StatusBar />

      <div className="flex flex-col flex-1 gap-4 px-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pt-4">
          <div>
            <h1 className="text-xl font-semibold text-[var(--color-text)]">
              菜谱大全
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              共 {recipesDatabase.length} 道菜谱
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-full transition-colors ${
              showFilters ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text)]'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4 animate-fadeIn">
            {/* Sort Options */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-text)] mb-2">
                排序方式
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'time', label: '时间' },
                  { value: 'difficulty', label: '难度' },
                  { value: 'calories', label: '热量' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value as SortOption)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      sortBy === option.value
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[#F5F4F1] text-[var(--color-text-secondary)]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-text)] mb-2">
                难度筛选
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: '全部' },
                  { value: '简单', label: '简单' },
                  { value: '中等', label: '中等' },
                  { value: '复杂', label: '复杂' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDifficultyFilter(option.value as DifficultyFilter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      difficultyFilter === option.value
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[#F5F4F1] text-[var(--color-text-secondary)]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Filter */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-[var(--color-text)]">
                  烹饪时间
                </h3>
                <span className="text-sm text-[var(--color-primary)] font-medium">
                  ≤ {maxTime}分钟
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="120"
                step="15"
                value={maxTime}
                onChange={(e) => setMaxTime(Number(e.target.value))}
                className="w-full h-2 bg-[#E8F0EC] rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${((maxTime - 15) / 105) * 100}%, #E8F0EC ${((maxTime - 15) / 105) * 100}%, #E8F0EC 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mt-1">
                <span>15分</span>
                <span>120分</span>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-[var(--color-text-secondary)]">
            显示 <span className="font-semibold text-[var(--color-primary)]">{filteredRecipes.length}</span> 道菜谱
          </div>
          {(difficultyFilter !== 'all' || maxTime < 120) && (
            <button
              onClick={() => {
                setDifficultyFilter('all');
                setMaxTime(120);
              }}
              className="text-sm text-[var(--color-primary)] font-medium"
            >
              清除筛选
            </button>
          )}
        </div>

        {/* Recipe List */}
        <div className="flex flex-col flex-1 gap-4 overflow-y-auto pb-4">
          {filteredRecipes.map((recipe, index) => (
            <div
              key={recipe.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <RecipeCard
                recipe={recipe}
                onClick={() => handleRecipeClick(recipe.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <TabBar activeTab="recipes" />
    </div>
  );
}
