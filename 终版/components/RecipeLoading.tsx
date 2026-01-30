'use client';

import { useState, useEffect } from 'react';

interface RecipeLoadingProps {
  onComplete: () => void;
}

export default function RecipeLoading({ onComplete }: RecipeLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const steps = [
    { progress: 10, text: '正在分析您的食材...' },
    { progress: 30, text: '匹配最佳菜谱...' },
    { progress: 50, text: '计算营养搭配...' },
    { progress: 70, text: '优化烹饪步骤...' },
    { progress: 90, text: '准备美味佳肴...' },
    { progress: 100, text: '完成！' },
  ];

  useEffect(() => {
    const duration = 2500; // 2.5秒总时长
    const intervalTime = duration / 100;
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);

      // 更新当前步骤文字
      const currentStepObj = steps.findLast((step) => currentProgress >= step.progress);
      if (currentStepObj) {
        setCurrentStep(currentStepObj.text);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 300); // 延迟300毫秒后跳转
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[var(--color-bg)] px-6">
      {/* 美食图标 */}
      <div className="text-[120px] mb-8 animate-bounce">
        🍳
      </div>

      {/* 标题 */}
      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">
        美味制作中
      </h1>

      {/* 当前步骤 */}
      <p className="text-base text-[var(--color-text-secondary)] mb-12 text-center">
        {currentStep}
      </p>

      {/* 进度条容器 */}
      <div className="w-full max-w-[320px]">
        {/* 进度条背景 */}
        <div className="h-3 bg-[#E8F0EC] rounded-full overflow-hidden">
          {/* 进度条 */}
          <div
            className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[#4CAF50] rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="h-full w-full animate-pulse bg-white/20"></div>
          </div>
        </div>

        {/* 进度百分比 */}
        <div className="text-center mt-4">
          <span className="text-2xl font-bold text-[var(--color-primary)]">
            {progress}%
          </span>
        </div>
      </div>

      {/* 底部装饰 */}
      <div className="mt-16 flex gap-4 text-4xl">
        <span className="animate-pulse" style={{ animationDelay: '0ms' }}>🥘</span>
        <span className="animate-pulse" style={{ animationDelay: '200ms' }}>🍜</span>
        <span className="animate-pulse" style={{ animationDelay: '400ms' }}>🍲</span>
      </div>
    </div>
  );
}
