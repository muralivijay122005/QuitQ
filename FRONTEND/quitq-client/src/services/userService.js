import axios from "axios";

const API_URL = "https://localhost:7253/api/users";

const getToken = () => {
    return localStorage.getItem("token");
};

export const getProfile = async () => {
    const response = await axios.get(
        `${API_URL}/profile`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await axios.put(
        `${API_URL}/profile`,
        profileData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const uploadProfileImage = async (imageFile) => {
    const formData = new FormData();

    formData.append(
        "image",
        imageFile
    );

    const response = await axios.post(
        `${API_URL}/profile/upload-image`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

export const changePassword = async (payload) => {
    const response = await axios.put(
        `${API_URL}/change-password`,
        payload,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );
    return response.data;
};