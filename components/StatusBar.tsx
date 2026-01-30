import { Signal, Wifi, Battery } from 'lucide-react';

export default function StatusBar() {
  return (
    <div className="flex items-center justify-between h-[62px] px-6 pt-[21px] pb-[19px] w-full">
      <span className="font-inter text-[17px] font-semibold text-[var(--color-black)]">
        9:41
      </span>
      <div className="flex items-center gap-[6px]">
        <Signal className="w-4 h-4 text-[var(--color-black)]" />
        <Wifi className="w-4 h-4 text-[var(--color-black)]" />
        <Battery className="w-5 h-5 text-[var(--color-black)]" />
      </div>
    </div>
  );
}
