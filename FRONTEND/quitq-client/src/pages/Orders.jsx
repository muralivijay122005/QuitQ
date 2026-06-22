import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPackage, FiCalendar, FiDollarSign, FiArrowRight } from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getMyOrders } from "../services/orderService";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const data = await getMyOrders();
            setOrders(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status?.toUpperCase()) {
            case "DELIVERED":
                return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400 border-green-200 dark:border-green-900/50";
            case "SHIPPED":
                return "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200 dark:border-blue-900/50";
            case "CANCELLED":
                return "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400 border-red-200 dark:border-red-900/50";
            default:
                return "bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200 dark:border-amber-900/50";
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-12 flex-grow w-full">
                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white flex items-center gap-3">
                        <FiPackage className="text-spotify" /> My Orders
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-2">
                        Track status and view details of your previous purchases.
                    </p>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-spotify border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-10 shadow-lg shadow-neutral-200/10 dark:shadow-neutral-950/10">
                        <FiPackage className="w-16 h-16 text-neutral-300 dark:text-neutral-750 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-neutral-700 dark:text-neutral-300">No orders placed yet</h2>
                        <p className="text-neutral-550 dark:text-neutral-450 mt-2">Your order history is currently empty.</p>
                        <Link
                            to="/products"
                            className="inline-block mt-6 bg-spotify hover:bg-spotify-hover text-neutral-950 font-bold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div
                                key={order.id}
                                className="group bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-neutral-300 dark:hover:border-neutral-700"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <h2 className="font-extrabold text-lg text-neutral-900 dark:text-white">
                                            Order #{order.id}
                                        </h2>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(order.status)}`}>
                                            {order.status || "Pending"}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-neutral-500 dark:text-neutral-400">
                                        <span className="flex items-center gap-1">
                                            <FiDollarSign className="text-spotify" /> Total Amount: <strong className="text-neutral-800 dark:text-neutral-200">₹{order.totalAmount.toLocaleString("en-IN")}</strong>
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    to={`/orders/${order.id}`}
                                    className="self-start sm:self-center border border-neutral-200 dark:border-neutral-800 text-neutral-750 dark:text-neutral-200 font-semibold px-5 py-2.5 rounded-full text-sm me-2 transition-transform duration-300 flex items-center gap-1.5 hover:scale-105 active:scale-95"
                                >
                                    <span>View Details</span>
                                    <FiArrowRight />
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default Orders;