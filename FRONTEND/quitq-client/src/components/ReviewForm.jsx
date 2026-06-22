import { useState } from "react";
import api from "../api/axios";

function ReviewForm({
    productId,
    onReviewAdded
}) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/reviews", {
                productId,
                rating,
                comment
            });

            setRating(5);
            setComment("");

            onReviewAdded();
        }
        catch (error) {
            console.error(error);
            alert("Failed to submit review");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="
                mt-8
                bg-white
                dark:bg-neutral-900
                p-6
                rounded-2xl
                border
                border-neutral-200
                dark:border-neutral-800
            "
        >
            <h3 className="text-xl font-bold mb-4">
                Write a Review
            </h3>

            <select
                value={rating}
                onChange={(e) =>
                    setRating(Number(e.target.value))
                }
                className="
                    w-full
                    mb-4
                    p-3
                    rounded-lg
                    border
                "
            >
                <option value={5}>⭐⭐⭐⭐⭐</option>
                <option value={4}>⭐⭐⭐⭐</option>
                <option value={3}>⭐⭐⭐</option>
                <option value={2}>⭐⭐</option>
                <option value={1}>⭐</option>
            </select>

            <textarea
                rows="4"
                value={comment}
                onChange={(e) =>
                    setComment(e.target.value)
                }
                placeholder="Write your review..."
                className="
                    w-full
                    p-3
                    rounded-lg
                    border
                    mb-4
                "
            />

            <button
                type="submit"
                className="
                    px-5
                    py-3
                    bg-emerald-500
                    rounded-xl
                    font-semibold
                "
            >
                Submit Review
            </button>
        </form>
    );
}

export default ReviewForm;