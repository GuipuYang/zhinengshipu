// 食材替代关系数据
export interface IngredientSubstitute {
  ingredient_id: string;
  ingredient_name: string;
  substitutes: {
    name: string;
    similarity_score: number; // 0-1, 相似度
    availability_score: number; // 0-1, 易获取性
    notes: string; // 替代说明
    usage_ratio: string; // 使用比例, 如 "1:1", "1:0.8"
  }[];
}

export const substituteDatabase: Record<string, IngredientSubstitute> = {
  '西红柿': {
    ingredient_id: 'tomato',
    ingredient_name: '西红柿',
    substitutes: [
      {
        name: '番茄酱',
        similarity_score: 0.85,
        availability_score: 0.95,
        notes: '口感略有不同，但可以提供相似的酸味',
        usage_ratio: '1:0.3'
      },
      {
        name: '胡萝卜',
        similarity_score: 0.5,
        availability_score: 0.9,
        notes: '可以提供甜味和红色，但酸味不足',
        usage_ratio: '1:1'
      }
    ]
  },
  '牛肉': {
    ingredient_id: 'beef',
    ingredient_name: '牛肉',
    substitutes: [
      {
        name: '猪肉',
        similarity_score: 0.8,
        availability_score: 0.95,
        notes: '口感较嫩，烹饪时间可稍短',
        usage_ratio: '1:1'
      },
      {
        name: '羊肉',
        similarity_score: 0.75,
        availability_score: 0.8,
        notes: '味道更浓郁，有独特膻味',
        usage_ratio: '1:1'
      },
      {
        name: '豆腐',
        similarity_score: 0.4,
        availability_score: 0.95,
        notes: '素食替代品，口感和风味差异较大',
        usage_ratio: '1:1'
      }
    ]
  },
  '鸡蛋': {
    ingredient_id: 'egg',
    ingredient_name: '鸡蛋',
    substitutes: [
      {
        name: '豆腐',
        similarity_score: 0.6,
        availability_score: 0.95,
        notes: '适合炒制，但香味和口感有差异',
        usage_ratio: '1:1'
      },
      {
        name: '香蕉泥',
        similarity_score: 0.5,
        availability_score: 0.85,
        notes: '适合烘焙，不适合炒制',
        usage_ratio: '1:0.5'
      }
    ]
  },
  '洋葱': {
    ingredient_id: 'onion',
    ingredient_name: '洋葱',
    substitutes: [
      {
        name: '大葱',
        similarity_score: 0.85,
        availability_score: 0.9,
        notes: '香味相似，口感稍有不同',
        usage_ratio: '1:1'
      },
      {
        name: '蒜',
        similarity_score: 0.6,
        availability_score: 0.95,
        notes: '香味更浓烈，使用量要减少',
        usage_ratio: '1:0.3'
      }
    ]
  },
  '胡萝卜': {
    ingredient_id: 'carrot',
    ingredient_name: '胡萝卜',
    substitutes: [
      {
        name: '南瓜',
        similarity_score: 0.8,
        availability_score: 0.85,
        notes: '甜度和口感相似',
        usage_ratio: '1:1'
      },
      {
        name: '红薯',
        similarity_score: 0.75,
        availability_score: 0.85,
        notes: '口感更软糯，甜味更浓',
        usage_ratio: '1:1'
      }
    ]
  },
  '土豆': {
    ingredient_id: 'potato',
    ingredient_name: '土豆',
    substitutes: [
      {
        name: '红薯',
        similarity_score: 0.85,
        availability_score: 0.85,
        notes: '口感更甜，适合炖煮',
        usage_ratio: '1:1'
      },
      {
        name: '芋头',
        similarity_score: 0.8,
        availability_score: 0.7,
        notes: '口感相似但更黏糯',
        usage_ratio: '1:1'
      },
      {
        name: '山药',
        similarity_score: 0.75,
        availability_score: 0.8,
        notes: '口感较脆，营养价值更高',
        usage_ratio: '1:1'
      }
    ]
  },
  '羊肉': {
    ingredient_id: 'lamb',
    ingredient_name: '羊肉',
    substitutes: [
      {
        name: '牛肉',
        similarity_score: 0.8,
        availability_score: 0.95,
        notes: '口感更紧实，烹饪时间稍长',
        usage_ratio: '1:1'
      },
      {
        name: '猪肉',
        similarity_score: 0.7,
        availability_score: 0.95,
        notes: '脂肪含量不同，可能需要调整调味',
        usage_ratio: '1:1'
      }
    ]
  },
  '西兰花': {
    ingredient_id: 'broccoli',
    ingredient_name: '西兰花',
    substitutes: [
      {
        name: '花菜',
        similarity_score: 0.9,
        availability_score: 0.9,
        notes: '口感相似，营养相近',
        usage_ratio: '1:1'
      },
      {
        name: '荷兰豆',
        similarity_score: 0.7,
        availability_score: 0.8,
        notes: '口感更脆，适合炒制',
        usage_ratio: '1:1'
      }
    ]
  }
};

/**
 * 获取食材的替代品推荐
 */
export function getSubstitutes(ingredientName: string): IngredientSubstitute | null {
  return substituteDatabase[ingredientName] || null;
}

/**
 * 根据替代品调整食谱步骤
 */
export function adjustStepsWithSubstitute(
  steps: string[],
  originalIngredient: string,
  substituteIngredient: string
): string[] {
  const adjustedSteps = steps.map((step, index) => {
    if (step.includes(originalIngredient)) {
      let adjustedStep = step.replace(new RegExp(originalIngredient, 'g'), substituteIngredient);

      // 添加烹饪调整提示
      const substituteInfo = substituteDatabase[originalIngredient];
      if (substituteInfo) {
        const sub = substituteInfo.substitutes.find(s => s.name === substituteIngredient);
        if (sub && sub.notes) {
          adjustedStep += ` (${sub.notes})`;
        }
      }

      return adjustedStep;
    }
    return step;
  });

  return adjustedSteps;
}
