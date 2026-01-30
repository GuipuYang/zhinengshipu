'use client';

import { useState, useEffect, useRef } from 'react';
import { getSafeEmoji } from '@/lib/emoji-fallbacks';

interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  category: string;
}

const ingredients: Ingredient[] = [
  // 蔬菜
  { id: '1', name: '西红柿', emoji: '🍅', category: '蔬菜' },
  { id: '2', name: '土豆', emoji: '🥔', category: '蔬菜' },
  { id: '3', name: '胡萝卜', emoji: '🥕', category: '蔬菜' },
  { id: '4', name: '黄瓜', emoji: '🥒', category: '蔬菜' },
  { id: '5', name: '茄子', emoji: '🍆', category: '蔬菜' },
  { id: '6', name: '西兰花', emoji: '🥦', category: '蔬菜' },
  { id: '7', name: '白菜', emoji: '🥬', category: '蔬菜' },
  { id: '8', name: '菠菜', emoji: '🥬', category: '蔬菜' },
  { id: '9', name: '韭菜', emoji: '🌱', category: '蔬菜' },
  { id: '10', name: '青椒', emoji: '🫑', category: '蔬菜' },
  { id: '11', name: '南瓜', emoji: '🎃', category: '蔬菜' },
  { id: '12', name: '山药', emoji: '🥕', category: '蔬菜' },
  // 肉类
  { id: '13', name: '牛肉', emoji: '🥩', category: '肉类' },
  { id: '14', name: '猪肉', emoji: '🥓', category: '肉类' },
  { id: '15', name: '鸡肉', emoji: '🍗', category: '肉类' },
  { id: '16', name: '羊肉', emoji: '🍖', category: '肉类' },
  { id: '17', name: '鸭肉', emoji: '🦆', category: '肉类' },
  { id: '18', name: '排骨', emoji: '🍖', category: '肉类' },
  // 海鲜
  { id: '19', name: '鱼', emoji: '🐟', category: '海鲜' },
  { id: '20', name: '虾', emoji: '🦐', category: '海鲜' },
  { id: '21', name: '螃蟹', emoji: '🦀', category: '海鲜' },
  { id: '22', name: '鱿鱼', emoji: '🦑', category: '海鲜' },
  { id: '23', name: '蛤蜊', emoji: '🦪', category: '海鲜' },
  { id: '24', name: '扇贝', emoji: '🦪', category: '海鲜' },
  // 蛋类
  { id: '25', name: '鸡蛋', emoji: '🥚', category: '蛋类' },
  { id: '26', name: '鸭蛋', emoji: '🥚', category: '蛋类' },
  // 豆制品
  { id: '27', name: '豆腐', emoji: '🧈', category: '豆制品' },
  { id: '28', name: '豆浆', emoji: '🥛', category: '豆制品' },
  { id: '29', name: '腐竹', emoji: '🥛', category: '豆制品' },
  // 主食
  { id: '30', name: '米饭', emoji: '🍚', category: '主食' },
  { id: '31', name: '面条', emoji: '🍜', category: '主食' },
  { id: '32', name: '馒头', emoji: '🥯', category: '主食' },
  { id: '33', name: '饺子', emoji: '🥟', category: '主食' },
  // 水果
  { id: '34', name: '苹果', emoji: '🍎', category: '水果' },
  { id: '35', name: '香蕉', emoji: '🍌', category: '水果' },
  { id: '36', name: '草莓', emoji: '🍓', category: '水果' },
  { id: '37', name: '橙子', emoji: '🍊', category: '水果' },
  { id: '38', name: '西瓜', emoji: '🍉', category: '水果' },
  // 调味料
  { id: '39', name: '姜', emoji: '🟤', category: '调味料' },
  { id: '40', name: '蒜', emoji: '🧄', category: '调味料' },
  { id: '41', name: '葱', emoji: '🧅', category: '调味料' },
  { id: '42', name: '酱油', emoji: '🫗', category: '调味料' },
  { id: '43', name: '醋', emoji: '🫗', category: '调味料' },
  { id: '44', name: '料酒', emoji: '🍷', category: '调味料' },
  { id: '45', name: '糖', emoji: '🍬', category: '调味料' },
  { id: '46', name: '盐', emoji: '🧂', category: '调味料' },
  { id: '47', name: '辣椒', emoji: '🌶', category: '调味料' },
];

