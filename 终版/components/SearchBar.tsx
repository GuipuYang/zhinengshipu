import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center gap-3 h-12 px-4 bg-[var(--color-white)] border border-[var(--color-border)] rounded-[12px] w-full">
        <Search className="w-[18px] h-[18px] text-[var(--color-text-tertiary)]" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="搜索食材（如：鸡肉、西红柿）"
          className="flex-1 font-outfit text-[15px] text-[var(--color-text-tertiary)] bg-transparent outline-none placeholder:text-[var(--color-text-tertiary)]"
        />
      </div>
    </div>
  );
}
