import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CartItem from "../components/cartItem.jsx";
import {
    getCart,
    updateCartItem,
    removeCartItem
} from "../services/cartService";

function Cart() {
    const [cart, setCart] = useState(null);

    const loadCart = async () => {
        try {
            const data = await getCart();
            setCart(data);
        }
        catch (error) {
            console.error(error);
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

        if (item.quantity <= 1)
            return;

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

    if (!cart) {
        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">
                Shopping Cart
            </h1>

            {cart.items.length === 0 ? (
                <div className="text-slate-400">
                    Cart is empty
                </div>
            ) : (
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

                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">

                        <h2 className="text-2xl font-bold">
                            Total: ₹{cart.totalAmount}
                        </h2>

                    </div>
                    <Link
                        to="/checkout"
                        className="
        inline-block
        mt-4
        bg-emerald-600
        px-6
        py-3
        rounded-xl
    "
                    >
                        Proceed To Checkout
                    </Link>

                </div>
            )}

        </div>
    );
}

export default Cart;