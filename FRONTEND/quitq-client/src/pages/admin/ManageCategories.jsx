import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

const API = "https://localhost:7253/api/categories";

function ManageCategories() {
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });

    const [editingId, setEditingId] = useState(null);

    const token = localStorage.getItem("token");

    const fetchCategories = async () => {
        try {
            const res = await axios.get(API);
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                await axios.put(
                    `${API}/${editingId}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } else {
                await axios.post(
                    API,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }

            setFormData({
                name: "",
                description: ""
            });

            setEditingId(null);

            fetchCategories();
        }
        catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (category) => {
        setEditingId(category.id);

        setFormData({
            name: category.name,
            description: category.description
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete category?")) return;

        try {
            await axios.delete(
                `${API}/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchCategories();
        }
        catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Navbar />

            <div className="max-w-6xl mx-auto p-6">

                <h1 className="text-4xl font-bold mb-8">
                    Manage Categories
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-neutral-900 p-6 rounded-xl mb-10"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Category Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 rounded mb-4 bg-neutral-800"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-3 rounded mb-4 bg-neutral-800"
                    />

                    <button
                        className="bg-green-600 px-6 py-3 rounded"
                    >
                        {editingId
                            ? "Update Category"
                            : "Create Category"}
                    </button>
                </form>

                <div className="grid gap-4">
                    {categories.map(category => (
                        <div
                            key={category.id}
                            className="bg-neutral-900 p-5 rounded-xl flex justify-between items-center"
                        >
                            <div>
                                <h2 className="font-bold text-xl">
                                    {category.name}
                                </h2>

                                <p className="text-neutral-400">
                                    {category.description}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="bg-blue-600 px-4 py-2 rounded"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(category.id)}
                                    className="bg-red-600 px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}

export default ManageCategories;