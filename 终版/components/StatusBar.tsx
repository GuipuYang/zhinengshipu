'use client';

import { useState, useEffect } from 'react';
import { Signal, Wifi, Battery } from 'lucide-react';

export default function StatusBar() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between h-[62px] px-6 pt-[21px] pb-[19px] w-full">
      <span className="font-inter text-[17px] font-semibold text-[var(--color-black)]">
        {currentTime}
      </span>
      <div className="flex items-center gap-[6px]">
        <Signal className="w-4 h-4 text-[var(--color-black)]" />
        <Wifi className="w-4 h-4 text-[var(--color-black)]" />
        <Battery className="w-5 h-5 text-[var(--color-black)]" />
      </div>
    </div>
  );
}
