import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7253/api/orders/all",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setOrders(res.data);
    }
    catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://localhost:7253/api/orders/${id}/status`,
        {
          status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchOrders();
    }
    catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        <h1 className="text-4xl font-bold mb-8">
          Manage Orders
        </h1>

        <div className="space-y-5">

          {orders.map(order => (

            <div
              key={order.id}
              className="bg-neutral-900 p-5 rounded-xl"
            >
              <div className="flex justify-between">

                <div>
                  <h2 className="font-bold text-xl">
                    Order #{order.id}
                  </h2>

                  <p>
                    User: {order.user?.name}
                  </p>

                  <p>
                    ₹ {order.totalAmount}
                  </p>

                  <p>
                    Status:
                    {" "}
                    <span className="font-bold text-green-500">
                      {order.status}
                    </span>
                  </p>
                </div>

                <div>

                  <select
                    defaultValue={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order.id,
                        e.target.value
                      )
                    }
                    className="bg-neutral-800 p-2 rounded"
                  >
                    <option>
                      PLACED
                    </option>

                    <option>
                      PROCESSING
                    </option>

                    <option>
                      SHIPPED
                    </option>

                    <option>
                      DELIVERED
                    </option>

                    <option>
                      CANCELLED
                    </option>
                  </select>

                </div>

              </div>
            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default ManageOrders;