'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import StatusBar from '@/components/StatusBar';
import TabBar from '@/components/TabBar';
import RecipeCard from '@/components/RecipeCard';
import LoadingState from '@/components/LoadingState';
import RecipeLoading from '@/components/RecipeLoading';
import { generateRecipes, MatchedRecipe } from '@/lib/recipe-matcher';
import { ChevronLeft, SlidersHorizontal, X, ChevronDown, TrendingUp, Clock, ChefHat } from 'lucide-react';

type SortOption = 'match' | 'time' | 'difficulty' | 'calories';
type DifficultyFilter = '简单' | '中等' | '复杂' | 'all';
type CuisineFilter = string;

export default function RecipeListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState<MatchedRecipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<MatchedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRecipeLoading, setShowRecipeLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('match');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [cuisineFilter, setCuisineFilter] = useState<CuisineFilter>('all');
  const [maxTime, setMaxTime] = useState<number>(120);
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    // 从URL参数获取食材列表
    const ingredientsParam = searchParams.get('ingredients');
    if (!ingredientsParam) {
      router.push('/');
      return;
    }

    const ingredientsList = ingredientsParam.split(',');
    setIngredients(ingredientsList);

    // 显示加载动画
    setShowRecipeLoading(true);

    // 生成食谱
    generateRecipes(ingredientsList).then((matchedRecipes) => {
      setRecipes(matchedRecipes);
      setFilteredRecipes(matchedRecipes);
      setIsLoading(false);

      // 保存到本地存储
      const history = {
        id: Date.now().toString(),
        ingredients: ingredientsList,
        recipes: matchedRecipes,
        timestamp: new Date().toISOString()
      };

      const existingHistory = JSON.parse(localStorage.getItem('recipe_history') || '[]');
      localStorage.setItem('recipe_history', JSON.stringify([history, ...existingHistory].slice(0, 20)));
    });
  }, [searchParams, router]);

  const handleLoadingComplete = () => {
    setShowRecipeLoading(false);
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...recipes];

    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      result = result.filter(recipe => recipe.difficulty === difficultyFilter);
    }

    // Apply cuisine filter
    if (cuisineFilter !== 'all') {
      result = result.filter(recipe => recipe.cuisine === cuisineFilter);
    }

    // Apply time filter
    result = result.filter(recipe => recipe.cooking_time <= maxTime);

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.match_percentage - a.match_percentage;
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

    setFilteredRecipes(result);
  }, [recipes, sortBy, difficultyFilter, cuisineFilter, maxTime]);

  const handleRecipeClick = (recipeId: string) => {
    router.push(`/recipe/${recipeId}?ingredients=${searchParams.get('ingredients')}`);
  };

  const getStats = () => {
    if (filteredRecipes.length === 0) return null;

    const avgMatch = Math.round(
      filteredRecipes.reduce((sum, r) => sum + r.match_percentage, 0) / filteredRecipes.length
    );
    const avgTime = Math.round(
      filteredRecipes.reduce((sum, r) => sum + r.cooking_time, 0) / filteredRecipes.length
    );
    const easyCount = filteredRecipes.filter(r => r.difficulty === '简单').length;

    return { avgMatch, avgTime, easyCount };
  };

  const stats = getStats();

  if (showRecipeLoading) {
    return (
      <div className="flex flex-col h-full w-full bg-[var(--color-bg)]">
        <StatusBar />
        <RecipeLoading onComplete={handleLoadingComplete} />
      </div>
    );
  }

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="flex flex-col h-full w-full bg-[var(--color-bg)] overflow-hidden">
      <StatusBar />

      <div className="flex flex-col flex-1 gap-4 px-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[var(--color-text)]"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-base font-medium">返回</span>
          </button>
          <h1 className="text-xl font-semibold text-[var(--color-text)]">
            推荐菜谱
          </h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-full transition-colors ${
              showFilters ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text)]'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Ingredients */}
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ingredient, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-white rounded-full text-sm text-[var(--color-text)] shadow-sm"
            >
              {ingredient}
            </span>
          ))}
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <div className="flex items-center gap-1 text-[var(--color-text-secondary)] text-xs mb-1">
                <TrendingUp className="w-3 h-3" />
                <span>平均匹配</span>
              </div>
              <div className="text-xl font-bold text-[var(--color-primary)]">
                {stats.avgMatch}%
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <div className="flex items-center gap-1 text-[var(--color-text-secondary)] text-xs mb-1">
                <Clock className="w-3 h-3" />
                <span>平均时长</span>
              </div>
              <div className="text-xl font-bold text-[var(--color-text)]">
                {stats.avgTime}分
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <div className="flex items-center gap-1 text-[var(--color-text-secondary)] text-xs mb-1">
                <ChefHat className="w-3 h-3" />
                <span>简单菜谱</span>
              </div>
              <div className="text-xl font-bold text-[var(--color-text)]">
                {stats.easyCount}道
              </div>
            </div>
          </div>
        )}

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
                  { value: 'match', label: '匹配度' },
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

            {/* Cuisine Filter */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-text)] mb-2">
                菜系筛选
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: '全部' },
                  { value: '中餐', label: '中餐' },
                  { value: '川菜', label: '川菜' },
                  { value: '粤菜', label: '粤菜' },
                  { value: '西餐', label: '西餐' },
                  { value: '创新菜', label: '创新菜' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setCuisineFilter(option.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      cuisineFilter === option.value
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
            为您找到 <span className="font-semibold text-[var(--color-primary)]">{filteredRecipes.length}</span> 道菜谱
          </div>
          {(difficultyFilter !== 'all' || cuisineFilter !== 'all' || maxTime < 120) && (
            <button
              onClick={() => {
                setDifficultyFilter('all');
                setCuisineFilter('all');
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
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
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
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F4F1] flex items-center justify-center">
                <ChefHat className="w-8 h-8 text-[var(--color-text-tertiary)]" />
              </div>
              <p className="text-[var(--color-text-secondary)] text-center">
                {recipes.length === 0 ? '暂无匹配的菜谱' : '没有符合筛选条件的菜谱'}
              </p>
              <button
                onClick={() => {
                  if (recipes.length === 0) {
                    router.back();
                  } else {
                    setDifficultyFilter('all');
                    setCuisineFilter('all');
                    setMaxTime(120);
                  }
                }}
                className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full font-medium"
              >
                {recipes.length === 0 ? '重新选择食材' : '清除筛选'}
              </button>
            </div>
          )}
        </div>
      </div>

      <TabBar activeTab="home" />
    </div>
  );
}
