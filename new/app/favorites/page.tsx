'use client';

import { useRouter } from 'next/navigation';
import StatusBar from '@/components/StatusBar';
import TabBar from '@/components/TabBar';
import RecipeCard from '@/components/RecipeCard';
import EmptyState from '@/components/EmptyState';
import { useFavorites } from '@/hooks/useFavorites';
import { recipesDatabase, Recipe } from '@/lib/recipes-data';
import { MatchedRecipe } from '@/lib/recipe-matcher';
import { Heart, ChevronLeft } from 'lucide-react';

export default function FavoritesPage() {
  const router = useRouter();
  const { favorites } = useFavorites();

  // Get full recipe objects for favorited IDs
  const favoriteRecipes: MatchedRecipe[] = favorites
    .map(id => recipesDatabase.find(r => r.id === id))
    .filter((recipe): recipe is Recipe => recipe !== undefined)
    .map(recipe => ({
      ...recipe,
      match_percentage: 100,
      available_ingredients: recipe.required_ingredients,
      missing_ingredients: []
    }));

  return (
    <div className="flex flex-col h-full w-full bg-[var(--color-bg)] overflow-hidden">
      <StatusBar />

      <div className="flex flex-col flex-1 gap-5 px-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 pt-4">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10 bg-white rounded-full"
          >
            <ChevronLeft className="w-5 h-5 text-[var(--color-text)]" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">
              我的收藏
            </h1>
            {favoriteRecipes.length > 0 && (
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                共 {favoriteRecipes.length} 道菜谱
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-4">
          {favoriteRecipes.length > 0 ? (
            <div className="flex flex-col gap-4">
              {favoriteRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => router.push(`/recipe/${recipe.id}`)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Heart className="w-16 h-16 text-[var(--color-text-tertiary)]" />}
              title="还没有收藏的菜谱"
              description="快去发现喜欢的菜谱吧！"
              actionLabel="去发现菜谱"
              onAction={() => router.push('/')}
            />
          )}
        </div>
      </div>

      <TabBar activeTab="favorites" />
    </div>
  );
}
