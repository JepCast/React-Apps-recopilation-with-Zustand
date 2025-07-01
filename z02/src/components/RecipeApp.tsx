import { useState } from "react";
import { useStore } from "../useStore";

type Recipe = {
    id: number;
    name: string;
    ingredients: string[],
    instructions: string;
}

function RecipeApp() {
    const { recipes, addRecipe, removeRecipe } = useStore();

    const [name, setName] = useState<string>('');
    const [ingredients, setIngredients] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');
    const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)
    const [error, setError] = useState('')


    const handleAddRecipe = () => {
        if (name.trim() == '' || ingredients.trim() == '' || instructions.trim() == '') {
            setError('Please fill in all the fileds')
            return;
        }

        addRecipe({
            id: Date.now(),
            name,
            ingredients: ingredients.split(',').map((ingredients) => ingredients.trim()),
            instructions
        })

        setName('')
        setIngredients('')
        setInstructions('')
        setError("");
    }

    const handleEditRecipe = (recipe: Recipe) => {
        setEditingRecipe(recipe)
        setName(recipe.name)
        setIngredients(recipe.ingredients.join(', '))
        setInstructions(recipe.instructions)
    }

    const handleUpdateRecipe = () => {
        if (name.trim() == '' || ingredients.trim() == '' || instructions.trim() == '') {
            return
        }

        if (editingRecipe) {
            removeRecipe(editingRecipe.id)

            addRecipe({
                id: editingRecipe.id,
                name,
                ingredients: ingredients.split(',').map((ingredients) => ingredients.trim()),
                instructions
            })
            setEditingRecipe(null)
        }

        setName('');
        setIngredients('');
        setInstructions('');
    }

    const handleCancelEdit = () => {
        setEditingRecipe(null);
        setName('');
        setIngredients('');
        setInstructions('');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100">
            <div className="bg-white p-6 m-4 rounded-lg shadow-lg w-full max-w-2xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-green-500">
                    Recipe Book
                </h1>
                <div className="space-y-6 mb-6">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Recipe Name"
                        className="w-full px-4 py-4 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients (comma separated)"
                        className="w-full px-4 py-4 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <textarea value={instructions} rows={10} onChange={(e) => setInstructions(e.target.value)} placeholder="Instructions"
                        className="w-full px-4 py-4 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <div className="flex justify-between">
                        {editingRecipe ? (
                            <>
                                <button onClick={() => handleUpdateRecipe()} className="bg-yellow-500 text-white px-4 py-2 rounded-lg focus:outline-none
                                focus:ring-2 focus:ring-yellow-500 cursor-pointer">Upade Recipe</button>
                                <button onClick={() => handleCancelEdit()} className="bg-gray-500 text-white px-4 py-2 rounded-lg focus:outline-none
                                focus:ring-2 focus:ring-gray-500 cursor-pointer">Cancel</button>
                            </>
                        ) :
                            <div className="flex flex-col w-full">
                                {error && (
                                    <p className="text-center uppercase text-red-500 mb-2">
                                        {error}
                                    </p>
                                )}
                                <div className="flex justify-start">
                                    <button
                                        onClick={() => handleAddRecipe()}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg focus:outline-none
                                        focus:ring-2 focus:ring-green-500 cursor-pointer"
                                    >
                                        Add Recipe
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <ul className="space-y-4">
                    {recipes.map((recipe) => (
                        <li key={recipe.id} className="p-4 bg-green-50  rounded-lg shadow-sm">

                            <h2 className="text-xl font-semibold text-green-500 mb-2">{recipe.name}</h2>
                            <p className="textgray-700 mb-2">
                                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                            </p>

                            <div className="flex justify-between">

                                <button onClick={() => handleEditRecipe(recipe)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg focus:outline-none
                                focus:ring-2 focus:ring-yellow-500 cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button onClick={() => removeRecipe(recipe.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg focus:outline-none
                                focus:ring-2 focus:ring-red-500 cursor-pointer">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default RecipeApp