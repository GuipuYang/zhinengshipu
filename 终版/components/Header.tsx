import { Bell } from 'lucide-react';

export default function Header() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col gap-1">
        <h1 className="font-outfit text-[26px] font-semibold text-[var(--color-text-primary)] tracking-[-0.5px]">
          食饱饱
        </h1>
        <p className="font-outfit text-[13px] font-medium text-[var(--color-text-secondary)]">
          输入食材，AI 帮你生成创意菜谱
        </p>
      </div>
      <button className="flex items-center justify-center w-11 h-11 bg-[var(--color-white)] rounded-[100px]">
        <Bell className="w-5 h-5 text-[var(--color-text-primary)]" />
      </button>
    </div>
  );
}
