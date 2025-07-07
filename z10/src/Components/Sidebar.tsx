import { useState } from "react";
import Navigation from "./Navigation"
import { useFilterStore } from "../store/useStore";
import { FiChevronDown, FiX } from "react-icons/fi";
import { data } from "../db/data";

interface FilterState {
    selectedCountries: string[];
    selectedColors: string[];
    selectedPriceRange: { min: string; max: string } | null;
    setSelectedCountries: (countries: string[]) => void;
    setSelectedColors: (colors: string[]) => void;
    setSelectedPriceRange: (range: { min: string; max: string } | null) => void;
    clearFilters: () => void;
}
interface Product {
    country: string;
    img: Record<string, string>;
    price: number
}

function Sidebar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [countryDropdown, setCountryDropdown] = useState<boolean>(false);
    const [colorDropdown, setColorDropdown] = useState<boolean>(false);
    const [priceDropdown, setPriceDropdown] = useState<boolean>(false);

    const {
        selectedCountries,
        selectedColors,
        selectedPriceRange,
        setSelectedCountries,
        setSelectedColors,
        setSelectedPriceRange,
        clearFilters
    } = useFilterStore<FilterState>((state) => state)

    const toggleSidebar = () => setIsOpen(!isOpen)

    const toggleCountryDropdown = () => setCountryDropdown(!countryDropdown)
    const toggleColorDropdown = () => setColorDropdown(!colorDropdown)
    const togglePriceDropdonw = () => setPriceDropdown(!priceDropdown)

    // Extract unique countries from the data
    const uniqueCountries: string[] = Array.from(
        new Set(data.map((item: Product) => item.country))
    );

    const handleCountrySelection = (country: string) => {
        setSelectedCountries(selectedCountries.includes(country)
            ? selectedCountries.filter(c => c !== country)
            : [...selectedCountries, country])
    }
    const handleColorSelection = (color: string) => {
        setSelectedColors(selectedColors.includes(color)
            ? selectedColors.filter(c => c !== color)
            : [...selectedColors, color])
    }
    const handlePriceRangeSelection = (range: { min: number; max: number; label: string } | null) => {
        setSelectedPriceRange(range)
    }

    return (
        <div>
            <Navigation toggleSidebar={toggleSidebar} />

            {/* Background Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
                {/* Header close button */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button className="text-xl cursor-pointer" onClick={toggleSidebar}>
                        <FiX />
                    </button>
                </div>

                {/* Filters */}
                <div className="p-4 space-y-6">
                    {/* Country Filter */}
                    <button
                        onClick={toggleCountryDropdown}
                        className="cursor-pointer flex justify-between items-center w-full text-left"
                    >
                        <span className="font-medium">Country</span>
                        <FiChevronDown className={`transform ${countryDropdown ? 'rotate-180' : ''} transition duration-300 ease-in-out`} />
                    </button>
                    {countryDropdown && (
                        <div className="mt-2 space-y-2">
                            {uniqueCountries.map((country, index) => (
                                <div
                                    key={index}
                                    className="cursor-pointer flex items-center"
                                    onClick={() => handleCountrySelection(country)}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedCountries.includes(country)}
                                        onChange={() => handleCountrySelection(country)}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span>{country}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Color Filter */}
                    <div>
                        <button
                            className="cursor-pointer flex justify-between items-center w-full text-left"
                            onClick={toggleColorDropdown}
                        >
                            <span className="font-medium">Colors</span>
                            <FiChevronDown className={`transform ${colorDropdown ? 'rotate-180' : ''} transition duration-300 ease-in-out`} />
                        </button>
                        {colorDropdown && (
                            <div className="mt-2 space-y-2">
                                {['black', 'brown', 'red', 'white', 'golden'].map((color) => (
                                    <div key={color}
                                        className="cursor-pointer flex items-center"
                                        onClick={() => handleColorSelection(color)}>
                                        <input
                                            type="checkbox"
                                            checked={selectedColors.includes(color)}
                                            onChange={() => handleColorSelection(color)}
                                            className="mr-2 cursor-pointer"
                                        />
                                        <span>{color}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Price Filter */}
                    <div>
                        <button
                            className="cursor-pointer flex justify-between items-center w-full text-left"
                            onClick={togglePriceDropdonw}
                        >
                            <span className="font-medium">Prices</span>
                            <FiChevronDown className={`transform ${priceDropdown ? 'rotate-180' : ''} transition duration-300 ease-in-out`} />
                        </button>
                        {priceDropdown && (
                            <div className="mt-2 space-y-2">
                                {[
                                    { label: "Below $300", min: 0, max: 300 },
                                    { label: "$300 - $600", min: 300, max: 600 },
                                    { label: "Above $600", min: 600, max: Infinity },
                                ].map((range) => (
                                    <div
                                        key={range.label}
                                        className="flex items-center cursor-pointer"
                                        onClick={() => handlePriceRangeSelection(range)}
                                    >
                                        <input
                                            type="radio"
                                            checked={selectedPriceRange?.label === range.label}
                                            onChange={() => handlePriceRangeSelection(range)}
                                            className="mr-2 cursor-pointer"
                                        />
                                        <span>{range.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t flex justify-between">
                    <button
                        onClick={clearFilters}
                        className="cursor-pointer bg-black text-white px-4 py-2 rounded"
                    >Clear All</button>
                </div>
            </div>
        </div>

    )
}

export default Sidebar