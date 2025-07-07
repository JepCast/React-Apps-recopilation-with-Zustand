import ProductCard from "./Components/ProductCard"
import Sidebar from "./Components/Sidebar"
import { data } from "./db/data"
import { useFilterStore } from "./store/useStore"

interface Product {
  id: string;
  country: string;
  img: Record<string, string>
  price: number;
}


function App() {
  const { selectedCountries, selectedColors, selectedPriceRange } = useFilterStore();

  const filterData = data.filter((item: Product) => {
    const matchesColor = selectedColors.length === 0 || Object.keys(item.img).some((color) => selectedColors.includes(color));
    const matchesPrice = selectedPriceRange ? item.price >= selectedPriceRange.min && item.price <= selectedPriceRange.max : true
    const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(item.country);

    return matchesColor &&  matchesPrice && matchesCountry
  })

  return (
    <div>
      <Sidebar />
      <div className="p-4 flex flex-wrap justify-center items-center">
        {filterData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default App