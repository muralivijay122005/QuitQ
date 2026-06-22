import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkout } from "../services/orderService";
import { FiCreditCard, FiArrowLeft, FiMapPin } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Checkout() {
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const navigate = useNavigate();

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (!address.trim()) {
            alert("Please provide a shipping address.");
            return;
        }

        try {
            setLoading(true);
            const result = await checkout(address, couponCode);
            alert(
                `Order placed successfully!

Order ID: ${result.orderId}

Discount Applied: ₹${result.discount || 0}

Final Total: ₹${result.totalAmount}`
            );
            setAddress("");
            navigate("/orders");
        } catch (error) {
            console.error(error);
            alert("Checkout failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
            <Navbar />

            <main className="max-w-2xl mx-auto px-6 py-12 flex-grow w-full">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-spotify dark:hover:text-spotify  font-semibold cursor-pointer"
                >
                    <FiArrowLeft /> Back to Cart
                </button>

                <div className="bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 p-8 rounded-3xl shadow-xl shadow-neutral-200/10 dark:shadow-neutral-950/10">
                    <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-6 flex items-center gap-3">
                        <FiCreditCard className="text-spotify" /> Checkout
                    </h1>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">
                            Coupon Code
                        </label>

                        <input
                            type="text"
                            placeholder="WELCOME10"
                            value={couponCode}
                            onChange={(e) =>
                                setCouponCode(e.target.value)}
                            className="w-full bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 text-neutral-900 dark:text-neutral-100"
                        />
                    </div>

                    <form onSubmit={handleCheckout} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                                <FiMapPin className="text-spotify" /> Shipping Address
                            </label>
                            <textarea
                                rows="4"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your full delivery address, including state, city, and zip code..."
                                required
                                className="w-full bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-spotify focus:ring-1 focus:ring-spotify  resize-none leading-relaxed"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-spotify hover:bg-spotify-hover disabled:bg-neutral-700 disabled:text-neutral-400 text-neutral-950 font-extrabold py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-spotify/20 active:scale-99 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                            <span>
                                {loading ? "Processing Order..." : "Place Order (Cash on Delivery)"}
                            </span>
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Checkout;