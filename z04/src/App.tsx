import { useEffect, useState } from "react";
import { useStore } from "./store"

function App() {
  const { meals, searchQuery, setMeals, setSearchQuery } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
        if (!response.ok) throw new Error()
        const data = await response.json();
        setMeals(data.meals)
        console.log(data, meals)
        setIsLoading(true)
      } catch (error) {
        console.error('Could not fetch data' + error)
      } finally {
        setIsLoading(true)
      }
    }
    fetchMeals();
  }, [setMeals])

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()
    )
  )
  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex flex-col justify-center items-center bg-cyan-500">
          <div className="rounded-lg shadow-lg w-full max-w-lg m-4 bg-white p-6">
            <h1 className="flex justify-center mb-2 text-2xl">Seafood Recipes</h1>
            <input
              className="w-full px-4 mb-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search for a meal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div>
              {filteredMeals.length > 0 ? (
                filteredMeals.map((meal) => (
                  <div key={meal.idMeal}>
                    <h2 className="mb-2 mt-2">{meal.strMeal}</h2>
                    <img className="rounded-2xl" src={meal.strMealThumb} alt={meal.strMeal} />
                  </div>
                ))
              ) : (
                <p>No meals found</p>
              )}
            </div>
          </div>
        </div>) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default App