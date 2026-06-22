import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiShoppingBag, FiTruck, FiShield, FiPercent } from "react-icons/fi";

import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/products/latest");
                setProducts(response.data);
            } catch (error) {
                console.error("Failed to fetch latest products", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <header className="relative overflow-hidden bg-neutral-100/50 dark:bg-neutral-900/20 py-20 px-6 sm:py-28">
                {/* Visual decorations */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-spotify/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-spotify/10 dark:bg-spotify/20 text-spotify text-xs font-semibold uppercase tracking-wider mb-6">
                        <FiPercent /> Exclusive Launch Discount
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-none">
                        Your Ultimate Shop for <span className="text-spotify">Premium Goods</span>
                    </h1>
                    <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Experience the next generation of e-commerce. Quick checkouts, curated high-quality products, and lightning fast deliveries.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Link
                            to="/products"
                            className="bg-spotify hover:bg-spotify-hover text-neutral-950 font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-spotify/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                        >
                            <span>Explore Products</span>
                            <FiArrowRight className="w-4.5 h-4.5" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Features Info Section */}
            <section className="py-12 border-y border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-950">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex gap-4 items-start p-4">
                        <div className="p-3.5 bg-spotify/15 text-spotify rounded-2xl">
                            <FiTruck className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-neutral-900 dark:text-white">Free Express Shipping</h3>
                            <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-sm">On all orders above ₹499. Dispatched within 24 hours.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start p-4">
                        <div className="p-3.5 bg-spotify/15 text-spotify rounded-2xl">
                            <FiShield className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-neutral-900 dark:text-white">Secure Payments</h3>
                            <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-sm">SSL encrypted transactions. Safe, secure checkouts.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start p-4">
                        <div className="p-3.5 bg-spotify/15 text-spotify rounded-2xl">
                            <FiShoppingBag className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-neutral-900 dark:text-white">Easy Returns</h3>
                            <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-sm">30-day hassle-free return policy. No questions asked.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Products */}
            <main className="max-w-7xl mx-auto px-6 py-16 flex-grow">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                            Latest Arrivals
                        </h2>
                        <p className="text-neutral-550 dark:text-neutral-400 mt-2">
                            Freshly stocked items just for you
                        </p>
                    </div>
                    <Link
                        to="/products"
                        className="text-spotify hover:text-spotify-hover font-semibold flex items-center gap-1 group"
                    >
                        <span>See All</span>
                        <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-16 bg-neutral-100/50 dark:bg-neutral-900/20 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800">
                        <p className="text-neutral-500 dark:text-neutral-400 font-medium">No products available at the moment. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {products.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default Home;