import { Link } from "react-router-dom";
import {
    FiLayers,
    FiPackage,
    FiShoppingCart,
    FiArrowRight
} from "react-icons/fi";
import axios from "axios";
import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function AdminDashboard() {
    const [analytics, setAnalytics] = useState(null);
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalCategories: 0,
        totalOrders: 0,
        revenue: 0
    });

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    "https://localhost:7253/api/admin/analytics",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setAnalytics(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAnalytics();
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "https://localhost:7253/api/admin/stats",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setStats(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 duration-300">
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-12 flex-grow w-full">
                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                        Admin Dashboard
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-2">
                        System configuration, inventory tracking, and order management controls.
                    </p>
                </header>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6">
                        <p className="text-neutral-500 text-sm">Products</p>
                        <h2 className="text-4xl font-bold mt-2">{stats.totalProducts}</h2>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6">
                        <p className="text-neutral-500 text-sm">Categories</p>
                        <h2 className="text-4xl font-bold mt-2">{stats.totalCategories}</h2>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6">
                        <p className="text-neutral-500 text-sm">Orders</p>
                        <h2 className="text-4xl font-bold mt-2">{stats.totalOrders}</h2>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6">
                        <p className="text-neutral-500 text-sm">Revenue</p>
                        <h2 className="text-4xl font-bold mt-2">₹{stats.revenue.toLocaleString('en-IN')}</h2>
                    </div>
                </div>

                {/* Management Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    <Link to="/admin/products" className="group bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-spotify dark:hover:border-spotify transition-all duration-300 flex flex-col justify-between">
                        <div>
                            <div className="p-3 bg-spotify/15 text-spotify rounded-2xl w-fit mb-5">
                                <FiPackage className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Products Catalog</h2>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">Create, modify, update price and description, or delete products.</p>
                        </div>
                        <span className="mt-8 text-spotify font-semibold flex items-center gap-1.5 text-sm">
                            Manage inventory <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                        </span>
                    </Link>

                    <Link to="/admin/categories" className="group bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-spotify dark:hover:border-spotify transition-all duration-300 flex flex-col justify-between">
                        <div>
                            <div className="p-3 bg-spotify/15 text-spotify rounded-2xl w-fit mb-5">
                                <FiLayers className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Categories</h2>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">Organize your marketplace structure by categorizing items.</p>
                        </div>
                        <span className="mt-8 text-spotify font-semibold flex items-center gap-1.5 text-sm">
                            Manage categories <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                        </span>
                    </Link>

                    <Link to="/admin/orders" className="group bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-spotify dark:hover:border-spotify transition-all duration-300 flex flex-col justify-between">
                        <div>
                            <div className="p-3 bg-spotify/15 text-spotify rounded-2xl w-fit mb-5">
                                <FiShoppingCart className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Customer Orders</h2>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">Process customer checkouts, dispatch shipments, or cancel pending requests.</p>
                        </div>
                        <span className="mt-8 text-spotify font-semibold flex items-center gap-1.5 text-sm">
                            Manage sales <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                        </span>
                        {analytics?.topProducts?.length > 0 && (
                            <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                                <p className="text-sm text-neutral-500 mb-2">Top Products</p>
                                {analytics.topProducts.map(product => (
                                    <div key={product.productName} className="text-sm">
                                        {product.productName} ({product.sold} sold)
                                    </div>
                                ))}
                            </div>
                        )}
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default AdminDashboard;