interface CategorySectionProps {
  onIngredientSelect: (ingredient: Ingredient) => void;
}

export default function CategorySection({ onIngredientSelect }: CategorySectionProps) {
  const [activeCategory, setActiveCategory] = useState('蔬菜');
  const [isExpanded, setIsExpanded] = useState(false);
  const [emojiMap, setEmojiMap] = useState<Record<string, string>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 检测emoji兼容性
  useEffect(() => {
    const checkEmojiSupport = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;

      const fontSize = 40;
      ctx.font = `${fontSize}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji"`;

      const newEmojiMap: Record<string, string> = {};

      ingredients.forEach((ingredient) => {
        const width = ctx.measureText(ingredient.emoji).width;
        const baselineWidth = ctx.measureText('🍽️').width;

        // 如果宽度与基准相同，说明不支持，使用备用emoji
        if (Math.abs(width - baselineWidth) < 1) {
          newEmojiMap[ingredient.name] = getSafeEmoji(ingredient.name);
        } else {
          newEmojiMap[ingredient.name] = ingredient.emoji;
        }
      });

      setEmojiMap(newEmojiMap);
    };

    // 确保DOM加载后再检测
    if (typeof window !== 'undefined') {
      setTimeout(checkEmojiSupport, 100);
    }
  }, []);

  const categories = [
    { id: 'veg', name: '蔬菜' },
    { id: 'meat', name: '肉类' },
    { id: 'seafood', name: '海鲜' },
    { id: 'egg', name: '蛋类' },
    { id: 'tofu', name: '豆制品' },
    { id: 'staple', name: '主食' },
    { id: 'fruit', name: '水果' },
    { id: 'spice', name: '调味料' },
  ];

  const currentIngredients = ingredients.filter(ingredient => ingredient.category === activeCategory);
  const displayIngredients = isExpanded ? currentIngredients : currentIngredients.slice(0, 3);

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 隐藏的canvas用于检测emoji兼容性 */}
      <canvas ref={canvasRef} className="hidden" width="100" height="100" />

      {/* Category Header */}
      <div className="flex items-center justify-between w-full">
        <h2 className="font-outfit text-[18px] font-semibold text-[var(--color-text-primary)] tracking-[-0.2px]">
          食材分类
        </h2>
      </div>

      {/* Category Tags */}
      <div className="flex gap-2 w-full overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setActiveCategory(category.name);
              setIsExpanded(false);
            }}
            className={`flex items-center gap-[6px] px-4 py-[10px] rounded-[100px] flex-shrink-0 ${
              activeCategory === category.name
                ? 'bg-[var(--color-primary)] text-[var(--color-white)]'
                : 'bg-[var(--color-white)] text-[var(--color-text-secondary)] border border-[var(--color-border-secondary)]'
            }`}
          >
            <span className="font-outfit text-[14px] font-medium">
              {category.name}
            </span>
          </button>
        ))}
      </div>

      {/* Ingredient Grid */}
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-3 w-full">
          {displayIngredients.map((ingredient) => (
            <button
              key={ingredient.id}
              onClick={() => onIngredientSelect(ingredient)}
              className="flex flex-col items-center gap-2 p-3 bg-[var(--color-white)] rounded-[12px] hover:shadow-md transition-shadow"
            >
              <div className="text-[40px]">
                {emojiMap[ingredient.name] || ingredient.emoji}
              </div>
              <span className="font-outfit text-[13px] font-medium text-[var(--color-text-primary)]">
                {ingredient.name}
              </span>
            </button>
          ))}
        </div>

        {/* Expand/Collapse Button */}
        {currentIngredients.length > 3 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-text)] transition-colors"
          >
            {isExpanded ? '收起' : `展开更多 (${currentIngredients.length - 3}个)`}
          </button>
        )}
      </div>
    </div>
  );
}
