import api from "../api/axios";

export const getProductReviews = async (productId) => {
    const response = await api.get(
        `/reviews/product/${productId}`
    );

    return response.data;
};

export const getReviewStats = async (productId) => {
    const response = await api.get(
        `/reviews/product/${productId}/stats`
    );

    return response.data;
};

export const createReview = async (review) => {
    const response = await api.post(
        "/reviews",
        review
    );

    return response.data;
};