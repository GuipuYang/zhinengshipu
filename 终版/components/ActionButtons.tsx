import { Sparkles, Bookmark, RotateCcw } from 'lucide-react';

interface ActionButtonsProps {
  onGenerate: () => void;
  onSave: () => void;
  onSaveRemaining?: () => void;
  disabled?: boolean;
}

export default function ActionButtons({ onGenerate, onSave, onSaveRemaining, disabled = false }: ActionButtonsProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={disabled}
        className="flex items-center justify-center gap-2 h-14 px-6 bg-[var(--color-primary)] rounded-[12px] w-full disabled:opacity-50"
      >
        <Sparkles className="w-5 h-5 text-[var(--color-white)]" />
        <span className="font-outfit text-[16px] font-semibold text-[var(--color-white)]">
          生成创意菜谱
        </span>
      </button>

      {/* Save Combination Button */}
      <button
        onClick={onSave}
        disabled={disabled}
        className="flex items-center justify-center gap-2 h-12 px-5 bg-[var(--color-white)] border border-[var(--color-border-secondary)] rounded-[12px] w-full disabled:opacity-50"
      >
        <Bookmark className="w-[18px] h-[18px] text-[var(--color-text-secondary)]" />
        <span className="font-outfit text-[14px] font-medium text-[var(--color-text-secondary)]">
          保存为常用组合
        </span>
      </button>

      {/* Save Remaining Ingredients Button */}
      {onSaveRemaining && (
        <button
          onClick={onSaveRemaining}
          disabled={disabled}
          className="flex items-center justify-center gap-2 h-12 px-5 bg-[#F0FDF4] border border-[#4D9B6A] rounded-[12px] w-full disabled:opacity-50"
        >
          <RotateCcw className="w-[18px] h-[18px] text-[#4D9B6A]" />
          <span className="font-outfit text-[14px] font-medium text-[#4D9B6A]">
            记录为剩余食材
          </span>
        </button>
      )}
    </div>
  );
}
