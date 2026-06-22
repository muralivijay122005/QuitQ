import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (product) => {
    setFavorites((prev) => {
      if (!prev.find((p) => p.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFavorite = (productId) => {
    setFavorites((prev) => prev.filter((p) => p.id !== productId));
  };

  const toggleFavorite = (product) => {
    if (favorites.find((p) => p.id === product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  const isFavorite = (productId) => {
    return !!favorites.find((p) => p.id === productId);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoriteContext);
}
