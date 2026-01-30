'use client';

import StatusBar from '@/components/StatusBar';
import TabBar from '@/components/TabBar';
import { ArrowLeft, Leaf, Beef, Droplet, Share2, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
}

export default function ShoppingListPage() {
  const router = useRouter();
  const [items, setItems] = useState<ShoppingItem[]>([]);

  useEffect(() => {
    // Load shopping list from localStorage
    try {
      const savedList = JSON.parse(localStorage.getItem('shopping_list') || '[]');
      if (savedList.length === 0) {
        // Default items for demo
        setItems([
          { id: '1', name: '西兰花', quantity: '200g', category: '蔬菜区', checked: false },
          { id: '2', name: '番茄', quantity: '3个', category: '蔬菜区', checked: true },
          { id: '3', name: '鸡胸肉', quantity: '300g', category: '肉类区', checked: false },
          { id: '4', name: '猪肉', quantity: '250g', category: '肉类区', checked: false },
          { id: '5', name: '酱油', quantity: '1瓶', category: '调味料区', checked: false },
        ]);
      } else {
        setItems(savedList);
      }
    } catch (error) {
      console.error('Failed to load shopping list:', error);
    }
  }, []);

  const toggleItem = (id: string) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    localStorage.setItem('shopping_list', JSON.stringify(updatedItems));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '蔬菜区':
        return { Icon: Leaf, bgColor: 'bg-[#E8F5EC]', iconColor: 'text-[#3D8A5A]' };
      case '肉类区':
        return { Icon: Beef, bgColor: 'bg-[#FFE8E8]', iconColor: 'text-[#D84A4A]' };
      case '调味料区':
        return { Icon: Droplet, bgColor: 'bg-[#FFECD1]', iconColor: 'text-[#E89B3C]' };
      default:
        return { Icon: Leaf, bgColor: 'bg-[#E8F5EC]', iconColor: 'text-[#3D8A5A]' };
    }
  };

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ShoppingItem[]>);

  const totalItems = items.length;
  const categories = Object.keys(groupedItems).length;

  const handleShare = () => {
    alert('分享功能开发中');
  };

  const handleExport = () => {
    alert('导出功能开发中');
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--color-bg)] overflow-hidden">
      <StatusBar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-4 pb-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-[28px] font-bold text-[var(--color-text)] tracking-tight">
              购物清单
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {categories}个分类 · {totalItems}项食材
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-11 h-11 bg-white rounded-full"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--color-text)]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="text-6xl">🛒</div>
              <p className="text-base text-[var(--color-text-secondary)]">
                购物清单为空
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5 pb-6">
              {Object.entries(groupedItems).map(([category, categoryItems]) => {
                const { Icon, bgColor, iconColor } = getCategoryIcon(category);
                return (
                  <div key={category} className="flex flex-col gap-3">
                    {/* Category Header */}
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center justify-center w-8 h-8 ${bgColor} rounded-lg`}>
                        <Icon className={`w-[18px] h-[18px] ${iconColor}`} />
                      </div>
                      <h2 className="text-base font-semibold text-[var(--color-text)]">
                        {category}
                      </h2>
                    </div>

                    {/* Items */}
                    <div className="flex flex-col gap-3 bg-white rounded-2xl p-4">
                      {categoryItems.map((item, index) => (
                        <div key={item.id}>
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="flex items-center gap-3 w-full"
                          >
                            {/* Checkbox */}
                            <div
                              className={`flex items-center justify-center w-6 h-6 rounded-md border-2 transition-colors ${
                                item.checked
                                  ? 'bg-[var(--color-primary)] border-[var(--color-primary)]'
                                  : 'border-[#D1D0CD]'
                              }`}
                            >
                              {item.checked && (
                                <svg
                                  className="w-4 h-4 text-white"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>

                            {/* Item Info */}
                            <div className="flex flex-col gap-1 flex-1 text-left">
                              <span
                                className={`text-[15px] font-semibold ${
                                  item.checked
                                    ? 'text-[#9C9B99] line-through'
                                    : 'text-[var(--color-text)]'
                                }`}
                              >
                                {item.name}
                              </span>
                              <span
                                className={`text-[13px] ${
                                  item.checked ? 'text-[#9C9B99]' : 'text-[var(--color-text-secondary)]'
                                }`}
                              >
                                {item.quantity}
                              </span>
                            </div>
                          </button>
                          {index < categoryItems.length - 1 && (
                            <div className="h-px bg-[#E5E4E1] my-3" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 px-6 py-4">
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 flex-1 h-12 bg-white border border-[#D1D0CD] rounded-xl"
          >
            <Share2 className="w-[18px] h-[18px] text-[var(--color-text-secondary)]" />
            <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
              分享
            </span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-1.5 flex-1 h-12 bg-[var(--color-primary)] rounded-xl"
          >
            <Download className="w-[18px] h-[18px] text-white" />
            <span className="text-sm font-semibold text-white">
              导出
            </span>
          </button>
        </div>
      </div>

      <TabBar activeTab="profile" />
    </div>
  );
}
