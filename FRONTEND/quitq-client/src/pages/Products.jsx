import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import ProductFilters from "../components/ProductFilters";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryId, setCategoryId] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [inStock, setInStock] = useState(false);
    const [sortBy, setSortBy] = useState("");
    const [filters, setFilters] = useState({
        categoryId: "",
        minPrice: "",
        maxPrice: "",
        inStock: false,
        sortBy: ""
    });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("search") || "";

    useEffect(() => { setPage(1); }, [searchTerm, categoryId, minPrice, maxPrice, inStock, sortBy]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                let response;

                if (searchTerm) {
                    response = await api.get(`/products/search?keyword=${encodeURIComponent(searchTerm)}&page=${page}&pageSize=12`);
                    setProducts(response.data.data || []);
                    setTotalPages(Math.ceil(response.data.totalCount / response.data.pageSize));
                } else {
                    const params = new URLSearchParams();
                    if (categoryId) params.append("categoryId", categoryId);
                    if (minPrice) params.append("minPrice", minPrice);
                    if (maxPrice) params.append("maxPrice", maxPrice);
                    if (inStock) params.append("inStock", true);
                    if (sortBy) params.append("sortBy", sortBy);
                    params.append("page", page);
                    params.append("pageSize", 12);

                    response = await api.get(`/products/filter?${params}`);
                    setProducts(response.data.data || []);
                    setTotalPages(Math.ceil(response.data.totalCount / response.data.pageSize));
                }
            } catch (error) {
                console.error("Failed to load products", error);
                setProducts([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [searchTerm, page, categoryId, minPrice, maxPrice, inStock, sortBy]);

    return (
        <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 py-10 flex-grow w-full">
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        {searchTerm ? "Search Results" : "All Products"}
                    </h1>
                    <p className="mt-2 text-neutral-500 dark:text-neutral-400">
                        {searchTerm ? `Showing results for "${searchTerm}"` : "Browse our complete catalog of products"}
                    </p>
                </div>

                <div className="flex gap-8">
                    <ProductFilters
                        categoryId={categoryId} setCategoryId={setCategoryId}
                        minPrice={minPrice} setMinPrice={setMinPrice}
                        maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                        inStock={inStock} setInStock={setInStock}
                        sortBy={sortBy} setSortBy={setSortBy}
                    />
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="animate-pulse rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                                        <div className="h-52 bg-neutral-200 dark:bg-neutral-800" />
                                        <div className="p-4 space-y-3">
                                            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded" />
                                            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3" />
                                            <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl py-20 text-center">
                                <h2 className="text-2xl font-bold mb-3">No Products Found</h2>
                                <p className="text-neutral-500 dark:text-neutral-400">Try searching with a different keyword.</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {products.map((product) => (
                                        <ProductCard key={product.id || product.Id} product={product} />
                                    ))}
                                </div>
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-4 mt-12">
                                        <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1} className="px-4 py-2 rounded-lg bg-neutral-800 text-white disabled:opacity-40">Previous</button>
                                        <span className="font-semibold">Page {page} of {totalPages}</span>
                                        <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages} className="px-4 py-2 rounded-lg bg-emerald-500 text-black font-semibold disabled:opacity-40">Next</button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Products;