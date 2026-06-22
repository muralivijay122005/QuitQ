import { useEffect, useState } from "react";
import api from "../api/axios";

function ProductFilters({
    categoryId, setCategoryId,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    inStock, setInStock,
    sortBy, setSortBy
}) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await api.get("/categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to load categories", error);
            }
        };
        loadCategories();
    }, []);

    const clearFilters = () => {
        setCategoryId("");
        setMinPrice("");
        setMaxPrice("");
        setInStock(false);
        setSortBy("");
    };

    return (
        <aside className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 h-fit">
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg">Filters</h2>
                <button onClick={clearFilters} className="text-sm text-red-500 hover:underline">Clear</button>
            </div>

            {/* Categories */}
            <div className="mb-6">
                <label className="font-medium block mb-2">Category</label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value || "")}
                    className="w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 rounded-lg p-2"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option
                            key={category.id ?? category.Id}
                            value={category.id ?? category.Id}
                        >
                            {category.name ?? category.Name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Price */}
            <div className="mb-6">
                <label className="font-medium block mb-2">Min Price</label>
                <input
                    type="number"
                    min="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Math.max(0, e.target.value || 0))}
                    className="w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 rounded-lg p-2"
                />
            </div>

            <div className="mb-6">
                <label className="font-medium block mb-2">Max Price</label>
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 rounded-lg p-2"
                />
            </div>

            {/* Stock */}
            <div className="mb-6">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={inStock}
                        onChange={(e) => setInStock(e.target.checked)}
                    />
                    In Stock Only
                </label>
            </div>

            {/* Sort */}
            <div>
                <label className="font-medium block mb-2">Sort By</label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 rounded-lg p-2"
                >
                    <option value="">Default</option>
                    <option value="latest">Latest</option>
                    <option value="priceAsc">Price: Low → High</option>
                    <option value="priceDesc">Price: High → Low</option>
                    <option value="name">Name</option>
                </select>
            </div>
        </aside>
    );
}

export default ProductFilters;