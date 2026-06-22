import { useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoriteContext";

function ProductCard({ product }) {
    const navigate = useNavigate();
    const { toggleFavorite, isFavorite } = useFavorites();

    return (
        <div
            onClick={() => navigate(`/products/${product.id}`)}
            className="group w-full max-w-sm mx-auto bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-neutral-200/40 dark:hover:shadow-neutral-950/40 hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between cursor-pointer"
        >
            <div className="relative">
                <div className="relative overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img
                        src={product.imageUrl || "https://placehold.co/600x400"}
                        alt={product.name}
                        className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-103"
                        loading="lazy"
                    />
                </div>

                <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }}
                    className="absolute top-3 right-3 text-xl z-10 "
                    aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite(product.id) ? (
                        <FaHeart className="text-red-500 drop-shadow-md" />
                    ) : (
                        <FiHeart className="text-neutral-500 hover:text-red-400 drop-shadow-lg" />
                    )}
                </button>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-neutral-850 dark:text-neutral-100 group-hover:text-spotify  line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm line-clamp-2 leading-relaxed">
                    {product.description}
                </p>
            </div>

            <div className="p-5 pt-0 mt-auto">
                <span className="text-xl font-extrabold text-neutral-900 dark:text-white">
                    ₹{product.price.toLocaleString("en-IN")}
                </span>
            </div>
        </div>
    );
}

export default ProductCard;