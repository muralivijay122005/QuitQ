import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";

function CartItem({
    item,
    onIncrease,
    onDecrease,
    onRemove
}) {
    return (
        <div className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 rounded-2xl p-5 flex justify-between items-center">
            <div>
                <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100">
                    {item.product?.name}
                </h3>
                <p className="text-spotify font-semibold mt-1">
                    ₹{item.product?.price.toLocaleString("en-IN")}
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-full p-1 border border-neutral-200/50 dark:border-neutral-700/50">
                    <button
                        onClick={() => onDecrease(item)}
                        disabled={item.quantity <= 1}
                        className="p-1.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 disabled:opacity-30 disabled:pointer-events-none "
                        aria-label="Decrease quantity"
                    >
                        <FiMinus className="w-3.5 h-3.5" />
                    </button>

                    <span className="w-8 text-center font-semibold text-neutral-850 dark:text-white">
                        {item.quantity}
                    </span>

                    <button
                        onClick={() => onIncrease(item)}
                        className="p-1.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                        aria-label="Increase quantity"
                    >
                        <FiPlus className="w-3.5 h-3.5" />
                    </button>
                </div>

                <button
                    onClick={() => onRemove(item.id)}
                    className="p-3 bg-neutral-100 hover:bg-red-50 dark:bg-neutral-800 dark:hover:bg-red-950/30 text-red-500 rounded-full  hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label="Remove item"
                >
                    <FiTrash2 className="w-4.5 h-4.5" />
                </button>
            </div>
        </div>
    );
}

export default CartItem;