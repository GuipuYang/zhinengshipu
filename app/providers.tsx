'use client';

import { FavoritesProvider } from '@/contexts/FavoritesContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      {children}
    </FavoritesProvider>
  );
}
