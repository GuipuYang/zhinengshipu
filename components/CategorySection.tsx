'use client';

import { useState } from 'react';

interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  category: string;
}

const ingredients: Ingredient[] = [
  { id: '1', name: '西红柿', emoji: '🍅', category: '蔬菜' },
  { id: '2', name: '土豆', emoji: '🥔', category: '蔬菜' },
  { id: '3', name: '胡萝卜', emoji: '🥕', category: '蔬菜' },
];

interface CategorySectionProps {
  onIngredientSelect: (ingredient: Ingredient) => void;
}

export default function CategorySection({ onIngredientSelect }: CategorySectionProps) {
  const [activeCategory, setActiveCategory] = useState('蔬菜');

  const categories = [
    { id: 'veg', name: '蔬菜' },
    { id: 'meat', name: '肉类' },
    { id: 'seafood', name: '海鲜' },
    { id: 'spice', name: '调味料' },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Category Header */}
      <div className="flex items-center justify-between w-full">
        <h2 className="font-outfit text-[18px] font-semibold text-[var(--color-text-primary)] tracking-[-0.2px]">
          食材分类
        </h2>
      </div>

      {/* Category Tags */}
      <div className="flex gap-2 w-full">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.name)}
            className={`flex items-center gap-[6px] px-4 py-[10px] rounded-[100px] ${
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
      <div className="flex gap-3 w-full">
        {ingredients.map((ingredient) => (
          <button
            key={ingredient.id}
            onClick={() => onIngredientSelect(ingredient)}
            className="flex flex-col items-center gap-2 w-[106px] p-3 bg-[var(--color-white)] rounded-[12px]"
          >
            <div className="text-[48px]">{ingredient.emoji}</div>
            <span className="font-outfit text-[14px] font-medium text-[var(--color-text-primary)]">
              {ingredient.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
