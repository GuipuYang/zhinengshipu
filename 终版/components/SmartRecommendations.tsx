'use client';

import { useEffect, useState } from 'react';
import { ChevronRight, TrendingUp, Leaf, DollarSign, ChevronDown } from 'lucide-react';
import { RecommendedRecipe, getSmartRecommendations, getCurrentSeason } from '@/lib/recommendations-data';
import { recipesDatabase } from '@/lib/recipes-data';

interface SmartRecommendationsProps {
  remainingIngredients?: { ingredient_name: string; quantity: string; last_used: string }[];
  onClickRecommendation?: (recipeId: string) => void;
}

export default function SmartRecommendations({
  remainingIngredients,
  onClickRecommendation
}: SmartRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<RecommendedRecipe[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const recs = getSmartRecommendations(recipesDatabase, remainingIngredients);
    setRecommendations(recs);
  }, [remainingIngredients]);

  if (recommendations.length === 0) {
    return null;
  }

  const getReasonIcon = (reason: string) => {
    switch (reason) {
      case 'remaining_ingredients':
        return <TrendingUp className="w-4 h-4 text-[#4D9B6A]" />;
      case 'seasonal':
        return <Leaf className="w-4 h-4 text-[#8BC34A]" />;
      case 'budget_friendly':
        return <DollarSign className="w-4 h-4 text-[#FFB84D]" />;
      default:
        return null;
    }
  };

  const getReasonBg = (reason: string) => {
    switch (reason) {
      case 'remaining_ingredients':
        return 'bg-[#C8F0D8] text-[#2D7A4F]';
      case 'seasonal':
        return 'bg-[#DCEDC8] text-[#558B2F]';
      case 'budget_friendly':
        return 'bg-[#FFE8CC] text-[#CC7A00]';
      default:
        return 'bg-[#E8F0EC] text-[var(--color-text-secondary)]';
    }
  };

  const getReasonText = (reason: string) => {
    switch (reason) {
      case 'remaining_ingredients':
        return '剩余食材利用';
      case 'seasonal':
        return '当季新鲜';
      case 'budget_friendly':
        return '预算友好';
      default:
        return '';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '简单':
        return 'bg-[#C8F0D8] text-[#2D7A4F]';
      case '中等':
        return 'bg-[#FFE8CC] text-[#CC7A00]';
      case '复杂':
        return 'bg-[#FFD4D4] text-[#CC0000]';
      default:
        return 'bg-[#E8F0EC] text-[var(--color-text-secondary)]';
    }
  };

  const seasonText = {
    'spring': '春季',
    'summer': '夏季',
    'autumn': '秋季',
    'winter': '冬季'
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text)]">
            智能推荐
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)]">
            基于{seasonText[getCurrentSeason() as keyof typeof seasonText]}和您的偏好
          </p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-[var(--color-text-secondary)] transition-transform ${
            isCollapsed ? 'rotate-180' : ''
          }`}
        />
      </div>

      {/* Recommendations List */}
      <div
        className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ${
          isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'
        }`}
      >
        {recommendations.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => onClickRecommendation?.(recipe.id)}
            className="flex items-center gap-4 p-4 bg-white rounded-xl cursor-pointer hover:shadow-md transition-shadow"
          >
            {/* Reason Badge */}
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${getReasonBg(recipe.reason)}`}>
              {getReasonIcon(recipe.reason)}
              <span className="text-xs font-medium">
                {getReasonText(recipe.reason)}
              </span>
            </div>

            {/* Recipe Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-[var(--color-text)] mb-1 truncate">
                {recipe.name}
              </h4>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                  {recipe.difficulty}
                </span>
                <span className="text-xs text-[var(--color-text-secondary)]">
                  {recipe.cooking_time}分钟 · {recipe.calories}千卡
                </span>
              </div>
              <p className="text-xs text-[#4D9B6A] mt-1">
                {recipe.reason_text}
              </p>
            </div>

            {/* Arrow */}
            <ChevronRight className="w-5 h-5 text-[var(--color-text-secondary)] flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
