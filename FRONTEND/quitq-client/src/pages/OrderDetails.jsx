import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
    getOrderById,
    cancelOrder
} from "../services/orderService";

function OrderDetails() {

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        loadOrder();
    }, []);

    const loadOrder = async () => {
        try {
            const data =
                await getOrderById(id);

            setOrder(data);
        }
        catch (error) {
            console.error(error);
        }
    };

    const handleCancel = async () => {
        try {

            await cancelOrder(id);

            alert("Order cancelled");

            loadOrder();

        } catch (error) {

            console.error(error);

            alert("Unable to cancel");

        }
    };

    if (!order) {
        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <div className="max-w-5xl mx-auto p-8">

                <h1 className="text-4xl font-bold mb-8">
                    Order #{order.id}
                </h1>

                <p>
                    Status:
                    <strong className="ml-2">
                        {order.status}
                    </strong>
                </p>

                <p className="mt-2">
                    Total:
                    ₹{order.totalAmount}
                </p>

                <div className="mt-8">

                    <h2 className="text-2xl mb-4">
                        Items
                    </h2>

                    {order.orderItems.map(item => (

                        <div
                            key={item.id}
                            className="
                                bg-slate-900
                                border
                                border-slate-800
                                p-4
                                rounded-xl
                                mb-3
                            "
                        >
                            <p>
                                {item.product?.name}
                            </p>

                            <p>
                                Qty: {item.quantity}
                            </p>

                            <p>
                                ₹{item.price}
                            </p>

                        </div>

                    ))}

                </div>

                {
                    order.status !== "SHIPPED" &&
                    order.status !== "DELIVERED" &&
                    order.status !== "CANCELLED" && (

                        <button
                            onClick={handleCancel}
                            className="
                                mt-6
                                bg-red-600
                                px-6
                                py-3
                                rounded-xl
                            "
                        >
                            Cancel Order
                        </button>

                    )
                }

            </div>
        </>
    );
}

export default OrderDetails;