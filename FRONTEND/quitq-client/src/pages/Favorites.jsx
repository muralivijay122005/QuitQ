import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiHeart } from "react-icons/fi";
import { useFavorites } from "../context/FavoriteContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Favorites() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-12 flex-grow w-full">
        <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-spotify  font-semibold cursor-pointer">
          <FiArrowLeft /> Back
        </button>
        <h2 className="text-2xl font-bold mb-6">My Favorites</h2>
        {favorites.length === 0 ? (
          <p className="text-neutral-500 dark:text-neutral-400">You have no favorite items yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 max-w-xl">
            {favorites.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
                className="group bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={product.imageUrl || "https://placehold.co/600x400"}
                    alt={product.name}
                    className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex-1">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm line-clamp-2">
                    {product.description}
                  </p>
                </div>
                <div className="p-5 flex justify-between items-center">
                  <span className="text-xl font-extrabold text-neutral-900 dark:text-white">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }}
                    className="text-spotify hover:text-red-500"
                    aria-label="Remove from favorites"
                  >
                    <FiHeart className={`text-2xl ${isFavorite(product.id) ? "text-red-500" : "text-neutral-400"}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Favorites;