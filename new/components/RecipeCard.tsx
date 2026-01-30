'use client';

import { Check, Heart } from 'lucide-react';
import { MatchedRecipe } from '@/lib/recipe-matcher';
import { useFavorites } from '@/hooks/useFavorites';

interface RecipeCardProps {
  recipe: MatchedRecipe;
  onClick: () => void;
}

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isRecipeFavorited = isFavorite(recipe.id);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(recipe.id);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '简单':
        return 'bg-[#C8F0D8] text-[#3D8A5A]';
      case '中等':
        return 'bg-[#FFE8CC] text-[#CC7A00]';
      case '复杂':
        return 'bg-[#FFD4D4] text-[#CC0000]';
      default:
        return 'bg-[#E8F0EC] text-[#3D8A5A]';
    }
  };

  const getMatchText = () => {
    if (recipe.match_percentage === 100) {
      return '食材匹配度 100% · 无需额外购买';
    } else if (recipe.missing_ingredients.length > 0) {
      const missingText = recipe.missing_ingredients.slice(0, 2).join('、');
      return `食材匹配度 ${recipe.match_percentage}% · 缺少${missingText}`;
    } else {
      return `食材匹配度 ${recipe.match_percentage}%`;
    }
  };

  const matchTextColor = recipe.match_percentage === 100 ? 'text-[#4D9B6A]' : 'text-[#6D6C6A]';

  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-3 p-4 bg-white rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1.5 flex-1">
          <h3 className="text-lg font-semibold text-[var(--color-text)] leading-tight">
            {recipe.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className={`px-2 py-1 rounded-md text-xs font-semibold ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>
            <span className="px-2 py-1 bg-[#EDECEA] rounded-md text-xs font-semibold text-[#6D6C6A]">
              {recipe.cooking_time}分钟
            </span>
            <span className="px-2 py-1 bg-[#EDECEA] rounded-md text-xs font-semibold text-[#6D6C6A]">
              {recipe.calories}千卡
            </span>
          </div>
        </div>
        <button
          onClick={handleHeartClick}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
            isRecipeFavorited ? 'bg-[var(--color-primary)]' : 'bg-[#EDECEA]'
          }`}
          aria-label={isRecipeFavorited ? '取消收藏' : '收藏'}
        >
          <Heart
            className={`w-4 h-4 ${
              isRecipeFavorited ? 'fill-white text-white' : 'text-[#6D6C6A]'
            }`}
          />
        </button>
      </div>

      {/* Match Info */}
      <div className="flex items-center gap-2">
        <Check className="w-4 h-4 text-[#4D9B6A] flex-shrink-0" />
        <span className={`text-sm font-medium ${matchTextColor}`}>
          {getMatchText()}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-[#6D6C6A] leading-relaxed">
        {recipe.description}
      </p>
    </div>
  );
}
