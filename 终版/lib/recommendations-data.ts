// 智能推荐相关数据

// 当季食材数据
export interface SeasonalIngredient {
  name: string;
  emoji: string;
  category: string;
}

export const seasonalIngredients: Record<string, SeasonalIngredient[]> = {
  'spring': [
    { name: '竹笋', emoji: '🎋', category: '蔬菜' },
    { name: '菠菜', emoji: '🥬', category: '蔬菜' },
    { name: '韭菜', emoji: '🌿', category: '蔬菜' },
    { name: '春笋', emoji: '🎋', category: '蔬菜' },
    { name: '草莓', emoji: '🍓', category: '水果' }
  ],
  'summer': [
    { name: '西红柿', emoji: '🍅', category: '蔬菜' },
    { name: '黄瓜', emoji: '🥒', category: '蔬菜' },
    { name: '茄子', emoji: '🍆', category: '蔬菜' },
    { name: '丝瓜', emoji: '🥒', category: '蔬菜' },
    { name: '苦瓜', emoji: '🥒', category: '蔬菜' },
    { name: '西瓜', emoji: '🍉', category: '水果' }
  ],
  'autumn': [
    { name: '南瓜', emoji: '🎃', category: '蔬菜' },
    { name: '莲藕', emoji: '🥔', category: '蔬菜' },
    { name: '萝卜', emoji: '🥕', category: '蔬菜' },
    { name: '山药', emoji: '🥔', category: '蔬菜' },
    { name: '苹果', emoji: '🍎', category: '水果' }
  ],
  'winter': [
    { name: '白菜', emoji: '🥬', category: '蔬菜' },
    { name: '胡萝卜', emoji: '🥕', category: '蔬菜' },
    { name: '土豆', emoji: '🥔', category: '蔬菜' },
    { name: '白萝卜', emoji: '🥕', category: '蔬菜' },
    { name: '柚子', emoji: '🍊', category: '水果' }
  ]
};

// 获取当前季节
export function getCurrentSeason(): string {
  const month = new Date().getMonth() + 1; // 1-12

  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

// 用户剩余食材记录
export interface RemainingIngredient {
  ingredient_name: string;
  quantity: string;
  last_used: string; // ISO日期字符串
}

export interface UserPreferences {
  budget_range: { min: number; max: number }; // 预算范围(元)
  dietary_restrictions: string[]; // 饮食限制
  preferred_cuisines: string[]; // 偏好菜系
}

// 推荐理由类型
export type RecommendationReason =
  | 'remaining_ingredients' // 剩余食材利用
  | 'seasonal' // 当季推荐
  | 'budget_friendly'; // 预算友好

// 推荐菜谱卡片
export interface RecommendedRecipe {
  id: string;
  name: string;
  reason: RecommendationReason;
  reason_text: string;
  difficulty: string;
  cooking_time: number;
  calories: number;
  match_percentage: number;
}

/**
 * 根据剩余食材生成推荐
 */
export function getRecommendationsByRemaining(
  remainingIngredients: RemainingIngredient[],
  allRecipes: any[]
): RecommendedRecipe[] {
  const recommendations: RecommendedRecipe[] = [];
  const remainingNames = remainingIngredients.map(r => r.ingredient_name);

  // 匹配包含剩余食材的菜谱
  for (const recipe of allRecipes) {
    const matchCount = recipe.required_ingredients.filter((ing: string) =>
      remainingNames.includes(ing)
    ).length;

    if (matchCount > 0) {
      const matchPercentage = Math.round((matchCount / recipe.required_ingredients.length) * 100);
      if (matchPercentage >= 50) {
        recommendations.push({
          id: recipe.id,
          name: recipe.name,
          reason: 'remaining_ingredients',
          reason_text: `利用剩余${remainingNames.slice(0, 2).join('、')}`,
          difficulty: recipe.difficulty,
          cooking_time: recipe.cooking_time,
          calories: recipe.calories,
          match_percentage: matchPercentage
        });
      }
    }
  }

  return recommendations.slice(0, 3);
}

/**
 * 根据当季食材生成推荐
 */
export function getSeasonalRecommendations(
  allRecipes: any[]
): RecommendedRecipe[] {
  const season = getCurrentSeason();
  const seasonalNames = seasonalIngredients[season].map(s => s.name);
  const recommendations: RecommendedRecipe[] = [];

  for (const recipe of allRecipes) {
    const hasSeasonal = recipe.required_ingredients.some((ing: string) =>
      seasonalNames.includes(ing)
    );

    if (hasSeasonal) {
      const seasonalIngredients = recipe.required_ingredients.filter((ing: string) =>
        seasonalNames.includes(ing)
      );
      const matchPercentage = Math.round((seasonalIngredients.length / recipe.required_ingredients.length) * 100);

      recommendations.push({
        id: recipe.id,
        name: recipe.name,
        reason: 'seasonal',
        reason_text: `使用当季${seasonalIngredients[0]}`,
        difficulty: recipe.difficulty,
        cooking_time: recipe.cooking_time,
        calories: recipe.calories,
        match_percentage: matchPercentage
      });
    }
  }

  return recommendations.slice(0, 3);
}

/**
 * 根据预算生成推荐
 */
export function getBudgetFriendlyRecommendations(
  allRecipes: any[],
  maxBudget: number = 30
): RecommendedRecipe[] {
  const recommendations: RecommendedRecipe[] = [];

  // 简单估算：每道菜成本 ≈ 热量/20 (粗略估算)
  for (const recipe of allRecipes) {
    const estimatedCost = Math.round(recipe.calories / 20);

    if (estimatedCost <= maxBudget) {
      recommendations.push({
        id: recipe.id,
        name: recipe.name,
        reason: 'budget_friendly',
        reason_text: `预计成本约${estimatedCost}元`,
        difficulty: recipe.difficulty,
        cooking_time: recipe.cooking_time,
        calories: recipe.calories,
        match_percentage: 100
      });
    }
  }

  // 按成本排序
  recommendations.sort((a, b) => {
    const costA = Math.round(a.calories / 20);
    const costB = Math.round(b.calories / 20);
    return costA - costB;
  });

  return recommendations.slice(0, 3);
}

/**
 * 综合智能推荐
 */
export function getSmartRecommendations(
  allRecipes: any[],
  remainingIngredients?: RemainingIngredient[],
  userPreferences?: UserPreferences
): RecommendedRecipe[] {
  const allRecommendations: RecommendedRecipe[] = [];

  // 剩余食材推荐
  if (remainingIngredients && remainingIngredients.length > 0) {
    const remainingRecs = getRecommendationsByRemaining(remainingIngredients, allRecipes);
    allRecommendations.push(...remainingRecs);
  }

  // 当季推荐
  const seasonalRecs = getSeasonalRecommendations(allRecipes);
  allRecommendations.push(...seasonalRecs);

  // 预算友好推荐
  const maxBudget = userPreferences?.budget_range?.max || 30;
  const budgetRecs = getBudgetFriendlyRecommendations(allRecipes, maxBudget);
  allRecommendations.push(...budgetRecs);

  // 去重并返回前5个推荐
  const uniqueRecs = allRecommendations.filter((recipe, index, self) =>
    index === self.findIndex(r => r.id === recipe.id)
  );

  return uniqueRecs.slice(0, 5);
}
