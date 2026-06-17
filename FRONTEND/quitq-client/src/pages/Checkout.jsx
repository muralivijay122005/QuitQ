import { useState } from "react";
import { checkout } from "../services/orderService";
import Navbar from "../components/Navbar";

function Checkout() {
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCheckout = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const result = await checkout(address);

            alert(
                `Order placed successfully. Order ID: ${result.orderId}`
            );

            setAddress("");
        }
        catch (error) {
            console.error(error);
            alert("Checkout failed");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="max-w-3xl mx-auto p-8">

                <h1 className="text-4xl font-bold mb-8">
                    Checkout
                </h1>

                <form
                    onSubmit={handleCheckout}
                    className="space-y-4"
                >
                    <textarea
                        rows="5"
                        value={address}
                        onChange={(e) =>
                            setAddress(e.target.value)
                        }
                        placeholder="Shipping Address"
                        className="
                            w-full
                            bg-slate-900
                            border
                            border-slate-700
                            rounded-xl
                            p-4
                        "
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            bg-emerald-600
                            px-6
                            py-3
                            rounded-xl
                        "
                    >
                        {
                            loading
                                ? "Processing..."
                                : "Place Order"
                        }
                    </button>

                </form>

            </div>
        </>
    );
}

export default Checkout;