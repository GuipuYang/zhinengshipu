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
  },
  {
    id: 'recipe_007',
    name: '红烧排骨',
    description: '经典红烧菜品，色泽红亮，口感鲜美，是家宴必备的硬菜。',
    difficulty: '中等',
    cooking_time: 60,
    servings: 4,
    calories: 420,
    required_ingredients: ['排骨'],
    optional_ingredients: ['冰糖', '姜', '葱', '蒜', '酱油', '料酒', '盐'],
    steps: [
      '排骨冷水下锅焯水去血沫，捞出洗净沥干',
      '热锅放冰糖小火炒出糖色，倒入排骨翻炒上色',
      '加入姜片、葱段、蒜瓣翻炒出香味',
      '倒入酱油和料酒，加热水没过排骨',
      '大火烧开后转小火炖45分钟，最后大火收汁即可'
    ],
    tips: '炒糖色要小火慢炒，糖色呈焦糖色时立即倒入排骨。收汁时要注意火候，避免糊锅。',
    cuisine: '中餐',
    taste_tags: ['香甜', '下饭']
  },
  {
    id: 'recipe_008',
    name: '清蒸鲈鱼',
    description: '清淡鲜美的蒸菜，保留鱼肉鲜嫩，营养丰富，老少皆宜。',
    difficulty: '简单',
    cooking_time: 25,
    servings: 2,
    calories: 180,
    required_ingredients: ['鱼'],
    optional_ingredients: ['姜', '葱', '料酒', '酱油', '蒸鱼豉油'],
    steps: [
      '鲈鱼处理干净，在鱼身两侧划几刀，用料酒和盐腌制10分钟',
      '盘底铺姜片和葱段，放上鲈鱼，鱼身上再放姜片和葱段',
      '蒸锅水开后放入鲈鱼，大火蒸10-12分钟',
      '取出蒸好的鱼，倒掉盘中汤汁，淋上蒸鱼豉油',
      '撒上葱丝，浇上热油即可'
    ],
    tips: '蒸鱼时间要掌握好，一般一斤左右的鱼蒸10分钟就够了。最后浇热油能激发葱丝的香味。',
    cuisine: '中餐',
    taste_tags: ['清淡', '鲜美']
  },
  {
    id: 'recipe_009',
    name: '宫保鸡丁',
    description: '川菜经典，鸡丁嫩滑，花生香脆，酸甜微辣，下饭神器。',
    difficulty: '复杂',
    cooking_time: 35,
    servings: 3,
    calories: 380,
    required_ingredients: ['鸡肉', '辣椒'],
    optional_ingredients: ['花生', '姜', '蒜', '葱', '酱油', '醋', '糖', '淀粉', '豆瓣酱'],
    steps: [
      '鸡胸肉切丁，用料酒、酱油、淀粉腌制15分钟',
      '干辣椒切段，花生米炸酥备用，姜蒜切末',
      '热锅冷油，下鸡丁炒至变色盛出',
      '锅中加油，爆香姜蒜，加入豆瓣酱炒出红油',
      '倒入鸡丁和干辣椒翻炒，加调好的糖醋汁',
      '最后加入花生米快速翻炒均匀即可'
    ],
    tips: '调宫保汁的比例是酱油2勺、醋1勺、糖1勺。花生米要最后放，保持酥脆口感。',
    cuisine: '川菜',
    taste_tags: ['酸甜', '微辣']
  },
  {
    id: 'recipe_010',
    name: '蒜蓉蒸虾',
    description: '鲜美简单的蒸菜，蒜香浓郁，虾肉Q弹，制作快手。',
    difficulty: '简单',
    cooking_time: 15,
    servings: 3,
    calories: 220,
    required_ingredients: ['虾', '蒜'],
    optional_ingredients: ['葱', '料酒', '酱油', '盐', '油'],
    steps: [
      '虾洗净剪去虾须，开背去虾线，用料酒和盐腌制5分钟',
      '蒜切成蒜蓉，热油炒香蒜蓉',
      '将炒好的蒜蓉均匀铺在虾背上',
      '蒸锅水开后放入虾，大火蒸5-6分钟',
      '取出撒上葱花，淋上少许热油即可'
    ],
    tips: '虾开背可以更好入味，蒸的时候不要蒸太久，以免虾肉变老。',
    cuisine: '中餐',
    taste_tags: ['蒜香', '鲜美']
  },
  {
    id: 'recipe_011',
    name: '糖醋里脊',
    description: '酸甜可口的经典菜品，外酥里嫩，色泽金黄，深受喜爱。',
    difficulty: '复杂',
    cooking_time: 40,
    servings: 3,
    calories: 450,
    required_ingredients: ['猪肉'],
    optional_ingredients: ['淀粉', '鸡蛋', '糖', '醋', '番茄酱', '盐', '料酒'],
    steps: [
      '里脊肉切条，用料酒和盐腌制10分钟',
      '腌好的里脊条裹上蛋液，再裹上一层干淀粉',
      '油温七成热时下锅炸至金黄色捞出',
      '锅中留少许油，加入番茄酱、糖、醋调成糖醋汁',
      '倒入炸好的里脊快速翻炒均匀即可出锅'
    ],
    tips: '炸里脊要用二次炸法，第一次炸至定型，第二次炸至酥脆。糖醋汁要提前调好。',
    cuisine: '中餐',
    taste_tags: ['酸甜', '酥脆']
  },
  {
    id: 'recipe_012',
    name: '麻婆豆腐',
    description: '川菜经典，豆腐嫩滑，麻辣鲜香，下饭神器。',
    difficulty: '中等',
    cooking_time: 25,
    servings: 3,
    calories: 280,
    required_ingredients: ['豆腐', '辣椒'],
    optional_ingredients: ['猪肉', '豆瓣酱', '姜', '蒜', '葱', '花椒', '酱油', '淀粉'],
    steps: [
      '豆腐切块，用盐水浸泡5分钟，猪肉剁成肉末',
      '热锅冷油，炒香肉末，加入豆瓣酱炒出红油',
      '加入姜蒜末和花椒炒香，倒入热水烧开',
      '放入豆腐块，小火煮3分钟，用酱油调味',
      '水淀粉勾芡，撒上葱花和花椒粉即可'
    ],
    tips: '豆腐用盐水浸泡可以去豆腥味。最后撒花椒粉要现磨的才够香。',
    cuisine: '川菜',
    taste_tags: ['麻辣', '下饭']
  },
  {
    id: 'recipe_013',
    name: '鱼香肉丝',
    description: '川菜经典，没有鱼却有鱼香味，酸甜微辣，口感丰富。',
    difficulty: '复杂',
    cooking_time: 30,
    servings: 3,
    calories: 350,
    required_ingredients: ['猪肉', '胡萝卜', '辣椒'],
    optional_ingredients: ['木耳', '姜', '蒜', '葱', '酱油', '醋', '糖', '淀粉', '泡辣椒'],
    steps: [
      '猪肉切丝，用淀粉和酱油腌制，胡萝卜和木耳切丝',
      '调鱼香汁：酱油2勺、醋2勺、糖1勺、淀粉少许',
      '热锅冷油，炒肉丝至变色盛出',
      '锅中加油，爆香姜蒜和泡辣椒',
      '倒入胡萝卜丝和木耳丝翻炒，加入肉丝',
      '倒入调好的鱼香汁快速翻炒均匀即可'
    ],
    tips: '鱼香汁的比例很重要，酱油和醋的比例是1:1，糖是酱油的一半。',
    cuisine: '川菜',
    taste_tags: ['酸甜', '微辣']
  },
  {
    id: 'recipe_014',
    name: '红烧茄子',
    description: '经典素菜，茄子软糯，酱香浓郁，下饭神器。',
    difficulty: '中等',
    cooking_time: 30,
    servings: 3,
    calories: 260,
    required_ingredients: ['茄子', '蒜'],
    optional_ingredients: ['葱', '姜', '酱油', '糖', '盐', '淀粉'],
    steps: [
      '茄子切块，用盐腌制10分钟挤干水分',
      '茄子块裹上干淀粉，油温七成热炸至金黄捞出',
      '锅中留少许油，爆香蒜蓉和姜片',
      '加入酱油、糖和少许水烧开',
      '倒入炸好的茄子翻炒，用淀粉勾薄芡即可'
    ],
    tips: '茄子用盐腌制可以减少吸油量。裹淀粉炸制外酥里嫩。',
    cuisine: '中餐',
    taste_tags: ['酱香', '下饭']
  },
  {
    id: 'recipe_015',
    name: '白灼菜心',
    description: '粤菜经典，保留蔬菜原味，简单健康，清爽解腻。',
    difficulty: '简单',
    cooking_time: 10,
    servings: 2,
    calories: 60,
    required_ingredients: ['白菜'],
    optional_ingredients: ['姜', '蒜', '酱油', '油', '盐'],
    steps: [
      '菜心洗净，老叶摘掉',
      '锅中加水烧开，加少许盐和油',
      '放入菜心焯2分钟，捞出沥干装盘',
      '热油爆香姜蒜，浇在菜心上',
      '淋上少许酱油即可食用'
    ],
    tips: '焯水时加少许盐和油，可以保持蔬菜翠绿。焯水时间不要过长，保持脆嫩。',
    cuisine: '粤菜',
    taste_tags: ['清淡', '健康']
  },
  {
    id: 'recipe_016',
    name: '糖醋排骨',
    description: '经典酸甜菜品，色泽红亮，排骨酥烂，老少皆宜。',
    difficulty: '中等',
    cooking_time: 50,
    servings: 4,
    calories: 480,
    required_ingredients: ['排骨'],
    optional_ingredients: ['姜', '葱', '蒜', '酱油', '醋', '糖', '料酒', '盐'],
    steps: [
      '排骨冷水下锅焯水，捞出洗净沥干',
      '热锅冷油，爆香姜蒜，下排骨翻炒至微黄',
      '加入料酒和酱油翻炒上色',
      '倒入热水没过排骨，大火烧开转小火炖35分钟',
      '加入糖和醋，继续炖15分钟，大火收汁即可'
    ],
    tips: '糖醋比例是2:1，收汁时要不断翻炒，让排骨均匀裹上糖醋汁。',
    cuisine: '中餐',
    taste_tags: ['酸甜', '下饭']
  },
  {
    id: 'recipe_017',
    name: '水煮鱼',
    description: '川菜经典，鱼肉嫩滑，麻辣鲜香，麻辣盛宴。',
    difficulty: '复杂',
    cooking_time: 45,
    servings: 4,
    calories: 380,
    required_ingredients: ['鱼', '辣椒'],
    optional_ingredients: ['豆芽', '白菜', '豆瓣酱', '姜', '蒜', '花椒', '干辣椒', '淀粉', '蛋清'],
    steps: [
      '鱼切片，用蛋清和淀粉腌制15分钟',
      '豆芽和白菜焯水铺在碗底',
      '锅中加油，爆香姜蒜和豆瓣酱炒出红油',
      '加入热水烧开，放入鱼片煮熟，倒入铺好蔬菜的碗中',
      '鱼上撒上花椒和干辣椒，浇上热油即可'
    ],
    tips: '鱼片要薄，用蛋清和淀粉腌制可以保持嫩滑。最后浇热油要慢浇，让香味充分释放。',
    cuisine: '川菜',
    taste_tags: ['麻辣', '鲜香']
  },
  {
    id: 'recipe_018',
    name: '可乐鸡翅',
    description: '简单美味的创新菜，鸡翅嫩滑，可乐香气独特，深受喜爱。',
    difficulty: '简单',
    cooking_time: 35,
    servings: 3,
    calories: 420,
    required_ingredients: ['鸡肉'],
    optional_ingredients: ['可乐', '姜', '葱', '酱油', '盐'],
    steps: [
      '鸡翅洗净划几刀，冷水下锅焯水去血沫',
      '热锅冷油，煎鸡翅至两面金黄',
      '加入姜片、葱段和酱油翻炒',
      '倒入可乐没过鸡翅，大火烧开转小火炖20分钟',
      '大火收汁至浓稠即可出锅'
    ],
    tips: '煎鸡翅前可以用纸巾擦干水分，这样更容易煎出金黄表皮。收汁要小火慢慢收。',
    cuisine: '创新菜',
    taste_tags: ['香甜', '嫩滑']
  },
  {
    id: 'recipe_019',
    name: '青椒肉丝',
    description: '经典家常菜，肉丝嫩滑，青椒爽脆，简单快手。',
    difficulty: '简单',
    cooking_time: 20,
    servings: 3,
    calories: 260,
    required_ingredients: ['猪肉', '青椒'],
    optional_ingredients: ['姜', '蒜', '酱油', '淀粉', '盐', '料酒'],
    steps: [
      '猪肉切丝，用酱油、料酒和淀粉腌制10分钟',
      '青椒切丝，姜蒜切末',
      '热锅冷油，炒肉丝至变色盛出',
      '锅中加油，爆香姜蒜，倒入青椒丝翻炒',
      '加入肉丝继续翻炒，加盐调味即可'
    ],
    tips: '肉丝腌制时间不要太长，5-10分钟就够了。炒青椒要大火快炒，保持爽脆。',
    cuisine: '中餐',
    taste_tags: ['咸香', '下饭']
  },
  {
    id: 'recipe_020',
    name: '冬瓜排骨汤',
    description: '清淡鲜美的汤品，排骨酥烂，冬瓜清甜，营养丰富。',
    difficulty: '简单',
    cooking_time: 60,
    servings: 4,
    calories: 320,
    required_ingredients: ['排骨', '南瓜'],
    optional_ingredients: ['冬瓜', '姜', '葱', '料酒', '盐'],
    steps: [
      '排骨冷水下锅焯水，捞出洗净',
      '冬瓜去皮切块',
      '锅中加水，放入排骨、姜片和料酒',
      '大火烧开转小火炖40分钟',
      '加入冬瓜继续炖15分钟，加盐调味即可'
    ],
    tips: '冬瓜不要炖太久，容易烂掉。汤可以适当多加一些，炖出奶白色汤更鲜美。',
    cuisine: '中餐',
    taste_tags: ['清淡', '滋补']
  },
  {
    id: 'recipe_021',
    name: '回锅肉',
    description: '川菜经典，肥而不腻，香辣下饭，农家美味。',
    difficulty: '中等',
    cooking_time: 35,
    servings: 3,
    calories: 480,
    required_ingredients: ['猪肉', '辣椒'],
    optional_ingredients: ['豆瓣酱', '姜', '蒜', '葱', '酱油', '糖', '蒜苗'],
    steps: [
      '五花肉冷水下锅煮20分钟至筷子能插入，捞出切片',
      '青蒜苗切段，姜蒜切末',
      '热锅少油，下肉片炒至卷边出油',
      '加入豆瓣酱炒出红油，加姜蒜爆香',
      '加入蒜苗翻炒，用酱油和糖调味即可'
    ],
    tips: '肉片切薄一些，炒的时候要煸出油脂。豆瓣酱要炒出红油才香。',
    cuisine: '川菜',
    taste_tags: ['香辣', '下饭']
  },
  {
    id: 'recipe_022',
    name: '干煸豆角',
    description: '川菜经典，豆角干香，麻辣鲜香，越嚼越香。',
    difficulty: '中等',
    cooking_time: 25,
    servings: 3,
    calories: 180,
    required_ingredients: ['豆角', '辣椒'],
    optional_ingredients: ['姜', '蒜', '花椒', '干辣椒', '酱油', '盐', '糖'],
    steps: [
      '豆角洗净控干水分，撕掉筋',
      '热锅多油，下豆角炸至表面起泡，捞出沥油',
      '锅中留少许油，爆香姜蒜和花椒',
      '加入干辣椒翻炒',
      '倒入炸好的豆角，加酱油和盐翻炒即可'
    ],
    tips: '豆角要炸透，表面起小泡才好吃。炸豆角时注意安全，油温不要太高。',
    cuisine: '川菜',
    taste_tags: ['麻辣', '干香']
  },
  {
    id: 'recipe_023',
    name: '口水鸡',
    description: '川菜经典，鸡肉嫩滑，麻辣鲜香，开胃爽口。',
    difficulty: '中等',
    cooking_time: 40,
    servings: 4,
    calories: 320,
    required_ingredients: ['鸡肉', '辣椒'],
    optional_ingredients: ['姜', '蒜', '葱', '花椒', '辣椒油', '酱油', '醋', '糖', '花生'],
    steps: [
      '鸡胸肉冷水下锅，加姜片和葱段煮20分钟',
      '煮好的鸡肉放冰水中浸泡5分钟，沥干切块',
      '调口水鸡汁：酱油、醋、糖、辣椒油、花椒油混合',
      '姜蒜剁成泥，加入调好的汁中',
      '将汁浇在鸡肉上，撒上花生碎和葱花即可'
    ],
    tips: '鸡肉煮好后用冰水浸泡可以让肉质更紧实有弹性。调料汁可以根据个人口味调整。',
    cuisine: '川菜',
    taste_tags: ['麻辣', '鲜香']
  },
  {
    id: 'recipe_024',
    name: '蒜蓉西兰花',
    description: '清淡健康的素菜，西兰花翠绿，蒜香浓郁，营养丰富。',
    difficulty: '简单',
    cooking_time: 12,
    servings: 2,
    calories: 80,
    required_ingredients: ['西兰花', '蒜'],
    optional_ingredients: ['盐', '鸡精', '油'],
    steps: [
      '西兰花切小朵，用盐水浸泡10分钟',
      '锅中加水烧开，加少许盐和油',
      '放入西兰花焯2分钟，捞出沥干',
      '热锅冷油，爆香蒜蓉',
      '倒入西兰花翻炒，加盐和鸡精调味即可'
    ],
    tips: '西兰花焯水时间不要太长，保持脆嫩。蒜蓉要炒香才够味。',
    cuisine: '中餐',
    taste_tags: ['清淡', '健康']
  },
  {
    id: 'recipe_025',
    name: '家常豆腐',
    description: '简单易做的家常菜，豆腐嫩滑，酱香浓郁，下饭佳品。',
    difficulty: '简单',
    cooking_time: 20,
    servings: 3,
    calories: 220,
    required_ingredients: ['豆腐', '猪肉'],
    optional_ingredients: ['蒜苗', '姜', '蒜', '酱油', '盐', '淀粉'],
    steps: [
      '豆腐切块，用盐水浸泡5分钟，猪肉切片',
      '蒜苗切段，姜蒜切末',
      '热锅冷油，炒肉片至变色盛出',
      '锅中加油，爆香姜蒜，加酱油和水烧开',
      '放入豆腐块，小火煮3分钟',
      '加入肉片和蒜苗，用淀粉勾薄芡即可'
    ],
    tips: '豆腐用盐水浸泡可以去除豆腥味。豆腐块要小心翻炒，避免炒碎。',
    cuisine: '中餐',
    taste_tags: ['酱香', '下饭']
  },
  {
    id: 'recipe_026',
    name: '葱爆羊肉',
    description: '快手美味的炒菜，羊肉鲜嫩，葱香浓郁，营养丰富。',
    difficulty: '简单',
    cooking_time: 15,
    servings: 3,
    calories: 380,
    required_ingredients: ['羊肉', '葱'],
    optional_ingredients: ['姜', '酱油', '料酒', '盐', '胡椒粉'],
    steps: [
      '羊肉切片，用酱油和料酒腌制5分钟',
      '大葱斜切段，姜切片',
      '热锅热油，下羊肉大火快炒至变色',
      '加入姜片和葱段继续翻炒',
      '加盐和胡椒粉调味即可'
    ],
    tips: '炒羊肉要大火快炒，避免炒老。大葱要最后放，保持脆嫩。',
    cuisine: '中餐',
    taste_tags: ['鲜香', '葱香']
  },
  {
    id: 'recipe_027',
    name: '糖醋藕片',
    description: '清爽开胃的素菜，藕片脆爽，酸甜可口，制作简单。',
    difficulty: '简单',
    cooking_time: 15,
    servings: 2,
    calories: 120,
    required_ingredients: ['藕'],
    optional_ingredients: ['糖', '醋', '盐', '淀粉'],
    steps: [
      '藕去皮切片，用清水浸泡去淀粉',
      '锅中加水烧开，放入藕片焯2分钟，捞出沥干',
      '调糖醋汁：糖、醋、盐混合',
      '热锅冷油，倒入糖醋汁烧开',
      '倒入藕片快速翻炒，用淀粉勾薄芡即可'
    ],
    tips: '藕片切好后要用水泡去淀粉，这样炒出来更脆。糖醋汁可以根据个人口味调整。',
    cuisine: '中餐',
    taste_tags: ['酸甜', '清爽']
  },
  {
    id: 'recipe_028',
    name: '蒜蓉虾',
    description: '鲜香美味的海鲜菜，虾肉Q弹，蒜香浓郁，制作简单。',
    difficulty: '简单',
    cooking_time: 15,
    servings: 3,
    calories: 240,
    required_ingredients: ['虾', '蒜'],
    optional_ingredients: ['葱', '酱油', '料酒', '盐', '油'],
    steps: [
      '虾洗净剪去虾须，开背去虾线',
      '蒜切末，热油炒香至金黄',
      '锅中留底油，下虾翻炒至变色',
      '加入炒好的蒜蓉、酱油和料酒',
      '加盐调味，翻炒至虾完全变色即可'
    ],
    tips: '蒜蓉要炒至金黄色才香，但不能炒焦。虾不要炒太久，保持Q弹。',
    cuisine: '中餐',
    taste_tags: ['蒜香', '鲜美']
  },
  {
    id: 'recipe_029',
    name: '酸辣土豆丝',
    description: '经典快手菜，土豆丝脆爽，酸辣开胃，下饭神器。',
    difficulty: '简单',
    cooking_time: 15,
    servings: 3,
    calories: 160,
    required_ingredients: ['土豆', '辣椒'],
    optional_ingredients: ['蒜', '醋', '酱油', '盐', '糖'],
    steps: [
      '土豆切丝，用清水浸泡去淀粉，沥干',
      '干辣椒切段，蒜切末',
      '热锅冷油，爆香蒜末和干辣椒',
      '倒入土豆丝大火快速翻炒',
      '加入醋、酱油和盐，翻炒至土豆丝变透明即可'
    ],
    tips: '土豆丝要切细，泡去淀粉才脆。炒的时候要用大火，不停翻炒。',
    cuisine: '中餐',
    taste_tags: ['酸辣', '爽脆']
  },
  {
    id: 'recipe_030',
    name: '香菇滑鸡',
    description: '清淡鲜美的蒸菜，鸡肉嫩滑，香菇鲜美，营养丰富。',
    difficulty: '简单',
    cooking_time: 30,
    servings: 3,
    calories: 280,
    required_ingredients: ['鸡肉'],
    optional_ingredients: ['香菇', '姜', '葱', '酱油', '料酒', '淀粉', '蚝油', '盐'],
    steps: [
      '鸡肉切块，用酱油、料酒、淀粉腌制15分钟',
      '香菇泡发切片，姜切片，葱切段',
      '将鸡肉和香菇混合装盘，放入姜片',
      '蒸锅水开后放入，大火蒸20分钟',
      '取出撒上葱花，淋上少许热油即可'
    ],
    tips: '鸡肉要选用鸡腿肉，口感更嫩。腌制时间不要太长，15分钟足够。',
    cuisine: '中餐',
    taste_tags: ['清淡', '鲜美']
  }
];