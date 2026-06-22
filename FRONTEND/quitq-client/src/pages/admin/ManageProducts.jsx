import { useEffect, useState } from "react";
import { FiTrash2, FiArrowLeft, FiPlus, FiBox, FiUploadCloud, FiAlertCircle, FiCheck, FiX, FiImage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sellerId, setSellerId] = useState(null);
    const navigate = useNavigate();

    // Form states
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: ""
    });
    const [formError, setFormError] = useState("");
    const [formSubmitting, setFormSubmitting] = useState(false);

    // Image upload states
    const [uploadingProductId, setUploadingProductId] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [uploadError, setUploadError] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [imageSubmitting, setImageSubmitting] = useState(false);

    const [editingProduct, setEditingProduct] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: ""
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const meRes = await api.get("/auth/me");
            setSellerId(meRes.data.userId);

            const catRes = await api.get("/categories");
            setCategories(catRes.data);

            const prodRes = await api.get("/products");
            setProducts(prodRes.data);
        } catch (error) {
            console.error("Failed to load initial data", error);
        } finally {
            setLoading(false);
        }
    };

    const loadProductsOnly = async () => {
        try {
            const prodRes = await api.get("/products");
            setProducts(prodRes.data);
        } catch (error) {
            console.error("Failed to refresh products", error);
        }
    };

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        setFormError("");

        if (!formData.categoryId) {
            setFormError("Please select a product category.");
            return;
        }

        try {
            setFormSubmitting(true);
            const payload = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                categoryId: parseInt(formData.categoryId),
                sellerId: parseInt(sellerId) || 1
            };

            await api.post("/products", payload);

            setFormData({ name: "", description: "", price: "", stock: "", categoryId: "" });
            setShowAddForm(false);
            alert("Product created successfully!");
            loadProductsOnly();
        } catch (error) {
            console.error("Failed to create product", error);
            setFormError(error.response?.data || "Failed to create product.");
        } finally {
            setFormSubmitting(false);
        }
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await api.delete(`/products/${id}`);
            loadProductsOnly();
        } catch (error) {
            console.error("Failed to delete product", error);
            alert("Failed to delete product");
        }
    };

    const handleFileSelect = (e) => {
        setUploadError("");
        setUploadSuccess(false);
        const file = e.target.files[0];
        if (!file) return;

        const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];

        if (!allowedExtensions.exec(file.name) || !allowedMimeTypes.includes(file.type)) {
            setUploadError("Invalid format. Only JPG, JPEG and PNG files are allowed.");
            setSelectedFile(null);
            setFilePreview(null);
            return;
        }

        const maxBytes = 5 * 1024 * 1024;
        if (file.size > maxBytes) {
            setUploadError("File too large. Maximum allowed size is 5MB.");
            setSelectedFile(null);
            setFilePreview(null);
            return;
        }

        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setFilePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleUploadImage = async (productId) => {
        if (!selectedFile) {
            setUploadError("Please select a valid image file first.");
            return;
        }

        try {
            setImageSubmitting(true);
            setUploadError("");

            const formDataUpload = new FormData();
            formDataUpload.append("image", selectedFile);

            await api.post(`/products/${productId}/upload-image`, formDataUpload, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setUploadSuccess(true);
            setSelectedFile(null);
            setFilePreview(null);

            setTimeout(() => {
                setUploadingProductId(null);
                setUploadSuccess(false);
            }, 1500);

            loadProductsOnly();
        } catch (error) {
            console.error("Failed to upload image", error);
            setUploadError(error.response?.data || "Image upload failed.");
        } finally {
            setImageSubmitting(false);
        }
    };

    const openUploadPanel = (productId) => {
        setUploadingProductId(productId);
        setSelectedFile(null);
        setFilePreview(null);
        setUploadError("");
        setUploadSuccess(false);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setEditFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            categoryId: product.categoryId
        });
    };

    const handleEditChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value
        });
    };

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/products/${editingProduct.id}`, {
                name: editFormData.name,
                description: editFormData.description,
                price: parseFloat(editFormData.price),
                stock: parseInt(editFormData.stock),
                categoryId: parseInt(editFormData.categoryId)
            });
            setEditingProduct(null);
            loadProductsOnly();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 duration-300">
            <Navbar />

            <main className="max-w-5xl mx-auto px-6 py-12 flex-grow w-full">
                <button onClick={() => navigate("/admin")} className="mb-8 flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-spotify dark:hover:text-spotify font-semibold cursor-pointer">
                    <FiArrowLeft /> Back to Dashboard
                </button>

                <div className="bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 p-8 rounded-3xl shadow-xl shadow-neutral-200/10 dark:shadow-neutral-950/10">
                    <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10 pb-6 border-b border-neutral-200 dark:border-neutral-850">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2.5">
                                <FiBox className="text-spotify" /> Manage Products
                            </h1>
                            <p className="text-neutral-500 dark:text-neutral-400 mt-1">
                                Create new product listings and upload high-resolution product photos.
                            </p>
                        </div>

                        <button onClick={() => setShowAddForm(!showAddForm)} className="bg-spotify hover:bg-spotify-hover text-neutral-950 font-bold px-5 py-3 rounded-full text-sm flex items-center gap-2 transition-all duration-200 active:scale-95 shadow-md shadow-spotify/20 cursor-pointer self-start sm:self-center">
                            {showAddForm ? <FiX className="w-4 h-4" /> : <FiPlus className="w-4 h-4" />}
                            <span>{showAddForm ? "Cancel" : "Add Product"}</span>
                        </button>
                    </header>

                    {/* Creation Form */}
                    {showAddForm && (
                        <div className="mb-10 bg-neutral-50 dark:bg-neutral-950/50 border border-neutral-200 dark:border-neutral-800/80 p-6 sm:p-8 rounded-2xl">
                            <h2 className="text-xl font-bold mb-6 text-neutral-900 dark:text-white">New Product details</h2>
                            {formError && (
                                <div className="mb-6 bg-red-100/55 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 p-4 rounded-xl flex items-center gap-3 text-sm">
                                    <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <span>{formError}</span>
                                </div>
                            )}
                            <form onSubmit={handleCreateProduct} className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-1 sm:col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Product Name</label>
                                    <input type="text" name="name" placeholder="e.g. Premium Leather Wallet" value={formData.name} onChange={handleFormChange} required className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-spotify focus:ring-1 focus:ring-spotify" />
                                </div>
                                <div className="space-y-1 sm:col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Description</label>
                                    <textarea name="description" rows="3" placeholder="Write an elegant description for your product..." value={formData.description} onChange={handleFormChange} required className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-spotify focus:ring-1 focus:ring-spotify resize-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Price (₹)</label>
                                    <input type="number" name="price" min="1" step="0.01" placeholder="0.00" value={formData.price} onChange={handleFormChange} required className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-spotify focus:ring-1 focus:ring-spotify" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Stock Quantity</label>
                                    <input type="number" name="stock" min="0" placeholder="0" value={formData.stock} onChange={handleFormChange} required className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-spotify focus:ring-1 focus:ring-spotify" />
                                </div>
                                <div className="space-y-1 sm:col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Product Category</label>
                                    <select name="categoryId" value={formData.categoryId} onChange={handleFormChange} required className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-spotify focus:ring-1 focus:ring-spotify cursor-pointer">
                                        <option value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="sm:col-span-2 pt-4 flex justify-end">
                                    <button type="submit" disabled={formSubmitting} className="bg-spotify hover:bg-spotify-hover text-neutral-950 font-extrabold px-8 py-3.5 rounded-full transition-all duration-200 active:scale-95 shadow-md shadow-spotify/20 cursor-pointer">
                                        {formSubmitting ? "Creating..." : "Save Product"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Image Upload Panel */}
                    {uploadingProductId !== null && (
                        <div className="mb-10 bg-neutral-50 dark:bg-neutral-950/50 border border-spotify/30 dark:border-spotify/20 p-6 rounded-2xl relative">
                            <button onClick={() => setUploadingProductId(null)} className="absolute top-4 right-4 p-1 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 cursor-pointer">
                                <FiX />
                            </button>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <FiImage className="text-spotify" /> Upload Product Image
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6 items-center">
                                <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl p-6 text-center hover:border-spotify dark:hover:border-spotify relative cursor-pointer group">
                                    <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                    <FiUploadCloud className="w-12 h-12 text-neutral-400 dark:text-neutral-600 mx-auto mb-3 group-hover:text-spotify" />
                                    <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300">Drag & drop or click to choose file</p>
                                    <p className="text-xs text-neutral-500 mt-1">Supports JPG, JPEG, PNG only (Max 5MB)</p>
                                </div>
                                <div className="space-y-4">
                                    {uploadError && (
                                        <div className="bg-red-100/50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-900/50 p-4 rounded-xl flex items-center gap-2.5 text-sm">
                                            <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                                            <span>{uploadError}</span>
                                        </div>
                                    )}
                                    {uploadSuccess && (
                                        <div className="bg-green-100/50 dark:bg-green-950/20 text-green-600 dark:text-green-400 border border-green-200/50 dark:border-green-900/50 p-4 rounded-xl flex items-center gap-2.5 text-sm animate-pulse">
                                            <FiCheck className="w-5 h-5 flex-shrink-0" />
                                            <span>Image uploaded successfully!</span>
                                        </div>
                                    )}
                                    {filePreview ? (
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
                                            <div className="w-24 h-24 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 flex-shrink-0 bg-neutral-100 dark:bg-neutral-900">
                                                <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-grow w-full text-center sm:text-left">
                                                <p className="text-sm font-semibold truncate max-w-xs">{selectedFile?.name}</p>
                                                <p className="text-xs text-neutral-500 mt-0.5">{(selectedFile?.size / (1024 * 1024)).toFixed(2)} MB</p>
                                                <button onClick={() => handleUploadImage(uploadingProductId)} disabled={imageSubmitting} className="mt-3 bg-spotify hover:bg-spotify-hover text-neutral-950 font-extrabold px-6 py-2 rounded-full text-xs transition-all duration-200 active:scale-95 shadow-md shadow-spotify/25 cursor-pointer flex items-center gap-1.5 w-full sm:w-auto justify-center">
                                                    {imageSubmitting ? "Uploading..." : "Confirm Upload"}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        !uploadSuccess && <div className="text-center md:text-left py-8 text-neutral-500">No image selected. Choose a file to preview.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Edit Modal */}
                    {editingProduct && (
                        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl w-full max-w-xl">
                                <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
                                <form onSubmit={updateProduct} className="space-y-4">
                                    <input type="text" name="name" value={editFormData.name} onChange={handleEditChange} className="w-full p-3 rounded-xl border" />
                                    <textarea name="description" rows="4" value={editFormData.description} onChange={handleEditChange} className="w-full p-3 rounded-xl border" />
                                    <input type="number" name="price" value={editFormData.price} onChange={handleEditChange} className="w-full p-3 rounded-xl border" />
                                    <input type="number" name="stock" value={editFormData.stock} onChange={handleEditChange} className="w-full p-3 rounded-xl border" />
                                    <select name="categoryId" value={editFormData.categoryId} onChange={handleEditChange} className="w-full p-3 rounded-xl border">
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    <div className="flex gap-3">
                                        <button type="submit" className="bg-spotify px-6 py-3 rounded-xl font-bold">Save Changes</button>
                                        <button type="button" onClick={() => setEditingProduct(null)} className="bg-neutral-700 text-white px-6 py-3 rounded-xl">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Products List */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="w-10 h-10 border-4 border-spotify border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-16 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl">
                            <FiBox className="w-12 h-12 text-neutral-300 dark:text-neutral-750 mx-auto mb-3" />
                            <p className="text-neutral-500 dark:text-neutral-400 font-medium">No products registered in the database.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {products.map(product => (
                                <div key={product.id} className="bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 transition-all hover:border-neutral-300 dark:hover:border-neutral-700">
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 flex-shrink-0 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center relative">
                                            {product.imageUrl ? (
                                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <FiImage className="w-6 h-6 text-neutral-400" />
                                            )}
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <h2 className="font-extrabold text-neutral-900 dark:text-white text-lg truncate">{product.name}</h2>
                                            <div className="flex items-center gap-3 mt-1 text-sm">
                                                <span className="text-spotify font-bold">₹{product.price.toLocaleString("en-IN")}</span>
                                                <span className="text-neutral-300 dark:text-neutral-700">|</span>
                                                <span className="text-neutral-500 dark:text-neutral-400">Stock: {product.stock}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                        <button onClick={() => openUploadPanel(product.id)} className="px-4 py-2 border border-neutral-200 dark:border-neutral-800 hover:border-spotify dark:hover:border-spotify hover:bg-spotify/5 text-neutral-750 dark:text-neutral-200 font-semibold rounded-full text-xs transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap">
                                            <FiUploadCloud /> Upload Image
                                        </button>
                                        <button onClick={() => openEditModal(product)} className="px-4 py-2 border border-blue-500/30 text-blue-500 rounded-full text-xs font-semibold hover:bg-blue-500/10 transition cursor-pointer">Edit</button>
                                        <button onClick={() => deleteProduct(product.id)} className="p-2.5 bg-neutral-100 hover:bg-red-550/10 dark:bg-neutral-800 dark:hover:bg-red-950/30 text-red-550 hover:text-red-500 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-transparent hover:border-red-500/30" aria-label="Delete product">
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ManageProducts;