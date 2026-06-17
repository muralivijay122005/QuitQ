import axios from "axios";

const API_URL = "https://localhost:7253/api/cart";

const getToken = () => {
    return localStorage.getItem("token");
};

export const addToCart = async (
    productId,
    quantity = 1
) => {
    const response = await axios.post(
        `${API_URL}/add`,
        {
            productId,
            quantity
        },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const getCart = async () => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return response.data;
};

export const updateCartItem = async (id, quantity) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        { quantity },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const removeCartItem = async (id) => {
    const response = await axios.delete(
        `${API_URL}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};