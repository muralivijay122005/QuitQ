import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">

            <img
                src={
                    product.imageUrl ||
                    "https://placehold.co/600x400"
                }
                alt={product.name}
                className="w-full h-52 object-cover"
            />

            <div className="p-4">

                <h3 className="text-lg font-semibold">
                    {product.name}
                </h3>

                <p className="text-slate-400 mt-2 line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-4 flex justify-between items-center">

                    <span className="text-emerald-400 font-bold">
                        ₹{product.price}
                    </span>

                    <Link
                        to={`/products/${product.id}`}
                        className="bg-blue-600 px-4 py-2 rounded-lg"
                    >
                        View
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default ProductCard;