# 食饱饱 - AI 智能菜谱生成器

基于 Next.js + TypeScript 构建的智能菜谱生成应用，让烹饪变得简单有趣。

## 功能特点

### 核心功能

- 🥗 **食材选择** - 支持分类选择、搜索添加、数量输入
- 🍳 **智能生成** - 根据食材自动生成 30+ 道创意菜谱
- 📊 **营养分析** - 热量计算、营养成分分析、饮食标签
- 🔄 **食材替代** - 缺少食材时智能推荐替代品
- ⭐ **收藏管理** - 收藏喜欢的菜谱、标记已尝试
- 📝 **常用组合** - 保存和管理常用食材组合
- 🔍 **多维筛选** - 按菜系、口味、难度、时间筛选菜谱
- 💡 **智能推荐** - 基于剩余食材、当季食材推荐菜谱

### 界面特性

- 🎨 现代简约设计风格
- 📱 移动端优先响应式布局
- ✨ 流畅的动画和过渡效果
- 🕐 实时时间状态栏
- 🚫 隐藏滚动条优化视觉体验

## 技术栈

- **框架**: Next.js 16
- **语言**: TypeScript 5.9
- **UI 库**: Tailwind CSS 4
- **图标**: Lucide React
- **状态管理**: React Hooks
- **数据持久化**: localStorage

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 生产构建

```bash
npm run build
npm start
```

### 代码检查

```bash
npm run lint
```

## 项目结构

```
zncp/
├── app/                    # Next.js 页面
│   ├── combinations/       # 常用组合管理
│   ├── favorites/          # 收藏页面
│   ├── page.tsx           # 首页（食材输入）
│   ├── profile/           # 个人中心
│   ├── recipe/[id]/       # 菜谱详情
│   ├── recipes/           # 生成菜谱列表
│   ├── recipes-browse/    # 菜谱浏览
│   └── recommendations/   # 智能推荐
├── components/            # React 组件
│   ├── ActionButtons.tsx
│   ├── CategorySection.tsx
│   ├── Header.tsx
│   ├── IngredientQuantityModal.tsx
│   ├── NutritionAnalysis.tsx
│   ├── RecipeCard.tsx
│   ├── RecipeLoading.tsx
│   ├── SearchBar.tsx
│   ├── StatusBar.tsx
│   ├── SubstituteModal.tsx
│   └── TabBar.tsx
├── lib/                   # 数据和工具函数
│   ├── ingredients-data.ts      # 食材数据库
│   ├── nutrition-data.ts        # 营养数据
│   ├── recommendations-data.ts  # 推荐算法
│   ├── recipes-data.ts          # 菜谱数据库
│   └── substitute-data.ts       # 替代关系数据
├── contexts/              # React Context
└── hooks/                # 自定义 Hooks
```

## 使用指南

### 1. 食材选择

#### 分类选择
- 点击底部导航栏"菜谱"标签
- 选择食材分类（蔬菜、肉类、海鲜等）
- 点击食材卡片，在弹窗中输入数量和单位

#### 搜索添加
- 使用顶部搜索框输入食材名称
- 系统实时匹配并显示相关食材
- 点击选择并输入数量

#### 管理已选食材
- 已选食材显示在顶部列表
- 点击删除图标可移除食材
- 支持编辑数量

### 2. 生成菜谱

- 选择食材后点击"生成菜谱"按钮
- 系统显示"美味制作中"加载动画
- 自动生成 3-5 道匹配菜谱

### 3. 菜谱浏览

- 支持按菜系筛选（中餐、西餐、日韩料理、东南亚菜、其他）
- 支持按口味筛选（辣、甜、咸、酸、清淡）
- 使用搜索框搜索菜谱名称

### 4. 菜谱详情

- 查看完整食材清单（已有/缺少分类显示）
- 查看分步制作步骤
- 营养分析（热量、蛋白质、碳水、脂肪、纤维）
- 收藏或标记已尝试

### 5. 食材替代

- 在菜谱详情页，点击缺少食材旁的搜索图标
- 查看推荐替代品及相似度评分
- 选择替代品后自动调整做法步骤

### 6. 常用组合

- 点击"保存组合"保存当前食材列表
- 在"我的"页面管理常用组合
- 快速加载常用组合生成菜谱

### 7. 智能推荐

- 点击"记录为剩余食材"保存剩余食材
- 系统基于剩余食材、当前季节推荐菜谱
- 查看推荐理由和匹配度

## 数据存储

应用使用 `localStorage` 存储以下数据：

- `shibaobao_favorites` - 收藏的菜谱
- `shibaobao_tried` - 已尝试的菜谱
- `shibaobao_combinations` - 常用食材组合
- `shibaobao_history` - 生成历史记录
- `shibaobao_remaining` - 剩余食材

## 菜谱数据库

当前包含 30+ 道菜谱，涵盖：

- **菜系**: 中餐、西餐、日韩料理、东南亚菜
- **口味**: 辣、甜、咸、酸、清淡
- **难度**: 简单、中等、复杂
- **时间**: 15-60 分钟

## 营养分析功能

每道菜谱包含：

- 总热量（千卡）
- 蛋白质、碳水化合物、脂肪、纤维含量
- 饮食标签（高蛋白、低脂、高碳水、高纤维、低热量等）
- 过敏原提示

## 食材替代功能

支持的替代关系包括：

- 西红柿 → 番茄酱、胡萝卜
- 牛肉 → 猪肉、羊肉、豆腐
- 鸡蛋 → 豆腐、香蕉泥
- 洋葱 → 大葱、蒜
- 胡萝卜 → 南瓜、红薯
- 土豆 → 红薯、芋头、山药
- 羊肉 → 牛肉、猪肉
- 西兰花 → 花菜、荷兰豆

## 自定义配置

### 修改主题颜色

编辑 `app/globals.css` 中的 CSS 变量：

```css
:root {
  --primary-color: #ff6b35;
  --secondary-color: #f7931e;
  --success-color: #4caf50;
  /* ... */
}
```

### 扩展菜谱数据库

编辑 `lib/recipes-data.ts` 添加新菜谱：

```typescript
const recipes: Recipe[] = [
  {
    id: '31',
    name: '新菜谱名称',
    cuisine: '中餐',
    taste: ['辣', '咸'],
    difficulty: '中等',
    cookingTime: 30,
    ingredients: [/* 食材列表 */],
    steps: [/* 步骤列表 */],
    // ...
  }
];
```

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 开发建议

### 添加新功能

1. 在 `components/` 创建新组件
2. 在 `lib/` 添加数据或工具函数
3. 在 `app/` 创建新页面
4. 使用 TypeScript 确保类型安全

### 代码规范

- 使用函数式组件和 Hooks
- 保持组件单一职责
- 使用 TypeScript 类型定义
- 遵循 Tailwind CSS 最佳实践

## 已知问题

- 首次加载时可能会有短暂延迟（初始化数据）
- 部分浏览器滚动条隐藏可能不生效
- localStorage 数据在清除浏览器缓存后会丢失

## 后续计划

- [ ] 接入真实 AI API 提升生成质量
- [ ] 支持用户上传菜谱
- [ ] 社区分享功能
- [ ] 多语言支持
- [ ] 离线 PWA 支持
- [ ] 语音输入食材
- [ ] 图像识别食材

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

ISC

---

**食饱饱** - 让每一次烹饪都充满惊喜 🍳✨
