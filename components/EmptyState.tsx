'use client';

import { useRouter } from 'next/navigation';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-6 py-12">
      {/* Icon */}
      <div className="flex items-center justify-center">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] text-center">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-[var(--color-text-secondary)] text-center max-w-xs">
          {description}
        </p>
      )}

      {/* Action Button */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
