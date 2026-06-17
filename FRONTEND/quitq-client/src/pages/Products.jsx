import { useEffect, useState } from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const loadProducts = async () => {

            const response =
                await api.get(
                    "/products/paged?page=1&pageSize=8"
                );

            setProducts(response.data.data);
        };

        loadProducts();

    }, []);

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-10">

                <h1 className="text-4xl font-bold mb-8">
                    Products
                </h1>

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

export default Products;