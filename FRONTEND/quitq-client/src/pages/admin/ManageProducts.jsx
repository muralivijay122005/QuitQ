import { useEffect, useState } from "react";
import axios from "axios";

function ManageProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const response = await axios.get(
            "https://localhost:7253/api/products"
        );

        setProducts(response.data);
    };

    const deleteProduct = async (id) => {
        const token = localStorage.getItem("token");

        await axios.delete(
            `https://localhost:7253/api/products/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        loadProducts();
    };

    return (
        <div className="max-w-6xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-6">
                Manage Products
            </h1>

            <div className="space-y-4">

                {products.map(product => (

                    <div
                        key={product.id}
                        className="bg-slate-900 border border-slate-800 p-4 rounded-lg flex justify-between items-center"
                    >
                        <div>
                            <h2>{product.name}</h2>

                            <p className="text-slate-400">
                                ₹{product.price}
                            </p>
                        </div>

                        <button
                            onClick={() => deleteProduct(product.id)}
                            className="bg-red-600 px-4 py-2 rounded"
                        >
                            Delete
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default ManageProducts;