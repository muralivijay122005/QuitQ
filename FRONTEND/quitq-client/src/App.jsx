import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageCategories from "./pages/admin/ManageCategories";
import ManageOrders from "./pages/admin/ManageOrders";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="bg-slate-950 min-h-screen text-white">
            <Routes>

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/"
                    element={
                        isAuthenticated
                            ? <Home />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/products"
                    element={
                        isAuthenticated
                            ? <Products />
                            : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/products/:id"
                    element={
                        isAuthenticated
                            ? <ProductDetails />
                            : <Navigate to="/login" />
                    }
                />
                <Route path="*" element={<NotFound />} />
                <Route
                    path="/cart"
                    element={
                        isAuthenticated
                            ? <Cart />
                            : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        isAuthenticated
                            ? <Checkout />
                            : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/orders"
                    element={
                        isAuthenticated
                            ? <Orders />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/orders/:id"
                    element={
                        isAuthenticated
                            ? <OrderDetails />
                            : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/admin"
                    element={
                        isAuthenticated
                            ? <AdminDashboard />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/admin/products"
                    element={
                        isAuthenticated
                            ? <ManageProducts />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/admin/categories"
                    element={
                        isAuthenticated
                            ? <ManageCategories />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/admin/orders"
                    element={
                        isAuthenticated
                            ? <ManageOrders />
                            : <Navigate to="/login" />
                    }
                />

            </Routes>
        </div>
    );
}

export default App;