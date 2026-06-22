import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiInfo, FiTrash2 } from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getOrderById, cancelOrder } from "../services/orderService";

function OrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadOrder = async () => {
        try {
            setLoading(true);
            const data = await getOrderById(id);
            setOrder(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrder();
    }, [id]);

    const handleCancel = async () => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;
        try {
            await cancelOrder(id);
            alert("Order cancelled successfully");
            loadOrder();
        } catch (error) {
            console.error(error);
            alert("Unable to cancel order");
        }
    };

    if (loading && !order) {
        return (
            <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
                <Navbar />
                <div className="max-w-4xl mx-auto px-6 py-12 flex-grow w-full flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-spotify border-t-transparent rounded-full animate-spin"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
                <Navbar />
                <div className="max-w-4xl mx-auto px-6 py-12 flex-grow w-full flex flex-col items-center justify-center">
                    <FiInfo className="w-16 h-16 text-neutral-400 mb-4" />
                    <h2 className="text-2xl font-bold">Order Not Found</h2>
                    <Link to="/orders" className="mt-4 text-spotify hover:underline font-semibold flex items-center gap-2">
                        <FiArrowLeft /> Back to Orders
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

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
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-spotify dark:hover:text-spotify  font-semibold cursor-pointer"
                >
                    <FiArrowLeft /> Back to Orders
                </button>

                <div className="bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 p-8 rounded-3xl shadow-xl shadow-neutral-200/10 dark:shadow-neutral-950/10">
                    <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6 mb-8">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                                Order Details
                            </h1>
                            <p className="text-neutral-500 dark:text-neutral-400 mt-1">
                                Order ID: <span className="font-semibold text-neutral-700 dark:text-neutral-350">#{order.id}</span>
                            </p>
                        </div>
                        <div className="self-start sm:self-center">
                            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${getStatusStyle(order.status)}`}>
                                Status: {order.status}
                            </span>
                        </div>
                    </header>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-neutral-50 dark:bg-neutral-950/50 border border-neutral-200/50 dark:border-neutral-900 p-5 rounded-2xl">
                            <h3 className="font-bold text-neutral-800 dark:text-neutral-200 mb-3 flex items-center gap-2">
                                <FiCheckCircle className="text-spotify" /> Order Summary
                            </h3>
                            <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                <p className="flex justify-between">
                                    <span>Payment Method:</span>
                                    <span className="font-medium text-neutral-800 dark:text-neutral-200">Cash on Delivery</span>
                                </p>
                                <p className="flex justify-between border-t border-neutral-200 dark:border-neutral-800 pt-2 mt-2 font-bold text-base text-neutral-900 dark:text-white">
                                    <span>Total Amount:</span>
                                    <span className="text-spotify">₹{order.totalAmount.toLocaleString("en-IN")}</span>
                                </p>
                            </div>
                        </div>

                        <div className="bg-neutral-50 dark:bg-neutral-950/50 border border-neutral-200/50 dark:border-neutral-900 p-5 rounded-2xl">
                            <h3 className="font-bold text-neutral-800 dark:text-neutral-200 mb-3 flex items-center gap-2">
                                <FiInfo className="text-spotify" /> Delivery Information
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {order.shippingAddress || "No shipping address provided."}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                            Ordered Items
                        </h2>

                        <div className="divide-y divide-neutral-250 dark:divide-neutral-850">
                            {order.orderItems?.map(item => (
                                <div
                                    key={item.id}
                                    className="py-4 flex justify-between items-center gap-4 first:pt-0 last:pb-0"
                                >
                                    <div>
                                        <h4 className="font-bold text-neutral-900 dark:text-neutral-100">
                                            {item.product?.name}
                                        </h4>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-450 mt-1">
                                            Qty: <span className="font-semibold">{item.quantity}</span> &times; ₹{item.price.toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                    <span className="font-black text-neutral-900 dark:text-white">
                                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {order.status !== "SHIPPED" &&
                        order.status !== "DELIVERED" &&
                        order.status !== "CANCELLED" && (
                            <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
                                <button
                                    onClick={handleCancel}
                                    className="bg-neutral-100 hover:bg-red-550/10 dark:bg-neutral-800 dark:hover:bg-red-950/30 text-red-650 hover:text-red-500 font-bold px-6 py-3 rounded-full text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer border border-neutral-200 dark:border-neutral-700/50 hover:border-red-500/50 dark:hover:border-red-900/50"
                                >
                                    <FiTrash2 />
                                    <span>Cancel Order</span>
                                </button>
                            </div>
                        )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default OrderDetails;