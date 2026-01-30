'use client';

import { useState } from 'react';
import { X, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { getSubstitutes, adjustStepsWithSubstitute } from '@/lib/substitute-data';

interface SubstituteModalProps {
  isOpen: boolean;
  onClose: () => void;
  ingredientName: string;
  currentSteps: string[];
  onSelectSubstitute: (substituteName: string, adjustedSteps: string[]) => void;
}

export default function SubstituteModal({
  isOpen,
  onClose,
  ingredientName,
  currentSteps,
  onSelectSubstitute
}: SubstituteModalProps) {
  const [selectedSubstitute, setSelectedSubstitute] = useState<string | null>(null);

  if (!isOpen) return null;

  const substituteData = getSubstitutes(ingredientName);

  if (!substituteData) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--color-text)]">
              查找替代品
            </h3>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-[var(--color-text-secondary)]" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-3 py-4">
            <AlertCircle className="w-12 h-12 text-[#CC7A00]" />
            <p className="text-center text-[var(--color-text)]">
              暂无 "{ingredientName}" 的替代品推荐
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleSelect = (substituteName: string) => {
    setSelectedSubstitute(substituteName);
  };

  const handleConfirm = () => {
    if (selectedSubstitute) {
      const adjustedSteps = adjustStepsWithSubstitute(currentSteps, ingredientName, selectedSubstitute);
      onSelectSubstitute(selectedSubstitute, adjustedSteps);
      onClose();
    }
  };

  const getSimilarityLabel = (score: number) => {
    if (score >= 0.8) return '高度相似';
    if (score >= 0.6) return '较相似';
    return '一般';
  };

  const getSimilarityColor = (score: number) => {
    if (score >= 0.8) return 'text-[#4D9B6A]';
    if (score >= 0.6) return 'text-[#CC7A00]';
    return 'text-[#6D6C6A]';
  };

  const getSimilarityBg = (score: number) => {
    if (score >= 0.8) return 'bg-[#C8F0D8]';
    if (score >= 0.6) return 'bg-[#FFE8CC]';
    return 'bg-[#E8F0EC]';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text)]">
              查找替代品
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              原食材: {ingredientName}
            </p>
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[var(--color-text-secondary)]" />
          </button>
        </div>

        {/* Substitute Options */}
        <div className="flex flex-col gap-3 mb-4">
          {substituteData.substitutes.map((substitute, index) => (
            <div
              key={index}
              onClick={() => handleSelect(substitute.name)}
              className={`p-4 rounded-xl cursor-pointer border-2 transition-all ${
                selectedSubstitute === substitute.name
                  ? 'border-[var(--color-primary)] bg-[#F0FDF4]'
                  : 'border-[#E8F0EC] hover:border-[var(--color-primary)]'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {selectedSubstitute === substitute.name && (
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)]" />
                  )}
                  <h4 className="font-semibold text-[var(--color-text)]">
                    {substitute.name}
                  </h4>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getSimilarityBg(substitute.similarity_score)} ${getSimilarityColor(substitute.similarity_score)}`}
                >
                  {getSimilarityLabel(substitute.similarity_score)}
                </span>
              </div>

              <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                {substitute.notes}
              </p>

              <div className="flex items-center gap-4 text-xs text-[#6D6C6A]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  易获取性: {Math.round(substitute.availability_score * 100)}%
                </span>
                <span className="flex items-center gap-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                  用量比例: {substitute.usage_ratio}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleConfirm}
          disabled={!selectedSubstitute}
          className={`w-full py-3 rounded-full font-medium transition-colors ${
            selectedSubstitute
              ? 'bg-[var(--color-primary)] text-white'
              : 'bg-[#E8F0EC] text-[#6D6C6A] cursor-not-allowed'
          }`}
        >
          使用此替代
        </button>
      </div>
    </div>
  );
}
