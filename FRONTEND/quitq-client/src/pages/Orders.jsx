import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import { getMyOrders } from "../services/orderService";

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const data = await getMyOrders();
            setOrders(data);
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="max-w-6xl mx-auto p-8">

                <h1 className="text-4xl font-bold mb-8">
                    My Orders
                </h1>

                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <div className="space-y-4">

                        {orders.map(order => (

                            <div
                                key={order.id}
                                className="
                                    bg-slate-900
                                    border
                                    border-slate-800
                                    p-5
                                    rounded-xl
                                "
                            >
                                <h2 className="font-semibold">
                                    Order #{order.id}
                                </h2>

                                <p>
                                    Status:
                                    <span className="ml-2">
                                        {order.status}
                                    </span>
                                </p>

                                <p>
                                    Total:
                                    ₹{order.totalAmount}
                                </p>

                                <Link
                                    to={`/orders/${order.id}`}
                                    className="
                                        inline-block
                                        mt-3
                                        text-blue-400
                                    "
                                >
                                    View Details
                                </Link>

                            </div>

                        ))}

                    </div>
                )}

            </div>
        </>
    );
}

export default Orders;