import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";

import CartItem from "../components/cartItem.jsx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    getCart,
    updateCartItem,
    removeCartItem
} from "../services/cartService";

function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadCart = async () => {
        try {
            setLoading(true);
            const data = await getCart();
            setCart(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const increaseQuantity = async (item) => {
        await updateCartItem(
            item.id,
            item.quantity + 1
        );
        loadCart();
    };

    const decreaseQuantity = async (item) => {
        if (item.quantity <= 1) return;
        await updateCartItem(
            item.id,
            item.quantity - 1
        );
        loadCart();
    };

    const deleteItem = async (id) => {
        await removeCartItem(id);
        loadCart();
    };

    return (
        <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-12 flex-grow w-full">
                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white flex items-center gap-3">
                        <FiShoppingBag className="text-spotify" /> Shopping Cart
                    </h1>
                </header>

                {loading && !cart ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-spotify border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : !cart || cart.items.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-10 shadow-lg shadow-neutral-200/10 dark:shadow-neutral-950/10">
                        <FiShoppingBag className="w-16 h-16 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-neutral-700 dark:text-neutral-300">Your cart is empty</h2>
                        <p className="text-neutral-500 dark:text-neutral-455 mt-2">Looks like you haven't added anything to your cart yet.</p>
                        <Link
                            to="/products"
                            className="inline-block mt-6 bg-spotify hover:bg-spotify-hover text-neutral-950 font-bold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
                        >
                            Shop Now
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            {cart.items.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onIncrease={increaseQuantity}
                                    onDecrease={decreaseQuantity}
                                    onRemove={deleteItem}
                                />
                            ))}
                        </div>

                        <div className="bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-md">
                            <div>
                                <span className="text-sm text-neutral-550 dark:text-neutral-400 font-medium">Grand Total</span>
                                <h2 className="text-2xl font-black text-neutral-900 dark:text-white mt-1">
                                    ₹{cart.totalAmount.toLocaleString("en-IN")}
                                </h2>
                            </div>

                            <Link
                                to="/checkout"
                                className="w-full sm:w-auto bg-spotify hover:bg-spotify-hover text-neutral-950 font-extrabold px-8 py-3.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-spotify/25"
                            >
                                <span>Proceed To Checkout</span>
                                <FiArrowRight className="w-4.5 h-4.5" />
                            </Link>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default Cart;