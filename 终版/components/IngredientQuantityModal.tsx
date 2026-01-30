'use client';

import { useState, useEffect } from 'react';

interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  category: string;
}

interface IngredientQuantityModalProps {
  ingredient: Ingredient;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: string) => void;
}

export default function IngredientQuantityModal({
  ingredient,
  isOpen,
  onClose,
  onConfirm
}: IngredientQuantityModalProps) {
  const [quantity, setQuantity] = useState('');

  const commonUnits = ['g', 'kg', '个', '根', '块', '条', '斤', '两', '把', '颗', '片', 'ml', '勺'];

  useEffect(() => {
    if (isOpen) {
      setQuantity('');
    }
  }, [isOpen]);

  const handleUnitClick = (unit: string) => {
    setQuantity(quantity + unit);
  };

  const handleConfirm = () => {
    if (quantity.trim()) {
      onConfirm(quantity.trim());
      setQuantity('');
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{ingredient.emoji}</span>
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text)]">
                {ingredient.name}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                请输入数量
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-bg)]"
          >
            <svg
              className="w-5 h-5 text-[var(--color-text-secondary)]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quantity Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            数量
          </label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="例如：200、1个、2斤"
            className="w-full px-4 py-3 text-lg font-medium text-[var(--color-text)] bg-[var(--color-bg)] rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleConfirm();
              }
            }}
          />
        </div>

        {/* Common Units */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            常用单位（点击添加）
          </label>
          <div className="flex flex-wrap gap-2">
            {commonUnits.map((unit) => (
              <button
                key={unit}
                onClick={() => handleUnitClick(unit)}
                className="px-3 py-2 text-sm font-medium text-[var(--color-primary)] bg-[var(--color-bg)] rounded-lg active:scale-95 transition-transform"
              >
                {unit}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-base font-medium text-[var(--color-text)] bg-[var(--color-bg)] rounded-xl active:scale-95 transition-transform"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            disabled={!quantity.trim()}
            className={`flex-1 py-3 text-base font-medium text-white rounded-xl active:scale-95 transition-transform ${
              quantity.trim()
                ? 'bg-[var(--color-primary)]'
                : 'bg-[var(--color-text-tertiary)]'
            }`}
          >
            确认添加
          </button>
        </div>
      </div>
    </div>
  );
}
