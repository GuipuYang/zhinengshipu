// 本地食谱数据库
export interface Recipe {
  id: string;
  name: string;
  description: string; // 菜谱简介
  difficulty: '简单' | '中等' | '复杂';
  cooking_time: number; // 分钟
  servings: number; // 份数
  calories: number; // 千卡
  required_ingredients: string[]; // 必需食材
  optional_ingredients: string[]; // 可选食材
  steps: string[]; // 做法步骤
  tips: string; // 烹饪小贴士
  cuisine: string; // 菜系
  taste_tags: string[]; // 口味标签
}

export const recipesDatabase: Recipe[] = [
  {
    id: 'recipe_001',
    name: '番茄土豆炖牛腩',
    description: '经典家常菜，番茄的酸甜与土豆的软糯完美融合，营养丰富，老少皆宜。',
    difficulty: '中等',
    cooking_time: 45,
    servings: 3,
    calories: 320,
    required_ingredients: ['西红柿', '土豆', '牛肉'],
    optional_ingredients: ['胡萝卜', '洋葱', '姜', '蒜'],
    steps: [
      '牛腩切块，冷水下锅焯水去血沫，捞出备用',
      '西红柿切块，土豆和胡萝卜切滚刀块',
      '热锅冷油，爆香姜蒜，加入牛腩翻炒至表面微黄',
      '加入西红柿翻炒出汁，倒入热水没过食材，大火烧开转小火炖30分钟',
      '加入土豆和胡萝卜，继续炖15分钟至食材软烂，加盐调味即可'
    ],
    tips: '牛腩要选择带筋的部位，炖出来更香。西红柿多炒一会儿，汤汁会更浓郁。',
    cuisine: '中餐',
    taste_tags: ['咸鲜', '微酸']
  },
  {
    id: 'recipe_002',
    name: '清炒时蔬',
    description: '清爽健康的快手菜，保留蔬菜原味，适合减脂期食用。',
    difficulty: '简单',
    cooking_time: 10,
    servings: 2,
    calories: 85,
    required_ingredients: ['胡萝卜', '西兰花'],
    optional_ingredients: ['蒜', '盐', '鸡精'],
    steps: [
      '西兰花切小朵，胡萝卜切片，分别焯水备用',
      '热锅冷油，爆香蒜末',
      '倒入胡萝卜片翻炒1分钟',
      '加入西兰花快速翻炒，加盐和少许鸡精调味即可'
    ],
    tips: '蔬菜焯水时加少许盐和油，可以保持翠绿色泽。',
    cuisine: '中餐',
    taste_tags: ['清淡', '健康']
  },
  {
    id: 'recipe_003',
    name: '番茄炒蛋',
    description: '经典家常菜，番茄的酸甜与鸡蛋的嫩滑完美搭配，简单快手又美味。',
    difficulty: '简单',
    cooking_time: 15,
    servings: 2,
    calories: 180,
    required_ingredients: ['西红柿', '鸡蛋'],
    optional_ingredients: ['葱', '糖', '盐'],
    steps: [
      '西红柿切块，鸡蛋打散加少许盐',
      '热锅冷油，倒入蛋液炒至凝固，盛出备用',
      '锅中再加油，倒入西红柿翻炒出汁',
      '加入少许糖提鲜，倒入炒好的鸡蛋',
      '快速翻炒均匀，撒葱花即可出锅'
    ],
    tips: '先炒鸡蛋再炒西红柿，鸡蛋会更嫩滑。加一点糖可以中和西红柿的酸味。',
    cuisine: '中餐',
    taste_tags: ['酸甜', '家常']
  },
  {
    id: 'recipe_004',
    name: '土豆丝炒肉',
    description: '下饭神器，土豆丝的脆爽与肉丝的鲜香相得益彰，简单美味。',
    difficulty: '简单',
    cooking_time: 20,
    servings: 2,
    calories: 280,
    required_ingredients: ['土豆', '猪肉'],
    optional_ingredients: ['青椒', '蒜', '酱油', '盐'],
    steps: [
      '土豆切丝泡水去淀粉，猪肉切丝加酱油腌制10分钟',
      '热锅冷油，炒香肉丝至变色，盛出备用',
      '锅中加油，爆香蒜末，倒入土豆丝大火翻炒',
      '加入青椒丝和肉丝，继续翻炒2分钟',
      '加盐调味，翻炒均匀即可出锅'
    ],
    tips: '土豆丝要切得细一些，炒的时候火要大，这样口感更脆。',
    cuisine: '中餐',
    taste_tags: ['咸香', '下饭']
  },
  {
    id: 'recipe_005',
    name: '胡萝卜炖羊肉',
    description: '滋补暖身的炖菜，羊肉的鲜美与胡萝卜的清甜完美融合，营养丰富。',
    difficulty: '中等',
    cooking_time: 50,
    servings: 3,
    calories: 350,
    required_ingredients: ['胡萝卜', '羊肉'],
    optional_ingredients: ['姜', '葱', '料酒', '盐'],
    steps: [
      '羊肉切块，冷水下锅加姜片和料酒焯水，捞出洗净',
      '胡萝卜切滚刀块备用',
      '热锅冷油，爆香姜葱，加入羊肉翻炒',
      '倒入热水没过羊肉，大火烧开转小火炖35分钟',
      '加入胡萝卜继续炖15分钟，加盐调味即可'
    ],
    tips: '羊肉要充分焯水去膻味，炖的时候加几片白萝卜也可以去膻。',
    cuisine: '中餐',
    taste_tags: ['咸鲜', '滋补']
  },
  {
    id: 'recipe_006',
    name: '蔬菜沙拉',
    description: '清爽健康的快手菜，保留蔬菜原味，适合减脂期食用。',
    difficulty: '简单',
    cooking_time: 10,
    servings: 2,
    calories: 120,
    required_ingredients: ['西红柿', '黄瓜', '生菜'],
    optional_ingredients: ['沙拉酱', '柠檬汁', '橄榄油'],
    steps: [
      '西红柿切块，黄瓜切片，生菜撕成小片',
      '所有蔬菜放入大碗中',
      '加入沙拉酱或橄榄油和柠檬汁',
      '轻轻拌匀即可食用'
    ],
    tips: '蔬菜要洗净沥干水分，吃之前再拌酱料，保持脆爽口感。',
    cuisine: '西餐',
    taste_tags: ['清爽', '健康']
  }
];