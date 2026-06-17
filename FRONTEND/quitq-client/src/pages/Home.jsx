import { useEffect, useState } from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

function Home() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {

            const response =
                await api.get("/products/latest");

            setProducts(response.data);
        };

        fetchProducts();

    }, []);

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-12">

                <h1 className="text-5xl font-bold">
                    Welcome to QuitQ
                </h1>

                <p className="text-slate-400 mt-4">
                    Modern shopping experience
                </p>

                <h2 className="text-3xl font-bold mt-16 mb-8">
                    Latest Products
                </h2>

                <div className="grid md:grid-cols-4 gap-6">

                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}

                </div>

            </div>

            <Footer />
        </>
    );
}

export default Home;