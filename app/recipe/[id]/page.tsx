'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import StatusBar from '@/components/StatusBar';
import TabBar from '@/components/TabBar';
import { recipesDatabase } from '@/lib/recipes-data';
import { matchRecipes, MatchedRecipe } from '@/lib/recipe-matcher';
import { useFavorites } from '@/hooks/useFavorites';
import { ChevronLeft, Clock, Flame, Users, Heart, Share2, ShoppingCart } from 'lucide-react';

export default function RecipeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [recipe, setRecipe] = useState<MatchedRecipe | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const recipeId = params.id as string;
    const ingredientsParam = searchParams.get('ingredients');

    // 从数据库找到食谱
    const foundRecipe = recipesDatabase.find(r => r.id === recipeId);
    if (!foundRecipe) {
      router.push('/');
      return;
    }

    // 如果有食材参数，计算匹配信息
    if (ingredientsParam) {
      const ingredients = ingredientsParam.split(',');
      const matchedRecipes = matchRecipes(ingredients);
      const matchedRecipe = matchedRecipes.find(r => r.id === recipeId);
      if (matchedRecipe) {
        setRecipe(matchedRecipe);
      } else {
        // 如果没有匹配信息，创建一个基本的
        setRecipe({
          ...foundRecipe,
          match_percentage: 0,
          available_ingredients: [],
          missing_ingredients: foundRecipe.required_ingredients
        });
      }
    } else {
      setRecipe({
        ...foundRecipe,
        match_percentage: 0,
        available_ingredients: [],
        missing_ingredients: foundRecipe.required_ingredients
      });
    }
  }, [params.id, searchParams, router]);

  if (!recipe) {
    return null;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '简单':
        return 'bg-[#C8F0D8] text-[#2D7A4F]';
      case '中等':
        return 'bg-[#FFE8CC] text-[#CC7A00]';
      case '复杂':
        return 'bg-[#FFD4D4] text-[#CC0000]';
      default:
        return 'bg-[#E8F0EC] text-[#3D8A5A]';
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--color-bg)] overflow-hidden">
      {/* Status Bar */}
      <StatusBar />

      {/* Content Wrapper */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-4 pb-3">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2"
          >
            <ChevronLeft className="w-6 h-6 text-[var(--color-text)]" />
          </button>
          <h1 className="text-lg font-semibold text-[var(--color-text)]">
            菜谱详情
          </h1>
          <button
            onClick={() => toggleFavorite(params.id as string)}
            className="p-2 -mr-2"
          >
            <Heart
              className={`w-6 h-6 ${
                isFavorite(params.id as string)
                  ? 'fill-red-500 text-red-500'
                  : 'text-[var(--color-text-secondary)]'
              }`}
            />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="flex flex-col gap-6">
            {/* Recipe Title */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">
                {recipe.name}
              </h2>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                  {recipe.difficulty}
                </span>
                <span className="flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs text-[var(--color-text-secondary)]">
                  <Clock className="w-3 h-3" />
                  {recipe.cooking_time}分钟
                </span>
                <span className="flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs text-[var(--color-text-secondary)]">
                  <Flame className="w-3 h-3" />
                  {recipe.calories}千卡
                </span>
                <span className="flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs text-[var(--color-text-secondary)]">
                  <Users className="w-3 h-3" />
                  {recipe.servings}人份
                </span>
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="bg-white rounded-2xl p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-3">
                所需食材
              </h3>

              {/* Available Ingredients */}
              {recipe.available_ingredients.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                    已有食材
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recipe.available_ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#C8F0D8] text-[#2D7A4F] rounded-full text-sm"
                      >
                        ✓ {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Ingredients */}
              {recipe.missing_ingredients.length > 0 && (
                <div>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                    还需购买
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recipe.missing_ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#FFE8CC] text-[#CC7A00] rounded-full text-sm"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional Ingredients */}
              {recipe.optional_ingredients.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[#E8F0EC]">
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                    可选食材
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recipe.optional_ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#F5F4F1] text-[var(--color-text-secondary)] rounded-full text-sm"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Steps Section */}
            <div className="bg-white rounded-2xl p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-3">
                制作步骤
              </h3>
              <div className="flex flex-col gap-4">
                {recipe.steps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="flex-1 text-sm text-[var(--color-text)] leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Section */}
            {recipe.tips && (
              <div className="bg-[#FFF9E6] rounded-2xl p-4">
                <h3 className="text-base font-semibold text-[var(--color-text)] mb-2">
                  💡 烹饪小贴士
                </h3>
                <p className="text-sm text-[var(--color-text)] leading-relaxed">
                  {recipe.tips}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pb-4">
              <button
                onClick={() => alert('购物清单功能开发中')}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-full font-medium"
              >
                <ShoppingCart className="w-5 h-5" />
                生成购物清单
              </button>
              <button
                onClick={() => alert('分享功能开发中')}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-full font-medium"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <TabBar activeTab="home" />
    </div>
  );
}
