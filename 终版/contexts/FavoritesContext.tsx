'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';

const FAVORITES_KEY = 'favorites';

interface FavoritesContextType {
  favorites: string[];
  isFavorite: (recipeId: string) => boolean;
  addFavorite: (recipeId: string) => void;
  removeFavorite: (recipeId: string) => void;
  toggleFavorite: (recipeId: string) => void;
  clearAllFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const isInitialized = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      const data = stored ? JSON.parse(stored) : [];
      setFavorites(Array.isArray(data) ? data : []);
      isInitialized.current = true;
    } catch (error) {
      console.error('Failed to load favorites:', error);
      setFavorites([]);
      isInitialized.current = true;
    }
  }, []);

  // Save to localStorage whenever favorites change (but only after initial load)
  useEffect(() => {
    if (!isInitialized.current) {
      return;
    }

    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, [favorites]);

  const isFavorite = useCallback((recipeId: string) => {
    return favorites.includes(recipeId);
  }, [favorites]);

  const addFavorite = useCallback((recipeId: string) => {
    setFavorites(prev =>
      prev.includes(recipeId) ? prev : [...prev, recipeId]
    );
  }, []);

  const removeFavorite = useCallback((recipeId: string) => {
    setFavorites(prev => prev.filter(id => id !== recipeId));
  }, []);

  const toggleFavorite = useCallback((recipeId: string) => {
    setFavorites(prev =>
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  }, []);

  const clearAllFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        clearAllFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
