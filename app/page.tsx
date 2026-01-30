'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StatusBar from '@/components/StatusBar';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CategorySection from '@/components/CategorySection';
import SelectedIngredients from '@/components/SelectedIngredients';
import ActionButtons from '@/components/ActionButtons';
import TabBar from '@/components/TabBar';

interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  category: string;
}

interface SelectedIngredient extends Ingredient {
  quantity: string;
}

export default function Home() {
  const router = useRouter();
  const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([
    { id: '1', name: '西红柿', emoji: '🍅', category: '蔬菜', quantity: '200g' },
    { id: '2', name: '土豆', emoji: '🥔', category: '蔬菜', quantity: '300g' },
    { id: '3', name: '胡萝卜', emoji: '🥕', category: '蔬菜', quantity: '150g' },
  ]);

  const handleIngredientSelect = (ingredient: Ingredient) => {
    // Check if ingredient is already selected
    const exists = selectedIngredients.find((item) => item.id === ingredient.id);
    if (!exists) {
      setSelectedIngredients([
        ...selectedIngredients,
        { ...ingredient, quantity: '' },
      ]);
    }
  };

  const handleRemoveIngredient = (id: string) => {
    setSelectedIngredients(selectedIngredients.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: string, quantity: string) => {
    setSelectedIngredients(
      selectedIngredients.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleGenerate = () => {
    // 提取食材名称并导航到食谱列表页
    const ingredientNames = selectedIngredients.map(item => item.name);
    router.push(`/recipes?ingredients=${ingredientNames.join(',')}`);
  };

  const handleSave = () => {
    // 保存常用食材组合到本地存储
    const combination = {
      id: Date.now().toString(),
      name: `组合 ${new Date().toLocaleDateString()}`,
      ingredients: selectedIngredients,
      created_time: new Date().toISOString()
    };

    const savedCombinations = JSON.parse(localStorage.getItem('saved_combinations') || '[]');
    localStorage.setItem('saved_combinations', JSON.stringify([combination, ...savedCombinations]));

    alert('食材组合已保存！');
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--color-bg)] overflow-hidden">
      {/* Status Bar */}
      <StatusBar />

      {/* Content Wrapper */}
      <div className="flex flex-col flex-1 gap-5 px-6 overflow-hidden">
        {/* Header */}
        <Header />

        {/* Scroll Content */}
        <div className="flex flex-col flex-1 gap-6 overflow-y-auto">
          {/* Search Section */}
          <SearchBar />

          {/* Category Section */}
          <CategorySection onIngredientSelect={handleIngredientSelect} />

          {/* Selected Ingredients */}
          {selectedIngredients.length > 0 && (
            <SelectedIngredients
              ingredients={selectedIngredients}
              onRemove={handleRemoveIngredient}
              onQuantityChange={handleQuantityChange}
            />
          )}

          {/* Action Section */}
          <ActionButtons
            onGenerate={handleGenerate}
            onSave={handleSave}
            disabled={selectedIngredients.length === 0}
          />
        </div>
      </div>

      {/* Tab Bar */}
      <TabBar activeTab="home" />
    </div>
  );
}
