import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}
interface StoreState {
    meals: Meal[];
    searchQuery: string;
    setMeals: (meals: Meal[]) => void;
    setSearchQuery: (query: string) => void;
}

export const useStore = create<StoreState>()(
    persist(
        (set) => ({
            meals: [],
            searchQuery: "",
            setMeals: (meals: Meal[]) => set({ meals }),
            setSearchQuery: (query: string) => set({ searchQuery: query })
        }),
        {
            name: 'meals-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
)