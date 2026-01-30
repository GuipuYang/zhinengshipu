import { X } from 'lucide-react';

interface SelectedIngredient {
  id: string;
  name: string;
  emoji: string;
  quantity: string;
}

interface SelectedIngredientsProps {
  ingredients: SelectedIngredient[];
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: string) => void;
}

export default function SelectedIngredients({
  ingredients,
  onRemove,
  onQuantityChange
}: SelectedIngredientsProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <h2 className="font-outfit text-[18px] font-semibold text-[var(--color-text-primary)] tracking-[-0.2px]">
          已选食材
        </h2>
        <div className="flex items-center gap-1">
          <span className="font-outfit text-[14px] font-medium text-[var(--color-text-secondary)]">
            {ingredients.length}
          </span>
        </div>
      </div>

      {/* Selected Items Card */}
      <div className="flex flex-col gap-3 p-4 bg-[var(--color-white)] rounded-[16px] w-full">
        {ingredients.map((ingredient, index) => (
          <div
            key={ingredient.id}
            className={`flex items-center justify-between py-3 w-full ${
              index < ingredients.length - 1 ? 'border-b border-[var(--color-border)]' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-[24px]">{ingredient.emoji}</span>
              <span className="font-outfit text-[15px] font-medium text-[var(--color-text-primary)]">
                {ingredient.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={ingredient.quantity}
                onChange={(e) => onQuantityChange(ingredient.id, e.target.value)}
                className="w-[80px] px-2 py-1 font-outfit text-[14px] text-[var(--color-text-secondary)] bg-[var(--color-bg)] rounded-[8px] text-center outline-none"
                placeholder="200g"
              />
              <button
                onClick={() => onRemove(ingredient.id)}
                className="flex items-center justify-center w-6 h-6"
              >
                <X className="w-4 h-4 text-[var(--color-text-tertiary)]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
