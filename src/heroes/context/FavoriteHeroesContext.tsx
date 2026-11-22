import { createContext, useState, type PropsWithChildren } from "react";
import type { Hero } from "../models/hero.interface";

interface FavoriteHeroesContext {
    favorites: Hero[];
    favoriteCount: number;
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;
}

export const FavoriteHeroesContext = createContext({} as FavoriteHeroesContext);

export const FavoriteHeroesContextProvider = ({ children }: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>([])

    const handleIsFavorite = (hero: Hero) => {
        return favorites.some(h => h.id === hero.id);
    }

    const handleToggle = (hero: Hero) => {
        const heroExists = favorites.some(h => h.id === hero.id);
        if (heroExists) {
            const newFavorites = favorites.filter(h => h.id !== hero.id);
            setFavorites(newFavorites);
            return;
        }
        setFavorites([...favorites, hero]);
    };

    return (
        <FavoriteHeroesContext value={{
            favorites: favorites,
            favoriteCount: favorites.length,
            isFavorite: handleIsFavorite,
            toggleFavorite: handleToggle
        }}>
            {children}
        </FavoriteHeroesContext>
    );
}