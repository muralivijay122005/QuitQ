import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../services/cartService";
import { FiArrowLeft, FiShoppingBag, FiInfo } from "react-icons/fi";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ReviewForm from "../components/reviewForm";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const [reviews, setReviews] = useState([]);
    const [reviewStats, setReviewStats] = useState(null);

    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false);

    const loadReviews = async () => {
        try {
            const reviewsResponse =
                await api.get(
                    `/reviews/product/${id}`
                );

            setReviews(
                reviewsResponse.data
            );

            const statsResponse =
                await api.get(
                    `/reviews/product/${id}/stats`
                );

            setReviewStats(
                statsResponse.data
            );
        }
        catch (error) {
            console.error(
                "Failed to load reviews",
                error
            );
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setFetching(true);

                const response =
                    await api.get(
                        `/products/${id}`
                    );

                setProduct(
                    response.data
                );

                await loadReviews();

                try {
                    const relatedResponse =
                        await api.get(
                            `/products/${id}/related`
                        );

                    setRelatedProducts(
                        relatedResponse.data || []
                    );
                }
                catch {
                    setRelatedProducts([]);
                }
            }
            catch (error) {
                console.error(
                    "Failed to load product",
                    error
                );
            }
            finally {
                setFetching(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            setLoading(true);

            await addToCart(
                product.id,
                1
            );

            alert(
                "Added to cart"
            );
        }
        catch (error) {
            console.error(error);

            alert(
                "Failed to add item to cart"
            );
        }
        finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
                <Navbar />

                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />

                        <p className="mt-4 text-neutral-500">
                            Loading product...
                        </p>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />

                <div className="flex-grow flex flex-col items-center justify-center">

                    <FiInfo
                        className="text-6xl text-neutral-400"
                    />

                    <h2 className="mt-4 text-2xl font-bold">
                        Product Not Found
                    </h2>

                    <button
                        onClick={() =>
                            navigate("/products")
                        }
                        className="mt-4 text-emerald-500"
                    >
                        Back to Products
                    </button>

                </div>

                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white">

            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-12 flex-grow w-full">

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-8"
                >
                    <FiArrowLeft />
                    Back
                </button>

                <div
                    className="
                    grid
                    md:grid-cols-2
                    gap-12
                    bg-white
                    dark:bg-neutral-900
                    border
                    border-neutral-200
                    dark:border-neutral-800
                    rounded-3xl
                    p-8
                    "
                >

                    <div
                        className="
                        aspect-square
                        overflow-hidden
                        rounded-2xl
                        bg-neutral-100
                        dark:bg-neutral-800
                        "
                    >
                        <img
                            src={
                                product.imageUrl ||
                                "https://placehold.co/800x800"
                            }
                            alt={product.name}
                            className="
                                w-full
                                h-full
                                object-cover
                            "
                        />
                    </div>

                    <div>

                        <h1
                            className="
                            text-4xl
                            font-black
                            "
                        >
                            {product.name}
                        </h1>

                        <div
                            className="
                            flex
                            items-center
                            gap-2
                            mt-3
                            "
                        >
                            <span
                                className="
                                text-yellow-500
                                "
                            >
                                ⭐
                            </span>

                            <span>
                                {
                                    reviewStats?.averageRating?.toFixed(
                                        1
                                    ) || "0.0"
                                }
                            </span>

                            <span
                                className="
                                text-neutral-500
                                "
                            >
                                (
                                {
                                    reviewStats?.reviewCount || 0
                                }
                                {" "}
                                Reviews)
                            </span>
                        </div>

                        <p
                            className="
                            mt-6
                            text-neutral-600
                            dark:text-neutral-400
                            "
                        >
                            {product.description}
                        </p>
                        <p
                            className="
                            mt-6
                            text-neutral-600
                            dark:text-neutral-400
                            "
                        >
                            {product.stock > 0 ? product.stock + " left in stock" : "Out of stock"}
                        </p>

                        <h2
                            className="
                            text-4xl
                            font-bold
                            mt-8
                            "
                        >
                            ₹
                            {product.price?.toLocaleString(
                                "en-IN"
                            )}
                        </h2>

                        <button
                            onClick={
                                handleAddToCart
                            }
                            disabled={loading}
                            className="
                            mt-8
                            px-8
                            py-4
                            rounded-full
                            bg-emerald-500
                            text-black
                            font-bold
                            flex
                            items-center
                            gap-2
                            "
                        >
                            <FiShoppingBag />

                            {
                                loading
                                    ? "Adding..."
                                    : "Add To Cart"
                            }
                        </button>

                    </div>
                </div>

                <div className="mt-16">

                    <ReviewForm
                        productId={Number(id)}
                        onReviewAdded={
                            loadReviews
                        }
                    />

                    <h2
                        className="
                        text-3xl
                        font-bold
                        mt-10
                        mb-6
                        "
                    >
                        Reviews
                    </h2>

                    {reviewStats && (
                        <div
                            className="
                            bg-white
                            dark:bg-neutral-900
                            border
                            border-neutral-200
                            dark:border-neutral-800
                            rounded-2xl
                            p-6
                            mb-6
                            "
                        >
                            <h3
                                className="
                                text-4xl
                                font-bold
                                "
                            >
                                ⭐ {
                                    reviewStats.averageRating?.toFixed(
                                        1
                                    )
                                }
                            </h3>

                            <p
                                className="
                                text-neutral-500
                                "
                            >
                                {
                                    reviewStats.reviewCount
                                } Reviews
                            </p>
                        </div>
                    )}

                    <div
                        className="
                        space-y-4
                        "
                    >
                        {reviews.length === 0 ? (
                            <div
                                className="
                                bg-white
                                dark:bg-neutral-900
                                border
                                border-neutral-200
                                dark:border-neutral-800
                                rounded-2xl
                                p-6
                                "
                            >
                                No reviews yet.
                            </div>
                        ) : (
                            reviews.map(
                                (review) => (
                                    <div
                                        key={
                                            review.id
                                        }
                                        className="
                                        bg-white
                                        dark:bg-neutral-900
                                        border
                                        border-neutral-200
                                        dark:border-neutral-800
                                        rounded-2xl
                                        p-5
                                        "
                                    >
                                        <div
                                            className="
                                            font-semibold
                                            "
                                        >
                                            {
                                                review.user?.fullName ||
                                                "Anonymous"
                                            }
                                        </div>

                                        <div
                                            className="
                                            text-yellow-500
                                            mt-1
                                            "
                                        >
                                            {
                                                "⭐".repeat(
                                                    review.rating
                                                )
                                            }
                                        </div>

                                        <p
                                            className="
                                            mt-2
                                            "
                                        >
                                            {
                                                review.comment
                                            }
                                        </p>
                                    </div>
                                )
                            )
                        )}
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <div className="mt-16">

                        <h2
                            className="
                            text-3xl
                            font-bold
                            mb-6
                            "
                        >
                            Related Products
                        </h2>

                        <div
                            className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            lg:grid-cols-4
                            gap-6
                            "
                        >
                            {relatedProducts.map(
                                (item) => (
                                    <ProductCard
                                        key={
                                            item.id
                                        }
                                        product={
                                            item
                                        }
                                    />
                                )
                            )}
                        </div>

                    </div>
                )}

            </main>

            <Footer />

        </div>
    );
}

export default ProductDetails;