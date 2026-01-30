// 食材营养数据 (每100g)
export interface IngredientNutrition {
  id: string;
  name: string;
  calories: number; // 千卡
  protein: number; // 克
  carbs: number; // 克
  fat: number; // 克
  fiber: number; // 克
  allergens: string[]; // 过敏原
}

export const nutritionDatabase: Record<string, IngredientNutrition> = {
  '西红柿': {
    id: 'tomato',
    name: '西红柿',
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fat: 0.2,
    fiber: 1.2,
    allergens: []
  },
  '土豆': {
    id: 'potato',
    name: '土豆',
    calories: 77,
    protein: 2.0,
    carbs: 17.5,
    fat: 0.1,
    fiber: 2.2,
    allergens: []
  },
  '胡萝卜': {
    id: 'carrot',
    name: '胡萝卜',
    calories: 41,
    protein: 0.9,
    carbs: 9.6,
    fat: 0.2,
    fiber: 2.8,
    allergens: []
  },
  '牛肉': {
    id: 'beef',
    name: '牛肉',
    calories: 250,
    protein: 26.0,
    carbs: 0,
    fat: 15.0,
    fiber: 0,
    allergens: []
  },
  '羊肉': {
    id: 'lamb',
    name: '羊肉',
    calories: 294,
    protein: 25.0,
    carbs: 0,
    fat: 22.0,
    fiber: 0,
    allergens: []
  },
  '猪肉': {
    id: 'pork',
    name: '猪肉',
    calories: 242,
    protein: 27.0,
    carbs: 0,
    fat: 14.0,
    fiber: 0,
    allergens: []
  },
  '鸡蛋': {
    id: 'egg',
    name: '鸡蛋',
    calories: 155,
    protein: 13.0,
    carbs: 1.1,
    fat: 11.0,
    fiber: 0,
    allergens: ['鸡蛋']
  },
  '西兰花': {
    id: 'broccoli',
    name: '西兰花',
    calories: 34,
    protein: 2.8,
    carbs: 7.0,
    fat: 0.4,
    fiber: 2.6,
    allergens: []
  },
  '黄瓜': {
    id: 'cucumber',
    name: '黄瓜',
    calories: 16,
    protein: 0.7,
    carbs: 3.6,
    fat: 0.1,
    fiber: 0.5,
    allergens: []
  },
  '生菜': {
    id: 'lettuce',
    name: '生菜',
    calories: 15,
    protein: 1.4,
    carbs: 2.9,
    fat: 0.2,
    fiber: 1.3,
    allergens: []
  },
  '洋葱': {
    id: 'onion',
    name: '洋葱',
    calories: 40,
    protein: 1.1,
    carbs: 9.3,
    fat: 0.1,
    fiber: 1.7,
    allergens: []
  },
  '青椒': {
    id: 'pepper',
    name: '青椒',
    calories: 26,
    protein: 1.0,
    carbs: 6.0,
    fat: 0.2,
    fiber: 2.1,
    allergens: []
  }
};

// 菜谱营养分析结果
export interface RecipeNutrition {
  total_calories: number; // 总热量(千卡)
  nutrients: {
    protein: number; // 蛋白质(克)
    carbs: number; // 碳水化合物(克)
    fat: number; // 脂肪(克)
    fiber: number; // 纤维(克)
  };
  dietary_tags: string[]; // 饮食标签
  allergens: string[]; // 过敏原
}

/**
 * 计算菜谱的营养成分
 */
export function calculateRecipeNutrition(ingredients: string[], quantities?: Record<string, string>): RecipeNutrition {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalFiber = 0;
  const allergensSet = new Set<string>();

  ingredients.forEach(ingredientName => {
    const nutrition = nutritionDatabase[ingredientName];
    if (nutrition) {
      // 假设每个食材标准份量为100g
      let portion = 1; // 默认100g

      // 如果有数量信息，可以简单解析
      if (quantities && quantities[ingredientName]) {
        const qty = quantities[ingredientName];
        const match = qty.match(/(\d+)/);
        if (match) {
          const num = parseInt(match[1]);
          // 简单的数量估算逻辑
          if (qty.includes('g')) {
            portion = num / 100;
          } else if (qty.includes('个') || qty.includes('根')) {
            portion = num * 0.8; // 假设1个约80g
          }
        }
      }

      totalCalories += nutrition.calories * portion;
      totalProtein += nutrition.protein * portion;
      totalCarbs += nutrition.carbs * portion;
      totalFat += nutrition.fat * portion;
      totalFiber += nutrition.fiber * portion;

      nutrition.allergens.forEach(allergen => allergensSet.add(allergen));
    }
  });

  // 生成饮食标签
  const dietaryTags: string[] = [];
  const totalGrams = totalProtein + totalCarbs + totalFat;

  if (totalGrams > 0) {
    const proteinRatio = totalProtein / totalGrams;
    const carbRatio = totalCarbs / totalGrams;
    const fatRatio = totalFat / totalGrams;

    if (proteinRatio > 0.3) dietaryTags.push('高蛋白');
    if (fatRatio < 0.2) dietaryTags.push('低脂');
    if (carbRatio > 0.5) dietaryTags.push('高碳水');
    if (totalFiber > 10) dietaryTags.push('高纤维');
    if (totalCalories < 300) dietaryTags.push('低热量');
    if (totalCalories > 500) dietaryTags.push('高热量');
  }

  return {
    total_calories: Math.round(totalCalories),
    nutrients: {
      protein: Math.round(totalProtein * 10) / 10,
      carbs: Math.round(totalCarbs * 10) / 10,
      fat: Math.round(totalFat * 10) / 10,
      fiber: Math.round(totalFiber * 10) / 10
    },
    dietary_tags: dietaryTags,
    allergens: Array.from(allergensSet)
  };
}
