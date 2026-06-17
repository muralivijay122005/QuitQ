import axios from "axios";

const API_URL = "https://localhost:7253/api/orders";

const getToken = () => {
    return localStorage.getItem("token");
};

export const checkout = async (shippingAddress) => {
    const response = await axios.post(
        `${API_URL}/checkout`,
        {
            shippingAddress
        },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const getMyOrders = async () => {
    const response = await axios.get(
        API_URL,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const getOrderById = async (id) => {
    const response = await axios.get(
        `${API_URL}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const cancelOrder = async (id) => {
    const response = await axios.put(
        `${API_URL}/${id}/cancel`,
        {},
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};