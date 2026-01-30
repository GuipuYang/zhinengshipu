'use client';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[var(--color-bg)] px-6">
      {/* Loading Animation */}
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-[#E8F0EC] rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-semibold text-[var(--color-text)]">
            AI 生成中...
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            正在为您匹配最佳菜谱
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
