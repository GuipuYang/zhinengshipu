import { Recipe, recipesDatabase } from './recipes-data';

export interface MatchedRecipe extends Recipe {
  match_percentage: number; // 食材匹配度
  available_ingredients: string[]; // 已有食材
  missing_ingredients: string[]; // 缺少食材
}

/**
 * 根据用户输入的食材匹配食谱
 * @param userIngredients 用户选择的食材名称数组
 * @returns 匹配的食谱列表，按匹配度排序
 */
export function matchRecipes(userIngredients: string[]): MatchedRecipe[] {
  const matchedRecipes: MatchedRecipe[] = [];

  for (const recipe of recipesDatabase) {
    // 计算匹配的食材
    const availableIngredients = recipe.required_ingredients.filter(ingredient =>
      userIngredients.includes(ingredient)
    );

    // 计算缺少的食材
    const missingIngredients = recipe.required_ingredients.filter(ingredient =>
      !userIngredients.includes(ingredient)
    );

    // 计算匹配度：已有食材数 / 必需食材总数
    const matchPercentage = Math.round(
      (availableIngredients.length / recipe.required_ingredients.length) * 100
    );

    // 只返回至少匹配50%的食谱
    if (matchPercentage >= 50) {
      matchedRecipes.push({
        ...recipe,
        match_percentage: matchPercentage,
        available_ingredients: availableIngredients,
        missing_ingredients: missingIngredients
      });
    }
  }

  // 按匹配度降序排序
  matchedRecipes.sort((a, b) => b.match_percentage - a.match_percentage);

  // 最多返回5个食谱
  return matchedRecipes.slice(0, 5);
}

/**
 * 生成食谱（模拟AI生成过程）
 * @param userIngredients 用户选择的食材名称数组
 * @returns Promise<MatchedRecipe[]>
 */
export async function generateRecipes(userIngredients: string[]): Promise<MatchedRecipe[]> {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 1500));

  return matchRecipes(userIngredients);
}
