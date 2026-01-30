// 像素风格食材图标组件

interface PixelIconProps {
  name: string;
  emoji: string;
  className?: string;
}

// 像素风格SVG图标数据
const pixelIcons: Record<string, string> = {
  // 蔬菜
  '西红柿': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="4" y="4" width="8" height="8" fill="#FF6B6B"/>
    <rect x="3" y="5" width="1" height="6" fill="#4CAF50"/>
    <rect x="12" y="5" width="1" height="6" fill="#4CAF50"/>
    <rect x="6" y="3" width="4" height="1" fill="#4CAF50"/>
    <rect x="5" y="6" width="1" height="1" fill="#FFF"/>
    <rect x="10" y="8" width="1" height="1" fill="#FFF"/>
  </svg>`,
  '土豆': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="3" y="4" width="10" height="8" rx="1" fill="#D4A574"/>
    <rect x="5" y="5" width="1" height="1" fill="#8B6914"/>
    <rect x="9" y="7" width="1" height="1" fill="#8B6914"/>
    <rect x="7" y="9" width="1" height="1" fill="#8B6914"/>
  </svg>`,
  '胡萝卜': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="7" y="1" width="2" height="14" fill="#FF9800"/>
    <rect x="6" y="1" width="1" height="2" fill="#4CAF50"/>
    <rect x="9" y="2" width="1" height="1" fill="#4CAF50"/>
  </svg>`,
  '黄瓜': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="4" y="5" width="8" height="6" rx="2" fill="#8BC34A"/>
    <rect x="5" y="6" width="1" height="4" fill="#689F38"/>
    <rect x="7" y="6" width="1" height="4" fill="#689F38"/>
    <rect x="9" y="6" width="1" height="4" fill="#689F38"/>
  </svg>`,
  '茄子': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="4" y="4" width="7" height="8" rx="2" fill="#7B1FA2"/>
    <rect x="6" y="2" width="1" height="3" fill="#4CAF50"/>
    <rect x="9" y="6" width="2" height="2" fill="#9C27B0"/>
  </svg>`,
  '西兰花': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="5" y="4" width="6" height="2" fill="#4CAF50"/>
    <rect x="4" y="6" width="8" height="3" fill="#4CAF50"/>
    <rect x="6" y="9" width="4" height="5" fill="#8BC34A"/>
    <rect x="5" y="5" width="1" height="1" fill="#81C784"/>
    <rect x="10" y="5" width="1" height="1" fill="#81C784"/>
    <rect x="5" y="7" width="1" height="1" fill="#81C784"/>
    <rect x="10" y="7" width="1" height="1" fill="#81C784"/>
  </svg>`,
  '白菜': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="5" y="3" width="6" height="4" fill="#8BC34A"/>
    <rect x="4" y="7" width="8" height="5" fill="#4CAF50"/>
    <rect x="7" y="12" width="2" height="3" fill="#2E7D32"/>
  </svg>`,
  '青椒': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="4" y="4" width="8" height="8" rx="2" fill="#4CAF50"/>
    <rect x="7" y="2" width="2" height="2" fill="#388E3C"/>
    <rect x="6" y="5" width="4" height="6" fill="#81C784"/>
  </svg>`,
  '南瓜': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="3" y="6" width="3" height="6" rx="1" fill="#FF9800"/>
    <rect x="7" y="5" width="2" height="7" rx="1" fill="#FF9800"/>
    <rect x="10" y="6" width="3" height="6" rx="1" fill="#FF9800"/>
    <rect x="7" y="3" width="2" height="2" fill="#4CAF50"/>
  </svg>`,
  // 肉类
  '牛肉': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="3" y="5" width="10" height="6" rx="1" fill="#8B4513"/>
    <rect x="4" y="6" width="8" height="4" fill="#A0522D"/>
    <rect x="5" y="7" width="2" height="2" fill="#CD853F"/>
  </svg>`,
  '猪肉': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="3" y="4" width="9" height="7" rx="1" fill="#FFB6C1"/>
    <rect x="4" y="5" width="7" height="5" fill="#FF69B4"/>
  </svg>`,
  '鸡肉': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="5" y="4" width="6" height="7" rx="1" fill="#FFCC80"/>
    <rect x="6" y="5" width="4" height="5" fill="#FFE0B2"/>
    <rect x="7" y="6" width="2" height="3" fill="#FFE4C4"/>
  </svg>`,
  '羊肉': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="4" y="5" width="8" height="6" rx="1" fill="#8B4513"/>
    <rect x="5" y="6" width="6" height="4" fill="#A0522D"/>
    <rect x="7" y="7" width="2" height="2" fill="#CD853F"/>
  </svg>`,
  // 海鲜
  '鱼': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="3" y="7" width="8" height="2" rx="1" fill="#4FC3F7"/>
    <rect x="2" y="6" width="1" height="4" fill="#0288D1"/>
    <rect x="11" y="5" width="1" height="6" fill="#0288D1"/>
    <rect x="6" y="5" width="2" height="6" fill="#B3E5FC"/>
  </svg>`,
  '虾': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="4" y="4" width="7" height="3" fill="#FF9800"/>
    <rect x="5" y="7" width="5" height="3" fill="#FFB74D"/>
    <rect x="6" y="10" width="3" height="3" fill="#FFCC80"/>
    <rect x="10" y="5" width="1" height="2" fill="#F57C00"/>
  </svg>`,
  '螃蟹': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="5" y="5" width="6" height="6" rx="2" fill="#E91E63"/>
    <rect x="3" y="4" width="2" height="2" fill="#E91E63"/>
    <rect x="11" y="4" width="2" height="2" fill="#E91E63"/>
    <rect x="4" y="11" width="2" height="3" fill="#E91E63"/>
    <rect x="10" y="11" width="2" height="3" fill="#E91E63"/>
  </svg>`,
  // 蛋类
  '鸡蛋': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="5" y="4" width="6" height="8" rx="3" fill="#FFF9C4"/>
    <rect x="6" y="5" width="4" height="6" fill="#FFEB3B"/>
    <rect x="7" y="6" width="2" height="2" fill="#F57C00"/>
  </svg>`,
  '鸭蛋': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="5" y="4" width="6" height="8" rx="3" fill="#E8F5E9"/>
    <rect x="6" y="5" width="4" height="6" fill="#C8E6C9"/>
    <rect x="7" y="6" width="2" height="2" fill="#4CAF50"/>
  </svg>`,
  // 豆制品
  '豆腐': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="4" y="5" width="8" height="6" fill="#FFF8E1"/>
    <rect x="5" y="6" width="3" height="4" fill="#FFE082"/>
    <rect x="8" y="6" width="3" height="4" fill="#FFE082"/>
  </svg>`,
  '豆浆': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="4" y="5" width="6" height="9" fill="#FFF8E1"/>
    <rect x="5" y="3" width="4" height="2" fill="#8D6E63"/>
    <rect x="5" y="6" width="4" height="7" fill="#FFE082"/>
  </svg>`,
  // 主食
  '米饭': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="4" y="5" width="8" height="7" fill="#FFF"/>
    <rect x="5" y="6" width="6" height="5" fill="#FFF9C4"/>
  </svg>`,
  '面条': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="4" y="4" width="8" height="8" fill="#FFE0B2"/>
    <rect x="5" y="5" width="6" height="6" fill="#FFCC80"/>
    <rect x="6" y="6" width="4" height="4" fill="#FFE0B2"/>
  </svg>`,
  '馒头': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="5" y="4" width="6" height="8" rx="3" fill="#FFF8E1"/>
    <rect x="6" y="5" width="4" height="6" fill="#FFE082"/>
  </svg>`,
  '饺子': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="5" y="5" width="6" height="6" rx="1" fill="#FFF8E1"/>
    <rect x="6" y="6" width="4" height="4" fill="#FFE082"/>
    <rect x="7" y="7" width="2" height="2" fill="#FFCC80"/>
  </svg>`,
  // 水果
  '苹果': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="4" y="4" width="8" height="8" rx="3" fill="#F44336"/>
    <rect x="5" y="5" width="6" height="6" fill="#E53935"/>
    <rect x="7" y="2" width="2" height="3" fill="#8B4513"/>
  </svg>`,
  '香蕉': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="6" y="3" width="4" height="10" rx="2" fill="#FFEB3B"/>
    <rect x="7" y="4" width="2" height="8" fill="#FBC02D"/>
  </svg>`,
  '草莓': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="4" y="5" width="8" height="8" rx="3" fill="#F44336"/>
    <rect x="5" y="6" width="6" height="6" fill="#E53935"/>
    <rect x="6" y="7" width="4" height="4" fill="#EF5350"/>
    <rect x="6" y="3" width="4" height="2" fill="#4CAF50"/>
  </svg>`,
  '橙子': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="4" y="4" width="8" height="8" rx="3" fill="#FF9800"/>
    <rect x="5" y="5" width="6" height="6" fill="#F57C00"/>
  </svg>`,
  '西瓜': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="4" y="4" width="8" height="8" rx="2" fill="#F44336"/>
    <rect x="5" y="5" width="6" height="6" fill="#E57373"/>
    <rect x="6" y="6" width="4" height="4" fill="#81C784"/>
  </svg>`,
  // 调味料
  '姜': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="5" y="4" width="6" height="8" fill="#D7CCC8"/>
    <rect x="6" y="5" width="4" height="6" fill="#A1887F"/>
  </svg>`,
  '蒜': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="5" y="5" width="6" height="8" rx="1" fill="#FFF9C4"/>
    <rect x="6" y="6" width="4" height="6" fill="#FFE082"/>
  </svg>`,
  '葱': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="6" y="2" width="4" height="12" fill="#4CAF50"/>
    <rect x="7" y="3" width="2" height="10" fill="#81C784"/>
  </svg>`,
  '酱油': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="5" y="4" width="6" height="9" fill="#5D4037"/>
    <rect x="6" y="5" width="4" height="7" fill="#8D6E63"/>
  </svg>`,
  '糖': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="4" y="5" width="8" height="7" fill="#FAFAFA"/>
    <rect x="5" y="6" width="6" height="5" fill="#E0E0E0"/>
  </svg>`,
  '盐': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="4" y="4" width="8" height="8" fill="#FAFAFA"/>
    <rect x="5" y="5" width="6" height="6" fill="#E0E0E0"/>
  </svg>`,
  '辣椒': `<svg viewBox="0 0 16 16" fill="none">
    <rect x="6" y="3" width="4" height="10" rx="2" fill="#F44336"/>
    <rect x="7" y="4" width="2" height="8" fill="#E57373"/>
    <rect x="7" y="2" width="2" height="1" fill="#4CAF50"/>
  </svg>`,
};

export default function PixelIcon({ name, emoji, className = '' }: PixelIconProps) {
  const iconSvg = pixelIcons[name];

  if (iconSvg) {
    return (
      <div
        className={`w-10 h-10 ${className}`}
        dangerouslySetInnerHTML={{ __html: iconSvg }}
      />
    );
  }

  // Fallback to emoji
  return <span className={`text-4xl pixel-emoji ${className}`}>{emoji}</span>;
}
