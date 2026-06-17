function CartItem({
    item,
    onIncrease,
    onDecrease,
    onRemove
}) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex justify-between items-center">

            <div>
                <h3 className="font-semibold text-lg">
                    {item.product?.name}
                </h3>

                <p className="text-slate-400">
                    ₹{item.product?.price}
                </p>
            </div>

            <div className="flex items-center gap-3">

                <button
                    onClick={() => onDecrease(item)}
                    className="px-3 py-1 bg-slate-700 rounded"
                >
                    -
                </button>

                <span>
                    {item.quantity}
                </span>

                <button
                    onClick={() => onIncrease(item)}
                    className="px-3 py-1 bg-slate-700 rounded"
                >
                    +
                </button>

                <button
                    onClick={() => onRemove(item.id)}
                    className="ml-4 px-3 py-1 bg-red-600 rounded"
                >
                    Remove
                </button>

            </div>

        </div>
    );
}

export default CartItem;