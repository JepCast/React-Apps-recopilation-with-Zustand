import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Recipe = {
    id: number;
    name: string;
    ingredients: string[],
    instructions: string;
}

type RecipeStore = {
    recipes: Recipe[];
    addRecipe: (recipe: Recipe) => void;
    removeRecipe: (id: number) => void;
}

export const useRecipeStore = create<RecipeStore>()(
    persist<RecipeStore>(
        (set) => ({
            recipes: [],
            addRecipe: (recipe) => set((state) => ({ recipes: [...state.recipes, recipe] })),
            removeRecipe: (id) => set((state) => ({
                recipes: state.recipes.filter((recipe) => recipe.id !== id)
            }))
        }),
        {
            name: 'recipes-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
)
