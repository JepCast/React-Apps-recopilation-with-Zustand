import { create } from "zustand";

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

export const useStore = create<RecipeStore>((set) => ({
    recipes: [],
    addRecipe: (recipe) => set((state) => ({ recipes: [...state.recipes, recipe] })),
    //Filtra nuestras recetas por id, haciendo que la receta que seleccionemos que queremos eliminar sea eliminada
    //Retornando todas las recetas que no sean iguales al id que tiene la receta que queremos eliminar.
    removeRecipe: (id) => set((state) => ({
        recipes: state.recipes.filter(
            (recipe) => recipe.id !== id)
    }))
}))