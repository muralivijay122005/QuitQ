import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../services/cartService.js";
import api from "../api/axios";

import Navbar from "../components/Navbar";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleAddToCart = async () => {
        try {
            setLoading(true);

            await addToCart(product.id, 1);

            alert("Added to cart");
        }
        catch (error) {
            console.error(error);

            alert("Failed to add item");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        const fetchProduct = async () => {

            const response =
                await api.get(`/products/${id}`);

            setProduct(response.data);
        };

        fetchProduct();

    }, [id]);

    if (!product)
        return <h1>Loading...</h1>;

    return (
        <>
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-12">

                <div className="grid md:grid-cols-2 gap-10">

                    <img
                        src={
                            product.imageUrl ||
                            "https://placehold.co/800x600"
                        }
                        alt={product.name}
                        className="rounded-xl"
                    />

                    <div>

                        <h1 className="text-4xl font-bold">
                            {product.name}
                        </h1>

                        <p className="text-slate-400 mt-4">
                            {product.description}
                        </p>

                        <h2 className="text-3xl font-bold mt-8 text-emerald-400">
                            ₹{product.price}
                        </h2>

                        <button
                            onClick={handleAddToCart}
                            disabled={loading}
                            className="
        mt-6
        px-6
        py-3
        rounded-xl
        bg-emerald-600
        hover:bg-emerald-700
        font-semibold
    "
                        >
                            {
                                loading
                                    ? "Adding..."
                                    : "Add To Cart"
                            }
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
}

export default ProductDetails;