'use client';

import { useEffect, useState } from 'react';
import { Flame, Droplet, Wheat, Leaf, AlertTriangle } from 'lucide-react';
import { RecipeNutrition, calculateRecipeNutrition } from '@/lib/nutrition-data';

interface NutritionAnalysisProps {
  ingredients: string[];
  quantities?: Record<string, string>;
}

export default function NutritionAnalysis({ ingredients, quantities }: NutritionAnalysisProps) {
  const [nutrition, setNutrition] = useState<RecipeNutrition | null>(null);

  useEffect(() => {
    const result = calculateRecipeNutrition(ingredients, quantities);
    setNutrition(result);
  }, [ingredients, quantities]);

  if (!nutrition) {
    return null;
  }

  const totalGrams = nutrition.nutrients.protein + nutrition.nutrients.carbs + nutrition.nutrients.fat;
  const proteinPercent = totalGrams > 0 ? Math.round((nutrition.nutrients.protein / totalGrams) * 100) : 0;
  const carbsPercent = totalGrams > 0 ? Math.round((nutrition.nutrients.carbs / totalGrams) * 100) : 0;
  const fatPercent = totalGrams > 0 ? Math.round((nutrition.nutrients.fat / totalGrams) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl p-4">
      <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">
        营养分析
      </h3>

      {/* 总热量 */}
      <div className="flex items-center justify-center py-4 bg-gradient-to-br from-[#FFF9E6] to-[#FFE8CC] rounded-xl mb-4">
        <div className="flex flex-col items-center">
          <Flame className="w-8 h-8 text-[#CC7A00] mb-2" />
          <div className="text-3xl font-bold text-[#CC7A00]">
            {nutrition.total_calories}
          </div>
          <div className="text-sm text-[#CC7A00]">千卡/份</div>
        </div>
      </div>

      {/* 营养成分柱状图 */}
      <div className="mb-4">
        <p className="text-sm font-medium text-[var(--color-text)] mb-3">营养成分比例</p>
        <div className="flex h-8 rounded-full overflow-hidden">
          <div
            className="bg-[#4D9B6A] flex items-center justify-center text-white text-xs font-medium"
            style={{ width: `${proteinPercent}%` }}
          >
            {proteinPercent > 10 ? `${proteinPercent}%` : ''}
          </div>
          <div
            className="bg-[#FFB84D] flex items-center justify-center text-white text-xs font-medium"
            style={{ width: `${carbsPercent}%` }}
          >
            {carbsPercent > 10 ? `${carbsPercent}%` : ''}
          </div>
          <div
            className="bg-[#FF6B6B] flex items-center justify-center text-white text-xs font-medium"
            style={{ width: `${fatPercent}%` }}
          >
            {fatPercent > 10 ? `${fatPercent}%` : ''}
          </div>
        </div>
      </div>

      {/* 详细营养成分 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 p-3 bg-[#F5F4F1] rounded-lg">
          <div className="w-8 h-8 bg-[#4D9B6A] rounded-full flex items-center justify-center">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-lg font-semibold text-[var(--color-text)]">
              {nutrition.nutrients.protein}
            </div>
            <div className="text-xs text-[var(--color-text-secondary)]">蛋白质(g)</div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-[#F5F4F1] rounded-lg">
          <div className="w-8 h-8 bg-[#FFB84D] rounded-full flex items-center justify-center">
            <Wheat className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-lg font-semibold text-[var(--color-text)]">
              {nutrition.nutrients.carbs}
            </div>
            <div className="text-xs text-[var(--color-text-secondary)]">碳水(g)</div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-[#F5F4F1] rounded-lg">
          <div className="w-8 h-8 bg-[#FF6B6B] rounded-full flex items-center justify-center">
            <Droplet className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-lg font-semibold text-[var(--color-text)]">
              {nutrition.nutrients.fat}
            </div>
            <div className="text-xs text-[var(--color-text-secondary)]">脂肪(g)</div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-[#F5F4F1] rounded-lg">
          <div className="w-8 h-8 bg-[#8BC34A] rounded-full flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-lg font-semibold text-[var(--color-text)]">
              {nutrition.nutrients.fiber}
            </div>
            <div className="text-xs text-[var(--color-text-secondary)]">纤维(g)</div>
          </div>
        </div>
      </div>

      {/* 饮食标签 */}
      {nutrition.dietary_tags.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-[var(--color-text)] mb-2">饮食特点</p>
          <div className="flex flex-wrap gap-2">
            {nutrition.dietary_tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#C8F0D8] text-[#2D7A4F] rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 过敏原警告 */}
      {nutrition.allergens.length > 0 && (
        <div className="p-3 bg-[#FFE8CC] border-l-4 border-[#CC7A00] rounded-r-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-[#CC7A00] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#CC7A00] mb-1">
                过敏原提示
              </p>
              <p className="text-sm text-[var(--color-text)]">
                此菜品包含：{nutrition.allergens.join('、')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
